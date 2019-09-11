import styled from 'styled-components';

const AuthLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & h2.title {
    text-align: left;
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 400;
  }
  & .login-form {
    width: 280px;
  }
  & .login-form-button {
    width: 100%;
  }
`;

export default AuthLayout;
