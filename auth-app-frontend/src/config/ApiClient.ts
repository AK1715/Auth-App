import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthService";
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

// every request: before
apiClient.interceptors.request.use((config)=>{

    const accessToken =  useAuth.getState().accessToken
    if(accessToken){
        config.headers.Authorization =`Bearer ${accessToken}`
    }

    return config;
})

let isRefreshing = false;
let pending: any[] = [];

function queueRequest(cb: any){
    pending.push(cb);
}

function resolveQueue(newToken: string){
    pending.forEach((cb)=> cb(newToken));
    pending = [];
}

// reponse interceptors
apiClient.interceptors.response.use(
    response=>response,
    async (error)=>{
    // console.log(error);
    const is401 = error.response.status === 401;
    const orignal = error.config;
    console.log(orignal);
    console.log("Orignal retry: ", orignal._retry);
    if(!is401 || orignal._retry){
        // message bhi de sakte hai but hamne aage pass kiya hai
        return Promise.reject(error);
    }

    orignal._retry = true;

    // we will try to refresh the token:
    if(isRefreshing){
        console.log("already refreshing...");
        return new Promise((reslove, reject)=>{
            queueRequest((newToken: string)=> {
                if(!newToken) return reject();
                orignal.headers.Authorization = `Bearer ${newToken}`;
                reslove(apiClient(orignal));
            });
        });
    }

    // start refreshing 
    isRefreshing = true;

    try {
        console.log("start refreshing...");
        const loginResponse = await refreshToken();
        const newToken = loginResponse.accessToken;
        if(!newToken) throw new Error("No access token received");
        useAuth
            .getState()
            .changeLocalLoginData(
                loginResponse.accessToken,
                loginResponse.user,
                true
            )
            resolveQueue(newToken);
            orignal.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(orignal);
    } catch (error) {
        resolveQueue('null');
        useAuth.getState().logout();
        return Promise.reject(error);
    }finally{
        isRefreshing=false;
    }

});

export default apiClient;