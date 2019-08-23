import styled from 'styled-components';

const AuthLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & h2.title {
    text-align: center;
    font-size: @font-size-base;
    margin-bottom: @font-space-base*3;
  }
  & .login-form {
    width: 330px;
  }
  & .login-form-button {
    width: 100%;
  }
`;

export default AuthLayout;
