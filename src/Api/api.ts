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

export const API_KEY_GOOGLE_MAP ='AIzaSyDvpz6xrsQaR4CFbdF-AQ_qFQeMbRXbWrU'

export enum ResultCodeEnum {
    Success = 200,
    Forbidden = 403,
    Unauthorized = 401
}

export enum ResultCodeTokenEnum {
    ValidationError = 422
}

export type ApiResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    status: RC
    statusText: string
}