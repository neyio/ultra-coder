import React from 'react';
import styled from 'styled-components';
import ProblemTabs from '../../../components/Problem/ProblemTabs';
import Header from '../../../components/Problem/Header';
const ProblemContainer = styled.section`
  background: #fff;
`;
const CodeContainer = styled.section``;

export default function Layout(props) {
  const { id } = props.match.params;
  return (
    <section>
      <Header />
      <ProblemTabs id={id} />
      <ProblemContainer>{props.children}</ProblemContainer>
      <CodeContainer>
        <code>hello world!</code>
      </CodeContainer>
    </section>
  );
}
