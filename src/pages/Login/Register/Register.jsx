import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import Error from "../../Error/Error";

const Register = () => {
  const { createUserSignIn, updateUserProfile, loading } = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUserRegistration = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoUrl = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    

    if (password === confirmPassword && regex.test(password)) {
      createUserSignIn(email, password)
        .then((result) => {
          const createdUser = result.user;
          updateUserProfile(createdUser, name, photoUrl)
            .then(() => console.log("user profile updated"))
            .catch((error) => setError(error.message));

        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      alert("Minimum six characters, at least one letter and one number");
    }
    navigate('/')
    form.reset();
  };

  return (
    <section
      style={{
        backgroundImage: "url(https://i.ibb.co/xJ8Fk3t/registration.jpg)",
      }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-950">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              onSubmit={handleUserRegistration}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input w-full bg-gray-50 text-sm font-medium text-gray-900"
                  placeholder="your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Photo Url
                </label>
                <input
                  type="text"
                  name="photo"
                  className="input w-full bg-gray-50 text-sm font-medium text-gray-900"
                  placeholder="photo url"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input w-full bg-gray-50 text-sm font-medium text-gray-900"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input w-full bg-gray-50 text-sm font-medium text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="••••••••"
                  className="input w-full bg-gray-50 text-sm font-medium text-gray-900"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <p><small className="text-gray-950">Minimum six characters, at least one letter and one number</small></p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <Link
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-block">
                Create an account
              </button>
              <p className="text-sm font-medium text-gray-950">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
