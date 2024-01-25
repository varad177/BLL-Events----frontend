
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../../App';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axios/axios';
import AnimationWrapper from '../Animation-wrapper/AnimationWrapper';

const TaskAssignForm = () => {
    const { userAuth, setUserAuth } = useContext(UserContext)

    const [user, setUser] = useState("")
    const [selectedValues, setSelectedValues] = useState([""]);



    const { id } = useParams()
    useEffect(() => {
        api.post('/get-user', {
            _id: id
        }).then((res) => {
            setSelectedValues(res.data.tasks);

        }).catch(err => {
            console.log(err.message);
        })

    }, [])




    const handleChange = (event) => {
        const value = event.target.value;

        // Check if the checkbox is checked or unchecked
        if (event.target.checked) {
            // Add the value to the array if checked
            setSelectedValues((prevValues) => [...prevValues, value]);
        } else {
            // Remove the value from the array if unchecked
            setSelectedValues((prevValues) => prevValues.filter((item) => item !== value));
        }
    };

    const navigate = useNavigate()

    const handleSubmit = () => {

        if (!selectedValues.length) {
            return toast.error("no tasks are selected ")
        }

        const loading = toast.loading("wait adding the tasks")


        api.post('/add-task', {
            _id: id,
            tasks: selectedValues
        },
            { headers: { 'Authorization': `Bearer ${userAuth && userAuth.token}` } })
            .then((res) => {
                if (res.status == 200) {
                    toast.dismiss(loading)
                    toast.success(res.data.message)
                    return navigate('/')
                }
            })
            .catch(({ response: { data } }) => {
                return toast.error(data.error)
            })
    }

    const isTaskSelected = (value) => {
        return selectedValues.includes(value);
    };
    return (
        <>
            <Navbar />

            <AnimationWrapper>
                <section className='w-screen h-[100vh] bg-[#F5F7FF] p-8 -z-10 max-md:p-4'>

                    <div className='w-[96%] h-auto md:w-[80%] bg-white mx-auto rounded-md '>
                        <div className='flex flex-col items-center p-4  '>
                            <div className="w-full text-2xl flex justify-between max-md:flex-col max-md:items-center max-md:gap-4 ">
                                <h1>Assign Task</h1>
                                <button onClick={handleSubmit} className="btn">Save & Submit</button>
                            </div>
                            <h3 className='text-center text-xl font-bold max-md:mt-4'>IBIS Entry Pass</h3>

                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('cp')} onChange={handleChange} type="checkbox" value="cp" id="defaultCheck1" />
                                <label className="form-check-label" for="defaultCheck1">
                                    Create Entry Pass
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('rp')} onChange={handleChange} type="checkbox" value="rp" id="defaultCheck2" />
                                <label className="form-check-label" for="defaultCheck2">
                                    View Entry Pass
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('up')} onChange={handleChange} type="checkbox" value="up" id="defaultCheck3" />
                                <label className="form-check-label" for="defaultCheck3">
                                    Edit Entry Pass
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('vp')} onChange={handleChange} type="checkbox" value="vp" id="defaultCheck4" />
                                <label className="form-check-label" for="defaultCheck4">
                                    View Attendees
                                </label>
                            </div>
                        </div>

                        <div className='flex flex-col items-center p-4  '>
                            <h3 className='text-center text-xl font-bold'>Add User
                            </h3>

                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('cu')} onChange={handleChange} type="checkbox" value="cu" id="defaultCheck5" />
                                <label className="form-check-label" for="defaultCheck5">
                                    Create User
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('am')} onChange={handleChange} type="checkbox" value="am" id="defaultCheck6" />
                                <label className="form-check-label" for="defaultCheck6">
                                    Assign Micro Applications
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('uu')} onChange={handleChange} type="checkbox" value="uu" id="defaultCheck7" />
                                <label className="form-check-label" for="defaultCheck7">
                                    Edit User
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('du')} onChange={handleChange} type="checkbox" value="du" id="defaultCheck8" />
                                <label className="form-check-label" for="defaultCheck8">
                                    Delete User
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col items-center p-4  '>
                            <h3 className='text-center text-xl font-bold'>Add Events
                            </h3>

                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('ce')} onChange={handleChange} type="checkbox" value="ce" id="defaultCheck9" />
                                <label className="form-check-label" for="defaultCheck9">
                                    Create Event
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('re')} onChange={handleChange} type="checkbox" value="re" id="defaultCheck10" />
                                <label className="form-check-label" for="defaultCheck10">
                                    View Events
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('ue')} onChange={handleChange} type="checkbox" value="ue" id="defaultCheck11" />
                                <label className="form-check-label" for="defaultCheck11">
                                    Edit Events
                                </label>
                            </div>
                            <div className='w-full flex gap-4'>
                                <input className="form-check-input" checked={isTaskSelected('de')} onChange={handleChange} type="checkbox" value="de" id="defaultCheck12" />
                                <label className="form-check-label" for="defaultCheck12">
                                    Delete Events
                                </label>
                            </div>
                        </div>

                    </div>

                </section>
            </AnimationWrapper>

        </>
    )
}

export default TaskAssignForm
