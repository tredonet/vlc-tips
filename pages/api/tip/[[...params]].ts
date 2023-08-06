import "reflect-metadata";
import Tip from "models/Tip";
import { Body, createHandler, Get, Param, Post, Query } from "next-api-decorators";
import { Auth, DB } from "middlewares";

@DB()
class TipController {
  @Get()
  async listTips(@Query("listId") listId: string) {
    if (!listId) return [];
    return await Tip.find({ listId });
  }

  @Post("/:id")
  @Auth()
  async updateTip(@Param("id") id: string, @Body() body: any) {
    const tip = await Tip.findById(id);
    tip.set(body);
    return await tip.save();
  }

  @Post("/:id/delete")
  @Auth()
  async deleteTip(@Param("id") id: string) {
    return await Tip.findByIdAndDelete(id);
  }

  @Post()
  @Auth()
  async createTip(@Body() body: any) {
    const tip = new Tip(body);
    return await tip.save();
  }
}

export default createHandler(TipController);
