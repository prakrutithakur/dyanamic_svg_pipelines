import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import pipe from "../../../images/pipe.svg";

function CustomPipe({ data, isConnectable, setCurrentRef }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return <img src={pipe} alt="pipe" />;
}

export default CustomPipe;
