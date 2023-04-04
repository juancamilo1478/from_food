import { useEffect, useState } from "react";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import DetailLook from "./DetailLook";
import { listfilters } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import axios from "axios";
function Form() {
  const dispatch = useDispatch();
  const dietas = useSelector((state) => state.diets);

  const [imageurl, setimageurl] = useState(
    "https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"
  );
  const update = async (dato) => {
    const data = new FormData();
    data.append("file", dato);
    data.append("upload_preset", "u61bg6yv");
    data.append("cloud_name", "dirsusbyy");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dirsusbyy/image/upload",
        data
      );
      setimageurl(response.data.secure_url);
      setcontenido({
        ...contenido,
        image: response.data.secure_url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleimage = async (e) => {
    const selectedFile = await e.target.files[0];
    if (selectedFile) {
      update(selectedFile);
    }
  };

  useEffect(() => {
    if (dietas.length === 0) {
      dispatch(listfilters());
    }
  }, [dietas.length, dispatch]);

  const diets = useSelector((state) => state.diets);
  const [contenido, setcontenido] = useState({
    name: "",
    image: "",
    resumen: "",
    level: 0,
    pasos: [],
    diet: [],
    select_diet: "gluten free",
    paso: "",
    chek: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    resumen: "",
    level: "",
    pasos: "",
    diet: "",
  });

  const handledata = (e) => {
    setcontenido({ ...contenido, [e.target.name]: e.target.value });

    setErrors(
      validation({
        ...contenido,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleform = (e) => {
    if (
      !errors.name &&
      !errors.image &&
      !errors.level &&
      !errors.pasos &&
      !errors.diet
    ) {
      axios
        .post("/recipes", {
          name: contenido.name,
          image: contenido.image,
          resumen: contenido.resumen,
          level: contenido.level,
          pasos: contenido.pasos,
          diet: contenido.diet,
        })
        .then((response) => {
          setcontenido({
            name: "",
            image: "",
            resumen: "",
            level: 0,
            pasos: [],
            diet: [],
            select_diet: "",
            paso: "",
            chek: false,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setcontenido({ ...contenido, chek: true });
    }
  };

  const handleselect = (e) => {
    setcontenido({
      ...contenido,
      select_diet: e.target.value,
    });
  };

  const savediet = () => {
    if (
      contenido.select_diet !== "" &&
      contenido.diet.includes(contenido.select_diet) === false
    ) {
      setcontenido({
        ...contenido,
        diet: [...contenido.diet, contenido.select_diet],
      });
    }
  };

  const deletediet = (e) => {
    let data = contenido.diet.filter((data) => {
      return data !== e.target.value;
    });
    setcontenido({
      ...contenido,
      diet: data,
    });
  };

  const deletestep = (e) => {
    let filtered = contenido.pasos.filter((data) => {
      return parseInt(e.target.value) !== parseInt(data.number);
    });

    filtered = filtered.map((data, index) => {
      return {
        ...data,
        number: index + 1,
      };
    });

    setcontenido({
      ...contenido,
      pasos: filtered,
    });
  };

  const savestep = () => {
    if (contenido.paso.length > 0) {
      const number = contenido.pasos.length + 1;
      const data = { number: number, step: contenido.paso };
      setcontenido({
        ...contenido,
        paso: "",
        pasos: [...contenido.pasos, data],
      });
    }
  };

  return (
    <div className="form_father">
      <div className="form_top_wallpeper"></div>
      <div className="form_data">
        <div className="form_add_recipe">
          <div className="form_2_element">
            <div className="form_data">
              <h1>Create your own recipe</h1>
              <div className="form_element">
                <h3>Recipe name:</h3>
                <input
                  type="text"
                  value={contenido.name}
                  name="name"
                  onChange={handledata}
                />
              </div>

              <div className="form_element">
                <h3>Head score:</h3>
                <input
                  type="number"
                  value={contenido.level}
                  name="level"
                  onChange={handledata}
                />
              </div>
              <div className="form_element">
                <h3>Summary:</h3>
                <textarea
                  className="form_look_sumary"
                  onChange={handledata}
                  value={contenido.resumen}
                  name="resumen"
                />
              </div>
              <div className="form_element">
                <h3>Diets:</h3>
                {diets ? (
                  <select onChange={handleselect} className="form_selector">
                    {diets.map((data) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select>
                ) : (
                  <div>nada</div>
                )}

                <button onClick={savediet} className="button_diets_save">
                  <i class="fa-solid fa-circle-plus"></i>
                </button>
              </div>
              <div className="form_element">
                <h3>Steps</h3>
                <textarea
                  name="paso"
                  value={contenido.paso}
                  onChange={handledata}
                  className="form_look_sumary"
                />
                <button onClick={savestep} className="button_diets_save">
                  <i class="fa-solid fa-circle-plus"></i>
                </button>
              </div>

              <div className="form_element">
                <h3 className="form_element_ico">Up image</h3>

                <input type="file" onChange={handleimage} />
              </div>

              <button className="finish_form" onClick={handleform}>
                Save
              </button>
            </div>
          </div>
          <div className="form_view_pre">
            <DetailLook
              contenido={contenido}
              imageurl={imageurl}
              deletestep={deletestep}
              deletediet={deletediet}
            />
          </div>
        </div>

        {contenido.chek === true ? (
          <div className="form_error">
            <h2>Erros:</h2>
            {errors.name ? <h3>* {errors.name}</h3> : ""}
            {errors.image ? <h3>* {errors.image}</h3> : ""}
            {errors.level ? <h3>* {errors.level}</h3> : ""}
            {errors.pasos ? <h3>* {errors.pasos}</h3> : ""}
            {errors.diet ? <h3>* {errors.diet}</h3> : ""}
            {errors.resumen ? <h3>* {errors.resumen}</h3> : ""}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Link to={`/home`} className="link  form_return">
        <div className="finisch">
          Back <i class="fa-solid fa-house"></i>
        </div>
      </Link>
    </div>
  );
}
export default Form;
