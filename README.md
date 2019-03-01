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
this.state = {
  targetTime: '',
  time1: '',
  isClose: false,
};
```

## 基础使用

```jsx
<Countdown targetTime={this.state.targetTime} />
<Countdown targetTime="2019-12-30 20:00:00" />
```

> 以下 targetTime 均为 this.state.targetTim；time1 均为 this.state.time1

## 异步赋值

3 秒后赋值，再 3 秒后设置目标时间为：2019-12-31 23:30:30

```js
setTimeout(() => {
  this.setState(
    {
      time1: '2019-12-30 20:00:00',
    },
    () => {
      setTimeout(() => {
        this.setState({
          time1: '2019-12-31 23:30:30',
        });
      }, 3000);
    },
  );
}, 3000);
```

```jsx
<Countdown targetTime={time1} />
```

## 修改间隔符号

```jsx
<Countdown targetTime={time1} symbol="--" />
```

## 修改字体颜色

```jsx
<Countdown targetTime={time1} color="#2196F3" />
```

## 自定义样式

```scss
.demo-class {
  padding: 8px 20px;
  background: linear-gradient(to top right, #ff6355, #fe4737);
  color: #fff !important;
  border: 1px solid #fe4737;
  border-radius: 100px;
  font-family: Arial, Helvetica, sans-serif;
  .symbol,
  .day-text {
    margin: 0 8px;
  }
}
```

```jsx
<Countdown className="demo-class" targetTime={targetTime} />
```

## 显示天数、时分秒

```jsx
<Countdown className="demo-class" showDay targetTime={targetTime} />

<Countdown className="demo-class" showText targetTime={targetTime} />

<Countdown className="demo-class" showDay showText targetTime={targetTime} symbol="/" />
```

## 倒计时过程事件

```js
onTimeTick = second => {
  this.setState({ second });
};
```

```jsx
<View className="m-b-2">剩余秒数：{this.state.second}</View>

<Countdown targetTime={targetTime} showText showDay color="#2196F3" onTick={this.onTimeTick.bind(this)} />
```

## 手动结束事件

```js
onCloseCountdown = state => {
  this.setState({
    isClose: state,
  });
};

onTimeEnd = () => {
  Taro.showToast({
    title: '倒计时结束',
  });
  console.log('倒计时结束触发事件');
};
```

```jsx
<Button size="mini" type="default" onClick={this.onCloseCountdown.bind(this, true)}>结束倒计时</Button>

<Countdown targetTime={targetTime} isClose={this.state.isClose} onEnd={this.onTimeEnd.bind(this)} />
```

# 参数

| 参数       | 说明           | 类型    | 可选值 | 默认值  |
| :--------- | :------------- | :------ | :----- | :------ |
| targetTime | 目标时间       | String  | 必填项 |         |
| color      | 字体颜色       | String  | -      | inherit |
| symbol     | 间隔符号       | String  | -      | ：      |
| showText   | 是否显示时分秒 | Boolean | -      | false   |
| isClose    | 是否关闭倒计时 | Boolean | -      | false   |

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
