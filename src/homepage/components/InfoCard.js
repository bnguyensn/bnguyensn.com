// @flow

import * as React from 'react';
import styled from 'styled-components';

const InfoBox = styled.div`
  margin: 1em;

  max-width: 960px;
  padding: 2em 1em;
  
  text-align: center;
  
  color: #fafafa;
  background-color: rgba(66,66,66 ,.33);
  border-radius: 5px;
`;

const InfoBoxLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;


function InfoCard() {
    return (
        <InfoBox>
            Hello, my name is Binh and this is my personal site. It serves as my blog as well as an experiment playground.
            <br/><br/>
            For a list of my projects, please head over <InfoBoxLink href="/projects">here</InfoBoxLink>.
            <br/><br/>
            For contact info, please go <InfoBoxLink href="/contact">here</InfoBoxLink>.
            <br/><br/>
            And finally, this site&#39;s GitHub link is <InfoBoxLink href="https://github.com/bnguyensn/bnguyensn.com">here</InfoBoxLink>.
        </InfoBox>
    )
}

export default InfoCard
