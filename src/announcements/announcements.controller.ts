import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnnouncementsResponse } from '../types';
import { IsEnumStatus } from './dto/is-enum-status.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateAnnouncementDto): Promise<AnnouncementsResponse> {
    if (body.announcements) return this.announcementsService.create(body);
  }

  @Get()
  findAll(
    @Query('')
    { status }: IsEnumStatus,
  ): Promise<AnnouncementsResponse[]> {
    return this.announcementsService.findMany(status);
  }
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AnnouncementsResponse> {
    return this.announcementsService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<AnnouncementsResponse> {
    return this.announcementsService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.announcementsService.remove(id);
  }
}
