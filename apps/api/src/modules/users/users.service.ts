import { UsersRepository } from "./users.repository.js";

export class UsersService {
  constructor(private readonly repository: UsersRepository) {}
  listUsers() {
    return this.repository.findAll();
  }
}
export const usersService = new UsersService(new UsersRepository());
