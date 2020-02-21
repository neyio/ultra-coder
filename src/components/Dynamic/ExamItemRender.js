import React from 'react';
import ChoiceMaker from '@/components/Choice';
import Fillable from '@/components/Fillable';
import EditableHtml from '@/components/Dynamic/EditableHtml';
export default function ExamItemRender({ data }) {
  const { type, content } = data;
  console.log('TCL: ExamItemRender -> state', data);
  switch (type) {
    case 'choice':
      return <ChoiceMaker {...content} />;
    case 'fillable':
      return <Fillable {...content} />;
    case 'subjective':
      return <EditableHtml content={content.content} />;
    default:
      return null;
  }
}
