import { AxiosInstance } from "../../utils/AxiosInstance"

export const getTheaters = async () => {
   const URL = 'https://mba-3izp.onrender.com/mba/api/v1/theatres'
   try {
      const response = await AxiosInstance.get(URL)
      return response
   } catch (error) {
      return error
   }
}
export const getATheater = async (movieId) => {
   const URL = `https://mba-3izp.onrender.com/mba/api/v1/theatres/${movieId}`
   try {
      const response = await AxiosInstance.get(URL, {
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      })
      return response
   } catch (error) {
      return error
   }
}
export const removeTheater = async (theatres) => {
   const URL = `https://mba-3izp.onrender.com/mba/api/v1/theatres/${theatres._id}`
   try {
      const response = await AxiosInstance.delete(URL, {
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      })
      return response
   } catch (error) {
      return error
   }
}

export const updateTheater = async (theatreId, theatredata) => {
   const URL = `https://mba-3izp.onrender.com/mba/api/v1/theatres/${theatreId}`;
   try {
      const response = await AxiosInstance.put(URL, theatredata, {
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      })
      return response
   }
   catch (error) {
      return error
   }

}

export const createTheater = async (theatre) => {
   const URL = 'https://mba-3izp.onrender.com/mba/api/v1/theatres'
   try {
      const response = await AxiosInstance.post(URL, theatre,{
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      })
      return response
   } 
   catch (error) {
      return error
   }
}