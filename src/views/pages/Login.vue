<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.jpg')"
              max-height="100px"
              max-width="200px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl text-center font-weight-semibold text--primary mb-2">
            Patyson Beach Club
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-if='!showLogin'
              v-model="phone"
              v-mask="'(###)-###-##-##'"
              outlined
              label="Номер мобільного телефону"
              placeholder="(###)-###-##-##"
              hide-details
              :loading="loadingGetOTP"
              class="mb-3"
            >
              <h3
                class="font-weight-semibold"
                slot="prepend"
                color="green"
              >+38</h3>
            </v-text-field>

            <div v-else>
              <p>Введіть код із СМС</p>
              <v-otp-input
                v-model="otp"
                type="password"
                length="6"
                outlined
                label="Код з СМС"
              ></v-otp-input>
            </div>

            <v-btn
              v-if="!showLogin"
              :loading="loadingGetOTP"
              id="captcha-check"
              block
              color="primary"
              class="mt-6"
              @click="getOTP"
            >
              Отримати код
            </v-btn>

            <v-btn
              v-else
              id="captcha-check"
              block
              color="primary"
              class="mt-6"
              @click="continueOTP"
            >
              Ввійти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
    <div id="recaptcha-container"></div>
    <br>
    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
// eslint-disable-next-line object-curly-newline
import {
  mdiFacebook,
  mdiTwitter,
  mdiGithub,
  mdiGoogle,
  mdiEyeOutline,
  mdiEyeOffOutline,
} from '@mdi/js'
import { auth } from '@/utils/db'

let confirmationResult = null

export default {
  data() {
    return {
      phone: '',
      otp: '',
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      socialLink: [
        {
          icon: mdiFacebook,
          color: '#4267b2',
          colorInDark: '#4267b2',
        },
        {
          icon: mdiTwitter,
          color: '#1da1f2',
          colorInDark: '#1da1f2',
        },
        {
          icon: mdiGithub,
          color: '#272727',
          colorInDark: '#fff',
        },
        {
          icon: mdiGoogle,
          color: '#db4437',
          colorInDark: '#db4437',
        },
      ],
      appVerifier: '',
      showLogin: false,
      loadingGetOTP: false,
    }
  },
  mounted() {
    this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { size: 'invisible' })
  },
  methods: {
    getOTP() {
      this.loadingGetOTP = true
      auth.signInWithPhoneNumber(`+38${this.phone.replace( /^\D+/g, '')}`, this.appVerifier)
        .then(res => {
          confirmationResult = res
          this.loadingGetOTP = false
          this.showLogin = true
        })
        .catch(error => {
          this.loadingGetOTP = false
          console.log(error)
        })
    },
    continueOTP() {
      confirmationResult.confirm(this.otp)
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        }).catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang='scss'>
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
