import axios from "axios";
import { serverPath } from "./keys"


export const userInstance = axios.create({
    baseURL: serverPath,
    withCredentials: true
});



