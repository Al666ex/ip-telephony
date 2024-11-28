import { useState } from "react"

export const useFetch = (callback) => {
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState('')

    const fetchPersons = async() => {
        try {
            setLoading(true)
            await callback()
        } catch (error) {
            console.log('useFetchError---',error)            
            setError(error.response.data.message+'. '+error.message)
        } finally {
            setLoading(false)
        }
    }

    return [fetchPersons, loading, error]
}