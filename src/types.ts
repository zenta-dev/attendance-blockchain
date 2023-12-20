import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type SocketMessageBody = {
    name: string,
    identity: string,
    reason: string,
    isPresent: boolean,
    isAbsent: boolean,
    timestamp: number,
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
}; 