import { useCallback } from "react";
import dataexp from "../../../images/dataexp.svg";

function CustomDataExp({ data, isConnectable, setCurrentRef }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return <img src={dataexp} alt="CustomDataExp" />;
}

export default CustomDataExp;
