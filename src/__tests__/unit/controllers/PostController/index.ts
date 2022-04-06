import PostController from "@controllers/PostController";
import goRestApi from '@services/goRestApi';

jest.mock('@services/goRestApi', () => ({
  post: jest.fn((url: string, post: any) => {
    if (url === '/posts')
      return {
        data: {
          id: 1,
          user_id: 1,
          ...post
        }
      }
  }),
  get: jest.fn((url: string) => {
    if (url === '/posts/1')
      return {
        data: {
          id: 1,
          user_id: 1,
          title: 'foo',
          body: 'bar'
        }
      }

    if (url === '/posts')
      return {
        data: []
      }
  })
}));

describe('PostController test', () => {
  it('create post', async () => {
    const post = {
      user_id: 1,
      title: 'foo',
      body: 'bar'
    };
    const newPost = await PostController.create(post);

    expect(newPost).toMatchObject({
      id: 1,
      user_id: 1
    });
    expect(goRestApi.post).toHaveBeenCalledWith('/posts', post)
  });

  it('get one post', async () => {
    const post = await PostController.getOne(1);

    expect(post).toMatchObject({
      id: 1,
      user_id: 1,
      title: 'foo',
      body: 'bar'
    });
    expect(goRestApi.get).toHaveBeenCalledWith('/posts/1');
  });

  it('get all posts', async () => {
    const posts = await PostController.getAll();

    expect(posts).toBeInstanceOf(Array);
    expect(goRestApi.get).toHaveBeenCalledWith('/posts');
  });
});
