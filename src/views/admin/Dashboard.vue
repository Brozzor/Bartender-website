<template>
  <div id="appCapsule" class="pt-0">
    <carousel
      :loop="true"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 3, nav: true },
      }"
      class="carousel-slider owl-theme"
    >
      <div class="item p-2">
        <b-form @submit="onSubmitCocktail">
          <b-form-group
            id="input-group-1"
            label="Nom du cocktail:"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="form[0].nom"
              type="text"
              placeholder="Entrer le nom du cocktail"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form[0].image"
              placeholder="Enter name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Food:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="form[0].ingredients"
              :options="ingredients"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>

      <div class="item p-2">
        <b-form @submit="onSubmitIngredient">
          <b-form-group
            id="input-group-1"
            label="Nom du cocktail:"
            label-for="input-1"
            description=""
          >
            <b-form-input
              id="input-1"
              v-model="form[1].nom"
              type="text"
              placeholder="Entrer le nom du cocktail"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Pump:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="form[1].pump"
              :options="pump"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </carousel>
  </div>
</template>


<script>
import carousel from "vue-owl-carousel";
export default {
  name: "Dashboard",
  components: { carousel },
  data() {
    return {
      form: [
        {
          type: "cocktail",
          nom: "",
          ingredients: [],
          image: "",
        },
        { type: "Ingredient", nom: "", pump: "" },
      ],
      pump: ["Pump1", "Pump2", "Pump3", "Pump4", "Pump5", "Pump6"],
    };
  },
  methods: {
    onSubmitCocktail(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form[0]));
    },
    onSubmitIngredient(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form[1]));
    },
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredient;
    },
  },
};
</script>