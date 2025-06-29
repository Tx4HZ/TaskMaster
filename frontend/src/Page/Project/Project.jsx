import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useSearchParams, Outlet, useNavigate } from "react-router-dom"

function Project() {
    const { token, userId, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState(searchParams.get("filter") || "all")

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
    }, [token, navigate, logout])

    const handleFilterClick = (filter) => {
        setActiveFilter(filter)
        navigate(`/project?filter=${filter}`)
    }

    return (
        <div className="flex flex-col min-h-screen bg-mocha-base px-6 py-3">
            {/* Tabs and Create Button */}
            <div className="relative mb-6">
                <nav className="flex items-center space-x-2 border-b border-mocha-overlay0/50">
                    <button
                        onClick={() => handleFilterClick("all")}
                        className={`flex items-center gap-2 px-4 py-2 text-mocha-blue font-semibold rounded-t-lg transition-colors duration-200 ${activeFilter === "all"
                            ? "bg-mocha-surface0 border-b-2 border-mocha-blue"
                            : "hover:bg-mocha-surface2/80"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 9.75h16.5m-16.5 6.75h16.5"
                            />
                        </svg>
                        Все проекты
                    </button>
                    <button
                        onClick={() => handleFilterClick("owned")}
                        className={`flex items-center gap-2 px-4 py-2 text-mocha-blue font-semibold rounded-t-lg transition-colors duration-200 ${activeFilter === "owned"
                            ? "bg-mocha-surface0 border-b-2 border-mocha-blue"
                            : "hover:bg-mocha-surface2/80"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>
                        Личное
                    </button>
                    <button
                        onClick={() => handleFilterClick("participated")}
                        className={`flex items-center gap-2 px-4 py-2 text-mocha-blue font-semibold rounded-t-lg transition-colors duration-200 ${activeFilter === "participated"
                            ? "bg-mocha-surface0 border-b-2 border-mocha-blue"
                            : "hover:bg-mocha-surface2/80"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                        </svg>
                        Участвую
                    </button>
                    <div className="absolute right-5 top-1 -translate-y-1">
                        <button
                            onClick={() => navigate("/project/create")}
                            className="flex items-center justify-center w-6 h-6 bg-mocha-green text-mocha-base rounded-full hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Working Area */}
            <div className="flex-1 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/30 p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Project