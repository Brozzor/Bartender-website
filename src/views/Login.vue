<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form">
      <div class="section">
        <img
          src="img/cocktail.svg"
          alt="image"
          class="form-image"
        />
      </div>
      <div class="section mt-1 text-white" >
        <h1 style="font-size: 34px;font-weight: 700;">Bartender</h1>
        <h4 style="font-size: 15px;font-weight: 500;">Rentrez le code de la soirée et commandez-vous un cocktail</h4>
      </div>
      <div class="section mt-1 mb-5">
        <form @submit.prevent="login">
          <div class="form-group boxed">
            <div class="input-wrapper">
              <input
                type="text"
                class="form-control form-control-dark mt-3"
                placeholder="Votre prénom"
                maxlength="20"
                v-model="form.name"
              />
              <i class="clear-input">
              </i>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <input
                type="number"
                class="form-control form-control-dark mt-2"
                placeholder="Code de la soirée"
                max="9999"
                min="1"
                v-model="form.password"
              />
              <i class="clear-input">
              </i>
            </div>
          </div>

          <div class="form-button-group" style="background: #0f1c2d;">
            <button type="submit" class="btn btn-primary btn-lg" :class="{'opacity-50': !buttonIsClickable}" style="width: 100%" :disabled="!buttonIsClickable">
              C'est partit !
            </button>
          </div>
        </form>
      </div>
    </div>
    <b-modal
      hide-footer
      headerTextVariant="black"
      centered
      title="Code Incorrect"
      v-model="modalShow"
    >
     <div style="color: #dc3545">Le code que vous avez saisi est mauvais</div> 
    </b-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',

  data(){
      return {
        form: {
          name: '',
          password: '',
          loginDate: ''
        },
        buttonIsClickable: true,
        modalShow: false
      };
  },

  methods: {
    async login(){
      this.buttonIsClickable = false
      let res = await this.$store.dispatch('login', this.form);
      if (res.error){
        this.modalShow = true
      }else{
        localStorage.password = this.form.password
        localStorage.name = this.form.name
        localStorage.loginDate = new Date().getTime()
        return this.$router.push({ name: 'Home' });
      }
      this.buttonIsClickable = true
    }
  },
});
</script>

<style lang="scss">
.opacity-50 {
  opacity: .5;
}

.form-control-dark::placeholder {
  color: #fff!important;
}

</style>