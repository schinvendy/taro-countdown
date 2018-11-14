# 安装及使用

在项目中安装：

```bash
npm i -S taro-countdown
```

```js
import Countdown from 'taro-countdown';

<Countdown targetTime="2018-12-22" />;
```

# 预览

[taro-countdown](https://schinvendy.github.io/taro-countdown/.)

# 功能

```js
state = {
  targetTime: '2018-12-22 20:00:00',
};
```

<!-- ![基本使用](/docs/img/基础使用.png) -->

## 基本使用

```html
<Countdown targetTime={targetTime} />
<Countdown targetTime="2018-12-22 20:00:00" />
```

<!-- ![自定义符号间隔](/docs/img/自定义符号间隔.png) -->

## 自定义符号间隔

```html
<Countdown targetTime={targetTime} symbol="-" />
```

<!-- ![带有边框](/docs/img/带有边框.png) -->

## 带有边框

```html
 <Countdown targetTime={targetTime} withBorder />
```

## 显示文本，自定义样式

```css
.demo-class {
  color: #ffa726 !important;
  font-size: 32px;
  .hour,
  .minute,
  .second {
    position: relative;
    border-radius: 15px;
    border: 1px solid #29b6f6;
    padding: 5px;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      height: 1px;
      width: 100%;
      background: #29b6f6;
    }
  }
  .symbol {
    margin: 0 10px;
    color: #e65100;
  }
}
```

```html
  <Countdown className="demo-class" targetTime={targetTime} showText />
```

## 显示天数

```html
<Countdown targetTime={targetTime} showDay showText symbol="" />
<Countdown targetTime={targetTime} showDay />
```

## 改变文本颜色

```html
<Countdown targetTime={targetTime} withBorder showText showDay color="red" />
<Countdown targetTime={targetTime} showText showDay color="#2196F3" />
```

## 手动操作倒计时事件

```js
state = {
  isClose: false,
};

onCloseCountdown = () => {
  this.setState({
    isClose: true,
  });
};

onTimeEnd = () => {
  Taro.showToast({
    title: '倒计时结束',
  });
};
```

```html
<Button  onClick={this.onCloseCountdown}>结束倒计时</Button>
<Countdown targetTime={targetTime} isClose={this.state.isClose} onEnd={this.onTimeEnd} />
```

## 倒计时过程事件

```js
state = {
  second: 0,
};

onTimeTick = second => {
  this.setState({ second });
};
```

```html
<View>剩余秒数：{this.state.second}</View>
<Countdown targetTime={targetTime} onTick={this.onTimeTick} />
```

# 参数

| 参数       | 说明           | 类型    | 可选值 | 默认值 |
| :--------- | :------------- | :------ | :----- | :----- |
| targetTime | 目标时间       | String  | 必填项 |        |
| color      | 字体颜色       | String  | -      | #111   |
| symbol     | 间隔符号       | String  | -      | ：     |
| showText   | 是否显示时分秒 | Boolean | -      | false  |
| showDay    | 是否显示天数   | Boolean | -      | false  |
| isClose    | 是否关闭倒计时 | Boolean | -      | false  |

# 事件

| 事件名称 | 说明             | 返回参数   |
| :------- | :--------------- | :--------- |
| onTick   | 倒计时过程事件   | 剩余的秒数 |
| onEnd    | 倒计时结束时触发 | -          |

# 该项目的打包命令

```bash
TARO_BUILD_TYPE=ui taro build --ui
```

在 windows 环境下打包的 H5 文件可能不正确，可以尝试

在 cmd 中:

先输入

```bash
set TARO_BUILD_TYPE=ui
```

再输入

```bash
taro build --ui
```

在 PowerShell 中:

先输入

```bash
$env:TARO_BUILD_TYPE=“ui“
```

再输入

```bash
taro build --ui
```
