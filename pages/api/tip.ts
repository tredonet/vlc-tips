import "reflect-metadata";
import Tip from "models/Tip";
import { Body, createHandler, Get, Post, Query } from "next-api-decorators";
import { Auth, DB } from "middlewares";

@DB()
class TipController {
  @Get()
  async listTips(@Query("listId") listId = "Tonino") {
    return await Tip.find({ listId });
  }

  @Post()
  @Auth()
  async createTip(@Body() body: any) {
    const tip = new Tip(body);
    return await tip.save();
  }
}

export default createHandler(TipController);
