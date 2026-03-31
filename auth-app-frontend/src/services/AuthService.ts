import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type RegisterData from "@/models/RegisterData"
// register function
export const registerUser = async (signupData: RegisterData) => {
    // api call to server to save data
    const response =  await apiClient.post(`/auth/register`, signupData);
    return response.data;
};

// login function
export const loginUser = async (loginData: LoginData)=> {
    // api call to server to login from data
    const response = await apiClient.post<LoginResponseData>(`/auth/login`, loginData);
    return response.data;
}

// logout function

export const logoutUser = async () => {
    const response  = await apiClient.post(`/auth/logout`)
    return response.data
}