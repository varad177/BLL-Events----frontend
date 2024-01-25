
import React, { useContext, useEffect, useRef } from 'react'

import bgImg from '../../assets/sider1.jpg'
import logo from '../../assets/bll-logo-black.svg'
import toast from 'react-hot-toast'
import api from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const Login = () => {

    const userinstorage = sessionStorage.getItem('user')

    useEffect(() => {

        const userFromStorage = JSON.parse(userinstorage);

        if (userFromStorage) {
            navigate('/');
            return; // Stop execution if user is not present
        }



    }, []);

    const { setUserAuth } = useContext(UserContext)

    const navigate = useNavigate()

    const emailId = useRef()
    const passwordvalue = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();


        const email = emailId.current.value
        const password = passwordvalue.current.value;


        if (!email.length) {
            toast.error("please enter the email")
        }
        if (!password.length) {
            toast.error("please enter the password")
        }

        const loading = toast.loading("wait varification in the process")

        api.post('/login', {
            email, password
        }).then((res) => {
           


                if (res.status === 200) {

                    const obj = {
                        'token': res.data.access_token,
                        'email': res.data.email,
                        'tasks': res.data.tasks,
                        '_id': res.data._id
                    }


                    sessionStorage.setItem('user', JSON.stringify(obj))
                    console.log(res.data);

                    setUserAuth({
                        'token': res.data.access_token,
                        'email': res.data.email,
                        'fullname': res.data.fullname,
                        'role': res.data.role,
                        'mobno': res.data.mobno,
                        '_id': res.data._id,
                        'tasks': res.data.tasks
                    })
                    toast.dismiss(loading)
                    toast.success("login successfully")

                    navigate('/')
                }
                else {
                    toast.error("something went wrong")
                }
            

        }).catch(({ response }) => {

            toast.dismiss(loading)
            if (response) {
                toast.error(response.data.error)
            }
            else {
                toast.error("Network Error!")
            }
        })



    }

    return (
        <section className='w-screen m-0'>
            <div className='row max-h-[100vh] w-screen  '>
                <div className='col-lg-6  h-full '>
                    <div className='h-[15vh] max-lg:w-[100vw]  flex items-center justify-center md:shadow-lg'>
                        <img src={logo} className='img-fluid' alt="loading" />
                    </div>
                    <div className='max-lg:w-[100vw]'>
                        <img src={bgImg} className='img-fluid w-full h-[50vh] md:h-[85vh] object-fill' alt="loading" />
                    </div>

                </div>
                <div className='col-lg-6 h-[50vh] max-lg:w-[100vw] md:h-screen'>


                    <form className='h-full w-full flex items-center justify-center'>
                        <div className='md:w-[60%] w-[80%] h-full flex items-center justify-center flex-col '>
                            <div className='w-full flex flex-col justify-center mb-4'>
                                <p className='text-lg font-bold pb-[10px] '>email</p>
                                <input ref={emailId} className='p-3 rounded-lg outline-none focus:outline-none  bg-[#E8F0FE]' type="email" placeholder='email' name='email' />
                            </div>
                            <div className='w-full flex flex-col justify-center'>
                                <p className='text-lg font-bold pb-[10px]'>password</p>
                                <input ref={passwordvalue} className='p-3 pl-8 rounded-lg outline-none focus:outline-none   bg-[#E8F0FE]' type="password" placeholder='Enter Password' name='password' />
                            </div>

                            <div className='w-full mt-4'>
                                <button onClick={handleSubmit} className='btn m-0'>
                                    Sign In
                                </button>
                            </div>

                        </div>
                    </form>


                </div>
            </div>

        </section>
    )
}

export default Login
