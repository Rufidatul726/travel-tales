import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { WeatherService } from './weather.service';


@ApiTags('Trip')
@ApiBearerAuth()
// @UseGuards(AccessTokenGuard)
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService,
    private weatherService: WeatherService
  ) { }

  @Post()
  create(@Req() req, @Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto, req.user['sub']);
  }

  @Get('my-trips')
  findAll(@Req() req) {
    return this.tripService.findAll(req.user['sub']);
  }

  @Get(':id/weather-status')
  getWeatherStatus(@Param('id') id: string) {
    return this.weatherService.getWeatherInfo(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }
}
