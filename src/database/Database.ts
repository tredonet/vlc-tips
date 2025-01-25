import { MongoClient } from "mongodb";

export class Database {
  private static instance: Database;
  private client: MongoClient;

  private constructor() {
    const url = process.env.MONGO_CONNECTION_STRING!;
    this.client = new MongoClient(url);
    this.connect();
  }

  static get(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    await this.client.connect();
    this.client.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    this.client.on("error", () => {
      console.log("Error connecting to MongoDB");
      setTimeout(this.connect, 5000);
    });
    this.client.on("close", () => {
      console.log("MongoDB connection closed");
      setTimeout(this.connect, 5000);
    });
  }

  async disconnect() {
    await this.client.close();
  }

  getCollection(collectionName: string) {
    return this.client.db("vlctips").collection(collectionName);
  }
}
