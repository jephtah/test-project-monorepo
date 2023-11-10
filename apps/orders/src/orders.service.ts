import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from '../dto/create-order.request';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(createOrderDto: CreateOrderRequest) {
    return this.ordersRepository.create(createOrderDto);
  }
}
