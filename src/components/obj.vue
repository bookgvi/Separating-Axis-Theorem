<template>
  <div class="">
  <v-rect
    ref="obj"
    :config="objects[num].config"
  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    num: Number
  },
  data: () => ({
    obj: {
      anim: '',
      hasMov: false
    }
  }),
  computed: {
    ...mapGetters([
      'objects'
    ])
  },
  mounted () {
    this.obj.anim = new Konva.Animation(() => {
      this.setMovement([this.num, 2, 2]) // numInArrayOfObjects = 0, dx = 2, dy = 2
    })
    this.$refs.obj.getNode().on('click',() => {
      this.changeMoveStatus(this.obj)
    })
  },
  methods: {
    ...mapActions ([
      'setMovement',
    ]),
    changeMoveStatus (obj) {
      if (!obj.hasMov) {
        obj.anim.start()
        obj.hasMov = true
      } else {
        obj.anim.stop()
        obj.hasMov = false
      }
    }
  }
}
</script>

<style scoped>

</style>
