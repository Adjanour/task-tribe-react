import { useMutation } from 'react-query';
import axios from 'axios';

interface UsePostDataProps {
    endpoint: string;
    token: string | null;
}

/**
 * A hook for making POST and PUT requests to an API endpoint.
 *
 * @param {UsePostDataProps} props - An object containing the endpoint and token.
 * @returns {Object} An object containing the postData function, isPosting flag, and postError.
 */
export const usePostData = ({endpoint, token }: UsePostDataProps) => {

    const mutation = useMutation(
        async (postData: any) => {
            const response = await axios.post(endpoint, postData, {
                headers: {
                    Authorization: token ? `Token ${token}` : '',
                },
            });
            return response.data;
        },
        {
            onSuccess: () => {

            },
            onError: () =>{
            },
            retry:3
        },
    );
    const putMutation = useMutation(
        async (putData:any)=>{
            const response = await axios.put(endpoint,putData,{
                headers:{
                    Authorization: token ? `Token ${token}`:"",
                }
            })
            return response.data;
        },
        {
            onSuccess:()=>{

            },
            onError:()=>{

            },
            retry: 3
        }
    )


    const postData = async (postData: any) => {
        try {
           const response =  await mutation.mutateAsync(postData);
            return response
        } catch (error) {
            throw new Error()
        }

    };
    /**
     * Executes a PUT request with the provided data.
     *
     * @param {any} putData - The data to be sent in the PUT request.
     * @returns {Promise<any>} A promise that resolves to the response of the PUT request.
     * @throws {Error} If an error occurs during the PUT request.
     */
    const putData = async (putData: any) => {
        try {
            const response =  await putMutation.mutateAsync(putData);
            return response
        } catch (error) {
            throw new Error()
        }

    };
    return { postData, isPosting: mutation.isLoading, postError: mutation.error,putData,isPutting:putMutation.isLoading,putError:putMutation.error };
};
