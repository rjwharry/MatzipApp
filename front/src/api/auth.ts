import { axiosInstance } from "../api";
import { Category, Profile } from "../types";
import { getEncryptStorage } from "../utils";

type RequestUser = {
    email: string;
    password: string;
};

const signup = async ({email, password}: RequestUser): Promise<void> => {
    const {data} = await axiosInstance.post('/auth/signup', {email, password});
    return data;
};

type ResponseToken = {
    accessToken: string;
    refreshToken: string;
};

const login = async ({email, password}: RequestUser): Promise<ResponseToken> => {
    const {data} = await axiosInstance.post('/auth/signin', {email, password});
    return data;
}

const logout = async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
}

const getAccessToken = async (): Promise<ResponseToken> => {
    const refreshToken = await getEncryptStorage('refreshToken');
    const headers = {
        'Authorization': `Bearer ${refreshToken}`
    };
    const {data} = await axiosInstance.get('/auth/refresh', {
        headers: headers,
    });
    return data;
}

type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
    const {data} = await axiosInstance.get('/auth/me');
    return data;
}

export { getAccessToken, getProfile, login, logout, signup };
export type { RequestUser, ResponseProfile, ResponseToken };

