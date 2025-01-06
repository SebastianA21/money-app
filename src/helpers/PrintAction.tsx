import React, { useState, useEffect, useContext, useCallback } from "react";
import { PrinterContext } from "@/context/PrinterProvider";

const PrintAction = () => {
  const { ws, lastMessage } = useContext(PrinterContext);
  const [receiptHtml, setReceiptHtml] = useState<string | null>(null);
  const [printStatus, setPrintStatus] = useState<string>("");

  useEffect(() => {
    fetchFiles(); // Preload the receipt HTML and assets when the component mounts
  }, []);

  useEffect(() => {
    if (lastMessage && lastMessage.type === "printStatus") {
      setPrintStatus(lastMessage.data);
    }
  }, [lastMessage]);

  const fetchFiles = async () => {
    try {
      const htmlResponse = await fetch("/utils/receipt-files/formato/receipt.html");
      let html = await htmlResponse.text();

      const cssResponse = await fetch("/utils/receipt-files/receipt-default/css/style.css");
      const css = await cssResponse.text();
      html = html.replace("</head>", `<style>${css}</style></head>`);

      // const jsResponse = await fetch("/utils/receipt-files/receipt-default/js/script.js");
      // let js = await jsResponse.text();
      // const dataResponse = await fetch("/utils/receipt-files/receipt-default/data/data.json");
      // const data = await dataResponse.json();
      // js = js.replace("const receiptData = data;", `const receiptData = ${JSON.stringify(data)};`);

      // html = html.replace("</body>", `<script>${js}</script></body>`);

      // const imageResponse = await fetch("/utils/receipt-files/receipt-default/images/logo.png");
      // const imageBlob = await imageResponse.blob();
      // const reader = new FileReader();

      // reader.onloadend = () => {
      //   const base64Image = reader.result as string;
      //   console.log("Image loaded:", base64Image);
      //   const imageTag = `<img src="${base64Image}" class="logo"/>`;
      //   html = html.replace("<img>", `${imageTag}`);
      // };
      
      setReceiptHtml(html);
      setPrintStatus("Receipt file loaded");
      // reader.readAsDataURL(imageBlob);
    } catch (error) {
      console.error("Failed to load files:", error);
      setPrintStatus("Failed to load files");
    }
  };

  const handlePrint = useCallback(() => {
    if (ws && receiptHtml) {
      ws.send(JSON.stringify({ type: "printFile", data: receiptHtml }));
    } else {
      setPrintStatus("Receipt file not loaded");
    }
  }, [ws, receiptHtml]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
      <button
        className="w-full mt-1 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        onClick={handlePrint}
      >
        Print
      </button>

      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Print Status: <span className="font-bold">{printStatus}</span>
      </p>
    </div>
  );
};

export default PrintAction;
