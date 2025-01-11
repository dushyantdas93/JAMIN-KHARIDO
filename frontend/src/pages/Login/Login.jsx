import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customer_login, customer_logout } from "../../rtk/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import home from "/image/home.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "/image/oyo-logo1.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  
  const navigate = useNavigate();

  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (slice) => slice.auth
  );
  
  return (
    <div
      className=" w-full  h-screen bg-cover bg-center relative "
      style={{ backgroundImage: `url(${home})`, position: "center" }}
    >
      <div>
        {/* <span className="text-3xl font-bold uppercase p-2 rounded-lg bg-white">Jamin Kharido</span> */}
      </div>
      <div className="bg-white lg:absolute h-full lg:h-[96vh] lg:w-[25vw] top-4 right-4 lg:rounded-lg p-10 flex flex-col gap-4 z-10">
        {/* {successMessage && (
          <h1 className="text-xs text-green-500">message= {successMessage}</h1>
        )}
        {errorMessage && (
          <h1 className="text-xs text-red-500">error= {errorMessage}</h1>
        )}
        <h1>logged in as : {userInfo?.name}</h1> */}
        <div>
          <img src={logo} alt="" className="h-8" />
        </div>
        <h1 className="text-gray-400 text-lg">Welcome to Jaminkharido</h1>
        <h1 className="text-gray-600 text-2xl font-bold">
          Get started with your email or phone number
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // console.log("Form Data:", values);
            dispatch(customer_login(values)).then(() => navigate("/ads"));

            // console.log(userInfo)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-8 py-1 rounded-md border border-gray-300"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  className="w-full px-8 py-1 rounded-md border border-gray-300"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-1 rounded-md border border-gray-300 bg-blue-500 text-white"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex justify-between">
          <Link to="/forgetPassword ">
            <h1 className="capitalize cursor-pointer text-blue-500 underline">
              forget password
            </h1>
          </Link>
          <Link to="/register">
            <h1 className="capitalize cursor-pointer text-blue-500 underline">
              Register
            </h1>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 lg:bottom-4 lg:left-10 px-8  lg:px-5 text-xs lg:text-lg  bg-white ">
        <h1 className="">
          By continuing you agree to our{" "}
          <Link to="/">
            <span className="text-blue-700 cursor-pointer">privacy policy</span>
          </Link>{" "}
          and{" "}
          <Link to="/">
            <span className="text-blue-700 cursor-pointer">terms of use</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
