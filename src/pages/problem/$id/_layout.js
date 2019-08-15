import React from 'react';
import Link from 'umi/link';

import styled from 'styled-components';
import Header from './header';

const ProblemContainer = styled.section``;
const CodeContainer = styled.section``;

export default function Layout(props) {
  const { id } = props.match.params;
  return (
    <div>
      <Header />
      <Link to={`/problem/${id}`}>index</Link>
      <Link to={`/problem/${id}/description`}>description</Link>
      <Link to={`/problem/${id}/discuss`}>discuss</Link>
      <ProblemContainer>{props.children}</ProblemContainer>
      <CodeContainer>
        <code>hello world!</code>
      </CodeContainer>
    </div>
  );
}
