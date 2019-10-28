// import { beginRules } from '../rules';

/**
 * StateRender
 * 请确保手动调用了setContainer 和 setEventService以初始化实例
 */
export default class Render {
  container = null;
  eventService = null;
  controller = null;
  codeCache = new Map();
  loadImageMap = new Map();
  loadMathMap = new Map();
  mermaidCache = new Set();
  diagramCache = new Map();
  tokenCache = new Map();
  labels = new Map();
  urlMap = new Map();

  constructor(controller) {
    this.controller = controller;
  }

  setContainer(container) {
    this.container = container;
    return this;
  }

  setEventService(eventService) {
    this.eventService = eventService;
    return this;
  }

  render(blocks, activeBlocks, matches) {
    return 'render';
  }
}
