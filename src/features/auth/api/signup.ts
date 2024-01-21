import { axios } from '@/lib/axios';

import { LoginSignupResponse } from '../types';

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signupWithEmailAndPassword = (
  data: SignupCredentialsDTO
): Promise<LoginSignupResponse> => {
  return axios.post('/api/v1/create/', data);
};
