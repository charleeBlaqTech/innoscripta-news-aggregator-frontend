
import { useState } from 'react'
import { login, register } from '../api/auth'
import { useAppDispatch } from '../store'
import { setToken } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/Toast'

export default function AuthPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { showToast, closeToast, message } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = isRegister
        ? await register(form)
        : await login({ email: form.email, password: form.password })

      dispatch(setToken(res.data.token))
      showToast('Authenticated successfully!')
      navigate('/feed')
    } catch (err) {

      showToast(`Authentication failed`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h1 className="auth-title">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>

          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="auth-input"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="auth-btn"
          >
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>

          <p className="auth-toggle-text">
            {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <span className="auth-toggle-link" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'Login' : 'Register'}
            </span>
          </p>
        </div>
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  )
}