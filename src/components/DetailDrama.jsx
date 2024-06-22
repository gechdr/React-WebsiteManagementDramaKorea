/* eslint-disable react/prop-types */
function DetailDrama({ dramas, index, setRouteUser, setIndex, actors }) {
  const altImage =
    "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg";

  const tempIdx = dramas.findIndex((drama) => drama.id == index);
  const currentDrama = dramas[tempIdx];
  const listAired = currentDrama.aired_on;
  const listGenres = currentDrama.genre;

  const currentDramaCast = currentDrama.cast.filter(Number);
  let listRecomended = [];
  for (let i = 0; i < currentDramaCast.length; i++) {
    const tempActor = currentDramaCast[i];
    for (let j = 0; j < dramas.length; j++) {
      const tempDrama = dramas[j];
      if (tempDrama.cast.includes(tempActor)) {
        listRecomended.push(tempDrama.id);
      }
    }
  }
  listRecomended = listRecomended.filter((x) => x != currentDrama.id);
  listRecomended = [...new Set(listRecomended)];
  // console.log(listRecomended);

  const dramaRecomended = [];
  for (let i = 0; i < listRecomended.length; i++) {
    const x = listRecomended[i];
    const dramaIdx = dramas.findIndex((drama) => drama.id == x);
    dramaRecomended.push(dramas[dramaIdx]);
  }

  // console.log(dramaRecomended);

  const handleDetail = (id) => {
    setIndex(id);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-100 px-5 mt-5">
        <button
          className="border-0 rounded-3 fs-3 px-4 py-1 text-white"
          style={{ backgroundColor: "#000000" }}
          onClick={() => {
            setRouteUser("home");
            setIndex(-1);
          }}
        >
          Back
        </button>
      </div>
      <div className="card mb-3 bg-transparent border-0 mt-5 px-5">
        <div className="row row-cols-2 g-0">
          <div className="col-md-4 me-0">
            <img
              src={currentDrama.img}
              className="img-fluid rounded-start w-100"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-md-8 ms-0 ps-4 mt-0">
            <div className="card-body h-100">
              <h1 className="card-title " style={{ fontSize: "4em" }}>
                {currentDrama.name}
              </h1>
              <span className="card-text fs-3 ">
                Years of Release: {currentDrama.year_of_release}
              </span>
              <br />
              <span className="card-text fs-3 ">
                Original Network: <u>{currentDrama.original_network}</u>
              </span>
              <br />
              <span className="card-text fs-3 d-flex ">Aired On:</span>
              <ul className="list-group list-group-horizontal ps-3 fs-3 pt-0">
                {listAired.map((aired, index) => {
                  return (
                    <li
                      className="list-group-item rounded-pill border-0 text-white m-2"
                      style={{ backgroundColor: "#078745" }}
                      key={index}
                    >
                      {aired}
                    </li>
                  );
                })}
              </ul>
              <span className="card-text fs-3 ">
                Episode: {currentDrama.number_of_episodes}
              </span>
              <br />
              <span className="card-text fs-3 ">
                Rating:{" "}
                <span className="card-text fs-3 text-warning">
                  ⭐{currentDrama.rating}
                </span>
              </span>
              <br />
              <span className="card-text fs-3 ">
                Synopsis:
                {<p className="card-text fs-3 ps-4">{currentDrama.synopsis}</p>}
              </span>
              <span className="card-text fs-3 d-flex ">Genre:</span>
              <ul className="list-group list-group-horizontal ps-3 fs-3 pt-0">
                {listGenres.map((genre, index) => {
                  return (
                    <li
                      className="list-group-item rounded-pill border-0 text-white m-2"
                      style={{ backgroundColor: "#3E454B" }}
                      key={index}
                    >
                      {genre}
                    </li>
                  );
                })}
              </ul>
              <span className="card-text fs-3 ">
                Production Companies: <u>{currentDrama.production_companies}</u>
              </span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="m-5">Cast</h1>
      <div className="row row-cols-6 g-4 mx-5 pb-5">
        {currentDrama.cast.map((cast, index) => {
          if (typeof cast === "number") {
            const tempActor = actors.filter((act) => act.id == cast);
            const currentActor = tempActor[0];
            // console.log(currentActor);
            return (
              <div className="col" key={index}>
                <div className="card h-100">
                  <img
                    src={currentActor.img}
                    className="img-fluid rounded-start w-100 h-100"
                    style={{
                      maxWidth: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                    alt={currentActor.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{currentActor.name}</h5>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="col" key={index}>
                <div className="card h-100">
                  <img
                    src={altImage}
                    className="img-fluid rounded-start w-100 h-100"
                    style={{ maxWidth: "600px", objectFit: "cover" }}
                    alt="Blank"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cast}</h5>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="w-100 px-5">
        <hr className="border border-dark border-2 opacity-100" />
      </div>

      <h1 className="mx-5 mt-5 pb-5">
        {dramaRecomended.length <= 0
          ? "No Recomended For You"
          : "Recomended For You"}
      </h1>
      <div className="row row-cols-6 g-4 mx-5 pb-5">
        {dramaRecomended.map((drama, index) => {
          return (
            <div
              className="col rounded-3 border-0 pt-4"
              key={index}
              onClick={() => handleDetail(drama.id)}
            >
              <div className="card h-100 rounded-4">
                <img
                  src={drama.img}
                  className="img-fluid rounded-4 object-fit-cover"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    maxHeight: "45vh",
                    minHeight: "45vh",
                  }}
                  alt={drama.name}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <div className="w-75">
                      <span className="card-title fs-4 fw-bold">
                        {drama.name}
                      </span>
                    </div>
                    <div className="w-25 d-flex justify-content-end fs-4 fw-bold align-self-start">
                      ⭐{drama.rating}
                    </div>
                  </div>
                  <div className="fs-4 fw-bold mt-4 mt-auto pt-3">
                    {drama.year_of_release}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DetailDrama;
