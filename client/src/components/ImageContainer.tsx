import React from "react";

import Box from "./Box";

import DropZone from "./DropZone";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  max-width: 800px;
  margin: 0 auto;
`;

const ImageContainer = () => {
  return (
    <Container>
      <Box>
        <img
          src="http://img.jinwoolove.com/images/1592470224856.jpeg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center center",
          }}
          alt="if this is showing something is wrong with s3"
        />
      </Box>

      <Box>
        <DropZone />
      </Box>
    </Container>
  );
};

export default ImageContainer;
