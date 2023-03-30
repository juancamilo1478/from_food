import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filtrar } from "../../redux/actions/actions";

function FilterBotton(props) {
  const [estate, setState] = useState("OFF");

  const dispatch = useDispatch();
  //correguir mejor usar una accion problema con cartas

  useEffect(() => {
    if (estate === "ON") {
      dispatch(filtrar(props.name));
    }
  }, [estate, props.name, dispatch]);

  useEffect(() => {
    setState("OFF");
  }, [props.reset]);

  const handlebotton = () => {
    if (estate === "OFF") {
      setState("ON");
    }
  };

  return (
    <div className="filterBotton">
      <h3>{props.name}</h3>
      <div
        className={
          estate === "ON" ? "filter_div_bottonon" : "filter_div_bottonoff"
        }
      >
        <button
          className={estate === "ON" ? "botton_movilon" : "botton_moviloff"}
          onClick={handlebotton}
        ></button>
      </div>
    </div>
  );
}
export default FilterBotton;
