import React from 'react';
import { Spinner } from '@blueprintjs/core';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  align-items: center;
  padding: 20px 0;
  &:last-child {
    border-bottom: 0;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Spinner intent="primary" size={Spinner.SIZE_LARGE} />
    </Container>
  );
};

export default Loading;
