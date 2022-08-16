import Location from 'models/Location';
import { Body, Get, Post } from 'decorators';
import { apiHandler } from 'utils/apiHandler';

class LocationController {

  @Get()
  async listLocation() {
    return await Location.find();
  }

  @Post()
  async createLocation(@Body() body: any) {
    const location = new Location(body);
    return await location.save();
  }
}

export default apiHandler(LocationController);
