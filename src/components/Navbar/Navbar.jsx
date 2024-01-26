
import React, { useContext, useState } from 'react'
import logo from '../../assets/bll-logo-black.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const Navbar = () => {

    const navigate = useNavigate()

    const { setUserAuth, userAuth } = useContext(UserContext)

    const [showSlider, setShowSlider] = useState(false)
    const [showRightSlider, setshowRightSlider] = useState(false)

    const handleBar = () => {
        setShowSlider(preval => !preval)

    }
    const closedhandleBar = () => {
        setShowSlider(false)
        console.log(showSlider);
    }
    const handleRightBar = () => {
        setshowRightSlider(preval => !preval)

    }
    const closedRighthandleBar = () => {
        setshowRightSlider(false)
        console.log(showSlider);
    }


    const handleSignOut = () => {
        sessionStorage.clear();
        setUserAuth({ 'token': null })
        console.log(userAuth);

         navigate('/login')





    }




    return (
        <nav className=' h-20 max-w-[100vw] flex justify-between py-4 overflow-x-hidden px-3 border border-gray-700 relative'>

            <div className={'fixed h-screen w-[24rem] max-sm:w-screen  border top-0 left-0 duration-500 z-10 bg-white ' + (showSlider ? ' translate-x-[0]' : ' -translate-x-[100%]')}>
                <i onClick={closedhandleBar} className="fa-solid fa-circle-xmark absolute top-8 right-8 opacity-60 border border-gray-500 rounded-full p-2 "></i>

                <div className='w-full h-full mt-16'>
                    <ul className='flex flex-col '>
                        <li className='py-2 px-8 hover:bg-gray-200 hover:text-pink-600'><Link to={""}>home</Link></li>
                        <li className='py-2 px-8 hover:bg-gray-200 hover:text-pink-600'><Link to={""}>about</Link></li>
                        <li className='py-2 px-8 hover:bg-gray-200 hover:text-pink-600'><Link to={""}>contact</Link></li>
                        <li className='py-2 px-8 hover:bg-gray-200 hover:text-pink-600'><Link to={""}>more</Link></li>
                    </ul>
                </div>

            </div>
            <div className={' fixed p-3  h-screen border top-0 duration-500 z-40 bg-white ' + (showRightSlider ? ' w-[24rem] max-sm:w-screen right-0' : ' w-0 right-[-25rem]')}>
                <i onClick={closedRighthandleBar} className="fa-solid fa-circle-xmark absolute top-8 right-8 opacity-60 border border-gray-500 rounded-full p-2 "></i>

                <div className='w-full h-full mt-4'>
                    <h2 className='text-2xl font-bold'>User Profile</h2>
                    <div className='flex w-full items-center mt-4 '>
                        <div className='w-28 h-28 mx-3 bg-gray-100 relative rounded-lg'>
                            <div className='w-3 h-3 bg-green-500 rounded-full absolute -right-1 -top-1 '>

                            </div>

                        </div>

                        <div className='flex flex-col gap-2 '>
                            <h2 className='text-xl text-gray-600 '>Admin</h2>
                            <i class="fa-solid fa-envelope text-xl text-[#346BAE]"></i>

                            <button onClick={handleSignOut} className='text-[16px] w-fit font-bold text-[#F75D6D] bg-[#FFE2E5] rounded-xl py-1 px-3'>

                                Sign out
                            </button>


                        </div>

                    </div>
                    <hr className='border mt-4 w-full' />

                    <div className='flex items-center py-4'>
                        <div className='h-8 w-8 bg-gray-100 flex items-center justify-center  rounded-lg '>
                            <i className="fa-solid fa-lock text-[#1BC5BD] text-[16px]"></i>


                        </div>
                        <div className='flex flex-col px-3 cursor-pointer' onClick={()=>navigate('/reset-password')}>
                            <p className='font-bold text-[17px]'>security</p>
                            <p className='text-gray-300 text-[17px] font-bold'>password reset</p>
                        </div>
                    </div>
                    <hr className='border w-full' />

                </div>



            </div>



            <div className='flex items-center'>



                <svg onClick={handleBar} className='max-md:hidden mr-5 h-8 w-8' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">

                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

                        <rect x="0" y="0" width="24" height="24"></rect>

                        <rect fill="#000000" opacity="0.3" x="4" y="5" width="16" height="2" rx="1"></rect>

                        <rect fill="#000000" opacity="0.3" x="4" y="13" width="16" height="2" rx="1"></rect>

                        <path d="M5,9 L13,9 C13.5522847,9 14,9.44771525 14,10 C14,10.5522847 13.5522847,11 13,11 L5,11 C4.44771525,11 4,10.5522847 4,10 C4,9.44771525 4.44771525,9 5,9 Z M5,17 L13,17 C13.5522847,17 14,17.4477153 14,18 C14,18.5522847 13.5522847,19 13,19 L5,19 C4.44771525,19 4,18.5522847 4,18 C4,17.4477153 4.44771525,17 5,17 Z" fill="#000000"></path>

                    </g>

                </svg>
                <img src={logo} className='img-fluid object-contain w-48 ml-4 max-sm:ml-2  max-sm:w-36' alt="loading" />
            </div>
            <div className='flex items-center'>
                <i onClick={handleBar} className="fa-solid fa-bars-staggered text-2xl mr-4  md:hidden"></i>
                <div className=" w-8 h-6 rounded-lg text-sm font-bold bg-orange-600 flex items-center justify-center text-white p-3 mr-4 max-md:hidden">3</div>

                <svg onClick={handleRightBar} className='mr-4 max-sm:mr-0 opacity-40' xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">

                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">

                        <polygon points="0 0 24 0 24 24 0 24"></polygon>

                        <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>

                        <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fill-rule="nonzero"></path>

                    </g>

                </svg>

            </div>





        </nav >
    )
}

export default Navbar
