import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { DB } from "middlewares";
import User from "models/User";
import { BadRequestException, Body, createHandler, Post, UnauthorizedException } from "next-api-decorators";

const JWT_SECRET = process.env.JWT_SECRET || "this-is-a-secret";

class AuthController {
  @Post()
  @DB()
  async login(@Body() body: any) {
    const { username, password } = body;
    if (!username || !password) throw new BadRequestException("fields_missing");
    const user = await User.findOne({ username });
    if (!user) throw new UnauthorizedException();
    if (!compareSync(password, user.password)) throw new UnauthorizedException();
    const bearer_token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user.username }, JWT_SECRET);
    return { bearer_token };
  }
}

export default createHandler(AuthController);
