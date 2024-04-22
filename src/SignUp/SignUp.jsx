import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, UpdateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      UpdateUserProfile(data.name, data.photoUrl)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
          };

          // this is taking the data of user and post the info to the database
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up </h1>
          <p className="py-6">If you first time here then SignUp</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                required={true}
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    /* TODO : cnage the bscse */
                    value: /\S+@uiu\.ac\.bd$/,
                    message: "Entered value does not match email format",
                  },
                })}
                name="email"
                placeholder="email"
                className="input input-bordered"
                type="email"
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                })}
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                className="btn bg-[#D1A054]"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>{" "}
          <p className="p-4">
            <small>
              Already have an Account{" "}
              <Link className="text-blue-500" to="/login">
                Login{" "}
              </Link>{" "}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
