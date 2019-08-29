<template>
  <div class="">
  <v-rect
    ref="obj"
    :config="objects[num].config"
  />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    num: Number
  },
  data: () => ({
    obj: {
      dx: 2,
      dy: 2,
      anim: '',
      hasMov: false
    },
    collisions: {
      xP: {},
      yP: {},
      direction: {}
    }
  }),
  computed: {
    ...mapGetters([
      'stage',
      'objects'
    ])
  },
  created() {
    this.objects.forEach((i, index) => {
      Vue.set(this.collisions.direction, index, [])
    })
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.obj.anim = new Konva.Animation((frame) => {
      this.setMovement([this.num, this.obj.dx, this.obj.dy]) // numInArrayOfObjects = 0, dx = 2, dy = 2
      this.isCollisionWithBorders()
      this.isCollisionsWithObj()
    })
    this.$refs.obj.getNode().on('click', () => {
      this.changeMoveStatus(this.obj)
    })
  },
  methods: {
    ...mapActions([
      'setMovement',
      'setRect',
      'getFps'
    ]),
    changeMoveStatus (obj) {
      if (!obj.hasMov) {
        obj.anim.start()
        obj.hasMov = true
      } else {
        obj.anim.stop()
        obj.hasMov = false
      }
    },
    isCollisionWithBorders () {
      let border = this.stage.config
      let self = this.objects[this.num].config
      if (self.y + self.height >= border.height - border.y || self.y <= 0) {
        this.obj.dy = -this.obj.dy
      }
      if (self.x + self.width >= border.width - border.x || self.x <= 0) {
        this.obj.dx = -this.obj.dx
      }
    },
    isCollisionsWithObj () {
      const self = this.objects[this.num].config
      this.objects.forEach((item, index) => {
        if (this.objects[this.num] !== item) {
          if ((self.width + self.x >= item.config.x && self.width + self.x <= item.config.x + item.config.width) ||
            (self.x <= item.config.width + item.config.x && self.x >= item.config.x)) {
            Vue.set(this.collisions.xP, index, true)
            if (this.collisions.direction[index][0] !== 'xP') {
              this.collisions.direction[index].push('xP')
            }
            // if (self.x + self.width <= item.config.x || self.x >= item.config.x + item.config.width) {
            //   Vue.set(this.collisions.xP, index, false)
            //   this.collisions.direction[index].pop()
            // }
          }
          if ((self.y + self.height >= item.config.y && self.y + self.height <= item.config.height + item.config.y) ||
            (self.y <= item.config.y + item.config.height && self.y >= item.config.y)) {
            Vue.set(this.collisions.yP, index, true)
            if (this.collisions.direction[index][0] !== 'yP') {
              this.collisions.direction[index].push('yP')
            }
            // if (self.y + self.height <= item.config.y || self.y >= item.config.y + item.config.height) {
            //   Vue.set(this.collisions.yP, index, false)
            //   this.collisions.direction[index].pop()
            // }
          } else {
            this.collisions.xP[index] = this.collisions.yP[index] = false
            this.collisions.direction[index] = []
          }
          if (this.collisions.xP[index] && this.collisions.yP[index]) {
            if (this.collisions.direction[index][1] === 'xP') {
              this.obj.dx = -this.obj.dx
            } else {
              this.obj.dy = -this.obj.dy
            }
            this.collisions.xP[index] = this.collisions.yP[index] = false
            this.collisions.direction[index] = []
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
