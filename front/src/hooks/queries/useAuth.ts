import { getAccessToken, getProfile, login, logout, queryClient, signup } from "@/api";
import { headerKeys, queryKeys, storageKeys, UseMutationCustomOptions, UseQueryCustomOptions } from "@/types";
import { numbers, removeEncryptStorage, removeHeader, setEncryptStorage, setHeader } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";



const useSignup = (options?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: signup,
        ...options,
    })
}

const useLogin = (options?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
            setHeader(headerKeys.AUTHORIZATION, `Bearer ${data.accessToken}`);
        },
        onSettled: () => {
            queryClient.refetchQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN]});
        },
        ...options,
    })
}

const useLogout = (options?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
            removeHeader(headerKeys.AUTHORIZATION);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
        },
        ...options,
    })
}

const useGetAccessToken = () => {
    const {data, isSuccess, isError} = useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    })

    useEffect(() => {
        if (isSuccess) {
            setHeader(headerKeys.AUTHORIZATION, `Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            removeHeader(headerKeys.AUTHORIZATION);
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        }
    }, [isError])

    return {isSuccess, isError}
}

const useGetProfile = (options?: UseQueryCustomOptions) => {
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...options,
    })
}

const useAuth = () => {
    const signupMutation = useSignup();
    const loginMutation = useLogin();
    const logoutMutation = useLogout();
    const accessTokenQuery= useGetAccessToken();
    const isLogin = accessTokenQuery.isSuccess;
    const getProfileQuery = useGetProfile({
        enabled: isLogin
    });

    return {signupMutation, loginMutation, logoutMutation, isLogin, getProfileQuery};
}

export default useAuth;