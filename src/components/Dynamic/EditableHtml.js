import React, { Component } from 'react';
import Editor from '@/components/Editor';
import Debounce from 'lodash-decorators/debounce';
import EditorShower from '@/components/Editor/shower';

export default class EditableText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: this.props.editable ? false : true,
      text: this.props.text || null,
    };
  }

  switchEdit = status => {
    this.setState({
      editable: status,
    });
  };

  // @Debounce(200)
  onSubmit = obj => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit(obj);
    this.switchEdit(false);
  };

  @Debounce(200)
  onChange(obj) {
    const { onChange } = this.props;
    console.log('fire change');
    onChange && onChange(obj);
  }

  render() {
    const { text, children } = this.props;
    const { editable } = this.state;
    return (
      <span className="editable-text-container">
        {!editable ? (
          <span
            className="n-editable-text-content"
            onClick={e => {
              e.stopPropagation();
              this.switchEdit(true);
            }}
          >
            {(text !== '<p></p>' && <EditorShower value={text} />) || children}
          </span>
        ) : (
          <Editor
            onSubmit={html => {
              this.onSubmit(html);
            }}
            onChange={value => {
              this.onChange(value);
            }}
            defaultContent={text}
          />
        )}
      </span>
    );
  }
}
