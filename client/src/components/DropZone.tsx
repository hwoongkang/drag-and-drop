import React, {
  DragEvent,
  useState,
  MouseEvent,
  FormEvent,
  useRef,
} from "react";
import styled from "styled-components";

import Axios from "axios";
import { useSetRecoilState } from "recoil";
import { imagesState } from "../store/images";

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
    props.dragOver ? "rgba(200,200,255,0.2)" : "transparent"};

  cursor: ${(props: IRowProps) => (props.dragOver ? "pointer" : "auto")};
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

  const setImages = useSetRecoilState(imagesState);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleForm = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.currentTarget.files?.[0]);
  };

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
        setImages((images) => [...images, res.data.image]);
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
        }}
        onDragLeave={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();

          const possibleFile = e.dataTransfer.files[0];
          if (possibleFile.type.split("/")[0] !== "image") {
            alert("Only image files are allowed");
            return;
          }

          setFile(possibleFile);
          setDragOver(false);
        }}
        onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          fileInput.current?.click();
          setDragOver(false);
        }}
        dragOver={dragOver}
        style={{
          backgroundImage: file ? `url(${URL.createObjectURL(file)})` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          fontSize: "3em",
        }}
      >
        {file ? null : "+"}
      </Row>
      <Row flexGrow={1}>
        <Button onClick={handleSubmit} disabled={file === undefined}>
          Upload
        </Button>
      </Row>
      <input
        type="file"
        style={{ width: 0, height: 0, overflow: "hidden", display: "none" }}
        onChange={handleForm}
        ref={fileInput}
        accept="image/*"
      />
    </Column>
  );
};

export default DropZone;
