import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./AddTheatre.css";
import { useNavigate } from "react-router-dom";
import { createTheater } from "../../common/apis/Theaters/Index";

const AddTheatre = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [description, setDescription] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const redirectUrl = () => {
        navigate("/addtheatre");
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            redirectUrl();
        }
        
    });
   
    const theatreDataChangeHandler = (e) => {
        const name = e.target.name;
        if (name === "name") {
            setName(e.target.value);
        } else if (name === "city") {
            setCity(e.target.value);
        } else if (name === "description") {
            setDescription(e.target.value);
        } else if (name === "pinCode") {
            setPinCode(e.target.value);
        }
        setErrorMessage("");
    };
    
    const TheatreHandler = async (e) => {
        e.preventDefault();
        const data = { name, city, description, pinCode };

        const response = await createTheater(data);
        if (response.status === 201) {
            toast.success(' Theatre Added Successfull...!', {
                position: toast.POSITION.TOP_RIGHT
            });
            navigate("/admin")
        } else {
            setErrorMessage(response.response.data.message);
        }
    };

    return (
        <div>
            <div className='signup_body'>
                <div className='signup_wrapper'>
                    <div className='signup_form_group'>
                        <h2>Add Theatre</h2>

                        <form onSubmit={TheatreHandler}>
                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='name'
                                    placeholder='Name'
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={theatreDataChangeHandler}
                                />
                                <label className='form_label'>Name *</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='city'
                                    placeholder='City *'
                                    required
                                    value={city}
                                    onChange={theatreDataChangeHandler}
                                />
                                <label className='form_label'>City *</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='description'
                                    placeholder='description *'
                                    required
                                    value={description}
                                    onChange={theatreDataChangeHandler}
                                />
                                <label className='form_label'>Description*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='pinCode'
                                    placeholder='pinCode *'
                                    required
                                    value={pinCode}
                                    onChange={theatreDataChangeHandler}
                                />
                                <label className='form_label'>PinCode *</label>
                            </div>
                            
                            <div className='validate-msg'>{errorMessage}</div>
                            <div className='signup_btn'>
                                <input
                                    type='submit'
                                    value='Add Theatre'
                                    className='submit_btn'
                                />
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTheatre;
