import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../auth.form.scss'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { handleRegister, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await handleRegister(username, email, password)
      navigate('/home')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <main>
        <div className={`form-container ${loading ? 'is-loading' : ''}`} aria-busy={loading}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Name</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </main>
  )
}

export default Register