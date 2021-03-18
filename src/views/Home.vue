<template>
  <div class="mt-2">
    <carousel
      v-if="loaded"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 3, nav: true },
      }"
      :loop="true"
      class="carousel-slider owl-theme"
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
      <div class="row">
        <div class="col-4 pr-0 pl-3">
          <b-form-select
            v-model="selected"
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
          <a href="app-components.html" class="btn btn-primary btn-lg btn-block"
            >Servir</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Home",
  components: { carousel },
  data() {
    return {
      cocktails: [
      ],
      options: [
        { item: "1", name: "Normal" },
        { item: "2", name: "Chargé" },
        { item: "3", name: "Majestueux 👑" },
      ],
      selected: "1",
      loaded: false,
    };
  },
  methods: {
    async getCocktail() {
      const res = await this.$store.dispatch("getCocktail");
      this.cocktails = res.data;
      await this.getConsommable();
      this.loaded = true;
    },
    async getConsommable() {
      const consommable = await this.$store.dispatch("getConsommable");
     for (let elem of this.cocktails) {
        elem.ingredients = [];
        for (const elem2 of elem.consommable) {
          for (const elem3 of consommable.data) {
            if (elem2.id == elem3.id) {
              elem.ingredients.push(elem3.name);
              break ;
            }
          }
        }
      }
    },
  },
  created(){
    this.getCocktail()
  }
};
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

/* fige le scroll sur téléphone */

</style>