import notesImg from "../../images/notes1.png";
import { useFormik } from "formik";
import * as yup from "yup"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {


  let navigate = useNavigate()
  const [errMessage, setErrMessage] = useState('')

  let validationSchema = yup.object({
    email: yup.string().email("email is not valid").required("Email is required"),
    password: yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema, validate: function (values) {

    },
    onSubmit: signIn
  })

  async function signIn(values) {
    await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values).then((data) => {
      if (data?.data?.msg === "done") {
        localStorage.setItem("userToken", data?.data?.token);
        navigate("/home")
      }
    }
    ).catch((err) => {
      setErrMessage(err?.response?.data?.msg)
    })
  }

  function clerMsg() {
    setErrMessage('')
  }




  return (
    <>
      <li className="fixed-top px-4 py-1 pe-lg-5 d-lg-flex d-none  ">
        <i className=" text-white fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  {errMessage ? <div className="alert alert-danger">{errMessage}</div> : ""}
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onFocus={clerMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />

                    <input
                      onFocus={clerMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />

                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Login
                    </button>
                  </form>
                  <p>Don't Have Account ? <Link className="text-min" to={"/"}>Register</Link> Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
