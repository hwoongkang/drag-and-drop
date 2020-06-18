import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  flex: 0 0 calc(33% - 2px);

  display: flex;

  align-items: center;
  justify-content: center;

  border: solid 1px #eee;

  span {
    max-width: 60%;
    margin: 0 auto;
  }

  &:before {
    float: left;
    content: "";
    padding-top: 100%;
  }
`;

interface IPropTypes {
  children: React.ReactNode;
}

const Box: React.FC<IPropTypes> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default Box;
