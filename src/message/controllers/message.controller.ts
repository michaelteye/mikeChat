import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Get,
    Query,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateMessageDTO } from '../dtos/create-message.dto';
import { MessageResponseDTO } from '../dtos/message-response.dto';
import { MessageService } from '../services/message.service';


/**
 * @class
 * Configures routing endpoint and delegates request to services.
 */
@Controller()
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post('api/message')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createMessage(@Body() data: CreateMessageDTO): Promise<MessageResponseDTO> {
        return this.messageService.createMessage(data);
    }

    @Get('api/conversation')
    @UseGuards(AuthGuard)
    async index(@Query('with') convoWith: string, @Query('page') page: number = 0,
                @Query('limit') limit: number = 10,
                @Req() req: Request) {
        limit = limit > 100 ? 100 : limit;
        return await this.messageService.getConversation(convoWith, req.body.from, { page, limit });
    }
}
