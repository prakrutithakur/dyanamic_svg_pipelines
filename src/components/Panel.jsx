import React, { useState } from "react";
import styled from "styled-components";
const Panel = ({ renderComp, setRenderComp, setCurrentNode }) => {
  const reactFlowtypes = [
    { id: "dagre", label: "Dagre" },
    { id: "custom", label: "Custom Layout" },
    { id: "elk", label: "ELK Layout" },
    { id: "implementation", label: "Implementation" },
  ];
  return (
    <div>
      <StyledButton
        onClick={() => {
          setCurrentNode((pre) => pre + 1);
        }}
      >
        Add Node
      </StyledButton>
      {reactFlowtypes.map((item) => {
        return (
          <StyledButton
            key={item.id}
            onClick={() => {
              setRenderComp(item.id);
            }}
            conditionalbutton={{ match: renderComp === item.id, id: item.id }}
          >
            {item.label}
          </StyledButton>
        );
      })}
    </div>
  );
};

export default Panel;

const StyledButton = styled.button`
  margin-right: 5px;
  border-radius: 5px;
  ${(props) => {
    if (!props.conditionalbutton) {
      return null;
    } else {
      if (props.conditionalbutton.match) {
        return `background-color: black; color:white;`;
      } else {
        return `background-color: white; color:blac;`;
      }
    }
  }}
`;
