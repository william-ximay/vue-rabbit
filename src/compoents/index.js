import ImgView from './ImgView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentsPlugin = {
  install (app) {
    app.component('ImgView', ImgView)
    app.component('XtxSku', XtxSku)
  }
}