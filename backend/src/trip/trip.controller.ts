import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/users/guard/accessToken.guard';
import { WeatherService } from './weather.service';
import { WeatherParamDto } from './dto/weather-param.dto';


@ApiTags('Trip')
@ApiBearerAuth()
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService,
    private weatherService: WeatherService
  ) { }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto, req.user['sub']);
  }

  @Post('weather-status')
  generalWeatherStatus(@Body() WeatherParamDto: WeatherParamDto) {
    return this.weatherService.getGeneralWeatherInfo(WeatherParamDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('my-trips')
  findAll(@Req() req) {
    return this.tripService.findAll(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id/weather-status')
  getWeatherStatus(@Param('id') id: string) {
    return this.weatherService.getWeatherInfo(id)
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }
}
