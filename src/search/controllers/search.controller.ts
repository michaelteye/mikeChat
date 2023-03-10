import { Controller, UseGuards, Get, Param, HttpException, HttpStatus, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { QueryDTO } from '../dtos/query.dto';
import { SearchService } from '../services/search.service';

@Controller('api/search')
@UseGuards(AuthGuard)
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/:index')
    async getAllCollection(@Param() params): Promise<object> {
        try {
            return await this.searchService.search(params.index, { query: { match_all: {} }});
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/:index')
    @UsePipes(new ValidationPipe())
    async getCollection(@Param() params, @Body() query: QueryDTO): Promise<object> {
        delete query.from;
        try {
            return await this.searchService.search(params.index, query);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
