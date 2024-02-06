import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosCleint from "../../../plugins/AxiosCleint";

export default function AuthorsModal({ open, toggle,edit }) {
  const [file, setFile] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    toggle();
    let payload = {
      full_name: e.target[0].value,
      birthdate: e.target[1].value ? e.target[1].value : edit.birthdate,
      country: e.target[2].value,
    };

    const formData = new FormData();
    formData.append("file", file);

    if(edit !== ''){
        axiosCleint
        .patch(`/author/${edit.id}`, {...payload})
        .then((res)=>{
            if(res.status === 200){
                window.location.reload();
            }
        })
    }else{
        axiosCleint.post("/files/upload", formData).then((res) => {
          if (res.status === 201) {
            axiosCleint
              .post("/author", { ...payload, image: res?.data?.link })
              .then((res) => {
                if (res.status === 201) {
                  window.location.reload();
                }
              });
          }
        });
    }
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>Add Author</h1>
      </ModalHeader>
      <ModalBody>
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control my-3"
            defaultValue={edit.full_name}
          />
          <input
            type="date"
            className="form-control my-3"
            placeholder="Birthdate"
            defaultValue={edit.birthdate}
          />
          <input
            type="text"
            placeholder="Country"
            className="form-control my-3"
            defaultValue={edit.country}
          />
          <input
            type="file"
            className="form-control my-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" form="form" type="submit">
          save
        </button>
      </ModalFooter>
    </Modal>
  );
}
