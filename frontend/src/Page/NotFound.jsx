import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mocha-base p-6">
      <div className="text-center bg-mocha-surface0/50 backdrop-blur-lg border border-mocha-overlay0/30 rounded-xl shadow-xl p-8 max-w-md w-full animate-glass-pop">
        {/* Floating Rocket Icon */}
        <div className="mb-6 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 text-mocha-lavender animate-float"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-mocha-text mb-4">
          404 - Потерялись в космосе?
        </h1>

        {/* Description */}
        <p className="text-mocha-subtext0 mb-6">
          Эта страница улетела на орбиту! Давайте вернёмся к чему-то знакомому.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-mocha-blue/20 text-mocha-blue rounded-lg hover:bg-mocha-blue/30 hover:scale-105 transition-all duration-200"
          >
            На главную
          </Link>
          <Link
            to="/project/all"
            className="px-4 py-2 bg-mocha-teal/20 text-mocha-teal rounded-lg hover:bg-mocha-teal/30 hover:scale-105 transition-all duration-200"
          >
            К проектам
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;