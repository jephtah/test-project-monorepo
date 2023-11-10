import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderRequest } from '../dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderRequest) {
    return this.ordersService.createOrder(createOrderDto);
  }
}