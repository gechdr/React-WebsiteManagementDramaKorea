/* eslint-disable react/prop-types */
function ListDrama({ dramas, user, setRouteUser, setIndex }) {
  const handleDetail = (id) => {
    setIndex(id);
    setRouteUser("detail");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="d-flex align-items-center mt-5">
        <div className="w-100 d-flex px-5">
          <h1 className="align-self0-center">Drama List</h1>
        </div>
        {user == "Admin" && (
          <div className="w-100 d-flex px-5 justify-content-end">
            <button
              className="fs-3 border-0 rounded-3 py-1 px-3 text-white"
              style={{ backgroundColor: "#000000" }}
              onClick={() => setRouteUser("addDrama")}
            >
              Add Drama
            </button>
          </div>
        )}
      </div>
      <div className="row row-cols-4 g-4 px-5 m-0 pt-0 pb-5">
        {dramas.map((drama) => {
          return (
            <div
              className="col shadow rounded-4 border-0 pt-4"
              key={drama.id}
              onClick={() => handleDetail(drama.id)}
            >
              <div className="card h-100 rounded-4">
                <img
                  src={drama.img}
                  className="img-fluid rounded-4 w-100 h-100 object-fit-cover"
                  style={{
                    maxWidth: "430px",
                    maxHeight: "550px",
                    minHeight: "550px",
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

export default ListDrama;
