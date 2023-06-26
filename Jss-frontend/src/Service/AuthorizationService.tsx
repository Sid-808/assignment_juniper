import axios from 'axios';
import IJwtResponse from '../Model/IJwtResponse';
import ILoginRequest from '../Model/ILogInRequest';
import ISignUpRequest from '../Model/ISignUpRequest';
import IItem from '../Model/IItem';
import IItemRequest from '../Model/IItemRequest';
const baseUrl = 'http://localhost:9090/app/auth';
const baseUrl3 = 'http://localhost:9090/app/item'


    const logIn = (logInRequest:ILoginRequest)=>{
            return axios.post<IJwtResponse>(baseUrl + "/signin", logInRequest)
            .then(res=>res.data)       
    }

    const registerUser =(username:string,token:string)=>{
        sessionStorage.setItem("Authenticated User",username)
        setUpAxiosInterceptor(token)
    }

    const createJWTToken =(token:string)=>{
        return "Bearer " + token;
    }

    const setUpAxiosInterceptor=(token:string)=>{
        axios.interceptors.request.use((config)=>{
            if(sessionStorage.getItem("Authenticated User") != null){
                config.headers.Authorization=token;
            }
            return config;
        });
    }

    const getItem =()=>{
        return axios.get<IItem[]>(baseUrl3)
        .then(res=>res.data)
        .catch(error=>error.message);   
    }

    const updateItem=(id:string, request:IItemRequest)=>{
        return axios.put<IItemRequest>(baseUrl3+"/"+id,request)
        .then(res=>res.data)
        .catch(error=>error.message);
    }

    const itemDelete=(id:string)=>{
        return axios.delete(baseUrl3+"/"+id)
        .then(res=>res.data)
        .catch(error=>error.message);
    }

    const saveItem=(request:IItemRequest)=>{
        return axios.post<IItemRequest>(baseUrl3,request)
        .then(res=>res.data)
        .catch(error=>error.message)
    }

    const signUp=(request:ISignUpRequest)=>{
        return axios.post<ISignUpRequest>(baseUrl+"/signup",request)
        .catch(error=>error.message);
    }

    export{
        logIn,
        updateItem,
        getItem,
        registerUser,
        createJWTToken,
        itemDelete,
        saveItem,
        signUp
    }

