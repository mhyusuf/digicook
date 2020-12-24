import axios from 'axios';

import { User } from '../interfaces/user';

export async function getCurrentUser(): Promise<User> {
  const { data } = await axios.get('/auth/current-user');
  return data;
}
