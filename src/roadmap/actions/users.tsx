import React from 'react';
import clientApi from '@services/clientApi';
import UsersList from '@components/UsersList';
import type { User } from '@controllers/UserController';

export interface UserPayload {
  userId: number
}

const userActions = {
  createNewUser: async () => {
    async function createUser(): Promise<User> {
      const userToCreate = {
        email: 'joaozinho@gmail.com',
        gender: 'male',
        name: 'Joãozinho',
        status: 'active'
      };
      try {
        const { data: user } = await clientApi.post<User>('/users', userToCreate);

        return user;
      } catch (error) {
        const { data: [userWithEmail] } = await clientApi.get<User[]>(`/users?email=${userToCreate.email}`);
        await clientApi.delete(`/users/${userWithEmail.id}`);
        const { data: user } = await clientApi.post('/users', userToCreate);

        return user;
      }
    }

    const user = await createUser();

    return {
      message: (
        <React.Fragment>
          Vamos ao primeiro passo.
          Criar um novo usuário!
        </React.Fragment>
      ),
      payload: { userId: user.id },
      helper: null,
      showInfo: true
    }
  },
  listAllUsers: async (payload: UserPayload) => {
    const { data: users } = await clientApi.get<User[]>('/users');

    return {
      message: (
        <React.Fragment>
          Genial!
          O usuário foi criado!
          Você pode ver na lista à direita em destaque o novo usuário criado.
        </React.Fragment>
      ),
      payload,
      helper: <UsersList users={users} userId={payload.userId} />,
      showInfo: true
    }
  }
};

export default userActions;
