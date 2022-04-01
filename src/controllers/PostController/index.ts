import serverApi from '@services/serverApi'

interface Post {
  id: number
  user_id: number
  title: string
  body: string
};

type RegisterPost = {
  [key in keyof Post as Exclude<key, 'id'>]: Post[key]
}

export default class PostController {
  static async create(post: RegisterPost): Promise<Post> {
    const { data: newPost } = await serverApi.post<Post>('/posts', post);

    return newPost;
  }

  static async getOne(id: number): Promise<Post> {
    const { data: post } = await serverApi.get<Post>(`/posts/${id}`);

    return post;
  }

  static async getAll(): Promise<Post[]> {
    const { data: posts } = await serverApi.get<Post[]>('/posts');

    return posts;
  }
}
