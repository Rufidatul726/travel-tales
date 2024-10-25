import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectId } from 'mongodb';
import * as argon2 from 'argon2';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findOneById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email: email }
    })
  }

  async updateToken(id: string, refreshToken: string) {
    // console.log(id, refreshToken);
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return this.prisma.users.update({
      where: { id: id },
      data: { refreshToken: refreshToken },
    })
  }

  async remove(id: string) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }
}
