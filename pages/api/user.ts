import "reflect-metadata";
import { hashSync } from "bcryptjs";
import User from "models/User";
import { BadRequestException, Body, createHandler, HttpCode, Post } from "next-api-decorators";
import { Auth, DB } from "middlewares";

@DB()
class UserController {
  @Post()
  @Auth(true)
  @HttpCode(201)
  async addUser(@Body() body: any) {
    const { username, password } = body;
    if (!username || !password) throw new BadRequestException("fields_missing");
    const existingUser = await User.find({ username });
    if (existingUser.length) throw new BadRequestException("user_already_exists");
    const hash = hashSync(password);
    const user = new User({ username, password: hash, admin: false });
    await user.save();
    return;
  }
}

export default createHandler(UserController);
