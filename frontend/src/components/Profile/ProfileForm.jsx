import axios from "axios";
import { useState } from "react";

function ProfileForm({ profile, token, onCancel, onProfileCreated }) {
    const [formData, setFormData] = useState({
        name: profile != null ? profile.name : '',
        surname: profile != null ? profile.surname : '',
        patronymic: profile != null ? profile.patronymic : '',
        birthday: profile != null ? profile.birthday : '',
        status: profile != null ? profile.status : '',
        technologies: profile != null ? profile.technologies : [],
    })
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const createProfile = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                ...formData,
                technologies: formData.technologies ? formData.technologies.split(",").map(tech => tech.trim()) : [],
            }

            const response = await axios.post(
                `/api/profiles`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            onProfileCreated(response.data.data);
            onCancel()
        } catch (error) {
            console.error("Error creating profile:", error.response?.data || error.message);
        }
    }


    return (
        <form onSubmit={createProfile} className="mt-6 space-y-4">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1">
                    <label htmlFor="name" className="block text-mocha-subtext0 text-sm">
                        Имя *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        placeholder="Введите ваше имя"
                        value={formData.name}
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1">
                    <label htmlFor="surname" className="block text-mocha-subtext0 text-sm">
                        Фамилия *
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        placeholder="Введите вашу фамилию"
                        value={formData.surname}
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1">
                    <label htmlFor="patronymic" className="block text-mocha-subtext0 text-sm">
                        Отчество
                    </label>
                    <input
                        type="text"
                        id="patronymic"
                        name="patronymic"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        placeholder="Введите ваше отчество (необязательно)"
                        value={formData.patronymic}
                        onChange={handleChange}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <div className="flex-1">
                    <label htmlFor="birthday" className="block text-mocha-subtext0 text-sm">
                        Дата рождения *
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-mocha-blue">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>

                <div className="flex-1">
                    <label htmlFor="status" className="block text-mocha-subtext0 text-sm">
                        Статус
                    </label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        placeholder="Введите ваш статус (необязательно)"
                        value={formData.status}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-mocha-blue">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>

                <div className="flex-1">
                    <label htmlFor="technologies" className="block text-mocha-subtext0 text-sm">
                        Технологии
                    </label>
                    <input
                        type="text"
                        id="technologies"
                        name="technologies"
                        className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                        placeholder="Введите технологии через запятую (необязательно)"
                        value={formData.technologies}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="w-full p-3 bg-mocha-blue text-mocha-base rounded-lg font-semibold hover:bg-mocha-blue/80 hover:scale-105 transition-all duration-200 shadow-md"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full p-3 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}

export default ProfileForm