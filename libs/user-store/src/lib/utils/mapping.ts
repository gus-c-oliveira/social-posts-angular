import { Dictionary } from '@ngrx/entity';

import { User } from '../model/index';

export const mapEntitiesToUsers = (entities: Dictionary<User>): User[] => {
  return Object.keys(entities).map((id) => entities[id]);
};

export const mapUsersToEntities = (users: User[]): Dictionary<User> => {
  const entities: Dictionary<User> = {};
  users.forEach((user) => (entities[user.id] = user));
  return entities;
};
