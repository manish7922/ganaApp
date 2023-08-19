import axois from "axios";

let baseURL="http://localhost:2410";

function get(url){
    return axois.get(baseURL+url)
}

function post(url,obj){
    return  axois.post(baseURL+url,obj);
}

function put(url,obj){
    return axois.put(baseURL+url,obj);
}

function deleteApi(url){

    return axois.delete(baseURL+url)
}


export default{
    get,
    post,
    put,
    deleteApi
}
