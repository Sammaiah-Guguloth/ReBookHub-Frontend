import React , {useState} from 'react'
import { Link,  Navigate, useNavigate } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useDispatch , useSelector } from 'react-redux'
import { setIsLoading , setIsLoggedIn, setUser } from '../redux/slices/authSlice'
import {LOGIN_URL} from '../api/apis';
import axionsInstance from '../api/axios/axiosInstance';
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'

const Login = () => {

  const [showPassword , setShowPassword] = useState(false);
  const {register , handleSubmit , formState : {errors}} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const submitHandler = async (data) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const response = await axionsInstance.post(LOGIN_URL , data);
      console.log("response : " , response);
      if(response.status === 200) {
        toast.success("User logged in successfully");
        dispatch(setUser(response.data.user));
        dispatch(setIsLoggedIn(true));
        
        location.pathname === "/login" ?  navigate("/dashboard") : navigate(-1);
      }
    }
    catch(error) {
      console.log("error while logging in" , error);
      if(!error.response) {
        toast.error("Server Error , Please try again later");
      }
      else if(error.response.status === 401) {
        toast.error(error.response.data.message)
      }st.error("Server problem , Please try again later");
      
    }
    finally {
      dispatch(setIsLoading(false));
    }
  }

  if(isLoading) {
    return (
      <>
        <div className='w-full flex items-center justify-center mt-28'>
          <Spinner />
        </div>
      </>
    )
    
  }

  return (
    <>

      <div className='w-screen max-w-site min-h-screen mb-5 overflow-hidden'>
        {/* Welcome message */}
        <h2 className='mt-5 text-center font-heading text-3xl font-[500] animate-slideUp'>Welcome Back to ReBook Hub</h2>

        <div className='flex flex-col lg:flex-row gap-8 mt-6 justify-center items-center w-[90%] mx-auto'>
          
          {/* signup form */}
          <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col self-start gap-3 w-full lg:w-[50%] animate-slideLeft'>
            
            
            
            {/* email */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <input 
                {...register("email", {
                  required : "email is required",
                  pattern: { 
                    value: /^\S+@\S+$/i, 
                    message: "Invalid email address" 
                  } 
                    
                })}
                className='border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700'
                type='email' id='email' name='email' placeholder='johndoe@gmail.com' />
            </div>

            {/* password */}
            <div className='flex flex-col gap-1 relative'>
              <label htmlFor='password'>Password</label>
              <input 
                {...register("password" , {
                  required : "password is required",
                })}
                className='border-2 rounded-md py-2 px-2 outline-none font-sans text-gray-700'
                type={`${showPassword ? "text" : "password"}`}
                id='password' name='password' placeholder='Your Password  ' />
                
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute bottom-3 right-4 transition-all'>
                  {
                    showPassword ? (
                      <IoMdEyeOff className='text-xl text-gray-800 transition-all' />
                    ) : (<IoMdEye className='text-xl text-gray-800 transition-all'/> )
                  }
                </div>
            </div>

            

            {/*login button */}
            <div>
              <button 
                type='submit' 
                className='bg-primary text-white py-2 px-3 mt-4 w-full rounded-md hover:bg-primary-dark transition-all'
              >
                Login
              </button>
              <p className='mt-2 text-sm'>Don't have an Account ?</p>
            </div>

              <Link to={"/signup"} className='bg-secondary text-primary py-2 px-3 mt-5 w-full rounded-md hover:bg-primary-dark transition-all text-center'>
                Sign up
              </Link>

          </form>

          {/* girl_reading img */}
          <div className='w-full lg:w-[45%] flex justify-center items-center animate-slideRight'>
            <img 
              src='/images/girl_reading.jpg'
              className='w-[70%] h-auto rounded-sm shadow-lg'
              alt='girl reading'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login