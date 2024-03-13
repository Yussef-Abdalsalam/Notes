import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Sidebar() {
  let navigate = useNavigate()

  function Logout() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        navigate("/login")
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });


  }


  return (
    <>
      <div>
        <div className="p-0 min-vh-100 bg-dark">
          <ul className="text-light list-unstyled">

            <li className="p-3 pe-lg-2 d-lg-flex d-none  ">
              <i className="fa-regular fa-note-sticky text-info fs-2"></i>
              <p className='ps-3 fs-4'>Notes</p>
            </li>

            <li className="p-3 pe-lg-5 sidebar-element">
              <a className=" cursor nav-link px-0 px-lg-2"> <i className="bi-house" /><span className="px-lg-2 ms-1 d-none d-lg-inline">Home</span> </a>
            </li>

            <li className="p-3 pe-lg-5 sidebar-element">
              <button onClick={Logout} className="nav-link px-0 px-lg-2"> <i className="bi bi-box-arrow-left"></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Logout</span> </button>
            </li>

          </ul>
        </div>
      </div>
    </>
  )
}
