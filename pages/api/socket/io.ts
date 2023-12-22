import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import db from "@/libs/db";
import { Block, Blockchain } from "@/model/blockchain";
import { NextApiResponseServerIo } from "../../../src/types";

export const config = {
    api: {
        bodyParser: false,
    },
};
const blockChain = new Blockchain();
(async () => {
    const dbLen = await db.block.count();
    const bcLen = blockChain.chain.length;

    if (dbLen === 0 && bcLen === 1) {
        await db.block.create({
            data: {
                name: "Genesis Block",
                identity: "0",
                reason: "Genesis Block",
                hash: blockChain.getLatestBlock().hash,
                data: "Genesis Block",
                prevHash: blockChain.getLatestBlock().previousHash,
            }
        })
    } else if (dbLen > bcLen) {
        const dbBlocks = await db.block.findMany();
        dbBlocks.forEach((block) => {
            blockChain.addBlock(new Block(blockChain.chain.length, block.hash, Date.now(), block.data, block.name, block.identity, block.reason));
        })
    } else if (dbLen < bcLen) {
        const dbBlocks = await db.block.findMany();
        const bcBlocks = blockChain.chain;
        bcBlocks.forEach(async (block, index) => {
            if (index >= dbLen) {
                await db.block.create({
                    data: {
                        name: block.name,
                        identity: block.identity,
                        reason: block.reason,
                        hash: block.hash,
                        data: block.data,
                        prevHash: block.previousHash,
                    }
                })
            }
        })
    }


})()



const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });
        io.on("connection", (socket: any) => {
            console.log("a user connected :", socket.id)
            socket.emit("hello", "world");
            socket.on("message", async (message: any) => {
                console.log("message", message);
                const length = blockChain.chain.length;
                const data = JSON.stringify(message);
                blockChain.addBlock(new Block(blockChain.chain.length, blockChain.getLatestBlock().hash, Date.now(), data, message.name, message.identity, message.reason));
                const newLength = blockChain.chain.length;
                if (length < newLength) {
                    const blockDB = await db.block.create({
                        data: {
                            name: message.name,
                            identity: message.identity,
                            reason: message.reason,
                            hash: blockChain.getLatestBlock().hash,
                            data: data,
                            prevHash: blockChain.getLatestBlock().previousHash,
                        }
                    })
                    socket.emit("received", blockDB);
                }
            });
        });
        res.socket.server.io = io;
    }

    res.end();
}

export default ioHandler;