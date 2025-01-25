import { User } from "@/models";
import { Database, Collection } from ".";

export class UserService extends Collection<User> {
  constructor() {
    const collection = Database.get().getCollection("users");
    super(collection);
  }
}
