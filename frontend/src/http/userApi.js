import {$authHost,$host} from './index'
import {jwtDecode} from "jwt-decode"

export const login = async (login,password) => {    
    const response = await $authHost.post('/auth/login',{login,password});
    //console.log('login response --- ',response);
    localStorage.setItem('token',response.data.token);
    return jwtDecode(response.data.token);
}

export const userRegistration = async (login,password,roleValue) => {
    const response = await $authHost.post('/auth/registration',{login,password,roleValue})
    return response.data;    
}

export const postPerson = async (postOject) => {
    console.log('POST OBJECT -----',postOject)
    const response = await $authHost.post('/persons', postOject);
    //console.log('postPerson response ---', response); // Для отладки
    return response.data;
};
 
export const removePerson = async (postObject) => {
    const response = await $authHost.post('/persons/person_remove',postObject)
    return response.data;
}

export const getUsersAPI = async () => {
    const response = await $authHost.get('/users');    
    return response;
}

export const getRolesAPI = async () => {
    const response = await $authHost.get('/roles')
    return response
}

export const searchPersonAPI = async (path) => {    
    const response = await $host.get('/persons/search/'+path);
    return response;
}

export const removeLinkPersonPhone = async (personId,phoneId) => {
    const response = await $authHost.post('/persons/person_phone_remove',{personId,phoneId})
    return response.data;
}

export const findPersonByPk = async (personId) => {
    console.log('API findPersonByPk personId',personId)
    const response = await $host.get('/persons/person_id?personId='+personId)
    return response.data;
}

export const updatePerson = async (updatedPerson) => {
    const response = await $authHost.put('/persons/update',updatedPerson)
    return response.data;
}

//await $host.put('/persons/update',{last_name,first_name,patronymic})
//const response = await $host.get('/persons/search/'+path);