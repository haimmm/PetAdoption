import axios from "axios";

const baseUrl = "https://pet-adoption-backend.vercel.app"

const API = {
  //AUTH CALLS
  register: async userInfo => await axios.post(`${baseUrl}/auth/register`, userInfo),

  login: async loginInfo => await axios.post(`${baseUrl}/auth/login/`, loginInfo),

  refresh: async () => await axios.post(`${baseUrl}/auth/refresh`),

  //PET CALLS
  addPet: async petInfo => {
    const formData = new FormData();
    for (const key in petInfo){
      formData.append(key, petInfo[key]);
    }    
    await axios.post(`${baseUrl}/pet`, formData)
  },

  getPetById: async petId => await axios.get(`${baseUrl}/pet/${petId}`),

  getPetsByUserId: async userId => await axios.get(`${baseUrl}/pet/user/${userId}`),

  updatePet: async petInfo => await axios.put(`${baseUrl}/pet/${petInfo.id}`, petInfo),

  getPetsByQueries: async queries => {
    let urlParams = new URLSearchParams(queries).toString();
    if(urlParams) urlParams = '?' + urlParams;
    console.log(urlParams)
    return await axios.get(`${baseUrl}/pet${urlParams}`);
  },

  adopt: async (petId, status) => await axios.post(`${baseUrl}/pet/${petId}/adopt`, {status}),

  return: async petId => await axios.post(`${baseUrl}/pet/${petId}/return`),

  save: async petId => await axios.post(`${baseUrl}/pet/${petId}/save`),

  unsave: async petId => await axios.delete(`${baseUrl}/pet/${petId}/save`),

  //USER CALLS
  getUser: async id => await axios.get(`${baseUrl}/user/${id}`),

  getAllUsers: async () => await axios.get(`${baseUrl}/user`),

  updateUser: async (id, updates) => await axios.put(`${baseUrl}/user/${id}`, updates)

}

export default API;