import React from 'react';
import clientApi from '@services/clientApi';
import UsersList from '@components/UsersList';
import type { User } from '@controllers/UserController';

export interface UserPayload {
  userId: number
}

const userActions = {
  createNewUser: async () => {
    const { data: user } = await clientApi.post<User>('/users', {
      email: 'joaozinho@gmail.com',
      gender: 'male',
      name: 'Joãozinho',
      status: 'active'
    });

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
