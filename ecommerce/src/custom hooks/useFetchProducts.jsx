import { useEffect, useState } from "react"

export const useFetchProducts = (ApiEndpoint) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        setLoading(true);
        const response = await fetch(ApiEndpoint);
        const result = await response.json();
        setProducts(result);
        setLoading(false);
    }

    useEffect(() => {
        try {
            fetchProducts();
        }catch(err){
            console.log(err);
        }
    }, [])

    return { products, loading }
}