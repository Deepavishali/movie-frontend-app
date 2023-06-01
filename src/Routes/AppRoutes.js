import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/authentication/Login/Login'
import Signup from '../pages/authentication/Signup/Signup'
import LandingPage from '../pages/LandingPage/LandingPage'
import MovieDetails from '../pages/MovieDetails/MovieDetails'
import MovieTheater from '../pages/MovieTheater/MovieTheater'
import SelectSeats from '../pages/selectseats/SelectSeats'
import AddMovie from '../pages/Admin/AddMovie'
import AddTheatre from '../pages/Admin/AddTheatre'

const AppRoutes = () => {
  return (
      <>
         <ToastContainer />
         <Router>
            <Routes>
               <Route path='/' element={<LandingPage />} />
               <Route path='/login' element={<Login />} />
               <Route path='/signup' element={<Signup />} />
               <Route path='/admin' element={<Admin />} />
               <Route path='/addmovie' element={<AddMovie />} />
               <Route path='/addtheatre' element={<AddTheatre />} />
               <Route path='/movie/:id/details' element={<MovieDetails />} />
               <Route path='/buytickets/:movieName/:movieId' element={<MovieTheater />} />
               <Route path='/buytickets/:movieId/:theaterId/selectseats' element={<SelectSeats />} />
            </Routes>
         </Router>
      </>


   )
}

export default AppRoutes