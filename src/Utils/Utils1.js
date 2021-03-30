import axios from 'axios'

const getdata = (url) =>{
    return axios.get(url);
}

const addUser = (url,obj) =>{
    return axios.post(url,obj);
}

const updateUser = (url,obj) =>{
    return axios.put(url,obj);
}

const deleteUser =  (url,id) =>{
    return  axios.delete(url,id);
}



export default { getdata, addUser, updateUser, deleteUser, }