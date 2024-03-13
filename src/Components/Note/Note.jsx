import React from "react";
import "./Note.scss";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Zoom } from "react-awesome-reveal";
import toast from "react-hot-toast";

export default function Note({ note, getnote }) {
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
    }, validationSchema, validate: function (values) {
    }, onSubmit: updatenote
  })

  function updatenote(values) {
    console.log(note._id);
    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values, {
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    }).then((res) => { toast.success('Update to Note'); getnote() })
      .catch((err) => { toast.error("This didn't Note.") })
      .finally(() => {
        handleClose()
      })
  }

  function deletenote() {
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    }).then((res) => {toast.success('Delete Note'); getnote() })
      .catch((err) => { toast.error("This didn't Note.")})

  }

  return (
    <>
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
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-4 p-3">
        <Zoom>
          <div>
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                  {note.content}
                </Card.Text>
                <div className="">
                  <i variant="primary" onClick={handleShow} className="cursor fa-xl mx-3 fa-solid fa-pen-to-square"></i>
                  <i onClick={deletenote} className="cursor fa-xl mx-3 fa-solid fa-trash"></i>
                </div>

              </Card.Body>
            </Card>
          </div>
        </Zoom>
      </div>

    </>
  );
}
