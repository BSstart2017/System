import {ApiResponseType, instance, ResultCodeCaptchaEnum, ResultCodeEnum} from "./api";

const authApi = {
    getAuthUser() {
        return instance
            .get<ApiResponseType<MeResponseDataType>>(`auth/me`)
            .then((response) => response.data)
    },
    postLogin(
        email: string,
        password: string,
        rememberMe: boolean = false,
        captcha: string | null = null
    ) {
        return instance
            .post<ApiResponseType<LoginResponseDataType, ResultCodeCaptchaEnum | ResultCodeEnum>>(`auth/login/`, {
                email,
                password,
                rememberMe,
                captcha
            })
            .then((response) => response.data);
    },
    deleteLogout() {
        return instance
            .delete<ApiResponseType<LoginResponseDataType, ResultCodeCaptchaEnum | ResultCodeEnum>>(`auth/login/`)
            .then((response) => response.data);
    },
};

export default authApi;


export type LoginResponseDataType = {
    userId: number;
};

export type MeResponseDataType = {
    id: number;
    email: string;
    login: string;
};