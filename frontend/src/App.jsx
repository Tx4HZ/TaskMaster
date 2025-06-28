import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Link } from "react-router-dom"

function App() {
  const { token, logout } = useContext(AuthContext)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-mocha-text">
      {/* Заголовок */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center mb-4 animate-fade-in">
        <span className="text-mocha-teal">Task</span>
        <span className="text-mocha-sapphire">Master</span>
      </h1>
      <p className="text-xl text-mocha-subtext0 text-center mb-8 animate-fade-in-delayed">
        Проект в <b>разработке</b>, но уже готов удивлять!
      </p>

      {/* Текущий прогресс */}
      <div className="max-w-2xl w-full bg-mocha-surface0 p-6 rounded-2xl shadow-xl shadow-mocha-overlay0/30 transition-all duration-300 hover:shadow-mocha-overlay0/50 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <svg
            className="w-8 h-8 text-mocha-blue"
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
          <h2 className="text-2xl font-bold text-mocha-text">Что уже сделано</h2>
        </div>
        <p className="text-mocha-subtext0 text-lg leading-relaxed mb-4">
          TaskMaster — это приложение для управления проектами, построенное на стеке{" "}
          <span className="text-mocha-blue font-medium">Spring</span> и{" "}
          <span className="text-mocha-blue font-medium">React</span>. На данный момент мы реализовали:
        </p>
        <ul className="space-y-2 text-mocha-subtext0">
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Авторизация и регистрация пользователей
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Управление профилями пользователей 
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Создание проектов
          </li>
        </ul>
      </div>

      {/* Планы на будущее */}
      <div className="max-w-2xl w-full bg-gradient-to-r from-mocha-blue/20 to-mocha-teal/20 p-6 rounded-2xl shadow-xl shadow-mocha-overlay0/50 mb-8 animate-pulse-slow">
        <div className="flex items-center gap-3 mb-4">
          <svg
            className="w-8 h-8 text-mocha-sapphire"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9"
            />
          </svg>
          <h2 className="text-2xl font-bold text-mocha-text">Что впереди</h2>
        </div>
        <p className="text-mocha-subtext0 text-lg leading-relaxed mb-4">
          Мы активно работаем над превращением TaskMaster в полноценное решение для управления проектами. В планах:
        </p>
        <ul className="space-y-2 text-mocha-subtext0">
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Создание и управление задачами в проектах
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Приглашение пользователей и назначение на задачи
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Интеграция с Kafka для асинхронной обработки
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-mocha-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Графики и статистика по проектам
          </li>
        </ul>
      </div>

      {/* Призыв к действию */}
      <Link
        to={token ? "/profile" : "/login"}
        className="px-6 py-3 bg-mocha-green text-mocha-base rounded-lg font-semibold hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md text-lg"
      >
        {token ? "Перейти к профилю" : "Попробовать сейчас"}
      </Link>
    </div>
  )
}

export default App
