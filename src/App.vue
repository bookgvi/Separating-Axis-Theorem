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
    objectCount: 5,
    x: 0,
    y: 10,
    width: 130,
    height: 130
  }),
  components: {
    obj
  },
  created () {
    this.setBorder()
    for (let i = 0; i < this.objectCount; i++) {
      this.setRect([i, {
        config: {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
          fill: '#0095ee',
          shadowColor: '#000000',
          shadowBlur: 10,
          shadowOpacity: 0.5,
          shadowOffset: { x: 5, y: 5 }
        }
      }])
      this.x += this.width + 5
    }
  },
  computed: {
    ...mapGetters([
      'stage',
      'border',
      'objects',
      'fps'
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
