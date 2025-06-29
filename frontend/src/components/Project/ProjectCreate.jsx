import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function ProjectCreate() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        usersId: "",
    });
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                usersId: formData.usersId ? formData.usersId.split(",").map(tech => tech.trim()) : [],
            }
            const response = await axios.post(
                `/api/project`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            const { status, data, message } = response.data

            if (status === "success") {
                setShowForm(false);
                navigate(`/project/${data.id}`)
            } else {
                throw new Error(message || "Failed to create projects");
            }
        } catch (err) {
            console.error(err)

            setError(err.message || 'Failed to create profile')
            // logout()
            // navigate('/login')
        }
        // navigate("/project");
    };

    const handleCancel = () => {
        setShowForm(false);
        navigate("/project");
    };

    return (
        <div className="flex flex-col items-center justify-start bg-mocha-base p-4 min-h-screen">
            {showForm && (
                <div
                    className={`fixed inset-0 bg-mocha-base/80 flex items-center justify-center z-50 transition-all duration-500 ease-out ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div
                        className={`max-w-xl w-full p-8 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/50 transform transition-transform duration-500 ease-out ${showForm ? "scale-100 animate-rubberPop" : "scale-50"
                            }`}
                    >
                        <h2 className="text-2xl font-extrabold text-mocha-text mb-6 text-center tracking-tight">
                            Создать проект
                        </h2>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {error && (
                                <p className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg text-center animate-pulse">
                                    {error}
                                </p>
                            )}
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
                                        d="M3 8l9 6 9-6M3 8v11a2 2 0 002 2h14a2 2 0 002-2V8"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <label htmlFor="title" className="block text-mocha-subtext0 text-sm">
                                        Название *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                                        placeholder="Введите название проекта"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
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
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <label htmlFor="summary" className="block text-mocha-subtext0 text-sm">
                                        Описание
                                    </label>
                                    <textarea
                                        id="summary"
                                        name="summary"
                                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0 resize-none"
                                        placeholder="Введите описание проекта (необязательно)"
                                        value={formData.summary}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                </div>
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
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <label htmlFor="usersId" className="block text-mocha-subtext0 text-sm">
                                        ID участников
                                    </label>
                                    <input
                                        type="text"
                                        id="usersId"
                                        name="usersId"
                                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                                        placeholder="Введите ID участников через запятую (необязательно)"
                                        value={formData.usersId}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-mocha-green text-mocha-base rounded-lg font-semibold hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md"
                                >
                                    Сохранить
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full p-3 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectCreate;