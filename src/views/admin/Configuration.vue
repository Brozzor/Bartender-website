<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white" >
        <h1 style="font-size: 34px;font-weight: 700;">Configuration</h1>
        <h4 style="font-size: 15px;font-weight: 500;">Définissez chaque pompes sur chaques consommable</h4>
      </div>
      <div class="section mt-1 mb-5">
        <form>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump1"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump2"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump3"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump4"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump5"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
             <b-form-select
            v-model="pump6"
            :options="consommable"
            :class="{'dosage': true}"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <input
                type="number"
                class="form-control form-control-dark mt-2"
                placeholder="Code de la soirée"
                max="9999"
                min="1"
                v-model="code"
              />
              <i class="clear-input">
              </i>
            </div>
          </div>

          <div class="form-button-group" style="background: #0f1c2d;">
            <button type="submit" class="btn btn-success btn-block btn-lg">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Configuration",
  data(){
      return {
        pump1: "",
        pump2: "",
        pump3: "",
        pump4: "",
        pump5: "",
        pump6: "",
        code: "",
        consommable: [
            { item: "", name: "Aucun" },
        ],
        configuration: []
      }
  },
  methods: {
    async getConsommable () {
      const ret = await this.$store.dispatch('getConsommable')
      for (const elem of ret.data) {
          this.consommable.push({item: elem.id, name: elem.name});
      }

    },
     async getConfiguration () {
      const ret = await this.$store.dispatch('getConfiguration')
      this.configuration = ret.data
      this.pump1 = this.getConf('pump1');
      this.pump2 = this.getConf('pump2');
      this.pump3 = this.getConf('pump3');
      this.pump4 = this.getConf('pump4');
      this.pump5 = this.getConf('pump5');
      this.pump6 = this.getConf('pump6');
      this.code = this.getConf('party_code');
    },
    getConf(pump) {
        for (const elem of this.configuration) {
            if (elem.name == pump){
                return elem.value
            }
        }
       
    }
  },
  async created () {
    this.getConfiguration()
    this.getConsommable()
    
  }
};
</script>