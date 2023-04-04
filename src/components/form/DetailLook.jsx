const DetailLook = ({ contenido, imageurl, deletestep, deletediet }) => {
  return (
    <div className="detail_look_total">
      <div className="form_look_data">
        <h1>{contenido.name}</h1>
        <div className="form_look_2div">
          <div>
            <img src={imageurl} alt="images" />
          </div>
          <div>{contenido.resumen}</div>
        </div>

        <div className="form_look_points">
          <h1>Head points: {contenido.level}</h1>
        </div>

        <div className="form_look_bar">
          <progress max="100" value={contenido.level} />
        </div>

        <div className="form_look_preparation">
          <h2>Preparation</h2>
          {contenido.pasos.map((data) => {
            return (
              <div className="detail_paso">
                <div>
                  <button
                    value={data.number}
                    onClick={deletestep}
                    className="delete_form_data"
                  >
                    x
                  </button>
                  {data.number}
                  <p>{data.step}</p>
                </div>
              </div>
            );
          })}

          {contenido.diet ? (
            <div className="form_look_diets_div">
              {contenido.diet.map((data) => {
                return (
                  <div>
                    {data}
                    <button value={data} onClick={deletediet}>
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}

          <div className="detail_look_return">
            <h2>Return</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailLook;
