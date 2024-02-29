import React, { useState, useEffect } from "react";
import { Input } from "../Components/UserInput";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { register, clearErrors } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Components/Alert";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name: fullName, email, password }));
    setFullName("");
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
  }, [dispatch, navigate, error, isAuthenticated, message]);
  return (
    <div className="container mx-auto px-2 my-24 flex-colo">
      {message && (
        <div className="w-full md:w-3/5 2xl:w02/5">
          <Alert
            message={message}
            color="red"
            onClick={() => {
              dispatch({ type: "CLEAR_MESSAGE" });
            }}
          />
        </div>
      )}
      <form
        onSubmit={registerSubmit}
        className="border border-border rounded-lg bg-dry flex-colo gap-8 w-full md:w-3/5 2xl:w02/5 p-8 sm:p-14"
      >
        <img
          src="/images/logo.png"
          className="w-full h-12 object-contain"
          alt="logo"
        />
        <Input
          label="FullName"
          placeholder="Your name"
          type="text"
          bg={true}
          onChange={(e) => setFullName(e.target.value)}
          error={error ? error.fullName : null}
          value={fullName}
        />
        <Input
          label="Email"
          placeholder="example@gmail.com"
          type="email"
          bg={true}
          onChange={(e) => setEmail(e.target.value)}
          error={error ? error.email : null}
          value={email}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          bg={true}
          onChange={(e) => setPassword(e.target.value)}
          error={error ? error.password : null}
          value={password}
        />
        <button
          type="submit"
          className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
        >
          <FiLogIn /> Sign Up
        </button>
        <p className="text-center text-border">
          Already have an account?{" "}
          <Link to="/login" className="text-dryGray font-semibold ml-2">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
