import { useEffect, useState } from "react";

export function useFetchTodos(apiUrl){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () =>{
        setLoading(true)
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data.splice(0,20));
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return{data, setData, loading}
}