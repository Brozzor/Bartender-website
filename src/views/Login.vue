<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section">
        <img
          src="img/cocktail.svg"
          alt="image"
          class="form-image"
        />
      </div>
      <div class="section mt-1 text-white" >
        <h1 style="font-size: 34px;font-weight: 700;">Bartender</h1>
        <h4 style="font-size: 15px;font-weight: 500;">Rentrez le code de la soirée et commandez-vous à boire</h4>
      </div>
      <div class="section mt-1 mb-5">
        <form action="app-pages.html">
          <div class="form-group boxed">
            <div class="input-wrapper">
              <input
                type="text"
                class="form-control form-control-dark mt-3"
                placeholder="Votre prénom"
                maxlength="20"
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
              />
              <i class="clear-input">
              </i>
            </div>
          </div>

          <div class="form-button-group" style="background: #0f1c2d;">
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              C'est partit !
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data(){
      return {
          name: "",
          code: ""
      }
  }
};
</script>

<style>
/* fige le scroll sur téléphone */

</style>