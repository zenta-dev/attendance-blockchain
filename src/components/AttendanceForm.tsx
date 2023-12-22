"use client"
import { useChat } from "@/hooks/useChat";
import { SocketMessageBody } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { BlockList } from "./BlockList";
export const AttendanceForm = () => {
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [reason, setReason] = useState("");
    const [isPresent, setIsPresent] = useState(false);
    const [isAbsent, setIsAbsent] = useState(false);

    const chat = useChat();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const str: SocketMessageBody = {
            name,
            identity,
            reason,
            isPresent,
            isAbsent,
            timestamp: new Date().getTime(),
        };

        chat.sendMessage(str);
    }
    useEffect(() => {
        async function fetchBlockList() {
            const x = await chat.fetchMessages();
            console.log(x)
        }
        fetchBlockList();
    }, [])
    return (
        <>
            <BlockList data={chat.messages} />

            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Absensi</h1>

                <div className="login__content">
                    <div className="login__box">
                        <div className="login__box-input">
                            <input
                                type="text"
                                required
                                className="login__input"
                                id="login-email"
                                placeholder=" "
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="login__label">Nama Lengkap</label>
                        </div>
                    </div>
                    <div className="login__box">
                        <div className="login__box-input">
                            <input
                                type="text"
                                className="login__input"
                                placeholder=" "
                                onChange={(e) => setIdentity(e.target.value)}
                            />
                            <label className="login__label"
                            >No. Identitas</label
                            >
                        </div>
                    </div>
                    <div className="login__box">
                        <div className="login__box-input">
                            <input
                                type="text"
                                className="login__input"
                                placeholder=" "
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label className="login__label"
                            >*Berikan alasan jika izin</label
                            >
                        </div>
                    </div>
                </div>

                <div className="login__check">
                    <div className="login__check-group">
                        <input
                            type="checkbox"
                            className="login__check-input"
                            id="login-check"
                            onChange={(e) => setIsPresent(e.target.checked)}
                        />
                        <label className="login__check-label">Hadir</label>
                        <input
                            type="checkbox"
                            className="login__check-input"
                            id="login-check"
                            onChange={(e) => setIsAbsent(e.target.checked)}
                        />
                        <label className="login__check-label">Izin</label>
                    </div>
                </div>

                <button type="submit" className="login__button">SUBMIT</button>
            </form>
        </>
    )
}
