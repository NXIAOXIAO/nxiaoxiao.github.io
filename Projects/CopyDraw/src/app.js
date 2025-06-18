import Logger from './common/logger.js'
import { setupToolbar, setupFunc } from './controls/toolbar.js'
import { setupCanvas, resizeCanvas } from './controls/canvas.js'
import { viewport } from './core/viewport.js'
import { debugData, globalData } from './core/globalData.js'
import { worldToCanvas } from './common/utils.js'

//开发时设置成DEBUG
Logger.setLevel('INFO')

//加载控件
const app = document.getElementById('app')
setupCanvas(app)
setupToolbar()
setupFunc()
//注册全局事件
window.addEventListener('resize', function () {
  resizeCanvas(app)
  viewport.update({ width: app.clientWidth, height: app.clientHeight })
})

// 阻止浏览器默认右键菜单的显示
document.addEventListener('contextmenu', function (event) {
  event.preventDefault()
})

//加载全局数据
//从数据库加载

await globalData.load()

//测试一下坐标转换函数
//Logger.debug(worldToCanvas(400, 400))
//先加入一些测试数据看看情况
// debugData()

//进行渲染
viewport.update({ width: app.clientWidth, height: app.clientHeight })
