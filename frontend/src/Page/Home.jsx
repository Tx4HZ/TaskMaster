import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-mocha-text">
      {/* Заголовок */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center mb-6 animate-fade-in">
        Добро пожаловать в{" "}
        <span className="text-mocha-teal">Task</span>
        <span className="text-mocha-sapphire">Master</span>
      </h1>

      {/* Описание проекта */}
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
          <h2 className="text-2xl font-bold text-mocha-text">О проекте</h2>
        </div>
        <p className="text-mocha-subtext0 text-lg leading-relaxed">
          TaskMaster — это современное приложение для управления проектами, построенное на стеке{" "}
          <span className="text-mocha-blue font-medium">Spring</span> и{" "}
          <span className="text-mocha-blue font-medium">React</span>. Создавайте задачи, распределяйте их между участниками команды и следите за прогрессом в удобном и интуитивном интерфейсе.
        </p>
      </div>

      {/* Ключевое событие */}
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold text-mocha-text">Большое событие!</h2>
        </div>
        <p className="text-mocha-subtext0 text-lg leading-relaxed">
          Мы рады объявить, что фронтенд TaskMaster полностью подключён! Теперь вы можете наслаждаться плавным и красивым интерфейсом, созданным с использованием React и стилизованным в темной теме Catppuccin Mocha.
        </p>
      </div>

      {/* Призыв к действию */}
      <Link
        to={token ? "/profile" : "/login"}
        className="px-6 py-3 bg-mocha-green text-mocha-base rounded-lg font-semibold hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md text-lg"
      >
        {token ? "Перейти к профилю" : "Начать работу"}
      </Link>
    </div>
  );
}

export default Home;