import Tip from "models/Tip";
import { Body, Get, Param, Post } from "decorators";
import { apiHandler } from "utils";

class TipController {
  @Get()
  async listTips(@Param("listId") listId = "Raphael") {
    return await Tip.find({ listId });
  }

  @Post()
  async createTip(@Body() body: any) {
    const tip = new Tip(body);
    return await tip.save();
  }
}

export default apiHandler(TipController);
