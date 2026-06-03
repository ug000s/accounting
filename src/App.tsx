import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import Guest from './components/Guest'
import Profile from './components/Profile'
import { useAppSelector } from './app/hooks'

function App() {
  // TODO: get token from global state logic
  const token = useAppSelector((state) => state.token)

  return (
    <Routes>
      {/* replace for login , logout - best practice */}
      <Route path="/" element={token ? <Navigate to={'/profile'} replace /> : <Guest />} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to={'/'} replace />} />
    </Routes>
  )
}

export default App
