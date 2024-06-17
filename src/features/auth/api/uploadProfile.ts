import { User } from "@/features/Task-Module";
import {axios} from "@/lib/axios"
import storage from "@/utils/storage";

export interface uploadProfileImageTypes {
    description: string;
    imageFile: any;
}

const Token = storage.getToken()

export const uploadProfileImage  = async ({description, imageFile}:uploadProfileImageTypes):Promise<User> => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', imageFile);

    try {
        const response = await axios.post('/api/profile/image/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Token}`,
            }
        });
        return response.data;
    } catch (error:any) {
        console.error('Error uploading image:', error.response.data);
        throw error;
    }
};

