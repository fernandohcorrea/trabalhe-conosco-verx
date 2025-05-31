import { DatabasesModule } from './databases/databases.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabasesModule],
  exports: [DatabasesModule],
})
export class SharedModule {}
