<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">Configuration</h1>
        <h4 style="font-size: 15px; font-weight: 500">
          Configurer votre bar avec les ingrédients de votre choix
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

          <b-form-group
            id="fieldset-1"
            :label="'Pompe ' + (i+1)"
            :label-for="'pump' + (i+1)"
            class="form-conf"
            v-if="bar.pumps.length"
            v-for="(pump, i) in bar.pumps"
          >
            <b-form-select
              id="pump1"
              v-model="bar.pumps[i]"
              :options="consumable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-7"
            label="Code secret"
            label-for="code"
            class="form-conf"
          >
            <input
              id="code"
              type="number"
              class="form-control form-control-dark mt-2"
              placeholder="Code de l'événement'"
              max="999999"
              min="1"
              v-model="bar.eventPassword"
            />
          </b-form-group>

          <div class="mt-4">
            <button type="button" @click="sendNewConf" class="btn btn-success btn-lg btn-block" :disabled="!buttonIsClickable">
              Sauvegarder
            </button>
          </div>
        
      </div>
    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import BottomMenu from '../../components/BottomMenu.vue';
export default defineComponent({
  name: 'Configuration',

  components: {
    BottomMenu,
  },

  data() {
    return {
      bar: {
        pumps: [],
        eventPassword: '',
      },
      consumable: [{ item: '', name: 'Aucun' }],
      configuration: [],
      buttonIsClickable: true
    };
  },

  methods: {
    async getConsumables() {
      const res = await this.$store.dispatch('getConsumables');
      if (!res.data) return;
      for (const elem of res.data) {
        this.consumable.push({ item: elem.id, name: elem.name });
      }
    },
    async getBar() {
      const res = await this.$store.dispatch('getBar');
      this.bar = res.data;
      if (!this.bar.pumps.length) {
        this.bar.pumps = new Array(this.bar.nbPumps).fill('');
      }
    },
    async sendNewConf() {
      this.buttonIsClickable = false
      await this.$store.dispatch('editBar', this.bar);
      this.buttonIsClickable = true
    },
  },

  async created() {
    this.getBar();
    this.getConsumables();
  },
});
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