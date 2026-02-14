const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

let logoutCallback = null

export const setLogoutCallback = (callback) => {
  logoutCallback = callback
}

async function request(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })

  // If unauthorized, logout automatically
  if (res.status === 401 && logoutCallback) {
    logoutCallback()
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = (data && data.message) || res.statusText || 'Request failed'
    throw new Error(err)
  }
  return data
}

export const login = (payload) => request('/auth/login', payload)
export const signup = (payload) => request('/auth/createAccount', payload)
export const logout = () => fetch(API_BASE + '/auth/logout', { method: 'POST', credentials: 'include' }).then(r => r.json()).catch(() => null)

export default { login, signup, logout, setLogoutCallback }
