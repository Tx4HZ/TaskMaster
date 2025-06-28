import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            setUserId(decoded.userId)
            setUser(decoded.sub)
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setUserId(null)
        }
    }, [token])

    const logout = () => {
        setToken(null)
        setUser(null)
        setUserId(null)
    }

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, userId, setUserId, logout}}>
            { children }
        </AuthContext.Provider>
    )
}