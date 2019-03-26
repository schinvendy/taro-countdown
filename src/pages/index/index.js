import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import Countdown from '../../components/countdown';

import './index.scss';

export default class Index extends Component {
  static options = {
    addGlobalClass: true,
  };

  config = {
    navigationBarTitleText: '首页',
  };

  constructor() {
    super(...arguments);
    this.state = {
      targetTime: '',
      count: 60,
      time1: '',
      isClose: false,
      // 输入的数值
      inputTargetTime: '',
      inputCount: '',
    };
  }

  componentDidMount() {
    this.setState({
      targetTime: '2019-12-30 20:00:00',
    });
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
  }

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

  onTimeTick = second => {
    this.setState({ second });
  };

  onCountTick = second => {
    console.log(second);
  };

  onDateChange = e => {
    this.setState({
      targetTime: e.detail.value,
    });
  };

  onInput = (type, e) => {
    if (type === 'count') {
      this.setState({
        inputCount: e.detail.value,
      });
    } else {
      this.setState({
        inputTargetTime: e.detail.value,
      });
    }
  };

  onBtnClick = type => {
    if (type === 'count') {
      this.setState({
        count: this.state.inputCount,
      });
    } else {
      let d = new Date(this.state.inputTargetTime);
      if (!(d instanceof Date && !isNaN(d))) {
        Taro.showToast({
          icon: 'none',
          title: 'Invalid Date',
        });
        return;
      }
      this.setState({
        targetTime: this.state.inputTargetTime,
      });
    }
  };

  render() {
    const { targetTime, count, time1 } = this.state;
    return (
      <View className="demo">
        <View>目标时间： {targetTime}</View>
        <View className="m-t-2">
          <Input
            className="demo-input"
            type="text"
            placeholder="输入目标时间(符合日期格式)"
            onInput={this.onInput.bind(this, 'targetTime')}
          />
          <Button size="mini" type="default" onClick={this.onBtnClick.bind(this, 'targetTime')}>
            确定
          </Button>
        </View>
        <View className="m-t-2">
          <Input
            className="demo-input"
            type="text"
            placeholder="输入倒计秒数"
            onInput={this.onInput.bind(this, 'count')}
          />
          <Button size="mini" type="default" onClick={this.onBtnClick.bind(this, 'count')}>
            确定
          </Button>
        </View>
        <View className="demo-section">
          <View className="title">基础使用（时间倒计时）</View>
          <Countdown targetTime={targetTime} />
          <View className="title">基础使用（秒数倒计时）</View>
          <Countdown count={count} onEnd={this.onTimeEnd.bind(this)} />
          <Countdown
            className="demo-class m-l-2"
            color="#2196F3"
            count={count}
            onTick={this.onCountTick.bind(this)}
            onEnd={this.onTimeEnd.bind(this)}
          />
          <View className="title">异步赋值（3秒后），再3秒后目标时间为：2019-12-31 23:30:30</View>
          <Countdown targetTime={time1} />
          <View className="title">修改间隔符号</View>
          <Countdown targetTime={targetTime} symbol="--" />
          <View className="title">修改字体颜色</View>
          <Countdown targetTime={targetTime} color="#2196F3" />
        </View>
        <View className="demo-section">
          <View className="title">自定义样式</View>
          <Countdown className="demo-class" targetTime={targetTime} />
        </View>
        <View className="demo-section">
          <View className="title">显示天数、时分秒</View>
          <View>
            <Countdown className="demo-class" showDay targetTime={targetTime} />
          </View>
          <View className="m-t-2">
            <Countdown className="demo-class" showText targetTime={targetTime} />
          </View>
          <View className="m-t-2">
            <Countdown className="demo-class" showDay showText targetTime={targetTime} symbol="/" />
          </View>
        </View>
        <View className="demo-section">
          <View className="title">倒计时过程事件</View>
          <View className="m-b-2">剩余秒数：{this.state.second}</View>
          <Countdown targetTime={targetTime} showText showDay color="#2196F3" onTick={this.onTimeTick.bind(this)} />
        </View>
        <View className="demo-section">
          <View className="title">手动结束事件</View>
          <View className="m-b-2">
            <Button size="mini" type="default" onClick={this.onCloseCountdown.bind(this, true)}>
              结束倒计时
            </Button>
          </View>
          <Countdown targetTime={targetTime} isClose={this.state.isClose} onEnd={this.onTimeEnd.bind(this)} />
        </View>
      </View>
    );
  }
}
