import { Tip } from "@/models";
import { Database, Collection } from ".";

export class TipService extends Collection<Tip> {
  constructor() {
    const collection = Database.get().getCollection("tips");
    super(collection);
  }
}
