import { useQuery } from "react-query";
import axios from "axios"

interface UseGetDataProps{
    dataAlias:string;
    endpoint:string;
    token:string|null;
} 

export const useGetData = ({dataAlias,endpoint,token}:UseGetDataProps) => {

    const fetcher = async() => {
        const response = await axios.get(endpoint,
           { headers:{
            Authorization: token ? `Token ${token}`:""
        }})
        return response.data;
    }
    const {data,refetch,isLoading,error} = useQuery([dataAlias,endpoint,token],fetcher,{
        enabled: !token,
        staleTime: 60000,
    });

    const refetchData  =() => {
        refetch();
    }

    return {data, refetchData, isLoading,error}
}