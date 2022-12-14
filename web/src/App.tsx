import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { auth } from './firebase'
import { Ads, Main } from './pages'
import { useAppDispatch } from './store/hooks'
import { login, logout } from './store/userSlice'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user
        ? dispatch(
            login({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              img: user.photoURL,
            }),
          )
        : dispatch(logout())
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/ads/:game" element={<Ads />} />
    </Routes>
  )
}
