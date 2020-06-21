import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { imagesState } from "../store/images";

import Axios from "axios";

import Box from "./Box";
import DropZone from "./DropZone";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  margin-top: 5rem;
`;

const ImageContainer = () => {
  const [images, setImages] = useRecoilState(imagesState);
  useEffect(() => {
    Axios.get("/api/images")
      .then((res) => {
        if (res.data.success) {
          setImages(res.data.images);
        } else {
          alert(`error: ${res.data.message}`);
        }
      })
      .catch((err) => {
        alert(`Uncaught error: ${err.message}`);
      });
  }, [setImages]);
  return (
    <Container>
      {images.map((image) => (
        <Box>
          <img
            src={image.key}
            alt={image.original_name}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              objectPosition: "center center",
            }}
          />
        </Box>
      ))}
      {images.length === 0 ? (
        <Box>
          <p>No Image Yet</p>
        </Box>
      ) : null}

      <Box>
        <DropZone />
      </Box>
    </Container>
  );
};

export default ImageContainer;
