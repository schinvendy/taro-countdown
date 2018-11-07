import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

export default class Countdown extends Component {
  static defaultProps = {
    targetTime: '', // 目标时间
    showText: false, //  显示时分秒
    showDay: false, // 显示天数
    color: '#111', // 字体颜色
    symbol: ':', // 间隔符号
    isStop: false, // 手动停止倒计时
    isClose: false, // 手动关闭倒计时
    onTick: () => {}, // 倒计时过程事件
    onEnd: () => {}, //倒计时结束事件
  };

  state = {
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    targetTimestamp: '',
  };

  componentWillMount() {
    this.formatTargetTime(this.props.targetTime);
  }

  componentWillReceiveProps(props) {
    this.formatTargetTime(props.targetTime);
  }

  componentWillUnmount() {
    this.setState({ targetTimestamp: '' });
  }

  // 处理日期格式
  formatTargetTime(targetTime = '') {
    let time = targetTime.replace(/-/g, '/');
    this.setState(
      {
        targetTimestamp: new Date(time).getTime(),
      },
      () => {
        this.getremainingSecond();
      },
    );
  }
  // 计算剩余时间
  getremainingSecond() {
    if (!this.state.targetTimestamp || this.props.isStop) return;
    // 目标时间
    let targetTimestamp = this.state.targetTimestamp;
    // 当前时间
    let currentTimestamp = new Date().getTime();
    // 剩余时间
    let remainingSecond = Math.floor((targetTimestamp - currentTimestamp) / 1000);
    // 天 时 分 秒
    let day = '';
    let hour = '';
    let minute = '';
    let second = '';
    if (remainingSecond > 0 && !this.props.isClose) {
      day = this.formatNum(parseInt(remainingSecond / 86400));
      hour = this.props.showDay
        ? this.formatNum(parseInt((remainingSecond % 86400) / 3600))
        : this.formatNum(parseInt(remainingSecond / 3600));
      minute = this.formatNum(parseInt((remainingSecond % 3600) / 60));
      second = this.formatNum(parseInt((remainingSecond % 3600) % 60));
      this.timeTick(remainingSecond);
    } else {
      day = hour = minute = second = '00';
      this.onTimeEnd();
    }

    // 是否显示天时分秒文字
    this.props.showDay && (day += '天');
    if (this.props.showText) {
      hour += '时';
      minute += '分';
      second += '秒';
    }
    this.setState({
      day,
      hour,
      minute,
      second,
    });
  }
  // 格式数字
  formatNum(num) {
    return num > 9 ? `${num}` : `0${num}`;
  }
  // 倒计时过程事件
  timeTick(remainingSecond) {
    setTimeout(() => {
      this.props.onTick && this.props.onTick(remainingSecond);
      this.getremainingSecond();
    }, 1000);
  }
  // 倒计时结束触发事件
  onTimeEnd() {
    this.props.onEnd && this.props.onEnd();
  }

  render() {
    const { withBorder, color, symbol, showDay, className } = this.props;
    const { day, hour, minute, second } = this.state;
    const countdownClass = classNames(
      'countdown',
      {
        'with-border': withBorder,
      },
      className,
    );
    const countdownStyle = {
      color: color,
    };
    return (
      <View className={countdownClass} style={countdownStyle}>
        {showDay && <Text className="day">{day}</Text>}
        <Text className="hour">{hour}</Text>
        <Text className="symbol">{symbol}</Text>
        <Text className="minute">{minute}</Text>
        <Text className="symbol">{symbol}</Text>
        <Text className="second">{second}</Text>
      </View>
    );
  }
}
