"use client";
import { User } from "@prisma/client";
import {
    RiLock2Line,
    RiUser3Line
} from "@remixicon/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = async (e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const user: User = await res.json()
            localStorage.setItem('user', JSON.stringify(user))
            const storage = localStorage.getItem('user')
            console.log(storage)
            toast.success("Register success, " + user.name)
            router.push('/attendance')
        } else {
            toast.error(await res.text())
        }
    };

    return (
        <form className="login__form" onSubmit={handleLogin}>
            <h1 className="login__title">Register</h1>

            <div className="login__content">
                <div className="login__box">
                    <RiUser3Line className="login__icon" />

                    <div className="login__box-input">
                        <input
                            type="email"
                            required
                            className="login__input"
                            id="login-email"
                            placeholder=" "
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="login__label">Email</label>
                    </div>
                </div>

                <div className="login__box">
                    <RiLock2Line className="login__icon" />
                    <div className="login__box-input">
                        <input
                            type="password"
                            required
                            className="login__input"
                            id="login-pass"
                            placeholder=" "
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="login__label">Sandi</label>
                    </div>
                </div>
            </div>

            <button type="submit" className="login__button">Register</button>
        </form>
    )
}
