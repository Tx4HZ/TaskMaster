import { Link } from "react-router-dom";

function ProjectCard({ projectData }) {
    // Определяем уникальный цвет на основе projectData.id
    const colors = ['mocha-blue', 'mocha-red', 'mocha-green', 'mocha-lavender'];
    const accentColor = colors[projectData.id % 4];

    // Определяем уникальную иконку на основе projectData.id
    const icons = [
        {
            viewBox: "0 0 24 24",
            path: "m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
        },
        {
            viewBox: "0 0 24 24",
            path: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
        },
        {
            path: "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
            viewBox: "0 0 24 24"
        },
    ];
    const selectedIcon = icons[projectData.id % 3];

    return (
        <Link
            to={`/project/${projectData.id}`}
            className="max-w-sm w-full p-4 bg-mocha-surface0/50 backdrop-blur-lg border border-mocha-overlay0/30 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-glass-pop group">
            {/* Gradient Accent */}
            <div className={`h-1 bg-gradient-to-r from-${accentColor} to-mocha-surface2 rounded-t-xl group-hover:from-${accentColor}/80 group-hover:to-mocha-surface1 transition-colors duration-300`}></div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                {/* Project Title with Dynamic Icon */}
                <div className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox={selectedIcon.viewBox}
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-6 h-6 text-${accentColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d={selectedIcon.path} />
                    </svg>
                    <h2 className="text-xl font-bold text-mocha-text truncate">
                        {projectData.title || "Без названия"}
                    </h2>
                </div>

                {/* Project Summary */}
                <p className="text-sm text-mocha-subtext0 line-clamp-3">
                    {projectData.summary || "Нет описания"}
                </p>

                {/* Participants Count */}
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-mocha-subtext1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                    </svg>
                    <span className="text-xs text-mocha-subtext1">
                        {projectData.usersID.length} участник{projectData.usersID.length !== 1 ? "ов" : ""}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;