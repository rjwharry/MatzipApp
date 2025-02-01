import { QueryKey, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type ResponseError = AxiosError<{
    statusCode: number;
    message: string;
    error: string;
}>

type UseMutationCustomOptions<Tdata=unknown, TVariables=unknown> = Omit<
    UseMutationOptions<Tdata, ResponseError, TVariables, unknown>, 
    "mutationFn"
>;

type UseQueryCustomOptions<Tdata=unknown> = Omit<
    UseQueryOptions<Tdata, ResponseError, Tdata, QueryKey>,
    "queryKey" | "queryFn"
>;

export type { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions };
