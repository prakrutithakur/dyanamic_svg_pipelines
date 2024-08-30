import { useCallback, useEffect, useRef, useState } from "react";
import addButton from "../../../images/addButton.svg";
import { AddCustomSVGFunction } from "../CustomHookToAddSVG";

function AddButtonNodeSVG({ data, isConnectable, setNodes }) {
  console.log("AddButtonNodeSVG");
  const [renderButton, setRenderButton] = useState(true);
  const [addTolist, setAddToList] = useState([]);
  const onChange = useCallback((evt) => {
    setAddToList(evt.target.value.split(","));
  }, []);

  return (
    <div>
      <div>
        {renderButton ? (
          <img
            src={addButton}
            alt="add button"
            onClick={(e) => {
              setRenderButton(false);
            }}
          />
        ) : (
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
            <input
              id="text"
              name="text"
              onChange={onChange}
              className="nodrag"
            />
            <button
              onClick={() => {
                setRenderButton(true);
                if (addTolist) {
                  AddCustomSVGFunction(addTolist, data, setNodes);
                }
              }}
              style={{ width: "50%", fontSize: 10 }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddButtonNodeSVG;
