<template>
<div id="appCapsule">

        <carousel :responsive="{0:{items:1,nav:false},600:{items:3,nav:true}}" :loop="true" class="carousel-slider owl-theme">
            <div class="item p-2" v-for="item in cocktails" :key="item.name">
                <img :src="item.img" class="imaged w-100 mb-4" style="border-radius: .5rem;">
                <h2>{{ item.name }}</h2>
                <p style="background: #0c1624 !important;color: #8195a6;">Reusable components designed for the mobile interface and ready to use.</p>
            </div>
        </carousel>

        <div class="carousel-button-footer">
            <div class="row">
                <div class="col-6">
                    <a href="javascript:;" class="btn btn-secondary btn-lg btn-block goBack">Go Back</a>
                </div>
                <div class="col-6">
                    <a href="app-components.html" class="btn btn-primary btn-lg btn-block">Get Started</a>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  name: 'Home',
  components: { carousel },
  data(){
    return {
      cocktails: [
        {
          name: "Jägerbomb",
          img: "/img/cocktails/jagerbomb.jpg",
          ingredients: ["Jägermeister", "Boisson énergisante"],
          isInStock: true
        },
        {
          name: "Orgasme",
          img: "/img/cocktails/orgasme.jpg",
          ingredients: ["Vodka", "Kas citron", "Sirop de fraise"],
          isInStock: false
        },
        {
          name: "Mojito",
          img: "/img/cocktails/mojito.jpg",
          ingredients: ["Rhum Blanc", "Jus de citrons verts", "Feuilles de menthe", "Sirop de sucre de canne", "Eau gazeuse"],
          isInStock: true
        },
        {
          name: "Tequila Sunrise",
          img: "/img/cocktails/tequila-sunrise.jpg",
          ingredients: ["Tequila", "Jus d'orange", "Sirop de grenadine"],
          isInStock: true
        },
      ]
    }
  }
}
</script>
