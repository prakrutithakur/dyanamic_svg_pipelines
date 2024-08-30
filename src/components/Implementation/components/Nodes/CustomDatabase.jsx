import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import database from "../../../images/dataBase.svg";

function CustomDatabase({ data, isConnectable, setCurrentRef }) {
  console.log("CustomDatabase");
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return <img src={database} alt="database" />;
}

export default CustomDatabase;
