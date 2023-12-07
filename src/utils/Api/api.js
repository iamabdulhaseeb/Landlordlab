import axios from "axios";
const base_url = 'https://mgpapi-test.azurewebsites.net';
export class Api {
    async get(url,header) {
        try {
            console.log(`${base_url}${url}`)
            const apiCall = await axios.get(`${base_url}${url}`,header);
            return apiCall;
        }
        catch(e) {
            throw e;
        }
    }


    async post(url,body,headers) {
        try {
            const apiCall = await axios.post(`${base_url}${url}`,body,headers);
            return apiCall;
        }
        catch(e) {
            throw e;
        }
    }
}