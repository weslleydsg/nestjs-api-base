import { User } from './users.entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
