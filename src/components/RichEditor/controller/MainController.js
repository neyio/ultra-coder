import { MUYA_DEFAULT_OPTION } from '../config';
import EventService from '../services/EventService';
import ExportMarkdown from '../utils/exportMarkdown';
import ContentState from '../services/contentState';

export default class MainController {
  static plugins = [];

  static use(plugin, options = {}) {
    this.plugins.push({ plugin, options });
  }

  events = [];
  options = {}; // 配置项
  inUsingPlugins = {}; // 正在被使用的插件
  eventService = null; //事件服务
  contentState = null; // 内容管理

  constructor(container, options, markdown = (options || {}).markdown) {
    this.options = Object.assign({}, MUYA_DEFAULT_OPTION, options);
    this.markdown = markdown; // markdown的文本
    this.container = container; //本处移至外部，依赖外部传入入构造完成的containerRef //getContainer(container, this.options);
    this.eventService = new EventService();
    // 内容状态管理
    this.contentState = new ContentState(this, this.options);

    this.initInUsingPlugins(MainController.plugins); //初始化UI组件
    //   this.tooltip = new ToolTip(this);
    //   this.clipboard = new Clipboard(this);
    //   this.clickEvent = new ClickEvent(this);
    //   this.keyboard = new Keyboard(this);
    //   this.dragdrop = new DragDrop(this);
    //   this.mouseEvent = new MouseEvent(this);

    this.init();
  }

  init() {
    const {
      container,
      contentState,
      eventService,
      markdown,
      options: { focusMode },
    } = this;
    contentState.stateRender.setContainer(container.firstChild); //原版为container.children[0]
    eventService.subscribe('stateChange', this.dispatchChange);

    this.setMarkdown(markdown);
    this.setFocusMode(focusMode);
    this.mutationObserver();
    eventService.attachDOMEvent(container, 'focus', () => {
      eventService.dispatch('focus');
    });
    eventService.attachDOMEvent(container, 'blur', () => {
      eventService.dispatch('blur');
    });
  }
  /**
   * 初始化UI组件
   */
  initInUsingPlugins(plugins = MainController.plugins) {
    this.inUsingPlugins = plugins.reduce((curr, { Plugin, options }) => {
      return {
        ...curr,
        [Plugin.pluginName]: new Plugin(this, options),
      };
    }, {});
    console.log('插件初始化成功', this.inUsingPlugins);
  }

  setMarkdown(markdown, cursor, isRenderCursor = true) {
    let newMarkdown = markdown;
    let isValid = false;
    //如果传入光标，则需要保持光标的位置
    if (cursor && cursor.anchor && cursor.focus) {
      const cursorInfo = this.contentState.addCursorToMarkdown(markdown, cursor);
      newMarkdown = cursorInfo.markdown;
      isValid = cursorInfo.isValid;
    }
    this.contentState.importMarkdown(newMarkdown);
    this.contentState.importCursor(cursor && isValid);
    //渲染为异步渲染
    this.contentState.render(isRenderCursor);
    //此处为了等待渲染完成，否则可能导致无法正常渲染
    setTimeout(() => {
      this.dispatchChange();
    }, 0);
  }

  getMarkdown() {
    const blocks = this.contentState.getBlocks();
    const listIndentation = this.contentState.listIndentation;
    return new ExportMarkdown(blocks, listIndentation).generate();
  }

  dispatchChange = () => {
    const { eventService } = this;
    const markdown = (this.markdown = this.getMarkdown());
    const wordCount = this.getWordCount(markdown);
    const cursor = this.getCursor();
    const history = this.getHistory();
    const toc = this.getTOC();
    eventService.dispatch('change', { markdown, wordCount, cursor, history, toc });
  };
}
