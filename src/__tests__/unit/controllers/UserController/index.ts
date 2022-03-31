import UserController from '@controllers/UserController'

jest.mock('@services/serverApi', () => ({
  get(url: string) {
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
  },
  post(url: string, user: any) {
    if (url === '/users')
      return {
        data: {
          id: 2,
          ...user
        }
      };
  }
}))

describe('UserController test', () => {
  it('create new user', async () => {
    const user = await UserController.create({
      gender: 'male',
      email: 'foo@bar.com',
      name: 'foo bar',
      status: 'active'
    });

    expect(user).toMatchObject({
      gender: 'male',
      email: 'foo@bar.com',
      name: 'foo bar',
      status: 'active'
    });
  });

  it('get one user', async () => {
    const user = await UserController.getOne(1);

    expect(user).toMatchObject({
      id: 1,
      gender: 'male',
      name: 'foo bar',
      email: 'foo@bar.com',
      status: 'active'
    })
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
    ])
  });
})
