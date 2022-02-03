import {instanceCargoSpeed} from "./api";

const OrderingSystemApi = {
    getOrdersMany(token: string) {
        return instanceCargoSpeed(token)
            .get<Array<OrderType>>(`demo/api/v1/orders/many`)
            .then((response) => response)
    },
    postRefreshToken() {
        return instanceCargoSpeed().post<RefreshTokenType>(`demo/api/v1/login/access_token`,'grant_type=refresh_token')
            .then((response) => response)
    },
    postRefreshTokenAuth(username:string, password:string) {
        return instanceCargoSpeed()
            .post<RefreshTokenType>(`demo/api/v1/login/access_token`,
                  `grant_type=password&username=${username}&password=${password}`
            )
            .then((response) => response)
    }
}

export default OrderingSystemApi;

export type OrderType = {
            id: string
            order_number: number
            source: SourceOrderType
            destination: DestinationOrderType
            subject: string
            comment: string
}
type DestinationOrderType = {
    lat: number
    lon: number
    time: string
}
type SourceOrderType = {
    lat: number
    lon: number
}

type RefreshTokenType = {
    access_token: string
}