import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';

@Module({})
export class RmqModule {
  static forRoot() {
    return {
      module: RmqModule,
      providers: [RmqService],
      exports: [RmqService],
    };
  }
}
