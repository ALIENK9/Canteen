import { Thunk } from 'redux-testkit';
import Http from '../../redux/Http';
import { login } from '../../redux/actions/authentication/authentication.actions';

jest.mock('../../redux/Http');

describe('authenticatione async actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should perform get login action', async () => {
    const blogin = login.bind(this, { username: 'pippo', password: 'pippo' });
    // Http.get.mockReturnValueOnce({});
    await Thunk(blogin).execute();
    expect(Http.get).toHaveBeenCalledTimes(1);
  });
});
