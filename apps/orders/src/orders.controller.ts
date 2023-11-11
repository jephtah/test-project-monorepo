import { Body, Controller, Req, Post, UseGuards } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import JwtAuthGuard from 'apps/auth/src/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderRequest,
    @Req() req: any,
  ) {
    return this.ordersService.createOrder(
      createOrderDto,
      req.cookies?.Authentication,
    );
  }
}
