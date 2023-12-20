import { createHash } from "crypto";

export class Block {
    public hash: string;
    public nonce: number;

    constructor(
        public index: number,
        public previousHash: string,
        public createdAt: number,
        public data: string,
        public name: string,
    ) {
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        return createHash("sha256")
            .update(this.index + this.previousHash + this.createdAt + this.data + this.nonce)
            .digest("hex");
    }

    mineBlock(difficulty: number): void {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

export class Blockchain {
    public chain: Block[];
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(): Block {
        return new Block(0, "0", Date.now(), "Genesis Block", "Genesis Block");
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block): void {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(4);
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}