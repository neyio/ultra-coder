import React from 'react';
import uuid from 'uuid/v4';
import BraftEditor from 'braft-editor'; // 引入编辑器组件
import Markdown from 'braft-extensions/dist/markdown';
import 'braft-editor/dist/index.css'; // 引入编辑器样式
import 'braft-editor/dist/output.css';
import 'braft-extensions/dist/code-highlighter.css';
import { message } from 'antd';

BraftEditor.use(Markdown({}));
// 定义rem基准值
const sizeBase = 14;
// 定义输入转换函数
const unitImportFn = (unit, type, source) => {
  // type为单位类型，例如font-size等
  // source为输入来源，可能值为create或paste
  // 此函数的返回结果，需要过滤掉单位，只返回数值
  if (unit.indexOf('rem')) {
    return parseFloat(unit) * sizeBase;
  } else {
    return parseFloat(unit);
  }
};
// 定义输出转换函数
const unitExportFn = (unit, type, target) => {
  if (type === 'line-height') {
    return unit; // 输出行高时不添加单位
  }
  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === 'html') {
    // 只在将内容输出为html时才进行转换
    return unit / sizeBase + 'rem';
  } else {
    // 在编辑器中显示时，按px单位展示
    return unit + 'px';
  }
};

const controls = [
  'undo',
  'redo',
  'separator',
  'font-size',
  'line-height',
  'letter-spacing',
  'separator',
  'text-color',
  'bold',
  'italic',
  'underline',
  'strike-through',
  'separator',
  'superscript',
  'subscript',
  'remove-styles',
  // 'emoji',
  'separator',
  'text-indent',
  'text-align',
  'separator',
  'headings',
  'list-ul',
  'list-ol',
  'blockquote',
  'separator',
  'link',
  'separator',
  'hr',
  'separator',
  'media',
  'separator',
  'clear',
];

export default class RichEditor extends React.Component {
  state = {
    // 创建一个空的value作为初始值
    value: BraftEditor.createEditorState(
      typeof this.props.text === 'function' ? this.props.text() : this.props.text || null,
    ),
  };

  componentDidMount() {
    if (this.props.setRef) {
      this.props.setRef(this);
    }
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    try {
      this.setState({
        value: BraftEditor.createEditorState(
          typeof this.props.text === 'function' ? this.props.text() : this.props.text || null,
        ),
      });
    } catch (e) {
      console.error('shut down', e);
    }
    console.log('editor mounted');
  }
  setValue = value => {
    this.setState({
      value: BraftEditor.createEditorState(value),
    });
  };
  onSubmit = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用value.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.value.toHTML();
    if (htmlContent === '<p></p>') {
      return message.error('文本内容为空，无法预览。');
    }
    this.props.onSubmit && this.props.onSubmit(htmlContent);
  };

  onChange = value => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  uploadFn = async param => {
    const { OSSHost, uploadConfig, getUploadConfig } = this.props;
    let config = uploadConfig;
    console.log('upload config', config);
    if (!config) {
      config = await new Promise(resolve => {
        getUploadConfig &&
          getUploadConfig(token => {
            resolve(token);
          });
      });
    }
    const serverURL = OSSHost || '';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    if (config) {
      Object.keys(config).forEach(key => {
        if (key === 'accessid') fd.append('OSSAccessKeyId', config[key]);
        else fd.append(key, config[key]);
      });
    }

    const suffixName = filename => {
      const pos = filename.lastIndexOf('.');
      return pos === -1 ? '' : filename.substring(pos);
    };

    const generateName = (dir, filename) => dir + uuid() + suffixName(filename);
    const uploadedFileName = config.dir + generateName(config.dir, param.file.name);
    fd.append('key', uploadedFileName);
    fd.append('file', param.file);
    const successFn = response => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址,默认为 xhr.responseText
      param.success({
        url: OSSHost + '/' + uploadedFileName,
        meta: {
          id: uploadedFileName,
          title: uploadedFileName,
          alt: uploadedFileName,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: null, //'http://xxx/xx.png', // 指定视频播放器的封面
        },
      });
    };

    // 上传进度发生变化时调用param.progress
    const progressFn = event => {
      param.progress((event.loaded / event.total) * 100);
    };

    // 上传发生错误时调用param.error
    const errorFn = response => {
      param.error({
        msg: '上传失败',
      });
    };
    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);
    xhr.open('POST', serverURL, true);
    xhr.send(fd);
  };

  render() {
    const { value } = this.state;
    const extendControls = [
      {
        key: 'saveAndExit',
        type: 'button',
        text: '保存',
        onClick: this.onSubmit,
        className: 'editor-save-btn',
      },
    ];
    return (
      <BraftEditor
        style={this.props.style || {}}
        value={value}
        onChange={this.onChange}
        onSave={this.onSubmit}
        controls={controls}
        converts={{ unitImportFn, unitExportFn }}
        extendControls={extendControls}
        placeholder="请输入内容"
        media={{ uploadFn: this.uploadFn }}
      />
    );
  }
}
