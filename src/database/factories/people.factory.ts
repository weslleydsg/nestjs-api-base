import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Person } from '../../people/people.entity';

define(Person, (faker: typeof Faker) => {
  const gender = faker.random.number(1);

  const person = new Person();
  person.firstName = faker.name.firstName(gender);
  person.lastName = faker.name.lastName(gender);
  person.email = faker.internet.email();

  return person;
});
