// ... (other imports and code)

import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../axios/axios";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools";
import { useParams } from "react-router-dom";
import EventContent from "./EventContent";

const CreateEvents = () => {

    let { passId } = useParams();

    const [previewImage, setImagePreview] = useState("");
    let [pass, setPass] = useState({
        avatar: "",
        heading: "",
        address: "",
        location: "",
        time: "",
        details: "",
        mobno1: "",
        mobno2: "",
        editor: "",
    });

    const [editorInstance, setEditorInstance] = useState(null);
    const [editorData, setEditorDate] = useState(null);

    useEffect(() => {

        if (passId) {
            api.post('/get-pass-by-passId', { passId }).then((res) => {
                setPass(res.data);
                setEditorDate(JSON.parse(res.data.editor[0]))
            })
                .catch(err => {
                    console.log(err.message);
                })
        }

        // Create EditorJS instance
        const instance = new EditorJS({
            holderId: "text-Editor",
            data: Array.isArray(pass.editor) ? pass.editor[0] : pass.editor,
            tools: tools,
            placeholder: "Write Anything You want",
            onChange: () => handleEditorChange(instance),
        });



        // Save the instance in state
        setEditorInstance(instance);

        // Cleanup the editor instance when the component is unmounted
        return () => {
            instance.destroy();
        };
    }, []);

    const handleEditorChange = async (instance) => {
        // Get the current content from the editor
        const editorData = await instance.save();

        // Update the state with the editor content
        setPass((prevPass) => ({
            ...prevPass,
            editor: editorData,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pass.avatar) {
            return toast.error("Please upload the logo");
        }

        if (!pass.heading) {
            return toast.error("Please enter the heading");
        }

        // Add validations for other fields...

        const loading = toast.loading("Wait! Creating the pass");

        try {
            const formData = new FormData();
            formData.append("avatar", pass.avatar);
            formData.append("heading", pass.heading);
            formData.append("address", pass.address);
            formData.append("location", pass.location);
            formData.append("time", pass.time);
            formData.append("details", pass.details);
            formData.append("mobno1", pass.mobno1);
            formData.append("mobno2", pass.mobno2);
            formData.append("editor", JSON.stringify(pass.editor.blocks))
            formData.append("date", pass.date);
            passId && formData.append('passId' , passId)

            


            const response = await api.post('/create-pass', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.dismiss(loading);
            toast.success(response.data.message);
            setPass({
                avatar: "",
                heading: "",
                address: "",
                location: "",
                time: "",
                details: "",
                mobno1: "",
                mobno2: "",
                editor: "",
                date: ""
            })
        } catch (error) {
            toast.dismiss(loading);
            toast.error("An error occurred while creating the pass");
        }
    };

    const handleChange = (e) => {
        setPass({ ...pass, [e.target.name]: e.target.value });
    };

    const getImage = (event) => {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        // if image exists then getting the url link of it
        if (uploadedImage) {
            setPass({
                ...pass,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setImagePreview(this.result);
            });
        }
    };

    return (
        <>
            <Navbar />

            <section className="w-full overflow-x-hidden min-h-[100vh] h-auto md:p-20 p-10 ">
                <form>
                    <div className="row">
                        <div className="w-full text-2xl flex items-center justify-between mb-8">
                            <h1>Add User</h1>
                            <button onClick={handleSubmit} className="btn">
                                Save
                            </button>
                        </div>

                        <div className="col-md-6 space-y-4">
                            <div className="relative w-[96%] mx-auto h-64 flex items-center justify-center bg-white border-grey border-4 hover:opacity-80 overflow-hidden">
                                <label htmlFor="upload_banner">
                                    {
                                        previewImage ? <img
                                            className="z-20 w-full h-full object-contain"
                                            src={previewImage}
                                            alt=""
                                        /> : pass.logourl ? <img
                                            className="z-20 w-full h-full object-contain"
                                            src={pass.logourl}
                                            alt=""
                                        /> : <h1>TAP TO UPLOAD THE LOGO</h1>
                                    }
                                </label>
                            </div>
                            <input
                                onChange={getImage}
                                type="file"
                                id="upload_banner"
                                accept=".jpeg, .png , .jpg"
                                hidden
                            />

                            <input
                                onChange={handleChange}
                                name="heading"
                                type="text"
                                value={pass.heading}
                                className="input-box w-full"
                                placeholder="Enter The Event Heading"
                            />

                            <textarea
                                onChange={handleChange}
                                name="address"
                                value={pass.address}
                                className="input-box w-full resize-none h-64"
                                placeholder="Enter The Event Address"
                            ></textarea>
                        </div>
                        <div className="col-md-6 space-y-4">
                            <div>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="location"
                                    value={pass.location}
                                    className="input-box w-full"
                                    placeholder="Enter The Google Map Location URL"
                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChange}
                                    type="date"
                                    name="date"
                                    value={pass.date}
                                    className="input-box w-full"
                                    placeholder="Enter The Google Map Location URL"
                                />
                            </div>
                            <input
                                onChange={handleChange}
                                name="time"
                                value={pass.time}
                                type="text"
                                className="input-box w-full"
                                placeholder="Enter The Entry Time"
                            />
                            <input
                                onChange={handleChange}
                                name="details"
                                value={pass.details}
                                type="text"
                                className="input-box w-full "
                                placeholder="Enter The Event Details URL"
                            />
                            <input
                                onChange={handleChange}
                                name="mobno1"
                                value={pass.mobno1}
                                type="number"
                                className="input-box w-full "
                                placeholder="Enter The Mobile Number 1"
                            />
                            <input
                                onChange={handleChange}
                                name="mobno2"
                                value={pass.mobno2}
                                type="number"
                                className="input-box w-full "
                                placeholder="Enter The Mobile Number 2"
                            />
                        </div>
                    </div>
                </form>

                <div>
                    <h1 className="md:text-3xl text-xl  text-gray-700 font-bold mt-8 text-center mx-auto">Write Tips And General Instruction And AnyThing You Want By Code Editor Placed Below </h1>
                </div>

                <div id="text-Editor" className="mt-8 border"></div>

                <div className='my-12 font-gelasio blog-page-content'>
                    {

                        editorData != null && editorData.map((block, i) => {
                            return <div key={i} className='my-4 md:my-8 '>
                                <EventContent block={block} />

                            </div>
                        })
                    }


                </div>


            </section>
        </>
    );
};

export default CreateEvents;
