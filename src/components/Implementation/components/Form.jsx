import React from "react";
const Form = ({ onClick, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 5,
        borderRadius: 5,
        height: 48,
        marginLeft: 10,
      }}
    >
      <label htmlFor="text" style={{ color: "white", fontSize: 10 }}>
        Add node types:
      </label>
      <input id="text" name="text" onChange={onChange} className="nodrag" />
      <button onClick={onClick} style={{ width: "50%", fontSize: 10 }}>
        Submit
      </button>
    </div>
  );
};

export default Form;
