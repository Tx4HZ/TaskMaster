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
          <Link to="/" className="text-3xl font-extrabold tracking-tight">
            <span className="text-mocha-teal">Task</span>
            <span className="text-mocha-sapphire">Master</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-mocha-base text-mocha-text p-6 flex flex-col justify-between shadow-2xl border-r border-mocha-overlay0/20">
          <nav>
            <ul className="space-y-3">
              {token ? (
                <>
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
                  <li>
                    <Link
                      to="/project"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-mocha-surface1/80 text-mocha-blue transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 text-mocha-blue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.そうなると、2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      Проекты
                    </Link>
                  </li>
                </>
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
          <div className="space-y-4">
            {token && (
              <button
                onClick={logout}
                className="w-full p-3 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
              >
                Выйти
              </button>
            )}
            <footer className="text-mocha-subtext0 text-sm border-t border-mocha-overlay0/50 pt-4">
              <p>By: Tx4HZ/HIKKA-ZAIKA</p>
              <p>© {new Date().getFullYear()}</p>
            </footer>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 w-screen mx-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout