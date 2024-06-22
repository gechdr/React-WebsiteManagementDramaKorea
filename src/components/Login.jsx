/* eslint-disable react/prop-types */
import "./style.css";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

function Login({ setUser, setRoute }) {
  const schema = Joi.object({
    username: Joi.string().required().valid("admin").messages({
      "string.empty": "*Field is Empty!",
      "any.only": "*Invalid Username!",
    }),
    password: Joi.string().required().valid("admin").messages({
      "string.empty": "*Field is Empty!",
      "any.only": "*Wrong Password!",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const loginAdmin = () => {
    reset();
    setUser("Admin");
    setRoute("home");
  };

  const loginGuest = () => {
    reset();
    setUser("Guest");
    setRoute("home");
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="glass-container w-25 h-25"
          style={{ minWidth: "450px", minHeight: "500px" }}
        >
          <h1 className="text-white text-center pt-3 mb-5">LOGIN</h1>
          <form onSubmit={handleSubmit(loginAdmin)} className="px-3">
            <label htmlFor="" className="text-white fs-4">
              Username
            </label>
            <br />
            <input
              type="text"
              {...register("username")}
              className="w-100 rounded fs-4 border-0 px-2"
              autoComplete="off"
            />
            <br />
            <span className="w-100 fs-4" style={{ color: "red" }}>
              {errors?.username?.message}
            </span>
            <br />
            <label htmlFor="" className="text-white fs-4">
              Password
            </label>
            <br />
            <input
              type="password"
              {...register("password")}
              className="w-100 rounded fs-4 border-0 px-2"
            />
            <br />
            <span className="w-100 fs-4" style={{ color: "red" }}>
              {errors?.password?.message}
            </span>
            <br />
            <br />
            <button
              className="w-100 fs-4 py-1 rounded-3 border-0 text-white"
              style={{ backgroundColor: "#7c2023" }}
              type="submit"
            >
              Login
            </button>
            <br />
          </form>
          <div className="w-100 m-0 px-3">
            <button
              className="w-100 fs-4 py-1 mt-2 rounded-3 border-0"
              style={{ backgroundColor: "#cbcbcb" }}
              onClick={loginGuest}
            >
              Login As Guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
