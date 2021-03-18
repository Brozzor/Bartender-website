<template>
  <div id="appCapsule">
    <carousel
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
        <p style="background: #0c1624 !important; color: #8195a6; font-size: 1.15rem;font-weight: 500;">
          Ingrédients :
        </p>
        <div class="mt-3">
          <p style="margin-bottom: 0.1rem;color: #374a65" v-for="ingredient in item.ingredients" :key="ingredient">{{ ingredient }}</p>
        </div>
        
      </div>
    </carousel>

    <div class="carousel-button-footer">
      <div class="row">
      
        <div class="col-4 pr-0 pl-3">
          <b-form-select
            v-model="selected"
            :options="options"
            :class="{'btn-lg':true, 'btn-block':true,  'dosage': true, 'custom-select': false}"
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
        {
          name: "Jägerbomb",
          img: "/img/cocktails/jagerbomb.jpg",
          ingredients: ["Jägermeister", "Boisson énergisante"],
          isInStock: true,
        },
        {
          name: "Orgasme",
          img: "/img/cocktails/orgasme.jpg",
          ingredients: ["Vodka", "Kas citron", "Sirop de fraise"],
          isInStock: false,
        },
        {
          name: "Mojito",
          img: "/img/cocktails/mojito.jpg",
          ingredients: [
            "Rhum Blanc",
            "Jus de citrons verts",
            "Feuilles de menthe",
            "Sirop de sucre de canne",
            "Eau gazeuse",
          ],
          isInStock: true,
        },
        {
          name: "Tequila Sunrise",
          img: "/img/cocktails/tequila-sunrise.jpg",
          ingredients: ["Tequila", "Jus d'orange", "Sirop de grenadine"],
          isInStock: true,
        },
      ],
      options: [
        { item: "1", name: "Normal" },
        { item: "2", name: "Chargé" },
        { item: "3", name: "Majestueux 👑" },
      ],
      selected: "1",
    };
  },
  methods: {
    async getCocktail() {
      const ret = await this.$store.dispatch("getCocktail");
      this.cocktails = ret.data
    },
  },
  created(){
   // this.getCocktail()
  }
};
</script>

<style>
.dosage {
  color: white!important;
  border-color: #8195a6!important;
  background-color: #8195a6!important;
  height: 100%!important;
  font-size: 1rem!important;
  line-height: 1.5!important;
  border-radius: 0.3rem!important;
}

/* fige le scroll sur téléphone */
body {
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: fixed;
}
</style>