import React from 'react';
import clientApi from '@services/clientApi';
import PostComponent from '@components/Post';
import type { Post } from '@controllers/PostController';
import type { UserPayload } from '@roadmap/actions/users';

export interface PostPayload extends UserPayload {
  postId: number;
};

const postsActions = {
  createNewUserPost: async (payload: UserPayload) => {
    const { data: post } = await clientApi.post<Post>('/posts', {
      user_id: payload.userId,
      title: 'Olá! Sou novo por aqui.',
      body: 'Estou muito feliz por participar do teste da Inicie Educação!'
    });

    return {
      message: (
        <React.Fragment>
          Ok, o usuário já foi criado.
          Agora vamos criar um novo post para esse usuário.
        </React.Fragment>
      ),
      payload: {
        ...payload,
        postId: post.id
      },
      helper: null,
      showInfo: true
    };
  },
  showNewUserPost: async (payload: PostPayload) => {
    const { postId } = payload;
    const { data: post } = await clientApi.get<Post>(`/posts/${postId}`);

    return {
      message: (
        <React.Fragment>
          Post criado! Você pode conferir ao lado o novo post criado.
        </React.Fragment>
      ),
      helper: (
        <PostComponent post={post} />
      ),
      payload,
      showInfo: true
    }
  }
};

export default postsActions;
