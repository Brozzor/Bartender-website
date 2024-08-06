<template>
  <div
    class="appBottomMenu"
    style="background: #0f1c2f; border-top-color: #1b283b"
  >
    <router-link to="configuration" class="item">
      <div class="col">
        <img
          class="md hydrated iconbottom"
          height="26"
          src="/img/icons/control.svg"
          alt=""
        />
      </div>
    </router-link>

    <router-link to="cocktail" class="item">
      <div class="col">
        <img
          class="md hydrated iconbottom"
          height="26"
          src="/img/icons/cocktail.svg"
          alt=""
        />
      </div>
    </router-link>

    <router-link to="consumable" class="item">
      <div class="col">
        <img
          class="md hydrated iconbottom"
          height="26"
          src="/img/icons/bottle.svg"
          alt=""
        />
      </div>
    </router-link>

    <router-link to="led" class="item">
      <div class="col">
        <img
          class="md hydrated iconbottom"
          height="26"
          src="/img/icons/led-strip.svg"
          alt=""
        />
      </div>
    </router-link>

    <router-link to="log" class="item">
      <div class="col">
        <img
          class="md hydrated iconbottom"
          height="26"
          src="/img/icons/log.svg"
          alt=""
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BottomMenu',
});
</script>