import React, { useEffect, useState } from 'react'

export const useFetch = (apiUrl) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    const fetchData = async() =>{
        try{
            setLoading(true)
            const response = await fetch(apiUrl);
            const result = await response.json();
            setData(result);
            setLoading(false)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return {data, loading}
}
