import axios from "axios";
import { config } from "../config/index.js";
export default axios.create({
    baseURL: config.dellaUrl,
    withCredentials: true,
    headers: {
        Cookie: config.dellaCookie
    }
})