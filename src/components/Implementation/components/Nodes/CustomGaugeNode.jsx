import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import gauge from "../../../images/gauge.svg";

function CustomGaugeNode({ data, isConnectable, setCurrentRef }) {
  console.log("CustomGaugeNode");
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return <img src={gauge} alt="pipe" />;
}

export default CustomGaugeNode;
