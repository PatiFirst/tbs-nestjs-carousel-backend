import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*"
  });
  const configService= app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  await app.listen(port);
}
bootstrap();
