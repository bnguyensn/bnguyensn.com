// @flow

import * as React from 'react';
import styled from 'styled-components';

const InfoBox = styled.div`
  margin: 1em;
  width: 100%;
  padding: 1em;
  
  color: #fafafa;
  background-color: #03A9F4;
  border-radius: 5px;  
`;

function InfoCard() {
    return (
        <InfoBox>
            {`What's up?`}
        </InfoBox>
    )
}

export default InfoCard
