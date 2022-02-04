import {instanceCargoSpeed, ResultCodeEnum} from "./api";

const OrderingSystemApi = {
    getOrdersMany(token: string) {
        return instanceCargoSpeed(token)
            .get<Array<OrderType> & ErrorResponseType>(`demo/api/v1/orders/many`)
            .then((response) => response).catch(err => {
                switch (err.response.status) {
                    case ResultCodeEnum.Unauthorized:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.Forbidden:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.NotFoundError:
                        throw new Error(`${err.response.data.detail}`)
                    default :
                        return err.response
                }
            })
    },
    postRefreshToken() {
        return instanceCargoSpeed().post<RefreshTokenType & ErrorResponseType>(`demo/api/v1/login/access_token`,
            'grant_type=refresh_token')
            .then((response) => response)
            .catch(err => {
                switch (err.response.status) {
                    case ResultCodeEnum.Unauthorized:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.Forbidden:
                        throw new Error(`${err.response.data.detail}`)
                    case  ResultCodeEnum.ValidationError:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.NotFoundError:
                        throw new Error(`${err.response.data.detail}`)
                    default :
                        return err.response
                }
            })
    },
    postRefreshTokenAuth(username: string, password: string) {
        return instanceCargoSpeed()
            .post<RefreshTokenType & ErrorResponseType>(`demo/api/v1/login/access_token`,
                `grant_type=password&username=${username}&password=${password}`
            )
            .then((response) => response)
            .catch(err => {
                switch (err.response.status) {
                    case ResultCodeEnum.Unauthorized:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.Forbidden:
                        throw new Error(`${err.response.data.detail}`)
                    case  ResultCodeEnum.ValidationError:
                        throw new Error(`${err.response.data.detail}`)
                    case ResultCodeEnum.NotFoundError:
                        throw new Error(`${err.response.data.detail}`)
                    default :
                        return err.response
                }
            })
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

type ErrorResponseType = {
    detail: string
}