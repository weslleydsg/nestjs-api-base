import { Person } from './people.entity';

describe('Person', () => {
  it('should be defined', () => {
    expect(new Person()).toBeDefined();
  });
});
