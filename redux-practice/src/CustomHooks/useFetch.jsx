import { useEffect, useState } from "react"

export const useFetch = (apiEndPoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(apiEndPoint)
            const result = await response.json();
            setData(result);
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(data)

    return {
        data,
        loading,
    }
}