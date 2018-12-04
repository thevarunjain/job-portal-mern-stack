//Function to keep common implmentation for all axios calls from the front - end

const axios = require("axios");
const BASE_URL = 'http://localhost:3001/api';
module.exports.BASE_URL = BASE_URL;

async function api(type, url , data = {},headers = {}) {
    if(url[0]!='/')
        url = '/' + url;
    url = BASE_URL + url;
    console.log(type);
    console.log(url);
    console.log(data);
    let tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmZhOWIzZmYxNWE5ODVjNDQ5OGE2ZjEiLCJyb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNTQzMTk0NjQxfQ.NwbsBt3ypMkN5sPKX-rr-zNg-pVZf3U9W-2q5EVEbPk';
    let headersObject = Object.assign({},{ 'Authorization': 'Bearer ' + tokenValue},headers);
    
    let sendToken; 
    if(tokenValue!==null) sendToken = true; else sendToken = false;
    if( type == 'GET' || type=='get')
    {
        if(sendToken)
        {
            const res = await axios.get(url , {
                    headers: headersObject
                });
            return res;
        }
        else 
        {
            const res = await axios.get(url);
            return res;
        }
    }
    else if( type == 'POST' || type=='post')
    {
        
        if(sendToken)
        {
            const res = await axios({
                method: 'POST',
                data : data,
                url: url,
                headers: headersObject
            });
            return res;
        }
        else 
        {
            const res = await axios({
                method: 'POST',
                data : data,
                url: url
            });
            return res;
        }
    }
    else if( type == 'PUT' || type=='put')
    {
        if(sendToken)
        {
            const res = await axios({
                method: 'PUT',
                data : data,
                url: url,
                headers: headersObject
            });
            return res;
        }
        else 
        {
            const res = await axios({
                method: 'PUT',
                data : data,
                url: url
            });
            return res;
        }
    }
    else if( type == 'PATCH' || type=='patch')
    {
        //TODO
        /* const res = await axios({
            method: 'PATCH',
            data : data,
            url: BASE_URL + url,
            headers: { 'Authorization': authstring}
        });
        return await res; */
    }



}

module.exports.api = api;