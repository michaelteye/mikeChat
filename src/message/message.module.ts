import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entites/user.entity';
import { AppGateway } from '../app.gateway';
import { MessageController } from './controllers/message.controller';
import { MessageEntity } from './entities/message.entity';
import { MessageService } from './services/message.service';


@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity]), CacheModule.register()],
    controllers: [MessageController],
    providers: [MessageService, AppGateway],
})
export class MessageModule {}
