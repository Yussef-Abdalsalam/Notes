import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useRecoilState } from "recoil";
import { noteState } from "../Atoms/noteAtom";
import Note from "../Note/Note";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [noteLength, setnoteLength] = useRecoilState(noteState)
  const [noteAll, setnoteAll] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  let validationSchema = yup.object({
    title: yup.string().matches(/^[A-Za-z0-9]{3,15}$/, "title is muct ").required("title is required"),
    content: yup.string().required("content is required").matches(/^[A-Za-z0-9.,]{3,100}$/, "content is muct "),
  })

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },validationSchema, validate: function (values) {
    }, onSubmit: addnote
  })

  function addnote(values) {
    axios.post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    }).then((res) => { toast.success('Add to Note'); getnote()
      
    })
      .catch((err) => { toast.error("This didn't Note.") })
      .finally(() => {
        handleClose()
      })
  }

  function getnote() {
    axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    })
    .then((res) => {
       console.log(res);
       setnoteLength(res.data.notes.length)
       setnoteAll(res.data.notes)
    })
      .catch((err) => { console.log(err); })
  }
  useEffect(() => {
    getnote()
  },[])
  

  return (
    <>
    <div><Toaster/></div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
           <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="title" name="title" className=" form-control my-2" placeholder="Please Enter Title " />
           {formik.touched.title && formik.errors.title ? <div className="alert alert-danger">{formik.errors.title}</div> : ""}
            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} id="content" name="content" className=" form-control my-2" placeholder="Please Enter Content " />
            {formik.touched.content && formik.errors.content ? <div className="alert alert-danger">{formik.errors.content}</div> : ""}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button variant="primary" onClick={handleShow} className="btn btn-info text-white">
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">
              {noteAll.map((note)=>{
                return <Note key={note._id} note={note} getnote={getnote} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
