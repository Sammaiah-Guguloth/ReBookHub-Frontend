import React , {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Otp from './pages/Otp'
import OtpProtectedRoute from './components/OtpProtectedRoute'
import UserProtectedRoute from './components/UserProtectedRoute'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import NotFound from './pages/NotFound'
import Spinner from './components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/slices/authSlice'
import Profile from './pages/Profile'
import MyBooks from './pages/MyBooks'
import SoldBooks from './pages/SoldBooks'
import AddBook from './pages/AddBook'



const App = () => {
    const dispatch = useDispatch();
    const {isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='flex w-full justify-center mt-32 '>
        <Spinner />
      </div>
    );
  }

  return (
     <div className='font-sans'>
      
      <NavBar />

      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path="*" element={<NotFound />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
       
        <Route path='/otp' element={
          <OtpProtectedRoute>
            <Otp />
          </OtpProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <UserProtectedRoute>
            <Dashboard />
          </UserProtectedRoute>
        } >
            <Route index element={<Profile />} />
            <Route path='profile' element={<Profile />} />
            <Route path='add-book' element={<AddBook />} />
            <Route path='my-books' element={<MyBooks />} />
            <Route path='sold-books' element={<SoldBooks/>} />
        </Route>
        

      </Routes>
     </div>
  )
}

export default App