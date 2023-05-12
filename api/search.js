import axios from "./axios.js";
export const fetchSearchPage = () => axios.get('/search/a98bp120d98e208flolh0i230512l230731k0m1.html').then(response => response.data)
export const fetchMainPage = () => axios.get('/').then(response => response.data)
export const fetchPhoneNumber = (id) => axios.get(`request_site/${id}/?mode=get_request_contacts&is_hcaptcha_loaded=true&response=&botdResponse=&meetRequestHash=&humanitarianRequestHash=&baseRequestCode=`).then(response => response.data)
