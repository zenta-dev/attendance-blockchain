"use client"
import { useSocket } from "@/provider/SocketProvider";
import { useEffect, useState } from "react";

export const useChat = () => {
    const { socket } = useSocket();
    const [messages, setMessages] = useState<any[]>([]);

    const sendMessage = (message: any) => {
        console.log("sendMessage", message);
        socket?.emit("message", message);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("received", (message: any) => {
            console.log("received", message);
            setMessages((messages) => [...messages, message]);
        });
    }, [socket]);

    const fetchMessages = async () => {
        const res = await fetch("/api/block");
        const data = await res.json();
        setMessages(data);
    }


    return { sendMessage, messages, fetchMessages };
}
