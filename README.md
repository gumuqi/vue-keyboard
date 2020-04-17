# vue-keyboard-plugin
用来注册键盘事件
### 注册单个按键
```
import Vue from 'vue'
import VueKBPlugin from 'vue-keyboard-plugin';
Vue.use(VueKBPlugin)
/**
可以注册的单个按键有以下几种，不区分大小写
'left': 向左,
'top': 向上,
'right': 向右,
'bottom': 向下,
'tab': tab键,
'back': backspace键,
'enter': enter键,
'esc': esc键,
'space': 空格键
 */

// 举个例子，在组件 mounted 钩子中注册
module.exports = {
    mounted () {
        this.$regKeyboard('enter', function (e) {
            console.log('您按下了 enter 键')
        })
        this.$regKeyboard('top', function (e) {
            console.log('您按下了向上键')
        })
    }
}

```

### 注册组合按键
```
import Vue from 'vue'
import VueKBPlugin from 'vue-keyboard-plugin';
Vue.use(VueKBPlugin)

/**
可以注册的组合有以下几种
'ctrl+[a-zA-Z]'
'shift+[a-zA-Z]'
'alt+[a-zA-Z]'
'ctrl+shift+[a-zA-Z]'
...

// 举个例子
module.exports = {
    mounted () {
        this.$regKeyboard('alt+s', function (e) {
            console.log('您同时按下了 alt 和 s 两个键')
        })
        this.$regKeyboard('ctrl+alt+s', function (e) {
            console.log('您同时按下了 ctrl 和 alt 和 s 三个键')
        })
    }
}

```
### 手动解除绑定

```
module.exports = {
    mounted () {
        const unregister = this.$regKeyboard('enter', function (e) {
            console.log('您按下了 enter 键')
        })
        // register 函数返回的是一个函数，执行这个函数会解除注册的事件
        unregister();
    }
}
```
### 自动解除绑定

```
module.exports = {
    beforeDestroy () {
        // 插件会在当前组件销毁之前，解除在当前组件上绑定的所有键盘事件
    }
}
```