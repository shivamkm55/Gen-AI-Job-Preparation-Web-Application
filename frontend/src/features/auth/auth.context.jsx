import {createContext, useState } from 'react';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

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