import "reflect-metadata";
import connectDB from "middlewares/db";
import Tip from "models/Tip";
import { Body, createHandler, Get, Post, Query } from "next-api-decorators";

class TipController {
  @Get()
  async listTips(@Query("listId") listId = "Tonino") {
    await connectDB();
    return await Tip.find({ listId });
  }

  // @Post()
  // async createTip(@Body() body: any) {
  //   await connectDB();
  //   const tip = new Tip(body);
  //   return await tip.save();
  // }
}

export default createHandler(TipController);
