import { PrinterContext } from "@/context/PrinterProvider";
import { decryptData } from "@/helpers/Decryption";
import { generateKeyPair } from "@/helpers/KeyGen";
import React, { useContext, useEffect, useState } from "react";

const ExchangeBox = () => {
  const { ws, lastMessage } = useContext(PrinterContext);
  const [ messageA, setMessageA ] = useState("");
  const [ messageB, setMessageB ] = useState("");



  useEffect(() => {
    if (!lastMessage) return;
    if (lastMessage.type === "encryptedToken") {
      const decryptedData = decryptData(lastMessage.data);
      console.log("Decrypted token:", decryptedData);
    }
  }), [lastMessage];

  const getKeys = async () => {
    const { publicKey } = await generateKeyPair();
    ws.send(JSON.stringify({ type: "publicKey", data: publicKey }));
    console.log("Public key sent to server");
  };

  const sendMessage = async () => {
    console.log("Message A:", messageA);
    console.log("Message B:", messageB);

    
    const message = { messageA: messageA, messageB: messageB };
    ws.send(JSON.stringify({ type: "portMessage", data: message }));
    console.log("Message sent to server");
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg md:max-w-lg lg:max-w-2xl dark:bg-gray-800">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg md:max-w-lg lg:max-w-2xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-300">
          Exchange Currency
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="compra"
              className="block text-xl font-medium text-black-700 dark:text-gray-300"
            >
              Compra
            </label>
            <input
              id="compra"
              type="text"
              value={messageA}
              onChange={(e) => setMessageA(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="venta"
              className="block text-xl font-medium text-black-700 dark:text-gray-300"
            >
              Venta
            </label>
            <input
              id="venta"
              type="text"
              value={messageB}
              onChange={(e) => setMessageB(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
      </div>
      <button className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        onClick={sendMessage}>
        Send Message
      </button>
      <button className="w-full mt-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        onClick={getKeys}>
        Decrypt
      </button>


    </div>
  );
};

export default ExchangeBox;