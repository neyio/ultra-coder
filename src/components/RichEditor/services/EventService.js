import { getUniqueId } from '../utils';

/**
 * 事件服务类
 */
class EventService {
    
  events = {};
  listeners = {};

  /**
   * 向this.events中增加一个事件，并以eventId为key，返回该值
   * @param {eventId, target, event, listener, capture }
   * @return {string} eventId
   */
  addEventRecordToEvents({ eventId, target, event, listener, capture }) {
    this.events[eventId] = { eventId, target, event, listener, capture };
    target.addEventListener(event, listener, capture);
    return eventId;
  }

  /**
   * 绑定一个事件，并标记一个eventId，并把 {eventId,target,event,listener,capture} 暂存在this.events
   * @param {node} target
   * @param {string} event
   * @param {function} listener 处理函数
   * @param {boolean} capture
   * @return {string}  备注：用于索引取消绑定时的事件及remove时的参数内容
   */
  attachDOMEvent(target, event, listener, capture) {
    if (this.checkIfEventHasBinded({ target, event, listener, capture })) {
      return false;
    }
    return this.addEventRecordToEvents({
      eventId: getUniqueId(),
      target,
      event,
      listener,
      capture,
    });
  }

  /**
   * 移除DOM的事件监听
   * @param  {[type]} eventId
   */
  detachDOMEvent(eventId) {
    if (!eventId) {
      return false;
    }
    if (this.events[eventId]) {
      const { target, event, listener, capture } = this.events[eventId];
      target.removeEventListener(event, listener, capture);
      delete this.events[eventId];
    }
  }

  /**
   * 移除事件监听
   */
  detachAllDOMEvents() {
    Object.keys(this.events).forEach(eventId => this.detachDOMEvent(eventId));
  }

  /**
   * 监听自定义事件 ，第三个参数为 执行一次，默认为false
   * @param {string} event
   * @param {function} listener
   * @param {boolean} once 是否只执行一次
   * @return void
   */
  subscribe(event, listener, once = false) {
    const listeners = this.listeners[event];
    const handler = { listener, once };
    if (listeners && Array.isArray(listeners)) {
      listeners.push(handler);
    } else {
      this.listeners[event] = [handler];
    }
  }

  /**
   * 取消监听的成员数组
   * @param {*} event
   * @param {*} listener
   * @return {array} 返回被移除的事件数组，取消失败时返回空数组
   */
  unsubscribe(event, listener) {
    const eventListeners = this.listeners[event]; //获取事件的监听者
    if (Array.isArray(eventListeners)) {
      const index = eventListeners.findIndex(l => l.listener === listener);
      if (!~index) {
        return [];
      }
      return eventListeners.splice(index, 1);
    } else {
      return [];
    }
  }

  /**
   * [subscribeOnce] usbscribe event and listen once
   */
  subscribeOnce(event, listener) {
    this.subscribe(event, listener, true);
  }

  /**
   * 模拟触发事件，如果只触发一次的事件被触发，则移除该事件监听
   * @param {string} event 事件名称
   * @param  {...any} data
   * @return {output[]} 返回事件执行后的结果数组
   */
  dispatch(event, ...data) {
    const eventListeners = this.listeners[event];
    if (eventListeners && Array.isArray(eventListeners)) {
      return eventListeners.map(({ listener, once }) => {
        const output = listener(...data);
        if (once) {
          this.unsubscribe(event, listener);
        }
        return output;
      });
    }
  }

  /**
   * 判读是否已经进行了事件绑定，防止重复绑定
   * @param { target, event, listener, capture } 被检测的对象
   * @return {boolean} 检查是否绑定了事件
   */
  checkIfEventHasBinded({ target: t, event: e, listener: l, capture: c }) {
    return this.events.some(({ target, event, listener, capture }) => {
      return target === t && event === e && listener === l && capture === c;
    });
  }
}

export default EventService;
