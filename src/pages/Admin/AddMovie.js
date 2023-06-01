import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./AddMovie.css";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../../common/apis/Movies"; 

const AddMovie = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [casts, setCasts] = useState("");
    const [director, setDirector] = useState("");
    const [trailerUrl, setTrailerUrl] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [language, setLanguage] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const redirectUrl = () => {
        navigate("/addmovie");
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            redirectUrl();
        }
       
    });
    
    const movieDataChangeHandler = (e) => {
        const name = e.target.name;
        if (name === "name") {
            setName(e.target.value);
        } else if (name === "description") {
            setDescription(e.target.value);
        } else if (name === "casts") {
            setCasts(e.target.value);
        } else if (name === "director") {
            setDirector(e.target.value);
        } else if (name === "trailerUrl") {
            setTrailerUrl(e.target.value);
        } else if (name === "posterUrl") {
            setPosterUrl(e.target.value);
        } else if (name === "language") {
            setLanguage(e.target.value);
        } else if (name === "releaseDate") {
            setReleaseDate(e.target.value);
        }
        setErrorMessage("");
    };
    

    const MovieHandler = async (e) => {
        e.preventDefault();
        const data = { name, description, casts, director, trailerUrl, posterUrl, language, releaseDate };

        const response = await createMovie(data);
        if (response.status === 201) {
            toast.success(' Movie Added Successfull...!', {
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
                        <h2>Add Movie</h2>

                        <form onSubmit={MovieHandler}>
                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='name'
                                    placeholder='Name'
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Name *</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='description'
                                    placeholder='description *'
                                    required
                                    value={description}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Description*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='casts'
                                    placeholder='casts *'
                                    required
                                    value={casts}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Casts*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='director'
                                    placeholder='director *'
                                    required
                                    value={director}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Director*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='trailerUrl'
                                    placeholder='trailerUrl *'
                                    required
                                    value={trailerUrl}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>TrailerUrl*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='posterUrl'
                                    placeholder='posterUrl *'
                                    required
                                    value={posterUrl}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Poster Url*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='language'
                                    placeholder='language *'
                                    required
                                    value={language}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Language*</label>
                            </div>

                            <div className='form_group'>
                                <input
                                    type='text'
                                    className='form_control'
                                    name='releaseDate'
                                    placeholder='releaseDate *'
                                    required
                                    value={releaseDate}
                                    onChange={movieDataChangeHandler}
                                />
                                <label className='form_label'>Release Date*</label>
                            </div>

                            <div className='validate-msg'>{errorMessage}</div>
                            <div className='signup_btn'>
                                <input
                                    type='submit'
                                    value='Add Movie'
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

export default AddMovie;
