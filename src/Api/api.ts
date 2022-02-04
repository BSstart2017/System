import axios from "axios";


export const instanceCargoSpeed = (token:string | null = null) => {
    return axios.create({
        withCredentials: true,
        baseURL: `https://api.demo.cargo-speed.pl/`,
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const API_KEY ='AIzaSyDvpz6xrsQaR4CFbdF-AQ_qFQeMbRXbWrU'
//todo: .env API_KEY_GOOGLE_MAP

export enum ResultCodeEnum {
    Success = 200,
    Forbidden = 403,
    Unauthorized = 401,
    ValidationError = 422,
    NotFoundError = 404,
}