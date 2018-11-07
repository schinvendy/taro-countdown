import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import Countdown from '../../components/countdown';

import './index.scss';

export default class Index extends Component {
  static options = {
    addGlobalClass: true,
  };

  config = {
    navigationBarTitleText: '首页',
  };

  state = {
    targetTime: '2018-12-22 20:00:00',
    isStop: false,
    isClose: false,
    second: 0,
  };

  onStopCountdown = () => {
    this.setState({
      isStop: !this.state.isStop,
    });
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
    console.log('倒计时结束触发事件');
  };

  onTimeTick = second => {
    this.setState({ second });
  };

  render() {
    const { targetTime } = this.state;
    return (
      <View className="demo">
        <View>目标时间： {targetTime}</View>
        <View className="demo-section">
          <View className="title">基础使用</View>
          <Countdown targetTime={targetTime} />
        </View>
        <View className="demo-section">
          <View className="title">自定义符号间隔</View>
          <Countdown targetTime={targetTime} symbol="-" />
        </View>
        <View className="demo-section">
          <View className="title">显示文本</View>
          <Countdown targetTime={targetTime} showText />
        </View>
        <View className="demo-section">
          <View className="title">显示天数</View>
          <Countdown targetTime={targetTime} showDay showText />
          <View>
            <Countdown className="m-t-2" targetTime={targetTime} showDay />
          </View>
        </View>
        <View className="demo-section">
          <View className="title">带有边框</View>
          <Countdown targetTime={targetTime} withBorder />
        </View>
        <View className="demo-section">
          <View className="title">改变文本颜色</View>
          <Countdown targetTime={targetTime} withBorder showText showDay color="red" />
          <Countdown className="block m-t-2" targetTime={targetTime} withBorder showText showDay color="#2196F3" />
        </View>
        <View className="demo-section">
          <View className="title">手动操作倒计时事件</View>
          <View>
            <Button className="btn" onClick={this.onStopCountdown}>
              {this.state.isStop ? '开始倒计时' : '停止倒计时'}
            </Button>
            <Button className="btn" onClick={this.onCloseCountdown}>
              结束倒计时
            </Button>
          </View>
          <Countdown
            targetTime={targetTime}
            isStop={this.state.isStop}
            isClose={this.state.isClose}
            onEnd={this.onTimeEnd}
          />
        </View>
        <View className="demo-section">
          <View className="title">倒计时过程事件</View>
          <View className="m-b-2">
            剩余秒数：
            {this.state.second}
          </View>
          <Countdown targetTime={targetTime} withBorder showText showDay color="#2196F3" onTick={this.onTimeTick} />
        </View>
      </View>
    );
  }
}
