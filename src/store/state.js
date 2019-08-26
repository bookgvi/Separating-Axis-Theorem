const offsetX = 150
const offsetY = 20
export const state = {
  fps: '',
  stage: {
    config: {
      x: offsetX,
      y: offsetY,
      width: document.documentElement.clientWidth - offsetX,
      height: document.documentElement.clientHeight * 4 / 5 - offsetY
    }
  },
  border: {
    config: {
      points: [],
      fill: '#eeeeee',
      stroke: '#000000',
      strokeWidth: 2,
      closed: true
    }
  },
  objects: []
}
