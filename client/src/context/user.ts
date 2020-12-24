import { createContext } from 'react';

import { User } from '../interfaces/user';

export const UserContext = createContext<User | null>(null);
