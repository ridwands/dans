import {API_ENDPOINT, API_INSTANCE} from "../Config/api";

export const LoginPost = async (data)=>{
    const res=await API_INSTANCE.post(API_ENDPOINT.auth.login,data)
    return res.data
}

export const GetProfile = async ()=>{
    const res=await API_INSTANCE.get(API_ENDPOINT.auth.profile)
    return res.data
}

export const LogoutPost = async ()=>{
    const res=await API_INSTANCE.post(API_ENDPOINT.auth.logout)
    return res.data
}