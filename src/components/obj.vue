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
      dx: 2,
      dy: 2,
      anim: '',
      hasMov: false
    },
    collisions: {
      xP: false,
      yP: false
    }
  }),
  computed: {
    ...mapGetters([
      'stage',
      'objects'
    ])
  },
  mounted () {
    this.obj.anim = new Konva.Animation(() => {
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
      'setRect'
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
      // let y = Math.max(self.y + self.height, border.height)
      if (
        self.y + self.height >= border.height - border.y || self.y <= 0) {
        this.obj.dy = -this.obj.dy
      }
      if (self.x + self.width >= border.width - border.x || self.x <= 0) {
        this.obj.dx = -this.obj.dx
      }
    },
    isCollisionsWithObj () {
      const self = this.objects[this.num].config
      let dx, dy
      this.objects.forEach(item => {
        if (this.objects[this.num] !== item) {
          if ((self.width + self.x >= item.config.x && self.width + self.x <= item.config.x + item.config.width) ||
            (self.x <= item.config.width + item.config.x && self.x >= item.config.x)) {
            this.xP = true
            if (self.x > item.config.x + item.config.width || self.x + self.width < item.config.x) {
              this.xP = false
            }
          }
          if ((self.y + self.height >= item.config.y && self.y + self.height <= item.config.height + item.config.y) ||
            (self.y <= item.config.y + item.config.height && self.y >= item.config.y)) {
            this.yP = true
            if (self.y + self.height < item.config.y || self.y > item.config.y + item.config.height) {
              this.yP = false
            }
          }
          else {
            this.xP = this.yP = false
          }
          if (this.xP && this.yP) {
            this.obj.dx = -this.obj.dx
            this.obj.dy = -this.obj.dy
            this.xP = this.yP = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
