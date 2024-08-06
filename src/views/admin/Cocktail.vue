<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">Cocktails</h1>
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
            placeholder="Nom du coktail"
            v-model="formCreation.name"
          />
        </b-form-group>

        <b-form-group>
          <input
            type="text"
            class="form-control form-control-dark mt-2"
            placeholder="Image"
            v-model="formCreation.img"
          />
        </b-form-group>

        <b-form-group>
          <div
            class="row mt-1"
            v-for="(elem, index) in formCreation.consumable"
            :key="index"
          >
            <div class="col">
              <b-form-select
                v-model="formCreation.consumable[index].id"
                :options="consumable"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                style="
                  color: #ffffff !important;
                  background-color: #1b283b !important;
                  border-color: #1b283b !important;
                "
              ></b-form-select>
            </div>
            <div class="col">
              <b-form-input
                v-model="formCreation.consumable[index].time"
                class="form-control-dark"
                type="number"
                placeholder="Temps(ms)"
              ></b-form-input>
            </div>
          </div>
        </b-form-group>

        <div class="container">
          <div class="row">
            <div class="col">
              <button
                type="button"
                @click="addConsumable"
                class="btn btn-success btn-sm"
              >
                Ajouter
              </button>
            </div>
            <div class="col">
              <button
                type="button"
                @click="removeConsumable"
                class="btn btn-danger btn-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button
            type="button"
            @click="sendNewCocktail"
            class="btn btn-success btn-lg btn-block"
          >
            Crée le cocktail
          </button>
        </div>
      </div>

      <b-list-group v-if="loaded" class="mb-5">
        <b-list-group-item
          href="#"
          class="mt-1"
          v-for="cocktail in cocktails"
          :key="cocktail.id"
          style="background-color: #0f1c2f"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ cocktail.name }}</h5>
          </div>

        <div class="d-flex justify-content-between">
          <ul class="text-left">
            <li class="text-white" v-for="consumable in cocktail.ingredients" :key="consumable.id">{{consumable}}</li>
          </ul>
          <b-button @click="sendRemoveCocktail(cocktail.id)" variant="outline-danger">Supprimer</b-button>
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
  name: 'Cocktail',

  components: {
    BottomMenu,
  },

  data() {
    return {
      formCreation: {
        name: '',
        consumable: [
          {
            id: '',
            time: '',
          },
        ],
        img: '',
        isInStock: 1,
      },
      consumable: [{ item: '', name: 'Aucun' }],
      cocktails: [],
      loaded: false
    };
  },

  methods: {
    async getCocktail() {
      this.loaded = false;
      const res = await this.$store.dispatch('getCocktail');
      this.cocktails = res.data;
      await this.addConsumableToCocktail()
    },
    async addConsumableToCocktail() {
      const consumable = await this.$store.dispatch('getConsumable');
      for (let elem of this.cocktails) {
        elem.ingredients = [];
        for (const elem2 of elem.consumable) {
          for (const elem3 of consumable.data) {
            if (elem2.id == elem3.id) {
              elem.ingredients.push(elem3.name);
              break;
            }
          }
        }
      }
      this.loaded = true;
    },
    async getConsumable() {
      const ret = await this.$store.dispatch('getConsumable');
      for (const elem of ret.data) {
        this.consumable.push({ item: elem.id, name: elem.name });
      }
    },
    addConsumable() {
      if (this.formCreation.consumable.length < 6) {
        this.formCreation.consumable.push({
          id: '',
          time: '',
        });
      }
    },
    removeConsumable() {
      if (this.formCreation.consumable.length > 1) {
        this.formCreation.consumable.pop();
      }
    },
    async sendNewCocktail() {
      await this.$store.dispatch('addCocktail', this.formCreation);
      await this.getCocktail();
    },
    async sendRemoveCocktail(id) {
      await this.$store.dispatch('removeCocktail', id);
      await this.getCocktail();
    },
  },

  async created() {
    await this.getConsumable();
    await this.getCocktail();
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
</style>