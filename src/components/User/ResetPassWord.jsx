

import React, { useContext, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import api from '../../axios/axios'
import { UserContext } from '../../App'
import toast from 'react-hot-toast'
import AnimationWrapper from '../Animation-wrapper/AnimationWrapper'

const ResetPassWord = () => {

    let { userAuth } = useContext(UserContext)

    let [pass, setPass] = useState({
        currPass: "",
        newPass: "",
    })

    const handleChange = (event) => {
        setPass({ ...pass, [event.target.name]: event.target.value })



    }





    const handleSubmit = () => {
        if (!pass.currPass) {
            toast.error("Please fill in current password.");
            return;
        }
        if (!pass.newPass) {
            toast.error("Please fill in new password.");
            return;
        }

        const loading = toast.loading("Wait! Changing the password");

        api.post('/change-password', {
            currentPassword: pass.currPass,
            newPassword: pass.newPass
        }, {
            headers: {
                "Authorization": `Bearer ${userAuth && userAuth.token}`
            }
        })
            .then((res) => {
                toast.dismiss(loading);

                toast.success(res.data.message);
                setPass({
                    currPass: "",
                    newPass: "",
                })
            })
            .catch(({ response }) => {
                toast.dismiss(loading);

                toast.error(response.data.error)
            })


    };




    return (
        <div>
            <Navbar />
            <AnimationWrapper>

                <section className='w-full h-[100vh] bg-[#F5F7FF] p-8 -z-10 max-md:p-4'>
                    <div className='w-[96%] h-auto md:w-[80%] bg-white mx-auto rounded-md '>
                        <div className='flex flex-col items-center p-4  '>
                            <div className="w-full text-2xl flex justify-between max-md:flex-col max-md:items-center max-md:gap-4  ">
                                <h1>Reset Password</h1>
                                <button onClick={handleSubmit} className="btn max-md:hidden">submit</button>
                            </div>

                            <div className='p-8 flex items-center flex-col gap-8 max-md:w-full w-[50%] max-md:p-4'>

                                <input type="text" onChange={handleChange} value={pass.currPass} name='currPass' className='input-box w-full' placeholder='Enter Your Current Password' />
                                <input type="text" onChange={handleChange} value={pass.newPass} name='newPass' className='input-box w-full' placeholder='Enter Your New Password' />

                            </div>
                            <button onClick={handleSubmit} className="btn md:hidden mt-4">submit</button>
                        </div>
                    </div>




                </section>

            </AnimationWrapper>
        </div>
    )
}

export default ResetPassWord
