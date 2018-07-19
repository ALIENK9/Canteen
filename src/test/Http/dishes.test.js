import { Thunk } from 'redux-testkit';
import Http from '../../redux/Http';
import { getDishes } from '../../redux/actions/dishes/dishes.actions';

jest.mock('../../redux/Http');

describe('dishes async actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch dishes from server', async () => {
    // Http.get.mockReturnValueOnce({});
    await Thunk(getDishes).execute();
    expect(Http.get).toHaveBeenCalledTimes(1);
  });
});
