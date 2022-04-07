import CommentController from '@controllers/CommentController';
import goRestApi from '@services/goRestApi';

jest.mock('@services/goRestApi', () => ({
  get: jest.fn(async (url: string) => {
    if (url.indexOf('/comments/') === 0)
      return {
        data: {
          id: 1,
          post_id: 1,
          name: 'foo',
          email: 'foo@bar.com',
          body: 'bar'
        }
      }
    if (url.indexOf('/comments') === 0)
      return {
        data: []
      }
  }),
  post: jest.fn(async (url: string, comment: any) => {
    if (url === '/comments')
      return {
        data: {
          id: 1,
          ...comment
        }
      }
  }),
  delete: jest.fn(async () => { })
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
    expect(goRestApi.get).toHaveBeenCalledWith('/comments/1')
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
    expect(goRestApi.post).toHaveBeenCalledWith('/comments', comment);
  });

  it('get all comments', async () => {
    const comments = await CommentController.getAll();

    expect(comments).toBeInstanceOf(Array);
    expect(goRestApi.get).toHaveBeenCalledWith('/comments');
  });

  it('get all comments by post', async () => {
    const comments = await CommentController.getAllByPost(1);

    expect(comments).toBeInstanceOf(Array);
    expect(goRestApi.get).toHaveBeenCalledWith('/comments?post_id=1');
  })

  it('delete comment', async () => {
    await CommentController.delete(1);

    expect(goRestApi.delete).toHaveBeenCalledWith('/comments/1');
  });
});
