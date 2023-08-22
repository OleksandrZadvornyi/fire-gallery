import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = () => {
    try {
      signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && error}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1
              className="text-5xl font-bold bg-gradient-to-r bg-clip-text  text-transparent 
            from-yellow-500 via-red-500 to-orange-500
            animate-text mb-4"
            >
              FireGallery
            </h1>
          </div>
          <div className="card sm:w-[30rem] shadow-2xl bg-base-100 px-4">
            <div className="card-body">
              <div className="text-center">
                <h2 className="text-3xl font-bold ">Sign In</h2>
                <p className="py-2">Let's share your photos to the world!</p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign In</button>
              </div>
              <p className="text-center">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-400">
                  Sign Up
                </a>
              </p>
              <div className="flex items-center mt-4 mb-2">
                <hr className="w-[43%] h-px bg-gray-200 border-0 dark:bg-gray-600" />
                <span className="w-[14%] text-center leading-1">or</span>
                <hr className="w-[43%] h-px bg-gray-200 border-0 dark:bg-gray-600" />
              </div>
              <div className="form-control">
                <button
                  className="btn btn-outline"
                  onClick={handleSignInWithGoogle}
                >
                  <FontAwesomeIcon icon={faGoogle} /> Continue with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
