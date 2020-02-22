import React from 'react';

import { Upload, message, Button, Icon } from 'antd';
import { connect } from 'dva';

@connect(
  state => ({
    restfulApiRequest: state.request.restfulApiRequest,
  }),
  () => ({}),
)
class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    const { restfulApiRequest } = this.props;
    try {
      const OSSData = await restfulApiRequest('system.ossConfig');
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  // mockGetOSSData = () => {
  //   return {
  //     dir: 'user-dir/',
  //     expire: '1577811661',
  //     host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
  //     accessId: 'c2hhb2RhaG9uZw==',
  //     policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
  //     signature: 'ZGFob25nc2hhbw==',
  //   };
  // };

  onChange = ({ fileList, file }) => {
    const {
      onChange,
      uploadSuccess = file => {
        console.log('上传成功', file);
      },
    } = this.props;
    console.log('Aliyun OSS:', fileList);
    if (onChange) {
      onChange([...fileList]);
    }
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
      uploadSuccess(file);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
  };

  onRemove = file => {
    const { value, onChange } = this.props;

    const files = value.filter(v => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  transformFile = file => {
    const { OSSData } = this.state;

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  getExtraData = file => {
    const { OSSData } = this.state;

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async () => {
    const { OSSData } = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    return true;
  };

  render() {
    const { value } = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      transformFile: this.transformFile,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
    };
    return (
      <Upload {...props}>
        <Button size={props.size || 'small'}>
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    );
  }
}

export default AliyunOSSUpload;
