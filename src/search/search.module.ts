import { Module, CacheModule } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';

@Module({
    imports: [CacheModule.register()],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule { }
