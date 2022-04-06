import React from 'react';
import clientApi from '@services/clientApi';
import PostComponent from '@components/Post';
import type { CommentPayload } from './comments';
import type { Comment } from '@controllers/CommentController'
import type { User } from '@controllers/UserController';
import type { Post } from '@controllers/PostController';

export interface PublicPostPayload extends CommentPayload {
  firstPublicPostId: number
}

export interface PublicCommentPayload extends PublicPostPayload {
  publicCommentId: number
}

const publicCommentsActions = {
  findFirstPublicPost: async (payload: CommentPayload) => {
    const { data: posts } = await clientApi.get<Post[]>('/posts');
    const [post] = posts;

    return {
      message: (
        <React.Fragment>
          Agora vamos procurar o primeiro post da lista pública.
        </React.Fragment>
      ),
      payload: {
        ...payload,
        firstPublicPostId: post.id
      },
      helper: null,
      showInfo: true
    };
  },
  showFirstPublicPost: async (payload: PublicPostPayload) => {
    const { firstPublicPostId, postId } = payload;
    const { data: post } = await clientApi.get<Post>(`/posts/${firstPublicPostId}`);

    return {
      message: (
        <React.Fragment>
          Primeiro post encontrado!
          {firstPublicPostId === postId && (
            <React.Fragment>
              <br />Curiosamente o primeiro post da lista pública é o post que acabamos de criar...
            </React.Fragment>
          )}
        </React.Fragment>
      ),
      payload,
      showInfo: true,
      helper: (
        <PostComponent post={post} />
      )
    };
  },
  createPublicComment: async (payload: PublicPostPayload) => {
    const { firstPublicPostId, userId, postId } = payload;
    const { data: user } = await clientApi.get<User>(`/users/${userId}`);
    const { data: publicComment } = await clientApi.post<Comment>('/comments', {
      post_id: firstPublicPostId,
      name: user.name,
      email: user.email,
      body: postId === firstPublicPostId ? 'Até que gostei do meu primeiro post!' : 'Achei que latim era uma língua morta!'
    });

    return {
      message: (
        <React.Fragment>
          Vamos criar o comentário agora!
        </React.Fragment>
      ),
      payload: {
        ...payload,
        publicCommentId: publicComment.id
      },
      showInfo: true,
      helper: null
    }
  },
  showPublicComment: async (payload: PublicCommentPayload) => {
    const { firstPublicPostId, publicCommentId } = payload;
    const { data: post } = await clientApi.get<Post>(`/posts/${firstPublicPostId}`);
    const { data: comments } = await clientApi.get<Comment[]>(`/comments?postId=${firstPublicPostId}`);

    return {
      message: (
        <React.Fragment>
          Comentário criado! Veja!
        </React.Fragment>
      ),
      payload,
      showInfo: true,
      helper: (
        <PostComponent
          post={post}
          comments={comments}
          commentId={publicCommentId}
        />
      )
    };
  },
  deletePublicComment: async (payload: PublicCommentPayload) => {
    const { publicCommentId } = payload;
    await clientApi.delete(`/comments/${publicCommentId}`);
    delete payload.publicCommentId;

    return {
      message: (
        <React.Fragment>
          Agora, vamos apagar o comentário que acabamos de criar.
        </React.Fragment>
      ),
      payload,
      showInfo: true,
      helper: null
    }
  },
  showDeletedPublicComment: async (payload: PublicPostPayload) => {
    const { firstPublicPostId } = payload;
    const { data: post } = await clientApi.get<Post>(`/posts/${firstPublicPostId}`);
    const { data: comments } = await clientApi.get<Comment[]>(`/comments?postId=${firstPublicPostId}`);

    return {
      message: (
        <React.Fragment>
          Comentário apagado! Você pode verificar ao lado.
        </React.Fragment>
      ),
      payload,
      showInfo: true,
      helper: (
        <PostComponent
          post={post}
          comments={comments}
        />
      )
    };
  }
}

export default publicCommentsActions;
