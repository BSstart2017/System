import axios from "axios";

const defaultRequestsOSRM = 'route/v1/car/'

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

export const instanceOSRM = axios.create({
        baseURL: `https://router.project-osrm.org/${defaultRequestsOSRM}`
})

export const instanceNominatim = axios.create({
    baseURL: `https://nominatim.openstreetmap.org/`
})

export enum ResultCodeEnum {
    Success = 200,
    Forbidden = 403,
    Unauthorized = 401,
    ValidationError = 422,
    NotFoundError = 404,
}