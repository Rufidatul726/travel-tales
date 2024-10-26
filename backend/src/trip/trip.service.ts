import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) { }

  async create(createTripDto: CreateTripDto, userId?: string) {
    const newTrip = await this.prisma.trips.create({
      data: {
        user_id: userId,
        place_name: createTripDto.place_name,
        location: {
          latitude: createTripDto.location[0],
          longitude: createTripDto.location[1],
        },
        current_location: {
          latitude: createTripDto.location[0],
          longitude: createTripDto.location[1],
        },
        budget: createTripDto.budget,
        days: createTripDto.days,
        start_date: createTripDto.startDate,
        endDate: createTripDto.endDate,
        is_trip_ended: false
      },
    })

    return newTrip;
  }

  async findAll(userId: string) {
    const myTrips = await this.prisma.trips.findMany({
      where: { user_id: userId }
    })
    return myTrips
  }

  async findOne(id: string) {
    const trip = await this.prisma.trips.findUnique({
      where: { id: id }
    })

    if (!trip) {
      throw new NotFoundException("No Trip Found")
    }

    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const trip = await this.findOne(id);
    const updatedTrip = await this.prisma.trips.update({
      where: { id: trip.id },
      data: {
        ...(updateTripDto.place_name && { place_name: updateTripDto.place_name }),
        ...(updateTripDto.location && { location: updateTripDto.location }),
        ...(updateTripDto.budget && { budget: updateTripDto.budget }),
        ...(updateTripDto.days && { days: updateTripDto.days }),
        ...(updateTripDto.startDate && { start_date: updateTripDto.startDate }),
        ...(updateTripDto.endDate && { endDate: updateTripDto.endDate }),
        ...(updateTripDto.description && { description: updateTripDto.description }),
      }
    })


    return updateTripDto;
  }

  remove(id: string) {
    return this.prisma.trips.delete({
      where: { id: id },
    });
  }
}
