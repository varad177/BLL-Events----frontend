import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../axios/axios";
import getUser from "../../axios/getUserFromSession";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AnimationWrapper from "../Animation-wrapper/AnimationWrapper";


const SendPassForm = () => {

    const [events, setEvents] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");

    const [passUser, setPasspassUser] = useState({
        fname: "",
        lname: "",
        mobno: "",
        email: "",
        category: "",
        event: ""
    })

    const { userAuth, setUserAuth } = useContext(UserContext);

    const navigate = useNavigate();
    const { userId } = useParams()

    useEffect(() => {

        if (userId) {
            api.post('/get-passUser-by-id', { userId })
                .then((res => {
                    if (res.status == 200) {
                        setPasspassUser(res.data)
                        setSelectedCategory(res.data.category);
                        toast.success("ready to edit")
                    }
                })).catch(err => {
                    toast.error("some is wrong , pleased try later")
                })
        }
        checkSignIn();

        getAllEvents()



    }, []);


    const handleSelectChange = (e) => {
        setPasspassUser({ ...passUser, event: e.target.value });
    }


    const getAllEvents = () => {
        api.get('/get-all-events').then((res) => {

            const loading2 = toast.loading('fetching the events')

            if (res.status === 200) {
                setEvents(res.data)
                toast.dismiss(loading2)
                toast.success("ready to fill the form")

            }
        })
    }


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


    const handleChange = (e) => {
        setPasspassUser({ ...passUser, [e.target.name]: e.target.value })



    }

    const handleRoleChange = (e) => {
        setPasspassUser({ ...passUser, category: e.target.value });
    }

    const handleSubmit = () => {



        if (!passUser.fname) {
            return toast.error("please provide the first name")
        }

        if (!passUser.lname) {
            return toast.error("Please provide the last name");
        }

        if (!passUser.email) {
            return toast.error("Please provide an email address");
        }
        if (!passUser.mobno) {
            return toast.error("Please provide a mobile number");
        }
        if (!passUser.category) {
            return toast.error("Please provide category");
        }
        if (!passUser.event) {
            return toast.error("Please select the Event");
        }

        const loading = toast.loading("wait!! sending the Entry Pass")


        api.post('/send-pass', { passUser, id: userId }, {
            headers: {
                "Authorization": `Bearer ${userAuth.token}`
            }
        }).then((res => {
            if (res.status == 200) {
                toast.dismiss(loading)
                setPasspassUser({
                    fname: "",
                    lname: "",
                    mobno: "",
                    email: "",


                })
                return toast.success(res.data.message)
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
                <section className="w-[100%] flex justify-center h-screen bg-[#F5F7FF] ">
                    <div className=" flex shadow-md items-center justify-center flex-col w-[94%] md:w-[80%]  gap-2 md:gap-4 bg-white h-fit md:p-16 p-8 mt-20 rounded-2xl">

                        <div className="w-full text-2xl flex justify-between max-md:flex-col max-md:items-center max-md:gap-4">
                            <h1>Add Entry Pass</h1>
                            <button onClick={handleSubmit} className="btn">Save And Send</button>
                        </div>

                        <div className="mt-4 w-full md:w-[60%] shadow-md">

                            <Box sx={{ minWidth: '100%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select The Event</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        label="select the event"
                                        onChange={handleSelectChange}
                                    >

                                        {
                                            events && events.map((item, i) => {
                                                return <MenuItem value={item._id}>{item.heading}</MenuItem>
                                            })
                                        }


                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <div className="row w-full gap-2">
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={passUser.fname} type="text" name="fname" placeholder="Enter The first name" />
                            <input onChange={handleChange} className="input-box  shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={passUser.lname} type="text" name="lname" placeholder="Enter The last name" />
                        </div>


                        <div className="row w-full gap-2">
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%] bg-transparent" value={passUser.email} type="email" name="email" placeholder="Enter the email" />
                            <input onChange={handleChange} className="input-box shadow-md col-md-6 col-sm-12 w-full  md:w-[47%]" value={passUser.mobno} type="number" name="mobno" placeholder="Enter The Mobile Number" />
                        </div>




                        <div className="flex gap-4 mt-4 max-md:flex-col ">
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="a"   className="input-box" class="form-check-input shadow-md" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    IBIS Participant
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="b"    className="input-box"
                                    class="form-check-input shadow-md" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label className="form-check-label" for="flexRadioDefault2">

                                    Brand
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="c"   className="input-box"
                                    class="form-check-input shadow-md" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                <label className="form-check-label" for="flexRadioDefault3">

                                    Attendies
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRoleChange}
                                    value="d"   className="input-box"
                                    class="form-check-input shadow-md" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                <label className="form-check-label" for="flexRadioDefault4">

                                    Event Crew
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    );
};

export default SendPassForm;
