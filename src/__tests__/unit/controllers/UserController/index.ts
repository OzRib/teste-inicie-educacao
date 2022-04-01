import UserController from '@controllers/UserController';
import type { RegisterUser } from '@controllers/UserController';
import serverApi from '@services/serverApi';

jest.mock('@services/serverApi', () => ({
  get: jest.fn((url: string) => {
    if (url === '/users')
      return {
        data: [
          {
            id: 1,
            name: 'foo bar',
            email: 'foo@bar.com',
            gender: 'male',
            status: 'active'
          }
        ]
      }
    if (url === '/users/1')
      return {
        data: {
          id: 1,
          name: 'foo bar',
          email: 'foo@bar.com',
          gender: 'male',
          status: 'active'
        }
      }
  }),
  post: jest.fn((url: string, user: any) => {
    if (url === '/users')
      return {
        data: {
          id: 1,
          ...user
        }
      };
  })
}))

describe('UserController test', () => {
  it('create new user', async () => {
    const user: RegisterUser = {
      gender: 'male',
      email: 'foo@bar.com',
      name: 'foo bar',
      status: 'active'
    };
    const newUser = await UserController.create(user);

    expect(newUser).toMatchObject(user);
    expect(serverApi.post).toHaveBeenCalledWith('/users', user);
  });

  it('get one user', async () => {
    const user = await UserController.getOne(1);

    expect(user).toMatchObject({
      id: 1,
      gender: 'male',
      name: 'foo bar',
      email: 'foo@bar.com',
      status: 'active'
    });
    expect(serverApi.get).toHaveBeenCalledWith('/users/1');
  })

  it('get all users', async () => {
    const users = await UserController.getAll();

    expect(users).toMatchObject([
      {
        id: 1,
        gender: 'male',
        name: 'foo bar',
        email: 'foo@bar.com',
        status: 'active'
      }
    ]);
    expect(serverApi.get).toHaveBeenCalledWith('/users');
  });
})
