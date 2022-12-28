import { useNavigate } from "react-router-dom";
import { Hospital } from "./../types/hospital";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Config from "../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import Problem from "../types/err";
import { useEffect, useState } from "react";


const useFetchHospitals = () => {
    return useQuery<Hospital[], AxiosError>("hospitals", () =>
        axios.get(`${Config.baseApiUrl}/hospitals`).then((resp) => resp.data)
    );
};

const useFetchHospital = (id: number) => {
    return useQuery<Hospital, AxiosError>(["hospitals", id], () =>
        axios.get(`${Config.baseApiUrl}/hospital/${id}`).then((resp) => resp.data)
    );
};

const useAddHospital = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Hospital>(
        (h) => axios.post(`${Config.baseApiUrl}/hospitals`, h),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("hospitals");
                nav("/");
            },
        }
    );
};

const useUpdateHospital = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, Hospital>(
        (h) => axios.put(`${Config.baseApiUrl}/hospitals`, h),
        {
            onSuccess: (_, house) => {
                queryClient.invalidateQueries("hospitals");
                nav(`/hospital/${house.id}`);
            },
        }
    );
};

const useDeleteHospital = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, Hospital>(
        (h) => axios.delete(`${Config.baseApiUrl}/hospitals/${h.id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("hospitals");
                nav("/");
            },
        }
    );
};

export {
    useFetchHospitals,
    useFetchHospital,
    useAddHospital,
    useUpdateHospital,
    useDeleteHospital,
};
