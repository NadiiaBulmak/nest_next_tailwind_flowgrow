import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
// import { Public } from './auth/decorators/public.decorator';
// import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Public()
  // @Get()
  // @ApiOperation({ summary: 'Health check endpoint' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Server is running',
  //   schema: { example: 'Hello World!' },
  // })
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
