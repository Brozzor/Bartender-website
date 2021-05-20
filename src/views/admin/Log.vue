<template>
  <div id="appCapsule" class="pt-0">
    <div class="login-form mt-1">
      <div class="section mt-5 text-white">
        <h1 style="font-size: 34px; font-weight: 700">Logs</h1>
      </div>
      

      <b-list-group v-if="loaded" class="mb-5">
        <b-list-group-item
          href="#"
          class="mt-1 pb-0"
          v-for="log in logs"
          :key="log.id"
          style="background-color: #0f1c2f;"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ log.genre }}</h5>
          </div>
            <p class="text-left">{{ log.value }}</p>
        </b-list-group-item>

      </b-list-group>

    </div>
    <BottomMenu></BottomMenu>
  </div>
</template>

<script>
import BottomMenu from "../../components/BottomMenu.vue";
export default {
  name: "Log",
  components: {
    BottomMenu,
  },
  data() {
    return {
      logs: [],
      loaded: false
    };
  },
  methods: {
    async getLog() {
      const res = await this.$store.dispatch("getLog");
      this.logs = res.data;
      this.loaded = true;
    },
  },
  async created() {
    await this.getLog();
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
</style>