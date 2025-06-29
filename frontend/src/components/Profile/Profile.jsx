import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import ProfileForm from "./ProfileForm"


function Profile() {
    const { token, userId, logout } = useContext(AuthContext)
    const [profileData, setProfileData] = useState(null)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { status, data, message } = response.data;

                if (status === "success") {
                    setProfileData(data);
                } else {
                    throw new Error(message || "Failed to load profile");
                }
            } catch (err) {
                setError(err.message || "Failed to load profile");
                logout();
                navigate("/login");
            }
        }

        fetchProfile()
    }, [token, navigate, logout])

    const handleProfileCreated = (newProfileData) => {
        setProfileData({
            ...profileData,
            profile: newProfileData, // Обновляем profile в profileData
        });
        setShowForm(false);
        setError('')
    }

    const calculateAge = (birthday) => {
        if (!birthday) return "N/A";
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getFullName = (profile) => {
        if (!profile) return "N/A";
        const { name, surname, patronymic } = profile;
        const parts = [surname, name, patronymic].filter(Boolean); // Убираем null/undefined
        return parts.length > 0 ? parts.join(" ") : "N/A";
    };

    if (!profileData) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="flex flex-col items-center justify-start bg-mocha-base p-4 min-h-screen">
            <div className="relative max-w-xl w-full mx-auto mt-20 p-8 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/30 transition-all duration-300 hover:shadow-mocha-overlay0/50">
                <h1 className="text-3xl font-extrabold text-mocha-text mb-6 text-center tracking-tight">
                    Ваш профиль
                </h1>
                {error && (
                    <p className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg mb-6 text-center animate-pulse">
                        {error}
                    </p>
                )}
                <div className="space-y-4">
                    {profileData.profile && (
                        <>
                            {/* Полное имя */}
                            <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg hover:bg-mocha-surface1/80 transition-colors">
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
                                <div>
                                    <span className="text-mocha-subtext0 text-sm">ФИО</span>
                                    <p className="text-mocha-text font-medium">{getFullName(profileData.profile)}</p>
                                </div>
                            </div>
                            {/* Дата рождения и возраст */}
                            <div className="pl-12">
                                <p className="text-mocha-subtext0 text-sm">
                                    {profileData.profile.birthday
                                        ? `${new Date(profileData.profile.birthday).toLocaleDateString("ru-RU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}, ${calculateAge(profileData.profile.birthday)} лет`
                                        : "N/A"}
                                </p>
                            </div>
                            {/* Логин и почта на одной линии */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg hover:bg-mocha-surface1/80 transition-colors">
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
                                    <div>
                                        <span className="text-mocha-subtext0 text-sm">Логин</span>
                                        <p className="text-mocha-text font-medium">{profileData.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg hover:bg-mocha-surface1/80 transition-colors">
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
                                    <div>
                                        <span className="text-mocha-subtext0 text-sm">Email</span>
                                        <p className="text-mocha-text font-medium">{profileData.email || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Технологии как кирпичики */}
                            {profileData.profile.technologies && profileData.profile.technologies.length > 0 && (
                                <div className="space-y-2">
                                    <span className="text-mocha-subtext0 text-sm block">Технологии</span>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.profile.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-mocha-blue/20 text-mocha-blue rounded-full text-sm font-medium hover:bg-mocha-blue/30 transition-colors duration-200 shadow-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Поле статуса с эффектом глубины */}
                            {profileData.profile.status && (
                                <div className="p-4 bg-mocha-surface2 rounded-lg shadow-inner shadow-mocha-overlay0/70 hover:bg-mocha-surface2/80 transition-colors">
                                    <div className="flex items-center gap-3">
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
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <div>
                                            <span className="text-mocha-subtext0 text-sm">Статус</span>
                                            <p className="text-mocha-text font-medium">{profileData.profile.status}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {profileData.profile == null && !showForm ? (
                    <>
                        <div className="p-4 bg-mocha-surface0 rounded-lg shadow-inner shadow-mocha-base/50 hover:bg-mocha-surface2/80 transition-colors">
                            <div className="flex flex-col items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-mocha-blue"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-mocha-text font-bold text-center">
                                        Ваш профиль пока что пуст, давайте исправим это!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-8 w-full p-3 bg-mocha-green text-mocha-base rounded-lg font-semibold hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md"
                        >
                            Создать профиль
                        </button>
                    </>
                ) : profileData.profile && !showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-8 w-full p-3 bg-mocha-blue text-mocha-base rounded-lg font-semibold hover:bg-mocha-blue/80 hover:scale-105 transition-all duration-200 shadow-md"
                    >
                        Редактировать профиль
                    </button>
                ) : null}
                {showForm && (
                    <div
                        className={`fixed inset-0 bg-mocha-base/80 flex items-center justify-center z-5 transition-all duration-500 ease-out ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div
                            className={`max-w-xl w-full p-8 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/50 transform transition-transform duration-500 ease-out ${showForm ? "scale-100 animate-rubberPop" : "scale-50"
                                }`}
                        >
                            <ProfileForm
                                profile={profileData.profile}
                                token={token}
                                onCancel={() => setShowForm(false)}
                                onProfileCreated={handleProfileCreated}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile