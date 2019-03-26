import { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

export default class Countdown extends Component {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    targetTime: '', // 以时间来进行倒计时
    count: '', // 以秒数来进行倒计时
    color: 'inherit', // 字体颜色

    // targetTime 模式下生效
    showText: false, //  显示时分秒
    showDay: false, // 显示天数
    symbol: ':', // 间隔符号
    isClose: false, // 手动关闭倒计时

    // 共用事件
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
      countText: '0',
    };
    this.targetTimestamp = null;
    this.timer = null;
  }

  componentDidMount() {
    const { targetTime, count } = this.props;
    if (targetTime) {
      this.formatTargetTime(targetTime);
    } else if (count) {
      this.setCountdown(count);
    }
  }

  componentWillUnmount() {
    this.targetTimestamp = null;
    clearInterval(this.timer);
  }

  componentDidHide() {
    this.targetTimestamp = null;
    clearInterval(this.timer);
  }

  componentDidShow() {
    const { targetTime, count } = this.props;
    if (targetTime) {
      this.formatTargetTime(targetTime);
    } else if (count) {
      this.setCountdown(count);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { targetTime, count } = nextProps;
    if (targetTime && targetTime !== this.props.targetTime) {
      this.formatTargetTime(targetTime);
    } else if (count && count !== this.props.count) {
      clearInterval(this.timer);
      this.setCountdown(count);
    }
  }

  setCountdown(count) {
    if (count <= 0) {
      return;
    }
    let second = count;
    this.setState({
      countText: second,
    });
    this.timer = setInterval(() => {
      second--;
      this.setState({
        countText: second,
      });
      this.props.onTick && this.props.onTick(second);
      if (second <= 0) {
        clearInterval(this.timer);
        this.onTimeEnd();
      }
    }, 1000);
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
    this.props.onTick && this.props.onTick(remainingSecond);
    setTimeout(() => {
      this.getRemainingSecond();
    }, 1000);
  }

  // 倒计时结束触发事件
  onTimeEnd() {
    this.targetTimestamp = null;
    this.props.onEnd && this.props.onEnd();
  }

  render() {
    const { color, symbol, showDay, className, targetTime } = this.props;
    const { day, hour, minute, second, countText } = this.state;
    // 末尾有空格
    let countdownClass = 'countdown ';
    if (className) countdownClass += className;
    const countdownStyle = {
      color: color,
    };
    if (targetTime) {
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
    return (
      <View className={countdownClass} style={countdownStyle}>
        <Text className="second">{countText}</Text>
      </View>
    );
  }
}
