import * as types from './mutation-types'

export const actions = {
  getFps: ({commit}, fps) => commit(types.GET_FPS, fps),
  setBorder: ({ commit }) => commit(types.SET_BORDER),
  setRect: ({ commit }, payload) => commit(types.SET_RECT, payload),
  setMovement: ({ commit }, payload) => commit(types.SET_MOVEMENT, payload)
}
