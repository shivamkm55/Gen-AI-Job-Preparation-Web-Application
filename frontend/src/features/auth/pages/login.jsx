import React from 'react'
import '../auth.form.scss'

 

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button type="submit" className="button primary">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    </main>
  )
}

export default Login