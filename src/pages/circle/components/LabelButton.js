import { Card } from 'antd';
import styled from 'styled-components';
import { labelButton } from '../index.less';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  & > span.label {
    margin-top: 0.5rem;
    font-size: 16px;
  }
`;
const LabelCard = props => {
  const { label, linkTo, icon } = props;
  return (
    <Card
      className={labelButton}
      hoverable
      onClick={() => {
        console.log(linkTo);
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Container>
        {typeof icon === 'function' ? icon() : icon}
        <span className="label">{label}</span>
      </Container>
    </Card>
  );
};

export default LabelCard;
