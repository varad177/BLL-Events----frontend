

import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import api from '../../axios/axios';
import toast from 'react-hot-toast';
import getUser from '../../axios/getUserFromSession';
import { Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AnimationWrapper from '../Animation-wrapper/AnimationWrapper';

const EditUser = () => {
    const [expandedRows, setExpandedRows] = useState([]);
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });

    const toggleDetails = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };


    const { userAuth, setUserAuth } = useContext(UserContext);
    const [AllUser, setAllUsers] = useState("")
    const [load, setLoad] = useState(false)

    const navigate = useNavigate();


    useEffect(() => {
        checkSignIn();
        getAllUser()


    }, []);

    const checkSignIn = async () => {
        const data = await getUser();


        if (data == false) {
            return navigate('/login')
        }
        setUserAuth(data)



        if (userAuth && userAuth.token == null) {
            return navigate("/login");
        }
    };


    const getAllUser = () => {

        setLoad(true)
        api.get('/get-all-users', {
            headers: { "Authorization": `Bearer ${userAuth && userAuth.token}` }
        }).then((res) => {
            setAllUsers(res.data)
            setLoad(false)
            return toast.success("All Users")
        })
            .catch(({ response: { data } }) => {
                
                return toast.error(`Error Occured : ${data.message}`)
            })
    }

    return (
        <div className='w-[100vw] overflow-x-hidden '>
            <Navbar />
            <section className='w-[100vw] min-h-[100vh] h-auto bg-[#F4F5FE] '>
                {
                    load && <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                }

                <div className='w-[97%] rounded-lg bg-white mx-auto  '>


                    <AnimationWrapper>
                        <div className='w-full overflow-x-auto'>
                            <table className='w-full table-auto'>
                                <thead>
                                    <tr>
                                        <th className='px-4 py-2'>SR NO</th>
                                        <th className='px-4 py-2'>Full Name</th>
                                        {!isMobileScreen && <th className='px-4 py-2'>Email</th>}
                                        {!isMobileScreen && <th className='px-4 py-2'>Mobile No</th>}
                                        {!isMobileScreen && <th className='px-4 py-2'>Role</th>}
                                        {!isMobileScreen && <th className='px-4 py-2'>Assign Tasks</th>}
                                        {isMobileScreen && <th className='px-4 py-2'>Details</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllUser.length &&
                                        AllUser.map((user, i) => (
                                            <React.Fragment key={i}>
                                                <tr
                                                    className={`hover:bg-blue-200 transition-all duration-2000 ${isMobileScreen && expandedRows[i] ? 'border-b-2 border-blue-300' : ''
                                                        }`}
                                                >
                                                    <td className='border px-4 py-2'>{i + 1}</td>
                                                    <td className='border px-4 py-2'><AnimationWrapper>
                                                        {user.fullname}</AnimationWrapper></td>
                                                    {!isMobileScreen && <td className='border px-4 py-2'><AnimationWrapper>
                                                        {user.email}</AnimationWrapper></td>}
                                                    {!isMobileScreen && <td className='border px-4 py-2'><AnimationWrapper>
                                                        {user.mobno}</AnimationWrapper></td>}
                                                    {!isMobileScreen && <td className='border px-4 py-2'><AnimationWrapper>
                                                        {user.role}</AnimationWrapper></td>}
                                                    {!isMobileScreen && (
                                                        <td className='border px-4 py-2'>
                                                            <Link to={`/add-user/${user._id}`}>
                                                                <i className='fa-solid fa-pen text-red-600 text-center'></i>
                                                            </Link>

                                                        </td>
                                                    )}
                                                    {isMobileScreen && (
                                                        <td className='border px-4 py-2'>
                                                            <button onClick={() => toggleDetails(i)}>
                                                                <i className='fa-solid fa-circle-down text-xl text-blue-700 text-center'></i>
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                                {isMobileScreen && expandedRows[i] && (
                                                    <tr>
                                                        <td colSpan={5} className='border px-4 py-2'>

                                                            <AnimationWrapper>
                                                                Email: {user.email}, <br /> Mobile No: {user.mobno}, <br /> Role: {user.role},{' '} <br />
                                                                <Link className='' to={`/add-user/${user._id}`}>
                                                                    Assign Tasks  <i className='fa-solid fa-pen text-red-600 text-center pl-2'></i>
                                                                </Link>
                                                            </AnimationWrapper>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </AnimationWrapper>


                </div>

            </section>

        </div>
    )
}

export default EditUser
