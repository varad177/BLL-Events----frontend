import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../axios/axios";
import AnimationWrapper from "../Animation-wrapper/AnimationWrapper";
import { Box, LinearProgress } from "@mui/material";

const AddUser = () => {

    const { userId } = useParams()
    const [role, setRole] = useState()
    const [urlId, setUerId] = useState(null)

    const [user, setUser] = useState({
        fullname: "",
        mobno: "",
        email: "",
        password: "",
        role: ""
    })

    const { userAuth, setUserAuth } = useContext(UserContext);

    const navigate = useNavigate();
    const [load, setLoad] = useState(false)

    useEffect(() => {

        if (userId) {
            setUerId(userId)
            setLoad(true)
            api.post('/get-user', {
                _id: userId
            })
                .then((res) => {
                    setUser(res.data)
                    setRole(res.data.role)
                    setLoad(false)
                }).catch(err => {
                    toast.error("something is wrong")
                })
        }
        checkSignIn();
    }, []);

    const checkSignIn = () => {
        if (userAuth && userAuth.token == null) {
            navigate("/login");
        }
    };


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })



    }

    const handleRoleChange = (e) => {
        setUser({ ...user, role: e.target.value });
    }

    const handleSubmit = () => {

        if (!user.fullname) {
            return toast.error("please provide the fullname")
        }

        if (!user.password) {
            return toast.error("Please enter password");
        }

        if (!user.email) {
            return toast.error("Please provide an email address");
        }
        if (!user.mobno) {
            return toast.error("Please provide a mobile number");
        }

       

        const loading = toast.loading(urlId !== null ? "updating the user" : "adding user")

        api.post('/add-user', { user, _id: userId }, {
            headers: {
                "Authorization": `Bearer ${userAuth.token}`
            }
        }).then((res => {
            if (res.status == 200) {
                toast.dismiss(loading)
                return toast.success(urlId !== null ? "user updated successfully" : "User Added Successfully")
            }
        }))
            .catch(({ response: { data } }) => {
                toast.dismiss(loading)
                return toast.error(data.error)
            })
    }

    return (
        <>
            <Navbar />
            <AnimationWrapper>
                {
                    load && <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                }
                <section className="w-full flex justify-center h-screen bg-[#F5F7FF] ">
                    <div className=" flex shadow-md items-center justify-center flex-col w-[94%] md:w-[80%]  gap-2 md:gap-4 bg-white h-fit md:p-16 p-8 mt-20 rounded-2xl">

                        <div className="w-full text-2xl flex justify-between max-md:flex-col max-md:items-center max-md:gap-4 ">
                            <h1>Add User</h1>
                            <button onClick={handleSubmit} className="btn">Save User</button>
                        </div>
                        <div className="row w-full gap-2">
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={user.fullname} type="text" name="fullname" placeholder="Enter The fullname" />
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={user.mobno} type="text" name="mobno" placeholder="Enter The Mobile Number" />
                        </div>


                        <div className="row w-full gap-2">
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%] bg-transparent" value={user.email} type="email" name="email" placeholder="Enter the email" />
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={user.password} type="password" name="password" placeholder="Enter The Password" />
                        </div>


                        <div className="flex gap-4 mt-4 ">
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="ADMIN" className="input-box" class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="USER" className="input-box"
                                    class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label className="form-check-label" for="flexRadioDefault2">

                                    User
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default AddUser;
