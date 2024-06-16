import { useQuery } from "react-query";
import axios from "axios";

interface UseGetDataProps {
    dataAlias: string;
    endpoint: string;
    token: string | null;
}

/**
 * A hook for fetching data from an API endpoint.
 *
 * @param {UseGetDataProps} props - An object containing the data alias, endpoint, and token.
 * @returns {Object} An object containing the data, refetchData function, isLoading flag, and error.
 */
export const useGetData = ({ dataAlias, endpoint, token }: UseGetDataProps) => {
    const fetcher = async () => {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: token ? `Token ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data, refetch, isLoading, error } = useQuery([dataAlias, endpoint, token], fetcher, {
        enabled: !!token, // Only enable the query if token exists
        staleTime: 60000,
    });

    const refetchData = () => {
        refetch();
    };

    return { data, refetchData, isLoading, error };
};
