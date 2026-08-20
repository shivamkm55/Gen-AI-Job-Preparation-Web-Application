import { createContext, useState, useEffect } from 'react';
import { getMe } from '../services/auth.api.js'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getMe()
                setUser(userData)
            } catch (error) {
                console.error("Error fetching user data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


// This file is used to say:

// “I have auth data here”
// “Any page or component can read it”
// “When login/logout happens, I can update it from one place”