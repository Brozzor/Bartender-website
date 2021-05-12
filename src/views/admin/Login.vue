<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section">
        <img
          src="/img/cocktail.svg"
          alt="image"
          class="form-image"
        />
      </div>
      <div class="section mt-1 text-white" >
        <h1 style="font-size: 34px;font-weight: 700;">Panel d'administarion</h1>
        <h4 style="font-size: 15px;font-weight: 500;">Connectez vous</h4>
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
                type="password"
                class="form-control form-control-dark mt-2"
                placeholder="Mot de passe"
                v-model="form.password"
              />
              <i class="clear-input">
              </i>
            </div>
          </div>

          <div class="form-button-group" style="background: #0f1c2d;">
            <button type="submit" class="btn btn-primary btn-block btn-lg" :class="{'opacity-50': !buttonIsClickable}" :disabled="!buttonIsClickable">
              Connection
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
     <font color="#dc3545">Le nom ou le mot de passe est incorrect</font> 
    </b-modal>
  </div>
</template>

<script>

export default {
  name: "AdminLogin",
  data(){
      return {
        form: {
          name: "",
          password: ""
        },
        buttonIsClickable: true,
        modalShow: false
      }
  },
  methods: {
    async login(){
      this.buttonIsClickable = false
      let res = await this.$store.dispatch("loginAdmin", this.form);
      if (res.error != undefined){
        this.modalShow = true
      }else{
        localStorage.tokenSession = res.data.tokenSession
        return this.$router.push({ name: 'Configuration' });
      }
      this.buttonIsClickable = true
    }
  }
};
</script>

<style>
.opacity-50 {
  opacity: .5;
}

</style>