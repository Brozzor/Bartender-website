<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">ingrédients</h1>
      </div>
      <div
        class="section mt-1 mb-5 pt-3 pb-3"
        style="
          background: #0f1c2f;
          border-top-color: #1b283b;
          border-bottom-color: #1b283b;
        "
      >
        <h5 style="text-align: left">Création :</h5>
        <hr class="hr" />

        <b-form-group>
          <input
            type="text"
            class="form-control form-control-dark mt-2"
            placeholder="Nom de l'ingrédient"
            v-model="form.name"
          />
        </b-form-group>
        <b-form-checkbox
            id="checkbox-1"
            v-model="form.isAlcool"
            class="text-white"
            name="checkbox-1"
            >
            Est-ce un produit à base d'alcool ?
        </b-form-checkbox>

        <div class="mt-4">
          <button
            type="button"
            @click="createConsumable"
            class="btn btn-success btn-lg btn-block"
          >
            Ajouter l'ingrédient
          </button>
        </div>
      </div>

      <b-list-group v-if="loaded" class="mb-5">
        <b-list-group-item
          href="#"
          v-for="consumable in consumables"
          :key="consumable.id"
          style="background-color: #0f1c2f"
        >
        
        <div class="d-flex justify-content-between">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 text-white">{{ consumable.name }}</h5>
            </div>
          <b-button @click="sendRemoveConsumable(consumable.item)" variant="outline-danger">Supprimer</b-button>
        </div>
          
        </b-list-group-item>

      </b-list-group>

    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import BottomMenu from '../../components/BottomMenu.vue';
export default defineComponent({
  name: 'Consumable',

  components: {
    BottomMenu,
  },

  data() {
    return {
      form: {
        name: '',
        isAlcool: false,
      },
      consumables: [],
     loaded: false
    };
  },

  methods: {
    async getConsumables() {
      const res = await this.$store.dispatch('getConsumables');
      this.consumables = [];
      for (const elem of res.data) {
        this.consumables.push({ item: elem.id, name: elem.name });
      }
      this.loaded = true;
    },
    async createConsumable() {
      await this.$store.dispatch('addConsumable', this.form);

      await this.getConsumables();
    },
    async sendRemoveConsumable(id) {
      await this.$store.dispatch('removeConsumable', id);
      await this.getConsumables();
    },
  },
  async created() {
    await this.getConsumables();
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

.hr {
  height: 1px;
  background-color: #ffffff;
  width: 100%;
  border: none;
}

.custom-control .custom-control-label {
    padding-left: 10px;
    padding-top: 2px;
    color: white;
}
</style>