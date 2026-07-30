import {useContext} from 'react'
import { AuthContext } from '../auth.context.jsx'
import {register, login, logout, getMe} from '../../services/auth.api.js'

export const useAuth = () => {
    const {user, loading, setLoading, setUser} = useContext(AuthContext)
    return {user, loading, setLoading, setUser}

    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const response = await login({email, password})
            setUser(response.data.user)
            const data
        }
    }
}