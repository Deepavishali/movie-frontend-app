import { AxiosInstance } from "../../../common/utils/AxiosInstance"

export const getAllMovies = async () => {
   const URL = 'https://mba-3izp.onrender.com/mba/api/v1/movies'
   try {
      const response = await AxiosInstance.get(URL)
      return response
   }
   catch (error) {
      return error.response
   }
}
