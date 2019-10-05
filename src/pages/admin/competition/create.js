import { PageHeader } from 'antd';
const routes = [];
const Create = props => {
  return (
    <div>
      <PageHeader title="Title" breadcrumb={{ routes }} subTitle="This is a subtitle" />
    </div>
  );
};

export default Create;
