import { AnimatePresence, motion } from 'framer-motion';

export const BlockList = ({ data }: { data: any[] }) => {
    return (
        <motion.div className="block-list-container" style={{ overflowX: 'auto' }}>
            <motion.ul className="block-list">
                <AnimatePresence>
                    {data.map((item) => (
                        <motion.li key={item.id} layout>
                            <BlockItem data={item} />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </motion.div>
    );
};

export const BlockItem = ({ data }: { data: any }) => {
    const shortenHash = (hash: string, maxLength: number) => {
        return hash.length > maxLength ? `${hash.substring(0, maxLength)}...` : hash;
    };
    return (
        <motion.div className="block-item">
            <div className="block__item-name">Name: {data.name}</div>
            <div className="block__item-identity">Identity: {data.identity}</div>
            <div className="block__item-reason">Reason: {data.reason}</div>

            {/* <div className="block__item-hash">Previous Hash: {shortenHash(data.prevHash, 20)}</div>
            <div className="block__item-hash">Hash: {shortenHash(data.hash, 20)}</div> */}
            <div className="block__item-hash">Previous Hash: {data.prevHash}</div>
            <div className="block__item-hash">Hash: {data.hash}</div>
            <div className="block__item-timestamp">{data.createdAt}</div>
        </motion.div>
    );
};
