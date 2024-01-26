
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

import getUser from '../../axios/getUserFromSession';


const HomeCards = () => {

    const navigate = useNavigate();
    const userinstorage = sessionStorage.getItem('user')


    const { userAuth, setUserAuth } = useContext(UserContext)
    useEffect(() => {

        const userFromStorage = JSON.parse(userinstorage);
       


        if (!userFromStorage || !userFromStorage._id) {
            navigate('/login');

        }

        checkSignIn()



    }, []);

    const checkSignIn = async () => {

        const data = await getUser()
        if(data == false){
            return navigate('/login')
        }
        
        if(data == false){
            return navigate('/login')
        }
        setUserAuth(data)
      

        if (userAuth && userAuth.token == null) {
            navigate("/login");
        }
    };



    return (
        <section className='bg-[#F5F7FF] w-full h-screen overflow-x-hidden'>

            <div className='row p-4 md:p-5 gap-2'>

                <div className='col-lg-4 lg:w-[32.8%] md:w-[49.8%]  rounded-lg col-md-6 col-sm-12 p-4 md:p-8 bg-white'>

                    <h2 className='mb-3 font-bold'>IBIS Entry Pass</h2>
                    <hr />
                    <div>
                        <ul className='mt-3 flex flex-col gap-1'>
                            <li className={(userAuth && userAuth.tasks.includes('cp')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/send-pass"}>Create Entry Pass</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('rp')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500"  to={"/view-all-pass"}>View Entry Pass</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('up')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/edit-pass"}>Edit Entry Pass</Link>
                            </li>
                            <li className={ (userAuth && userAuth.tasks.includes('vp')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/attendees"}>View Attendees</Link>
                            </li>
                        </ul>
                    </div>


                </div>
                <div className='col-lg-4 lg:w-[32.8%] md:w-[47%]  rounded-lg col-md-6 col-sm-12 p-4 md:p-8 bg-white '>

                    <h2 className='mb-3 font-bold'>User</h2>
                    <hr />
                    <div>
                        <ul className='mt-3 flex flex-col gap-1'>
                            <li className={(userAuth && userAuth.tasks.includes('cu')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={'/add-user'}>Create User</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('am')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/assign-task"}>Assign Micro Applications</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('uu')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/edit-user"}>Edit User</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('du')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/delete-user"}>Delete User</Link>
                            </li>

                        </ul>
                    </div>


                </div>
                <div className='col-lg-4 lg:w-[32.8%] md:w-[49.8%]  rounded-lg col-md-6 col-sm-12 p-4 md:p-8 bg-white'>

                    <h2 className='mb-3 font-bold'>Events</h2>
                    <hr />
                    <div>
                        <ul className='mt-3 flex flex-col gap-1'>
                            <li className={(userAuth && userAuth.tasks.includes('ce')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/create-event"}>Create Event</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('re')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/view-events"}>View Events</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('ue')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/edit-event"}>Edit Events</Link>
                            </li>
                            <li className={(userAuth && userAuth.tasks.includes('de')) ? " " : " hidden"}>
                                <Link className="hover:text-blue-500" to={"/delete-event"}>Delete Events</Link>
                            </li>
                        </ul>
                    </div>


                </div>

            </div>

        </section>
    )
}

export default HomeCards

