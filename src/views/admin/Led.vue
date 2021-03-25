<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">Bande Led</h1>
        <h4 style="font-size: 15px; font-weight: 500">
          Modifier l'éclairage dans l'appartement
        </h4>
      </div>
      <div
        class="section mt-1 mb-5 pt-3 pb-3"
        style="
          background: #0f1c2f;
          border-top-color: #1b283b;
          border-bottom-color: #1b283b;
        "
      >
        <b-button-group size="" class="mb-2">
          <b-button variant="danger" @click="changeState('off')">OFF</b-button>
          <b-button variant="success" @click="changeState('on')">ON</b-button>
        </b-button-group>

        <b-form-group v-for="item in effects" :key="item" class="form-conf">
          <b-button
            :disabled="!isClickable"
            :style="{ opacity: btnOpacity }"
            @click="startEffect"
            :value="item"
            block
            variant="dark"
            >{{ item }}</b-button
          >
        </b-form-group>

        <b-form-group label="Luminosité :" label-for="range" class="form-conf">
          <b-form-input
            id="range"
            v-model="brightness"
            type="range"
            min="1"
            max="255"
            @change="sendBrightness"
          ></b-form-input>
        </b-form-group>
      </div>
    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";
export default {
  name: "Led",
  components: {
    BottomMenu,
  },
  data() {
    return {
      brightness: 255,
      effects: ["rainbow", "sparkle", "strobe", "fire", "loveMode"],
      isClickable: true,
      btnOpacity: 1,
    };
  },
  methods: {
    async sendBrightness() {
      await this.$store.dispatch("ledBrightness", {
        brightness: this.brightness,
      });
    },
    async changeState(value) {
      await this.$store.dispatch("changeState", value);
    },
    async startEffect(value) {
      this.isClickable = false;
      this.btnOpacity = 0.5;
      await this.$store.dispatch("changeEffect", { name: value.path[0].value });
      this.isClickable = true;
      this.btnOpacity = 1;
    },
  },
};
</script>

<style>
.iconbottom {
  display: inline-flex;
  margin: 1px auto 3px auto;
  font-size: 26px;
  line-height: 1em;
  color: #fff;
  transition: 0.1s all;
  display: block;
  margin-top: 1px;
  margin-bottom: 3px;
}

.form-conf {
  text-align: left;
  color: white;
  margin-bottom: 0.5rem !important;
}
</style>