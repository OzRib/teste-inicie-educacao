import React from 'react';
import clientApi from '@services/clientApi';
import PostComponent from '@components/Post';
import type { User } from '@controllers/UserController';
import type { Comment } from '@controllers/CommentController';
import type { Post } from '@controllers/PostController';
import type { PostPayload } from '@roadmap/actions/posts';

export interface CommentPayload extends PostPayload {
  commentId: number
}

const commentActions = {
  createNewComment: async (payload: PostPayload) => {
    const { userId, postId } = payload;
    const { data: user } = await clientApi.get<User>(`/users/${userId}`);
    const { data: post } = await clientApi.get<Post>(`/posts/${postId}`);
    const { data: comment } = await clientApi.post<Comment>('/comments', {
      post_id: post.id,
      name: user.name,
      email: user.email,
      body: 'Então é assim que comenta?'
    });

    return {
      message: (
        <React.Fragment>
          Agora, vamos criar o nosso primeiro comentário.
          Este comentário ficará atrelado ao post criado anteriormente.
        </React.Fragment>
      ),
      helper: null,
      payload: {
        ...payload,
        commentId: comment.id,
      },
      showInfo: true
    };
  },
  showCreatedComment: async (payload: CommentPayload) => {
    const { commentId, postId } = payload;
    const { data: comments } = await clientApi.get<Comment[]>(`/comments?postId=${postId}`);
    const { data: comment } = await clientApi.get<Comment>(`/comments/${commentId}`);
    const { data: post } = await clientApi.get<Post>(`/posts/${postId}`);

    return {
      message: (
        <React.Fragment>
          Excelente! O comentário foi criado! Veja ele em destaque no post!
        </React.Fragment>
      ),
      helper: (
        <PostComponent
          post={post}
          comments={comments}
          commentId={comment.id}
        />
      ),
      payload,
      showInfo: true
    };
  }
};

export default commentActions;
