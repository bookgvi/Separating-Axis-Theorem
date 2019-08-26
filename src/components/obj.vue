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
      yP: false,
      direction: ''
    }
  }),
  computed: {
    ...mapGetters([
      'stage',
      'objects'
    ])
  },
  mounted () {
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
      this.objects.forEach(item => {
        if (this.objects[this.num] !== item) {
          if ((self.width + self.x >= item.config.x && self.width + self.x <= item.config.x + item.config.width) ||
            (self.x <= item.config.width + item.config.x && self.x >= item.config.x)) {
            this.xP = true
            if (!this.direction) { this.direction = 'this.xP' }
            if (self.x > item.config.x + item.config.width || self.x + self.width < item.config.x) {
              this.xP = false
              this.direction = ''
            }
          }
          if ((self.y + self.height >= item.config.y && self.y + self.height <= item.config.height + item.config.y) ||
            (self.y <= item.config.y + item.config.height && self.y >= item.config.y)) {
            this.yP = true
            if (!this.direction) { this.direction = 'this.yP' }
            if (self.y + self.height < item.config.y || self.y > item.config.y + item.config.height) {
              this.yP = false
              this.direction = ''
            }
          }
          else {
            this.xP = this.yP = false
            this.direction = ''
          }
          if (this.xP && this.yP) {
            if (this.direction === 'this.xP') {
              this.obj.dx = -this.obj.dx
              this.obj.dy = -this.obj.dy
            }
            this.direction === 'this.yP' ? this.obj.dy = -this.obj.dy : this.obj.dx = -this.obj.dx
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
