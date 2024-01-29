

import React, { useState } from 'react'
import api from '../../axios/axios'
import toast from 'react-hot-toast'
import { Box, LinearProgress } from '@mui/material';

const ForgotPassword = () => {



    const [loader, setLoader] = useState(false);

    const [show, setShow] = useState(false)


    const [email, setEmail] = useState({
        email: ""
    })

    const handleChange = (event) => {
        setEmail({ ...email, [event.target.name]: event.target.value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        setLoader(true)

        api.post('/forgot-password', { email: email.email }).then((res) => {

            setLoader(false)
            toast.success(res.data.message)
            setShow(true)

        }).catch(({ response }) => {
            setLoader(false)
            toast.error(response.data.error)
        })
    }


    const openGmail = () => {
        // Check if the device is mobile
        window.location.href = 'https://mail.google.com';
    };

    return (
        <section className='w-screen bg-[#F5F7FF] h-screen flex mt-12 justify-center'>

            <div className=' flex shadow-md items-center justify-center flex-col w-[94%] md:w-[80%]  gap-2 md:gap-4 bg-white h-fit md:p-16 p-4  mt-20 rounded-2xl'>
                {loader && (
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                )}
                <div className="w-full text-2xl flex justify-between max-md:flex-col max-md:items-center max-md:gap-4">

                    <h1>Forgot password</h1>
                    <button onClick={handleSubmit} className="btn max-md:hidden">Get Link</button>
                </div>

                <div className='flex flex-col gap-4 mt-4 w-full'>
                    <label className='font-bold' htmlFor="email">Enter your email </label>
                    <input name='email' value={email.email} onChange={handleChange} id='email' type="text" className='input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]' />
                    <button onClick={handleSubmit} className="btn md:hidden mx-auto">Get Link</button>
                    {
                        show && <button className='btn mx-auto' onClick={openGmail}> <i class="fa-regular fa-envelope mr-2  "></i>Open Gmail</button>
                    }
                </div>

            </div>



        </section>
    )
}

export default ForgotPassword
