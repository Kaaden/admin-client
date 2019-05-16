import axios from "axios"
import qs from "qs"
export default async function request (options) {
    let response
    if(options.data){
        options.data=qs.stringify(options.data)
    }
    try {
        response = await axios(options)
        return response
    } catch (err) {
        return {}
    }
}
