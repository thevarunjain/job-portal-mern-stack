//Function to keep common implmentation for all axios calls from the front - end

import axios from 'axios';
import {BASE_URL}  from '../constants/';

export async function api(type, url , data) {
    if(url[0]!='/')
        url = '/' + url;
    url = BASE_URL + url;
    let tokenValue = sessionStorage.getItem('user_token');
    let sendToken; 
    if(tokenValue!==null) sendToken = true; else sendToken = false;
    if( type == 'GET' || type=='get')
    {
        if(1==1 || sendToken)
        {
            /* const res = await axios.get(url , 
                {headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVlN2U2NGM0YmYxNzRkMWNkYTc4NzYiLCJyb2xlIjoicmVjcnVpdGVyIiwiaWF0IjoxNTQyNTI1Mzk2fQ.MKXcOMdG-IOdGVYPS7KN_nZQ8E1IqSzHhGKqcuXMac0'}
            }); */
            const res = await axios.get(url , {
                    headers: 
                    { 
                        'Authorization': 'Bearer ' + tokenValue
                    }
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
        const res = await axios({
            method: 'POST',
            data : data,
            url: BASE_URL + url,
            /* headers: { 'Authorization': authstring} */
        });
        return await res;
    }
    else if( type == 'PUT' || type=='put')
    {
        const res = await axios({
            method: 'PUT',
            data : data,
            url: BASE_URL + url,
            /* headers: { 'Authorization': authstring} */
        });
        return await res;
    }
    else if( type == 'PATCH' || type=='patch')
    {
        const res = await axios({
            method: 'PATCH',
            data : data,
            url: BASE_URL + url,
            /* headers: { 'Authorization': authstring} */
        });
        return await res;
    }



}