import { useDispatch, useSelector } from "react-redux";
import { detaildata } from "../../redux/actions/actions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import loading from "../../images/loading.gif";
const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    const real = id.toString();
    dispatch(detaildata(real));
  }, [dispatch, id]);

  return (
    <div className="detail_detail">
      <div className="detail_fondo"></div>
      {detail.id && detail.id.toString() === id.toString() ? (
        <div className="detail_all">
          <h2>{detail.name}</h2>
          <div className="detail_2div">
            <div>
              <img src={detail.image} alt="images" />
            </div>
            <div dangerouslySetInnerHTML={{ __html: detail.resumen }}></div>
          </div>

          <div className="detail_level">
            <div className="detail_points">
              <h1>Head points: {detail.level}</h1>
            </div>

            <div className="detail_barra_100">
              <progress max="100" value={detail.level} />
            </div>
          </div>

          <div className="detail_paso_top">
            <h2>Preparation</h2>
            {detail.pasos[0].steps.map((data) => {
              return (
                <div className="detail_paso">
                  {data.number}
                  <p>{data.step}</p>
                </div>
              );
            })}
            <div className="detail_diets">
              <h2>
                Type of diet <i class="fa-solid fa-bowl-food"></i>
              </h2>
              {detail.diets
                ? detail.diets.map((data, index) => {
                    return <h3>* {data}</h3>;
                  })
                : ""}
            </div>

            <Link to={"/home"} className="link">
              <div className="detail_return">
                <h4>Return</h4>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="loading">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
};
export default Detail;
