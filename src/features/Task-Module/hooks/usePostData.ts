import { useMutation } from 'react-query';
import axios from 'axios';

interface UsePostDataProps {
    endpoint: string;
    token: string | null;
}

interface MutationOptions<TData, TVariables> {
    onSuccess?: (data: TData) => void;
    onError?: (error: any) => void;
    retry?:number
}

/**
 * A hook for making POST and PUT requests to an API endpoint.
 *
 * @param {UsePostDataProps} props - An object containing the endpoint and token.
 * @returns {Object} An object containing the postData function, isPosting flag, postError, putData function, isPutting flag, and putError.
 */
export const usePostData = ({ endpoint, token }: UsePostDataProps) => {
    const defaultHeaders = {
        headers: {
            Authorization: token ? `Token ${token}` : '',
        },
    };

    const mutationOptions: MutationOptions<any, any> = {
        onSuccess: () => {
            // Custom logic on success can be added here
        },
        onError: (error: any) => {
            console.error('Request error:', error);
        },
        retry: 3,
    };

    const postMutation = useMutation(
        async (postData: any) => {
            const response = await axios.post(endpoint, postData, defaultHeaders);
            return response;
        },
        mutationOptions
    );

    const putMutation = useMutation(
        async (putData: any) => {
            const response = await axios.put(endpoint, putData, defaultHeaders);
            return response;
        },
        mutationOptions
    );

    /**
     * Executes a POST request with the provided data.
     *
     * @param {any} postData - The data to be sent in the POST request.
     * @returns {Promise<any>} A promise that resolves to the response of the POST request.
     * @throws {Error} If an error occurs during the POST request.
     */
    const postData = async (postData: any): Promise<any> => {
        try {
            return await postMutation.mutateAsync(postData);
        } catch (error) {
            throw new Error('Error during POST request');
        }
    };

    /**
     * Executes a PUT request with the provided data.
     *
     * @param {any} putData - The data to be sent in the PUT request.
     * @returns {Promise<any>} A promise that resolves to the response of the PUT request.
     * @throws {Error} If an error occurs during the PUT request.
     */
    const putData = async (putData: any): Promise<any> => {
        try {
            return await putMutation.mutateAsync(putData);
        } catch (error) {
            throw new Error('Error during PUT request');
        }
    };

    return {
        postData,
        isPosting: postMutation.isLoading,
        postError: postMutation.error,
        putData,
        isPutting: putMutation.isLoading,
        putError: putMutation.error,
    };
};
