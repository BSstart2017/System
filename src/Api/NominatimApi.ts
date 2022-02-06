import {instanceNominatim, ResultCodeEnum} from "./api";

const NominatimApi = {
    getReverseLngLat(lat:number, lon:number) {
        return instanceNominatim
            .get<GetReverseLngLatType>(`reverse?format=json&lat=${lat}&lon=${lon}`)
            .then((response) => response).catch(err => {
                switch (err.response.status) {
                    case ResultCodeEnum.Unauthorized:
                        throw new Error(`${err.response}`)
                    case ResultCodeEnum.Forbidden:
                        throw new Error(`${err.response}`)
                    case ResultCodeEnum.NotFoundError:
                        throw new Error(`${err.response}`)
                    default :
                        return err.response
                }
            })
    }
}

export default NominatimApi

type GetReverseLngLatType = {
    address: ReverseAddressType
    boundingbox: Array<string>
    display_name: string
    lat: string
    licence: string
    lon: string
    osm_id: number
    osm_type: string
    place_id: number
}



type ReverseAddressType = {
    building: string
    country: string
    country_code: string
    county: string
    hamlet: string
    neighbourhood: string
    postcode: string
    road: string
    state: string
    town: string
}