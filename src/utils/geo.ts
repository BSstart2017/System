import {PositionCenterType} from "../redux/OrderMapReducer";

export const getBrowserLocation = (centerDefault : PositionCenterType) => {
    return new Promise<PositionCenterType>((resolve , reject) => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos)=> {
                    const {latitude : lat, longitude : lng} = pos.coords
                    resolve({lat, lng})
                },
                () => {
                    reject(centerDefault)
                }
            )
        } else {
            reject(centerDefault)
        }
    })
}