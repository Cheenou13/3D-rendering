import axios from "axios"

var url = 'http://10.20.199.77:5015/get_station_status/'


export default async function endToEnd (id){
    // url = url + id
    // console.log("url id is "+id+ " and the url is : "+`${url}`)
    const res = await axios.get(url+id)
    // console.log(res)
    return res.data
}