"use client";

import React, { createContext, useEffect, useState } from "react";

interface PrinterContextType {
    ws: WebSocket | null;
    lastMessage: string | null;
}

export const PrinterContext = createContext<PrinterContextType | undefined>(undefined);

export const PrinterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [lastMessage, setLastMessage] = useState<string | null>(null);

    // Define the callback function for handling WebSocket messages
    const handleMessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        setLastMessage(message);
    };

    const initConnection = () => {
        console.log("WebSocket initialized");
        try {
            const ws = new WebSocket("ws://localhost:8080");
            setWs(ws);

            // Set the onmessage handler to the callback function
            ws.onmessage = handleMessage;

        } catch (error) {
            console.error("Error initializing WebSocket:", error);
        }
    };

    useEffect(() => {
        initConnection();
    }, []);

    if (!ws) return null;
    
    return (
        <PrinterContext.Provider value={{ ws, lastMessage }}>
            {children}
        </PrinterContext.Provider>
    );
};
