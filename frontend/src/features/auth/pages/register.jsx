import React from 'react'

const Register = () => {
 const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <button type="submit" className="button primary">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    </main>
  )
}

export default Register