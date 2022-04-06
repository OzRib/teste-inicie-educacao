import goRestApi from '@services/goRestApi';

export interface Comment {
  id: number
  post_id: number
  name: string
  email: string
  body: string
}

type RegisterComment = {
  [key in keyof Comment as Exclude<key, 'id'>]: Comment[key]
}

export default class CommentController {
  static async getAll(): Promise<Comment[]> {
    const { data: comments } = await goRestApi.get<Comment[]>('/comments');

    return comments;
  }

  static async getAllByPost(postId: number): Promise<Comment[]> {
    const { data: comments } = await goRestApi.get<Comment[]>(`/comments?post_id=${postId}`);

    return comments;
  }

  static async getOne(commentId: number): Promise<Comment> {
    const { data: comment } = await goRestApi.get<Comment>(`/comments/${commentId}`);

    return comment;
  }

  static async create(comment: RegisterComment): Promise<Comment> {
    const { data: newComment } = await goRestApi.post<Comment>('/comments', comment);

    return newComment;
  }

  static async delete(commentId: number): Promise<void> {
    await goRestApi.delete(`/comments/${commentId}`);
  }
}
