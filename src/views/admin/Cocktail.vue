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
            v-for="(elem, index) in formCreation.consommable"
            :key="index"
          >
            <div class="col">
              <b-form-select
                v-model="formCreation.consommable[index].id"
                :options="consommable"
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
                v-model="formCreation.consommable[index].time"
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
                @click="addConsommable"
                class="btn btn-success btn-sm"
              >
                Ajouter
              </button>
            </div>
            <div class="col">
              <button
                type="button"
                @click="removeConsommable"
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
    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";
export default {
  name: "Cocktail",
  components: {
    BottomMenu,
  },
  data() {
    return {
      formCreation: {
        name: "",
        consommable: [
          {
            "id": "",
            "time": "",
          },
        ],
        img: "",
        isInStock: 1,
      },
      consommable: [{ item: "", name: "Aucun" }],
    };
  },
  methods: {
    async getConsommable() {
      const ret = await this.$store.dispatch("getConsommable");
      for (const elem of ret.data) {
        this.consommable.push({ item: elem.id, name: elem.name });
      }
    },
    addConsommable() {
      if (this.formCreation.consommable.length < 6) {
        this.formCreation.consommable.push({
          "id": "",
          "time": "",
        });
      }
    },
    removeConsommable() {
      if (this.formCreation.consommable.length > 1) {
        this.formCreation.consommable.pop();
      }
    },
    async sendNewCocktail() {
      await this.$store.dispatch("addCocktail", this.formCreation);
    },
  },
  async created() {
    this.getConsommable();
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

.hr {
  height: 1px;
  background-color: #ffffff;
  width: 100%;
  border: none;
}

body {
  height: 100%;
  overflow: visible;
  width: 100%;
  position: sticky;
}
</style>