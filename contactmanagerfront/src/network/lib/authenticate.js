import { axiosClient } from "../apiClient";

export async function register(data){
    return await axiosClient.post('/register',JSON.stringify(data));
}

export async function login(data){
    return await axiosClient.post('/login', JSON.stringify(data));
}

export async function getContacts(id){
    return await axiosClient.get(`/contacts/${id}`);
}
export async function postContacts(data){
    return await axiosClient.post('/contacts', JSON.stringify(data));
}