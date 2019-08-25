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
      <obj :num=0 />
      <obj :num=1 />
    </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import obj from './components/obj'
export default {
  components: {
    obj
  },
  created () {
    this.setBorder()
    this.setRect([0, { config: { x: 10, y: 10, width: 90, height: 90, fill: '#0095ee' } }])
    this.setRect([1, { config: { x: 200, y: 10, width: 90, height: 90, fill: '#ee0000' } }])
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
