import { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

export default class Countdown extends Component {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    targetTime: '', // 目标时间
    showText: false, //  显示时分秒
    showDay: false, // 显示天数
    color: 'inherit', // 字体颜色
    symbol: ':', // 间隔符号
    isClose: false, // 手动关闭倒计时
    onTick: () => {}, // 倒计时过程事件
    onEnd: () => {}, //倒计时结束事件
  };

  constructor() {
    super(...arguments);
    this.state = {
      day: '0',
      hour: '00',
      minute: '00',
      second: '00',
    };
    this.targetTimestamp = null;
  }

  componentDidMount() {
    this.formatTargetTime(this.props.targetTime);
  }

  componentWillUnmount() {
    this.targetTimestamp = null;
  }

  componentDidHide() {
    this.targetTimestamp = null;
  }

  componentDidShow() {
    this.formatTargetTime(this.props.targetTime);
  }

  componentWillReceiveProps(nextProps) {
    const { targetTime } = nextProps;
    if (targetTime !== this.props.targetTime) {
      this.formatTargetTime(targetTime);
    }
  }

  // 处理日期格式
  formatTargetTime(targetTime) {
    if (!targetTime) {
      return;
    }
    // 避免iOS端上的日期格式有问题
    let time = targetTime.replace(/-/g, '/');
    this.targetTimestamp = new Date(time).getTime();
    this.getRemainingSecond();
  }

  // 计算剩余时间秒数
  getRemainingSecond() {
    if (!this.targetTimestamp) return;
    // 当前时间
    let currentTimestamp = new Date().getTime();
    // 剩余时间
    let remainingSecond = Math.floor((this.targetTimestamp - currentTimestamp) / 1000);
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
      day = '0';
      hour = minute = second = '00';
      this.onTimeEnd();
    }
    this.setTimeState(day, hour, minute, second);
  }

  // 设置时间
  setTimeState(day, hour, minute, second) {
    // 是否显示天时分秒文字
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
      this.getRemainingSecond();
    }, 1000);
  }

  // 倒计时结束触发事件
  onTimeEnd() {
    this.targetTimestamp = null;
    this.props.onEnd && this.props.onEnd();
  }

  render() {
    const { color, symbol, showDay, className } = this.props;
    const { day, hour, minute, second } = this.state;
    // 末尾有空格
    let countdownClass = 'countdown ';
    if (className) countdownClass += className;
    const countdownStyle = {
      color: color,
    };
    return (
      <View className={countdownClass} style={countdownStyle}>
        {showDay && day !== '00' && (
          <Text>
            <Text className="day">{day}</Text>
            <Text className="day-text">天</Text>
          </Text>
        )}
        <Text>
          <Text className="hour">{hour}</Text>
          <Text className="symbol">{symbol}</Text>
        </Text>
        <Text className="minute">{minute}</Text>
        <Text className="symbol">{symbol}</Text>
        <Text className="second">{second}</Text>
      </View>
    );
  }
}
