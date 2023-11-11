import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './order.repository';
import { BILLING_SERVICE } from './constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderRequest,
    authentication: string,
  ) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(createOrderDto, {
        session,
      });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          createOrderDto,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
