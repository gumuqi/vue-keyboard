class Register {
  constructor () {
    this.singleCommand = {
      left: 37,
      top: 38,
      right: 39,
      bottom: 40,
      tab: 9,
      back: 8,
      enter: 13,
      esc: 27,
      space: 32
    }
  }

  handleKeyDown (e, keys, fn) {
    const ctrl = e.ctrlKey
    const shift = e.shiftKey
    const alt = e.altKey
    let keyIdent = e.keyIdentifier

    if (ctrl && keys.indexOf('ctrl') === -1) {
      // 按了 ctrl，但是没注册 ctrl
      return
    }
    if (shift && keys.indexOf('shift') === -1) {
      // 按了 shift，但是没注册 shift
      return
    }
    if (alt && keys.indexOf('alt') === -1) {
      // 按了 alt，但是没注册 alt
      return
    }
    if (keys.length === 1 && e.keyCode === this.singleCommand[keys[0]]) {
      // 注册了单个键盘指令
      this.trigger(e, fn)
    }

    if (e.keyCode > 47 && e.keyCode < 91) {
      keyIdent = String.fromCharCode(e.keyCode)

      if (keyIdent.toLowerCase() === keys[keys.length - 1]) {
        // 注册了组合键盘指令
        this.trigger(e, fn)
      }
    }
  }

  trigger (e, fn) {
    e.preventDefault()
    this.beforeTrigger()
    fn(e)
    this.afterTrigger()
  }

  /**
     * 触发事件之前的钩子
     */
  beforeTrigger () {

  }

  /**
     * 触发事件之后的钩子
     */
  afterTrigger () {

  }

  /**
     * 注册键盘事件
     * @param {*单个键或者组合键} cmd
     * @param {*触发事件时的回调} fn
     */
  register (cmd, fn) {
    cmd = cmd || ''
    fn = fn || function () {}
    let keys = cmd.replace(/\s/g, '')
    keys = keys.toLowerCase()
    keys = keys.split('+')
    if (keys.length === 0) {
      console.log('请检查您注册的快捷键')
      return
    }
    const callback = (e) => {
      this.handleKeyDown(e, keys, fn)
    }
    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback)
    }
  }

  registerOnce (cmd, fn) {

  }
}

export default new Register()
