import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./redirect.css";
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom';


export const Redirection = () => {

    const [redirectVote , SetredirectVote] = useState(false)

    const [redirectSondage , SetredirectSondage] = useState(false);

    const Voteclickhandel =()=>{
        SetredirectVote(true);
    }
    const Sondageclickhandel =()=>{
        SetredirectSondage(true);
    }
    const ButtonGroup = styled.div`
  display: flex;

`;
    const ButtonT = styled(LinkR)`
// padding: ${({ big }) => (big ? '40px 44px' : '12px 30px')};
//   display: flex;
//   justify-content: center;
//   align-items: center;
`
    const Button = styled(LinkR)`

position:relative;
left:455px;
top:250px;
  background: ${props => props.primary ? "green" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  padding: ${({ big }) => (big ? '60px 60px' : '12px 30px')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin: 1em;
  border: 2px solid green;
`;




    return (

        <ButtonGroup>
            <Button big primary to='/addCandidate'>Vote</Button>
            <Button big primary to='/addSubject'>Sondage</Button>
        </ButtonGroup>




    );
};
export default Redirection;