import { axios } from '@/lib/axios';

import { AuthUser } from '../types';

export const getUser = async (): Promise<AuthUser> => {
  const user = await axios.get('/api/v1/me')
  return user.data
  return axios.get('/api/v1/me');
};
