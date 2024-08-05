import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from '../service/payment/payment.service';
import { Controller, Get, Query, Redirect } from '@nestjs/common';
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {

    constructor(private readonly payment_Service: PaymentService) {}


  @Get('create_payment_url')
  createPaymentUrl(@Query('orderId') orderId: string, @Query('amount') amount: number, @Query('orderInfo') orderInfo: string) {
    const paymentUrl = this.payment_Service.createPaymentUrl(orderId, amount, orderInfo);
    return { url: paymentUrl };
  }

  @Get('vnpay_return')
  handleVnpayReturn(@Query() query: any) {
    const isValid = this.payment_Service.verifyReturnUrl(query);
    if (isValid) {
      // Update your order status here
      return { message: 'Payment successful' };
    } else {
      return { message: 'Payment verification failed' };
    }
  }
}
