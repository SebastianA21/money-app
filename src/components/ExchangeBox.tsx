import { PrinterContext } from "@/context/PrinterProvider";
import { decryptData } from "@/helpers/Decryption";
import { generateKeyPair } from "@/helpers/KeyGen";
import { useContext, useEffect, useState } from "react";

const ExchangeBox = () => {
    const { ws, lastMessage } = useContext(PrinterContext);
    const [amount, setAmount] = useState("");
    const [currencyFrom, setCurrencyFrom] = useState("USD");
    const [currencyTo, setCurrencyTo] = useState("EUR");


    
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

  
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg md:max-w-lg lg:max-w-2xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-300">
          Exchange Currency
        </h2>
  
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
          />
  
          <select
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Añade más opciones de divisas aquí */}
          </select>
  
          <select
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            {/* Añade más opciones de divisas aquí */}
          </select>
        </div>
  
        <button className="w-full mt-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        onClick={getKeys}>
          Decrypt
        </button>


      </div>
    );
  };
  
  export default ExchangeBox;