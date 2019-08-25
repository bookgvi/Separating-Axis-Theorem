<template>
  <div id="app">
    <img alt="Vue logo" width="5%" src="./assets/logo.png">
    <v-stage
      :config="stage.config"
    >
    <v-layer ref="bg">
      <v-line
        :config="border.config"
      />
    </v-layer>
    <v-layer ref="main">
      <obj
        v-for="item in objectCount"
        :key="item"
        :num="item - 1"
      />
    </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import obj from './components/obj'
export default {
  data: () => ({
    objectCount: 15,
    x: 10,
    y: 10,
    width: 70,
    height: 70
  }),
  components: {
    obj
  },
  created () {
    this.setBorder()
    for (let i = 0; i < this.objectCount; i++){
      this.x += this.width + 5
      this.setRect([i, { config: { x: this.x , y: this.y, width: this.width, height: this.height, fill: '#0095ee' } }])
    }
    console.log(this.objects)
  },
  computed: {
    ...mapGetters([
      'stage',
      'border',
      'objects'
    ])
  },
  methods: {
    ...mapActions([
      'setBorder',
      'setRect'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
