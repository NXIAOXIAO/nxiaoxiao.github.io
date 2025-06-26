import { Element } from './Element.js'
import { Viewport } from '../core/Viewport.js'
// 线元素类
export class LineElement extends Element {
  constructor() {
    super('LineElement')
    this.geometies = []
  }
  /**
   * 选择器渲染方法
   * @param {CanvasRenderingContext2D} ctx
   * @param {Viewport} viewport
   */
  selectorRender(ctx, viewport) {
    if (!this.geometies || this.geometies.length < 2) return
    ctx.beginPath()
    const start = viewport.toCanvas(this.geometies[0].x, this.geometies[0].y)
    ctx.moveTo(start.x, start.y)
    for (let i = 1; i < this.geometies.length; i++) {
      const pt = viewport.toCanvas(this.geometies[i].x, this.geometies[i].y)
      ctx.lineTo(pt.x, pt.y)
    }
    ctx.lineWidth = 4
    ctx.stroke()
    this.geometies.forEach((pt) => {
      const cpt = viewport.toCanvas(pt.x, pt.y)
      ctx.beginPath()
      ctx.arc(cpt.x, cpt.y, 6, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  toJSON() {
    return {
      id: this.id,
      type: 'LineElement',
      geometies: this.geometies ? this.geometies.map((p) => ({ x: p.x, y: p.y })) : [],
      color: this.color,
      width: this.width,
      selected: this.selected
    }
  }
}
