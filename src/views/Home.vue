<template>
  <div class="mt-2">
    <Carousel
      v-if="loaded"
      :itemsToShow="1" :wrapAround="true" :transition="400" v-model="selected"
    >
    <Slide v-show="cocktails" class="item p-2 d-flex flex-column" v-for="cocktail in cocktails" :key="cocktail.name">
        <img
          :src="cocktail.img"
          class="imaged w-100 mb-4"
          style="border-radius: 0.5rem"
        />
        <h2 class="text-white">{{ cocktail.name }}</h2>
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
            v-for="consumable in cocktail.consumables"
            :key="consumable"
          >
            {{ consumable.name }}
          </p>
        </div>
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
    <div v-else>
      Aucun cocktails disponible
    </div>

    <div class="carousel-button-footer">

      <div v-if="cocktails.length && cocktails[selected].isInStock" class="row">
        <div class="col-4 pr-0 pl-3">
          <b-form-select
            v-model="alcoolPower"
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
            @click="orderCocktail"
            style="width: 100%;"
            class="btn btn-primary btn-lg btn-block"
          >
            Servir
          </button>
        </div>
      </div>

        <div v-else class="px-3">
          <button
            @click="orderCocktail"
            class="btn btn-danger btn-lg btn-block"
            style="opacity: .5;width: 100%;"
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
        :value="cocktailTimeCurrent"
        variant="success"
        animated
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
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
  name: 'Home',
  components: { Carousel,
    Slide,
    Pagination },

  data() {
    return {
      cocktails: [],
      options: [
        { item: '1', name: 'Normal' },
        { item: '2', name: 'Chargé' },
        { item: '3', name: 'Majestueux 👑' },
      ],
      selected: 0,
      loaded: false,
      alcoolPower: '1',
      cocktailTimeCurrent: 0,
      cocktailTime: 10500,
      modalShow: false,
      modalShowError: false,
    };
  },

  methods: {
    async getCocktail() {
      const res = await this.$store.dispatch('getCocktail');
      this.cocktails = res.data;
      await this.getConsumables();
      this.loaded = true;
      if (!this.cocktails.length) return
    },
    async getConsumables() {
      const consumables = await this.$store.dispatch('getConsumables');
      for (let elem of this.cocktails) {
        for (const elem2 of elem.consumables) {
          for (const elem3 of consumables.data) {
            if (elem2.id == elem3.id) {
              elem2.name = elem3.name;
              break;
            }
          }
        }
      }
    },
    async orderCocktail() {
      const res = await this.$store.dispatch('orderCocktail', {
        id: this.cocktails[this.selected].id,
        alcoolPower: this.alcoolPower,
        name: localStorage.getItem('name'),
      });
      console.log(res.error)
      if (!res.error){
        this.modalShow = true;
        this.progress();
      }else{
        this.modalShowError = true;
      }
    },
    async progress() {
      await this.sleep(this.cocktailTime / 100);
      this.cocktailTimeCurrent += 1;
      if (this.cocktailTimeCurrent <= this.cocktailTime / 100) {
        return this.progress();
      } else {
        this.cocktailTimeCurrent = 0;
        this.modalShow = false;
      }

    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },

  created() {
    this.getCocktail();
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
.carousel__viewport {
  max-height: 700px;
} 
</style>