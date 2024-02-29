import React, { useState, useEffect } from "react";
import { Input } from "../Components/UserInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { login, clearErrors } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Components/Alert";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { message: updatePasswordMessage } = useSelector(
    (state) => state.userActions
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (!error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [dispatch, navigate, error, isAuthenticated]);

  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      {(message || updatePasswordMessage) && (
        <div className="w-full md:w-3/5 2xl:w02/5">
          <Alert
            message={message || updatePasswordMessage}
            color="red"
            onClick={() => {
              dispatch({ type: "CLEAR_MESSAGE" });
            }}
          />
        </div>
      )}
      <form
        onSubmit={loginSubmit}
        className="border border-border rounded-lg bg-dry flex-colo gap-8 w-full md:w-3/5 2xl:w02/5 p-8 sm:p-14"
      >
        <img
          src="/images/logo.png"
          className="w-full h-12 object-contain"
          alt="logo"
        />
        <Input
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          bg={true}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={error ? error.email : null}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          bg={true}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={error ? error.password : null}
        />
        <button
          type="submit"
          className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
        >
          <FiLogIn /> Sign In
        </button>
        <p className="text-center text-border">
          Don't have an account?{" "}
          <Link to="/register" className="text-dryGray font-semibold ml-2">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Login;
