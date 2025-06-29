import { Link } from "react-router-dom";

function SingleProject({ projectData }) {
  const columns = [
    { title: "Новые", tasks: [] },
    { title: "В работе", tasks: [] },
    { title: "На проверке", tasks: [] },
    { title: "Завершённые", tasks: [] },
  ];

  return (
    <div className="flex min-h-screen bg-mocha-base p-6">
      {/* Sidebar Menu */}
      <div className="w-64 mr-6 bg-mocha-surface0/50 backdrop-blur-lg border border-mocha-overlay0/30 rounded-xl shadow-xl p-4 space-y-4 animate-glass-pop">
        <h2 className="text-lg font-bold text-mocha-text">
          {projectData.title || "Без названия"}
        </h2>
        <div className="space-y-2">
          <Link
            to={`/project/${projectData.id}/settings`}
            className="flex items-center gap-2 p-2 bg-mocha-blue/20 text-mocha-blue rounded-lg hover:bg-mocha-blue/30 hover:scale-105 transition-all duration-200"
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
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.271-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
            </svg>
            Настройки проекта
          </Link>
          <button
            className="flex items-center gap-2 p-2 bg-mocha-green/20 text-mocha-green rounded-lg hover:bg-mocha-green/30 hover:scale-105 transition-all duration-200 w-full"
            onClick={() => console.log("Создать задачу (заглушка)")}
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
                d="M12 9v6m3-3H9"
              />
            </svg>
            Создать задачу
          </button>
        </div>
      </div>

      {/* Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column, index) => (
          <div
            key={column.title}
            className={`bg-mocha-surface0/50 backdrop-blur-lg border border-mocha-overlay0/30 rounded-xl p-4 animate-glass-pop ${
              index !== 0 ? "border-l border-mocha-overlay0/30" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-mocha-text mb-4">
              {column.title}
            </h3>
            <div className="text-mocha-subtext0 text-center">
              {column.tasks.length === 0 ? "Нет задач" : "Задачи будут здесь"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleProject;