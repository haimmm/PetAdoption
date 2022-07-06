import petApi from "utils/PetServerAPI";
import { useEffect, useRef, useState } from "react";
import {setRequest, setResponse} from "utils/axiosConfig"

// axios.defaults.withCredentials = true;

export const useAuth = () => {
    const [user, setUser] = useState(undefined);
    const tokenRef = useRef();

    useEffect(() => {
        setResponse(refresh);
        setRequest(tokenRef);
        refresh();
    },[]);


    //includes auto login
    const register = async values => {
        console.log("registering");
        const response = await petApi.register(values);
        tokenRef.current = response.data.access_token;
        setUser(response.data);
        return response;
    }

    const login = async values => {
        const response = await petApi.login(values);
        tokenRef.current = response.data.access_token;
        setUser(response.data);
        return response;
    }

    const logOut = () =>{
        setUser(null);
    }

    const refresh = async () => {
        console.log("refrehing");
        try{
            const response = await petApi.refresh();
            tokenRef.current = response.data.access_token;
            setUser(response.data);
        }catch(err){
            setUser(null);
        }
    }

    return {
        user,
        register,
        login,
        logOut,
        refresh
    }
}