import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SessionsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sherstnev:qebeh22@cluster0.gtw16wm.mongodb.net/testwork',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
