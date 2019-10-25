import { getUniqueId } from '../utils';

class EventService {
  events = [];
  listeners = {};

  /**
   * 绑定一个事件，并标记一个eventId，并把 {eventId,target,event,listener,capture} 暂存在this.events
   * @param {node} target
   * @param {string} event
   * @param {function} listener 处理函数
   * @param {boolean} capture
   * @return {string} eventId 备注：用于索引取消绑定时的事件及remove时的参数内容
   */
  attachDOMEvent(target, event, listener, capture) {
    if (this.checkIfEventHasBinded({ target, event, listener, capture })) {
      return false;
    } else {
      const eventId = getUniqueId();
      target.addEventListener(event, listener, capture);
      this.events.push({
        eventId,
        target,
        event,
        listener,
        capture,
      });
      return eventId;
    }
  }

  /**
   * 移除DOM的事件监听
   * @param  {[type]} eventId
   */
  detachDOMEvent(eventId) {
    if (!eventId) {
      return false;
    }
    const index = this.events.findIndex(item => item.eventId === eventId);
    if (!~index) {
      return false;
    }
    const { target, event, listener, capture } = this.events[index];
    target.removeEventListener(event, listener, capture);
    this.events.splice(index, 1);
  }

  /**
   * 移除事件监听
   */
  detachAllDomEvents() {
    this.events.forEach(item => {
      const { target, event, listener, capture } = item;
      target.removeEventListener(event, listener, capture);
    });
    // this.events.forEach(event => this.detachDOMEvent(event.eventId));
  }

  /**
   * inner method for subscribe and subscribeOnce
   */
  _subscribe(event, listener, once = false) {
    const listeners = this.listeners[event];
    const handler = { listener, once };
    if (listeners && Array.isArray(listeners)) {
      listeners.push(handler);
    } else {
      this.listeners[event] = [handler];
    }
  }

  /**
   * [subscribe] subscribe custom event
   */
  subscribe(event, listener) {
    this._subscribe(event, listener);
  }

  /**
   * [unsubscribe] unsubscribe custom event
   */
  unsubscribe(event, listener) {
    const listeners = this.listeners[event];
    if (Array.isArray(listeners) && listeners.find(l => l.listener === listener)) {
      const index = listeners.findIndex(l => l.listener === listener);
      listeners.splice(index, 1);
    }
  }

  /**
   * [subscribeOnce] usbscribe event and listen once
   */
  subscribeOnce(event, listener) {
    this._subscribe(event, listener, true);
  }

  /**
   * dispatch custom event
   */
  dispatch(event, ...data) {
    const eventListener = this.listeners[event];
    if (eventListener && Array.isArray(eventListener)) {
      eventListener.forEach(({ listener, once }) => {
        listener(...data);
        if (once) {
          this.unsubscribe(event, listener);
        }
      });
    }
  }

  //判读是否已经进行了事件绑定，防止重复绑定
  checkIfEventHasBinded({ target: t, event: e, listener: l, capture: c }) {
    return this.events.some(({ target, event, listener, capture }) => {
      return target === t && event === e && listener === l && capture === c;
    });
  }
}

export default EventService;
