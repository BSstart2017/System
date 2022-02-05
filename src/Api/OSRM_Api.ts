import { instanceOSRM, ResultCodeEnum} from "./api";
import {SourceOrderType} from "./CargoSpeedApi";


const OSRMApi = {
    getFindTheShortestPath(coordinates : CoordinatesPathType) {
        const coordinatesResult = Object.values(coordinates).map(e=>Object.values(e).reverse()).join(';')
        return instanceOSRM
            .get<FindShortestPathType>(`${coordinatesResult}?steps=true`)
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

export default OSRMApi;

export type FindShortestPathType = {
    code: string
    waypoints: Array<WaypointsType>
    routes: Array<RoutesType>
}

export type CoordinatesPathType = {
    taxiGeo: SourceOrderType
    clientSource: SourceOrderType
    clientDestination: SourceOrderType
}

type WaypointsType = {
    hint: string
    distance: number
    location: number[]
    name: string
}

type RoutesType = {
    legs: Array<LegsType>
    weight_name: string
    geometry: string
    weight:number,
    distance:number,
    duration:number
}

type LegsType = {
    steps: Array<stepsType>
    weight: number
    distance: number
    summary: string
    duration: number
}

type stepsType = {
    distance: number
    driving_side: string
    duration: number
    geometry: string
    intersections: Array<intersectionsType>
    maneuver: maneuverType
    mode: string
    name: string
    weight: number
}

type intersectionsType = {
    out: number
    entry: Array<number>
    location: Array<number>
    bearings: Array<number>
}

type maneuverType = {
    bearing_after: number
    location: Array<number>
    type: string
    bearing_before: number
    modifier: string
}

//?alternatives=true
