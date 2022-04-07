import UserController from '@controllers/UserController';
import type { RegisterUser } from '@controllers/UserController';
import goRestApi from '@services/goRestApi';

jest.mock('@services/goRestApi', () => ({
  get: jest.fn(async (url: string) => {
    if (url.indexOf('/users/') === 0)
      return {
        data: {
          id: 1,
          name: 'foo bar',
          email: 'foo@bar.com',
          gender: 'male',
          status: 'active'
        }
      }
    if (url.indexOf('/users') === 0)
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
  }),
  post: jest.fn(async (url: string, user: any) => {
    if (url.indexOf('/users') === 0)
      return {
        data: {
          id: 1,
          ...user
        }
      };
  }),
  delete: jest.fn(async () => { })
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
    expect(goRestApi.post).toHaveBeenCalledWith('/users', user);
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
    expect(goRestApi.get).toHaveBeenCalledWith('/users/1');
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
    expect(goRestApi.get).toHaveBeenCalledWith('/users');
  });

  it('get all users by email', async () => {
    const email = 'foo@bar.com';
    const encodedEmail = encodeURIComponent(email);
    const users = await UserController.getAllByEmail('foo@bar.com');

    expect(users).toMatchObject([
      {
        id: 1,
        gender: 'male',
        email: 'foo@bar.com',
        name: 'foo bar',
        status: 'active'
      }
    ]);
    expect(goRestApi.get).toHaveBeenCalledWith(`/users?email=${encodedEmail}`);
  })
})
