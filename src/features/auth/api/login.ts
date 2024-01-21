import { axios } from '@/lib/axios';

import { LoginSignupResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<LoginSignupResponse> => {
  const response = await axios.post('/api/v1/token/', data);
  return response.data
};
