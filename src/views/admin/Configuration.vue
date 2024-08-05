<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">Configuration</h1>
        <h4 style="font-size: 15px; font-weight: 500">
          Définissez chaque pompes sur chaques consommable
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
            label="Pompe 1 :"
            label-for="pump1"
            class="form-conf"
          >
            <b-form-select
              id="pump1"
              v-model="form.pump1"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-2"
            label="Pompe 2 :"
            label-for="pump2"
            class="form-conf"
          >
            <b-form-select
              id="pump2"
              v-model="form.pump2"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-3"
            label="Pompe 3 :"
            label-for="pump3"
            class="form-conf"
          >
            <b-form-select
              id="pump3"
              v-model="form.pump3"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-4"
            label="Pompe 4 :"
            label-for="pump4"
            class="form-conf"
          >
            <b-form-select
              id="pump4"
              v-model="form.pump4"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-5"
            label="Pompe 5 :"
            label-for="pump5"
            class="form-conf"
          >
            <b-form-select
              id="pump5"
              v-model="form.pump5"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-6"
            label="Pompe 6 :"
            label-for="pump6"
            class="form-conf"
          >
            <b-form-select
              id="pump6"
              v-model="form.pump6"
              :options="consommable"
              :class="{ dosage: true }"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="fieldset-7"
            label="Code secret :"
            label-for="code"
            class="form-conf"
          >
            <input
              id="code"
              type="number"
              class="form-control form-control-dark mt-2"
              placeholder="Code de la soirée"
              max="9999"
              min="1"
              v-model="form.party_code"
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
      form: {
        pump1: '',
        pump2: '',
        pump3: '',
        pump4: '',
        pump5: '',
        pump6: '',
        party_code: '',
      },
      consommable: [{ item: '', name: 'Aucun' }],
      configuration: [],
      buttonIsClickable: true
    };
  },

  methods: {
    async getConsommable() {
      const ret = await this.$store.dispatch('getConsommable');
      for (const elem of ret.data) {
        this.consommable.push({ item: elem.id, name: elem.name });
      }
    },
    async getConfiguration() {
      const ret = await this.$store.dispatch('getConfiguration');
      this.configuration = ret.data;
      this.form.pump1 = this.getConf('pump1');
      this.form.pump2 = this.getConf('pump2');
      this.form.pump3 = this.getConf('pump3');
      this.form.pump4 = this.getConf('pump4');
      this.form.pump5 = this.getConf('pump5');
      this.form.pump6 = this.getConf('pump6');
      this.form.party_code = this.getConf('party_code');
    },
    getConf(pump) {
      for (const elem of this.configuration) {
        if (elem.name == pump) {
          return elem.value;
        }
      }
    },
    async sendNewConf() {
      this.buttonIsClickable = false
      const res = await this.$store.dispatch('editConfiguration', this.form);
      this.buttonIsClickable = true
    },
  },

  async created() {
    this.getConfiguration();
    this.getConsommable();
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