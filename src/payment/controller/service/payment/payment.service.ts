import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { vnpayConfig } from 'src/payment/config/vnpay.config';
@Injectable()
export class PaymentService {

    createPaymentUrl(orderId: string, amount: number, orderInfo: string): string {
        let date = new Date();
        let vnp_Params: any = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = vnpayConfig.vnp_TmnCode;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_BankCode'] = '';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = "billpayment";
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_ReturnUrl'] = vnpayConfig.vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = '127.0.0.1';
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}${String(currentDate.getHours()).padStart(2, '0')}${String(currentDate.getMinutes()).padStart(2, '0')}${String(currentDate.getSeconds()).padStart(2, '0')}`;
        vnp_Params['vnp_CreateDate'] = formattedDate;
        vnp_Params = this.sortObject(vnp_Params);

        const querystring = require('qs');
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        return vnpayConfig.vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]);
        }
        return sorted;
    }

    verifyReturnUrl(query: any): boolean {
        let vnp_Params: any = {};
        Object.keys(query).forEach((key) => {
            if (key.startsWith('vnp_')) {
                vnp_Params[key] = query[key];
            }
        });

        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];

        vnp_Params = this.sortObject(vnp_Params);
        const querystring = require('qs');
        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        return secureHash === signed;
    }
}
