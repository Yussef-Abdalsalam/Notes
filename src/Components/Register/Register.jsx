import { useFormik } from "formik";
import notesImg from "../../images/notes1.png";
import * as yup from "yup"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  let navigate = useNavigate()
  const [errMessage, setErrMessage] = useState('')

  let validationSchema = yup.object({
    name: yup.string().required("Name is required").min(3, "min is 3 char").max(15, "max is 15 char"),
    email: yup.string().email("email is not valid").required("Email is required"),
    password: yup.string().required("Password is required").matches(/^[A-Za-z0-9]{3,8}$/, "Password muct start capital letter"),
    age: yup.number().required("age is required").min(10, "min is 10 age").max(90, "max is 90 age"),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Phone is not valid"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    }, validationSchema, validate: function (values) {
    },
    onSubmit: signUp
  })

  async function signUp(values) {
    await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values).then((data) => {
      if (data?.data?.msg === "done") {
        navigate("/login")
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
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  {errMessage ? <div className="alert alert-danger">{errMessage}</div> : ""}
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onFocus={clerMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                    {formik.touched.name && formik.errors.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

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
                    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

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
                    {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}
                    <input
                      onFocus={clerMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                    {formik.touched.age && formik.errors.age ? <div className="alert alert-danger">{formik.errors.age}</div> : ""}
                    <input
                      onFocus={clerMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign Up
                    </button>
                  </form>
                  <p>Already Have Account ? <Link className="text-min" to={"/login"}>Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
