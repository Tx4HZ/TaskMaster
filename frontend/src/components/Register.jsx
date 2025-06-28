import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const { setToken, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/users/register', { username, email, password })
            const { status, data, message } = response.data

            if (status === 'error') {
                setError(message || 'Incorrect data')
            }

            if (status === 'success') {
                const response = await axios.post('/api/users/login', { username, password })
                const { status, data, message } = response.data
                setToken(data)

                setUser({ username })
                navigate('/')
            }
        } catch (err) {
            setError(error || 'Incorrect data')
        }

    }

    return (
        <div className="flex items-center justify-center bg-mocha-base p-4">
            <div className="max-w-md w-full mx-auto mt-10 p-8 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/30 transition-all duration-300 hover:shadow-mocha-overlay0/50">
                <h1 className="text-3xl font-extrabold text-mocha-text mb-6 text-center tracking-tight">
                    Регистрация
                </h1>
                {error && (
                    <p className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg mb-6 text-center animate-pulse">
                        {error}
                    </p>
                )}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                        <svg
                            className="w-6 h-6 text-mocha-blue"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Логин"
                            className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                        <svg
                            className="w-6 h-6 text-mocha-blue"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                        <svg
                            className="w-6 h-6 text-mocha-blue"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2c0 .74.4 1.38 1 1.72V15h2v-2.28c.6-.34 1-.98 1-1.72zm-6 1c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6zm14 0c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8 8-3.59 8-8z"
                            />
                        </svg>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        />
                    </div>
                    <button
                        onClick={handleRegister}
                        className="w-full p-3 bg-mocha-blue text-mocha-base rounded-lg font-semibold hover:bg-mocha-blue/80 hover:scale-105 transition-all duration-200 shadow-md"
                    >
                        Зарегистрироваться
                    </button>
                    <p className="mt-4 text-mocha-subtext0 text-center">
                        Уже есть аккаунт?{" "}
                        <Link
                            to="/login"
                            className="text-mocha-blue hover:text-mocha-rosewater hover:underline transition-colors"
                        >
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register