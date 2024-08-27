import useSWR from 'swr'

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
    fetch(...args).then((res) => res.json())

interface UseAPIReturn {
    data?: any
    error?: Error
    isLoading: boolean
}

export const useAPI = (): UseAPIReturn => {
    const { data, error } = useSWR<any>('url', fetcher)

    return {
        data,
        error,
        isLoading: !error && !data,
    }
}
