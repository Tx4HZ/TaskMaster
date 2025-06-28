import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Layout() {
  const { token, logout } = useContext(AuthContext)

  return (
    <div className="min-h-screen flex flex-col bg-mocha-base">
      {/* Top Navbar */}
      <header className="bg-mocha-surface0 text-mocha-text p-4 shadow-xl shadow-mocha-overlay0/50 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-mocha-teal">Task</span>
            <span className="text-mocha-sapphire">Master</span>
          </h1>
          {token && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
            >
              Выйти
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-mocha-base text-mocha-text p-6 flex flex-col justify-between shadow-2xl border-r border-mocha-overlay0/20">
          <nav>
            <ul className="space-y-3">
              {token ? (
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-mocha-surface1/80 text-mocha-blue transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-mocha-blue"
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
                    Профиль
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-mocha-surface1/80 text-mocha-blue transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-mocha-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14"
                        />
                      </svg>
                      Вход
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-mocha-surface1/80 text-mocha-blue transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 text-mocha-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Регистрация
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <footer className="text-mocha-subtext0 text-sm border-t border-mocha-overlay0/50 pt-4">
            <p>By: Tx4HZ/HIKKA-ZAIKA</p>
            <p>© {new Date().getFullYear()}</p>
          </footer>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout