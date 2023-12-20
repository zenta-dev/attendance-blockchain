

export const BlockList = (
    { data }: { data: any[] }
) => {

    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    <BlockItem data={item} />
                </li>
            ))}
        </ul>
    )
}


export const BlockItem = ({ data }: { data: any }) => {
    return (
        <div>
            <div className="block__item">
                <div className="block__item-name">{data.name}</div>
                <div className="block__item-identity">{data.identity}</div>
                <div className="block__item-reason">{data.prevHash}</div>
                <div className="block__item-reason">{data.hash}</div>
                <div className="block__item-timestamp">{data.createdAt}</div>

            </div>
        </div>
    )
}
