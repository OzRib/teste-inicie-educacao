import CommentController from '@controllers/CommentController';
import serverApi from '@services/serverApi';

jest.mock('@services/serverApi', () => ({
  get: jest.fn((url: string) => {
    if (url === '/comments/1')
      return {
        data: {
          id: 1,
          post_id: 1,
          name: 'foo',
          email: 'foo@bar.com',
          body: 'bar'
        }
      }
  }),
  post: jest.fn((url: string, comment: any) => {
    if (url === '/comments')
      return {
        data: {
          id: 1,
          ...comment
        }
      }
  }),
  delete: jest.fn()
}));

describe('CommentController unit test', () => {
  it('get one comment', async () => {
    const comment = await CommentController.getOne(1);

    expect(comment).toMatchObject({
      id: 1,
      post_id: 1,
      name: 'foo',
      email: 'foo@bar.com',
      body: 'bar'
    });
    expect(serverApi.get).toHaveBeenCalledWith('/comments/1')
  });

  it('create comment', async () => {
    const comment = {
      post_id: 1,
      name: 'foo',
      email: 'foo@bar.com',
      body: 'bar'
    };
    const newComment = await CommentController.create(comment);

    expect(newComment).toMatchObject({
      id: 1,
      ...comment
    });
    expect(serverApi.post).toHaveBeenCalledWith('/comments', comment);
  });

  it('delete comment', async () => {
    await CommentController.delete(1);
    expect(serverApi.delete).toHaveBeenCalledWith('/comments/1');
  });
});
