//imagenes
import Slide from "./slide";

import { Link } from "react-router-dom";

const Indice = () => {
  return (
    <div className="indice_top">
      <div className="fondo_indice" />
      <div className="indice_div1">
        <div className="indice_div_parrafo">
          <h1>Diets food </h1>
          <h3>
            if you are looking for recipes for any type of diet, you are in the
            right place. Explore our platform and discover a wide variety of
            culinary options to enjoy while maintaining a healthy lifestyle.
            Also, feel free to share your own culinary creations to help others
            and expand the scope of culinary diversity.
          </h3>
        </div>
        <div className="indice_div_slider">
          <Slide />
        </div>
        <Link to={"/home"} className="link">
          <div className="indice_botton">Explorer recipes</div>
        </Link>
      </div>
    </div>
  );
};
export default Indice;
