import { useCallback, useState } from "react";
import addButton from "../../../images/addButton.svg";
import { AddCustomSVGFunction } from "../CustomHookToAddSVG";
import Form from "../Form";
import { filterFunction } from "../addIconsinsertion";

function AddButtonNodeSVG({
  data,
  isConnectable,
  setNodes,
  setFilter,
  setAddedNodeId,
  setCurrentNodeRef,
  shifted_array,
}) {
  const [renderButton, setRenderButton] = useState(true);
  const [addTolist, setAddToList] = useState(["pipe"]);

  const onChange = useCallback((evt) => {
    setAddToList(evt.target.value.split(","));
  }, []);

  const onClick = () => {
    setRenderButton(true);
    if (addTolist) {
      setAddedNodeId(data.id);
      AddCustomSVGFunction(
        addTolist,
        data,
        setNodes,
        setCurrentNodeRef,
        shifted_array
      );
    }
  };

  return (
    <div>
      <div>
        {renderButton ? (
          <img
            src={addButton}
            alt="add button"
            onClick={(e) => {
              const filterLocation = filterFunction(data.location);
              setFilter(filterLocation);
              // setRenderButton(false);
              if (true) {
                setAddedNodeId(data.id);
                AddCustomSVGFunction(
                  addTolist,
                  data,
                  setNodes,
                  setCurrentNodeRef,
                  shifted_array
                );
              }
            }}
            // onMouseEnter={() => console.log(data)}
          />
        ) : (
          <Form onChange={onChange} onClick={onClick} />
        )}
      </div>
    </div>
  );
}

export default AddButtonNodeSVG;
