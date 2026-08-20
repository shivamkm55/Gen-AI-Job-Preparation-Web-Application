import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../auth.form.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await handleLogin(email, password)
      navigate('/home')
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password')
    }
  }

  return (
    <main>
      <div className={`form-container ${loading ? 'is-loading' : ''}`} aria-busy={loading}>
        <div className={`loading-overlay ${loading ? 'show' : ''}`} aria-live="polite">
          <div className="spinner" />
          <p className="loading-text">Connecting you in...</p>
        </div>

        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  )
}

export default Login