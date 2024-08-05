import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment/payment.controller';

@Module({})
export class PaymentModule {
    controllers: [PaymentController]
}
