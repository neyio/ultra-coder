export default class ContentStateService{
    controller = null;//编辑器的主控制器，挂载了容器ref，事件、配置等的对象
    constructor(controller,options) {
        this.controller = controller;
        this.options = options;
    }

}