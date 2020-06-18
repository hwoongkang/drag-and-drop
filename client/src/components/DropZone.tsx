import React, { DragEvent, useState, MouseEvent } from "react";
import styled from "styled-components";

import Axios from "axios";

const Column = styled.div`
  display: flex;
  flex-direction: column;

  align-items: stretch;

  width: 100%;
  height: 100%;
`;

interface IRowProps {
  flexGrow: number;
  borderStyle?: string;
  dragOver?: boolean;
}
const Row = styled.div`
  flex: ${(props: IRowProps) => `${props.flexGrow} ${props.flexGrow}`};

  display: flex;
  align-items: center;
  justify-content: center;

  color: #aaa;

  border-width: 2px;
  border-color: ${(props: IRowProps) => (props.dragOver ? "blue" : "#aaa")};
  border-style: ${(props: IRowProps) => props.borderStyle ?? "none"};

  background-color: ${(props: IRowProps) =>
    props.dragOver ? "rgba(200,200,255,0.3)" : "transparent"};
`;

interface IButtonProps {
  disabled?: boolean;
}
const Button = styled.button`
  background: none;
  border: 1px solid
    ${(props: IButtonProps) =>
      props.disabled ? "rgba(200,200,255,0.7)" : "blue"};
  border-radius: 5px;
`;

const DropZone = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Add a file first");
      return;
    }
    const formData = new FormData();
    formData.append("img", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    Axios.post("/api/upload", formData, config)
      .then((res) => {
        alert("file successfully uploaded");
        setFile(undefined);
      })
      .catch((err) => {
        alert(`file couldn't be uploaded: ${err.message}`);
        setFile(undefined);
      });
  };
  return (
    <Column>
      <Row
        flexGrow={4}
        borderStyle="dashed"
        onDragOver={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(true);
          console.log("Over!");
        }}
        onDragLeave={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();

          const possibleFile = e.dataTransfer.files[0];

          setFile(possibleFile);
          setDragOver(false);
        }}
        dragOver={dragOver}
        style={{
          backgroundImage: file ? `url(${URL.createObjectURL(file)})` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {file ? null : "+"}
      </Row>
      <Row flexGrow={1}>
        <Button onClick={handleSubmit} disabled={file === undefined}>
          Upload
        </Button>
      </Row>
    </Column>
  );
};

export default DropZone;
