import serverApi from '@services/serverApi';

export interface User {
  id: number
  email: string
  name: string,
  gender: 'male' | 'female',
  status: 'active' | 'nactive'
}

export type RegisterUser = {
  [key in keyof User as Exclude<key, 'id'>]: User[key]
}

export default class UserController {
  static async getAll(): Promise<User[]> {
    const { data: users } = await serverApi.get<User[]>('/users');

    return users;
  }

  static async getOne(id: number): Promise<User> {
    const { data: user } = await serverApi.get<User>(`/users/${id}`);

    return user
  }

  static async create(user: RegisterUser): Promise<User> {
    const { data: newUser } = await serverApi.post<User>('/users', user);

    return newUser;
  }
} 
