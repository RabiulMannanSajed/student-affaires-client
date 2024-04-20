import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/Authprovider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target; // take the value form input
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // this is form sweet alert
        Swal.fire("Successfully Login");
        // now take him to the right place
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseErrorMessage(errorMessage);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">If you already have an account then login</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="p-4">
            <small>
              New Here? {/* TODO : this is not done yet   */}
              <Link className="text-blue-500" to="/signup">
                Create an account
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
