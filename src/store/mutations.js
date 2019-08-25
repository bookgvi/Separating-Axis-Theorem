import * as types from './mutation-types'
import Vue from 'vue'

export const mutations = {
  [types.SET_BORDER]: state => {
    Vue.set(state.border.config.points, 0, state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 1, state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 2, state.stage.config.width - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 3, state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 4, state.stage.config.width - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 5, state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 6, state.border.config.strokeWidth)
    Vue.set(state.border.config.points, 7, state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
  },
  [types.SET_RECT]: (state, payload) => { // payload = [num, {config: {x: coordX, y: coordY, width, height, fill: color }]
    Vue.set(state.objects, payload[0], payload[1])
  },
  [types.SET_MOVEMENT]: (state, payload) => { // payload = [num, dx, dy]
    state.objects[payload[0]].config.x += payload[1]
    state.objects[payload[0]].config.y += payload[2]
  }
}
