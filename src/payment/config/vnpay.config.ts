export const vnpayConfig = {
    vnp_TmnCode: process.env.VNP_TMN_CODE || 'YOUR_TMN_CODE',
    vnp_HashSecret: process.env.VNP_HASH_SECRET || 'YOUR_HASH_SECRET',
    vnp_Url: process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    vnp_ReturnUrl: process.env.VNP_RETURN_URL || 'http://localhost:3000/payment/vnpay_return',
  };
  