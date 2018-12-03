//Function to keep common implmentation for all axios calls from the front - end

import axios from 'axios';
import {BASE_URL}  from '../constants/';

export async function api(type, url , data = {},headers = {}) {
    if(url[0]!='/')
        url = '/' + url;
    url = BASE_URL + url;
    console.log(type);
    console.log(url);
    console.log(data);
    let tokenValue = sessionStorage.getItem('user_token');
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
    else if( type == 'DELETE' || type=='delete')
    {
        if(sendToken)
        {
            const res = await axios({
                method: 'DELETE',
                url: url,
                headers: headersObject
            });
            return res;
        }
        else 
        {
            const res = await axios({
                method: 'DELETE',
                url: url
            });
            return res;
        }
    }



}