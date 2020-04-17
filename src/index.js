import event from './event'

const Keyboard = {}

Keyboard.install = function (Vue, options) {
  Vue.mixin({
    data: function () {
      return {
        keyboardEvents: []
      }
    },
    beforeDestroy: function () {
      // 在组件销毁之前，解除在该组件中绑定的事件
      this.keyboardEvents.forEach(unbind => {
        if (typeof unbind === 'function') {
          unbind()
        }
      })
      this.keyboardEvents = []
    }
  })
  Vue.prototype.$regKeyboard = function (cmd, fn) {
    const unregister = event.register(cmd, fn)
    this.keyboardEvents.push(unregister)
    return unregister
  }
}

export default Keyboard
