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
}) {
  const [renderButton, setRenderButton] = useState(true);
  const [addTolist, setAddToList] = useState([]);

  const onChange = useCallback((evt) => {
    setAddToList(evt.target.value.split(","));
  }, []);

  const onClick = () => {
    setRenderButton(true);
    if (addTolist) {
      setAddedNodeId(data.id);
      AddCustomSVGFunction(addTolist, data, setNodes, setCurrentNodeRef);
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
              setRenderButton(false);
            }}
          />
        ) : (
          <Form onChange={onChange} onClick={onClick} />
        )}
      </div>
    </div>
  );
}

export default AddButtonNodeSVG;
