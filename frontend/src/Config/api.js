import axios from "axios";
import {tokenKey} from "../Utils/Storage";

export const authToken = localStorage.getItem(tokenKey)
const API_URL=process.env.REACT_APP_API_URL

export const API_ENDPOINT = {
    auth: {
        login: "/v1/login",
        profile: "/v1/auth/profile",
        logout: "/v1/auth/logout"
    },
    jobs: {
        list: "/v1/jobs/list",
        detail: "/v1/jobs/detail"
    }
}

export const API_INSTANCE = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
    }
});
