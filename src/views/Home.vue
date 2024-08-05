<template>
  <div class="mt-2">
    <carousel
      v-if="loaded"
      :responsive="{
        0: { items: 1, nav: false },
      }"
      :loop="true"
      class="carousel-slider owl-theme"
      @translated="translated"
    >
      <div class="item p-2" v-for="item in cocktails" :key="item.name">
        <img
          :src="item.img"
          class="imaged w-100 mb-4"
          style="border-radius: 0.5rem"
        />
        <h2>{{ item.name }}</h2>
        <p
          style="
            background: #0c1624 !important;
            color: #8195a6;
            font-size: 1.15rem;
            font-weight: 500;
          "
        >
          Ingrédients :
        </p>
        <div class="mt-3">
          <p
            style="margin-bottom: 0.1rem; color: #374a65"
            v-for="ingredient in item.ingredients"
            :key="ingredient"
          >
            {{ ingredient }}
          </p>
        </div>
      </div>
    </carousel>

    <div class="carousel-button-footer">

      <div v-if="form.isInStock" class="row">
        <div class="col-4 pr-0 pl-3">
          <b-form-select
            v-model="form.amount"
            :options="options"
            :class="{
              'btn-lg': true,
              'btn-block': true,
              dosage: true,
              'custom-select': false,
            }"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
        </div>
        <div class="col-8 px-3">
          <button
            @click="toServeCocktail"
            class="btn btn-primary btn-lg btn-block"
          >
            Servir
          </button>
        </div>
      </div>

        <div v-else class="px-3">
          <button
            @click="toServeCocktail"
            class="btn btn-danger btn-lg btn-block"
            style="opacity: .5;"
            disabled
          >
            Hors stock
          </button>
        </div>


    </div>
    <b-modal
      hide-footer
      headerTextVariant="black"
      centered
      title="Votre verre est en train d'etre servis"
      v-model="modalShow"
    >
      <b-progress
        :modelValue="form.cocktailTimeCurrent"
        variant="success"
        striped
        :animated="true"
      ></b-progress>
    </b-modal>

    <b-modal
      hide-footer
      headerTextVariant="danger"
      centered
      title="Aucun verre détecter"
      v-model="modalShowError"
    >
    </b-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import carousel from 'vue-owl-carousel';
export default defineComponent({
  name: 'Home',
  components: { carousel },

  data() {
    return {
      cocktails: [],
      options: [
        { item: '1', name: 'Normal' },
        { item: '2', name: 'Chargé' },
        { item: '3', name: 'Majestueux 👑' },
      ],
      selected: '1',
      loaded: false,
      form: {
        id: '',
        amount: '1',
        name: '',
        cocktailTime: 10500,
        cocktailTimeCurrent: 0,
        isInStock: true
      },
      modalShow: false,
      modalShowError: false,
    };
  },

  methods: {
    async getCocktail() {
      const res = await this.$store.dispatch('getCocktail');
      this.cocktails = res.data;
      await this.getConsommable();
      this.form.id = this.cocktails[0].id;
      this.form.isInStock = this.cocktails[0].isInStock;
      this.loaded = true;
    },
    async getConsommable() {
      const consommable = await this.$store.dispatch('getConsommable');
      for (let elem of this.cocktails) {
        elem.ingredients = [];
        for (const elem2 of elem.consommable) {
          for (const elem3 of consommable.data) {
            if (elem2.id == elem3.id) {
              elem.ingredients.push(elem3.name);
              break;
            }
          }
        }
      }
    },
    async toServeCocktail() {
      
      const res = await this.$store.dispatch('toServeCocktail', this.form);
      console.log(res.error)
      if (!res.error){
        this.modalShow = true;
        this.progress();
      }else{
        this.modalShowError = true;
      }
    },
    translated(data) {
      this.form.id = this.cocktails[data.page.index].id;
      this.form.isInStock = this.cocktails[data.page.index].isInStock;
    },
    async progress() {
      await this.sleep(this.form.cocktailTime / 100);
      this.form.cocktailTimeCurrent += 1;
      if (this.form.cocktailTimeCurrent <= this.form.cocktailTime / 100) {
        return this.progress();
      } else {
        this.form.cocktailTimeCurrent = 0;
        this.modalShow = false;
      }

    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },

  created() {
    this.getCocktail();
    this.form.name = localStorage.name;
  },
});
</script>

<style>
.dosage {
  color: white !important;
  border-color: #8195a6 !important;
  background-color: #8195a6 !important;
  height: 100% !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  border-radius: 0.3rem !important;
}
.modal-title {
  color: black;
}
</style>