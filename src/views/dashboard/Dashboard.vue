<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <div v-html="html" />
    </v-col>
  </v-row>
</template>

<script>
import LiqPay from '@/utils/liqpay'

export default {
  data() {
    return {
      liqpay: null,
      html: null,
    }
  },
  computed: {
  },
  mounted() {
    this.liqpay = new LiqPay('sandbox_i48236945296', 'sandbox_M9xLfSSIhrgNTLzalw7dOfUC3wwK5koQZYDkAVZI')
    this.html = this.liqpay.cnb_form({
      action: 'pay',
      amount: '1',
      currency: 'UAH',
      description: 'description text',
      order_id: 'order_id_2',
      version: '3',
      language: 'uk',
      result_url: 'http://localhost:8080/success',
    }).replace('//static.liqpay.ua/buttons/p1uk.radius.png', 'https://www.liqpay.ua/logo_liqpay_main.svg?v=1651580791759')
  },
}
</script>
