/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import "./style.css";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import downArrow from "../assets/down.png";
import upArrow from "../assets/up.png";

function AddDrama({ dramas, setDramas, setRouteUser, actors }) {
  // Validation
  let year = parseInt(new Date().getFullYear());

  const airedValidation = (value, helpers) => {
    if (value.length < 1 || value == false) {
      return helpers.message({
        custom: "*Must be filled on at least one day!",
      });
    }

    return value;
  };

  const schema = Joi.object({
    name: Joi.string().required().min(5).messages({
      "string.empty": "*Field is Empty!",
      "string.min": "*Name must be at least 5 character!",
    }),
    year_of_release: Joi.number()
      .integer()
      .min(2005)
      .max(year)
      .required()
      .messages({
        "number.base": "*Value must be a number!",
        "number.min": "*Minimum Value is 2005!",
        "number.max": `*Maximum Value is ${year}!`,
      }),
    original_network: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
    airedOn: Joi.custom(airedValidation),
    number_of_episodes: Joi.number().integer().required().messages({
      "number.base": "*Value must be a number!",
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "*Value must be a number!",
      "number.min": "*Rating value is on range 1-5!",
      "number.max": "*Rating value is on range 1-5!",
    }),
    synopsis: Joi.optional(),
    genre: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
    production_companies: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
    imgUrl: Joi.string().required().messages({
      "string.empty": "*Field is Empty!",
    }),
    extraCast: Joi.optional(),
    cast: Joi.optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const capitalizeWords = (arr) => {
    return arr.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();

      return firstLetter + rest;
    });
  };

  const handleAdd = (data) => {
    const id = dramas[dramas.length - 1].id + 1;

    let tempNetwork = data.original_network;
    const original_network = capitalizeWords(tempNetwork.split(",")).join(", ");

    let tempGenre = data.genre;
    const genres = capitalizeWords(tempGenre.split(","));

    let casts = [];
    if (data.cast.length > 0) {
      for (let i = 0; i < data.cast.length; i++) {
        const c = data.cast[i];
        casts.push(parseInt(c));
      }
    }
    let extraCasts = [];
    if (data.extraCast.length > 0) {
      let tempExtra = data.extraCast;
      extraCasts = capitalizeWords(tempExtra.split(","));
      casts = [...casts, ...extraCasts];
    }

    console.log(casts);

    let synopsis = "";
    if (data.synopsis.length > 0) {
      synopsis = data.synopsis;
    }

    let tempCompanies = data.production_companies;
    const production_companies = capitalizeWords(tempCompanies.split(",")).join(
      ", "
    );

    const newDrama = {
      id: id,
      name: data.name,
      year_of_release: data.year_of_release,
      original_network: original_network,
      aired_on: data.airedOn,
      number_of_episodes: data.number_of_episodes,
      rating: data.rating,
      synopsis: synopsis,
      genre: genres,
      cast: casts,
      production_companies: production_companies,
      img: data.imgUrl,
    };

    // console.log([...dramas, newDrama]);

    setDramas([...dramas, newDrama]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    reset();
  };

  const countPlayed = (id) => {
    let count = 0;
    for (let i = 0; i < dramas.length; i++) {
      const drama = dramas[i];
      const tempCast = drama.cast;

      for (let j = 0; j < tempCast.length; j++) {
        const cast = tempCast[j];
        if (cast == id) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <>
      <div
        className="position-fixed z-3 bottom-0 end-0 m-3 p-0 d-flex flex-column align-items-center justify-content-center border-0 rounded-pill"
        style={{ width: "4vw", height: "16vh" }}
      >
        <button
          className="border-0 d-flex bg-transparent m-0 p-0s"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <img src={upArrow} className="img-fluid w-100 h-100" />
        </button>
        <button
          className="border-0 d-flex bg-transparent m-0 p-0s"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          <img src={downArrow} className="img-fluid w-100 h-100" />
        </button>
      </div>

      <div className="d-flex align-items-center mt-5">
        <div className="w-100 d-flex px-5">
          <h1 className="align-self0-center">Add New Drama</h1>
        </div>
        <div className="w-100 d-flex px-5 justify-content-end">
          <button
            className="fs-3 border-0 rounded-3 py-1 px-3 text-white"
            style={{ backgroundColor: "#000000" }}
            onClick={() => setRouteUser("home")}
          >
            Back
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleAdd)} className="d-flex flex-column">
        <div
          className="container-fluid d-flex mt-5 px-5 pb-5 w-100 h-100"
          style={{ minHeight: "80vh" }}
        >
          <div className="w-75" style={{ minHeight: "80vh" }} id="kiri">
            <div className="glass-container p-5 h-100">
              <div className="d-flex flex-column align-items-start mb-4">
                <label htmlFor="" className="fs-2">
                  Drama Name
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("name")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.name?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Year of Release
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("year_of_release")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.year_of_release?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Original Network
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("original_network")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.original_network?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Aired On
                </label>
                <div className="row row-cols-3 g-4 ms-1">
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Monday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Monday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Tuesday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Tuesday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Wednesday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Wednesday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Thursday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Thursday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Friday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Friday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Saturday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Saturday</label>
                  </div>
                  <div className="col d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="airedBox"
                      value="Sunday"
                      style={{ transform: "scale(1.5)" }}
                      {...register("airedOn")}
                    />
                    <label className="ps-3 fs-4">Sunday</label>
                  </div>
                </div>
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.airedOn?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Number of Episodes
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("number_of_episodes")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.number_of_episodes?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Rating
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("rating")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.rating?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Synopsis
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  style={{ resize: "none" }}
                  {...register("synopsis")}
                ></textarea>
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.synopsis?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Genre
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("genre")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.genre?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Production Companies
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("production_companies")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.production_companies?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Poster Image URL
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("imgUrl")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.imgUrl?.message}
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-4">
                <label htmlFor="" className="fs-2">
                  Additional Cast
                </label>
                <input
                  type="text"
                  className="fs-3 w-100 px-3 py-2 border-0 rounded-3"
                  {...register("extraCast")}
                  autoComplete="off"
                />
                <span className="w-100 fs-4 mt-1" style={{ color: "red" }}>
                  {errors?.extraCast?.message}
                </span>
              </div>
            </div>
          </div>

          <div
            className="w-50 h-100 ps-5"
            style={{ minHeight: "80vh" }}
            id="kanan"
          >
            <div className="glass-container p-5">
              <h1>Cast</h1>
              <div className="overflow-y-scroll mt-4 ps-1 pe-3">
                {actors.map((actor) => (
                  <div
                    key={actor.id}
                    className="card mb-3 w-100 rounded-3 border-0"
                  >
                    <div className="row row-cols-1 g-4">
                      <div className="col-md-4 w-100 rounded-3">
                        <div className="card_area w-100 h-100 border-0 rounded-3">
                          <input
                            className="castCheckbox rounded-3 border-0"
                            type="checkbox"
                            id="1"
                            value={actor.id}
                            {...register("cast")}
                          />
                          <div className="singleCard w-100 h-100 d-flex rounded-3 border-0">
                            <img
                              src={actor.img}
                              className="img-fluid rounded-start object-fit-cover"
                              alt={actor.name}
                              style={{
                                minHeight: "170px",
                                maxHeight: "170px",
                                minWidth: "130px",
                                maxWidth: "130px",
                              }}
                            />
                            <div className="col-md-8">
                              <div className="card-body ps-4 w-100 h-100 d-flex flex-column align-items-start justify-content-center">
                                <h3 className="card-title">{actor.name}</h3>
                                <h4 className="card-text mt-2">
                                  Played in {countPlayed(actor.id)} Drama
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end pb-5">
          <button
            type="submit"
            className="fs-3 w-25 py-3 px-4 me-5 rounded-3 border-0 text-white"
            style={{ backgroundColor: "#7c2023" }}
          >
            Add Drama
          </button>
        </div>
      </form>
    </>
  );
}

export default AddDrama;
