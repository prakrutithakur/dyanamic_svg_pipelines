import { useCallback } from "react";
import protocol from "../../../images/protocol.svg";

function CustomcurvedPipe({ data, isConnectable, setCurrentRef }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return <img src={protocol} alt="CustomcurvedPipe" />;
}

export default CustomcurvedPipe;
