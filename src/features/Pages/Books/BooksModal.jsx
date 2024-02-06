import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axiosCleint from "../../../plugins/AxiosCleint";
// import upload_img from '../../../images/add-square-svgrepo-com.png'

export default function BooksModal({ open, toggle, edit }) {
  const [file, setFile] = useState("");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosCleint.get("/author").then((res) => {
      setAuthors(res?.data);
    });
    axiosCleint.get("/category/get/all").then((res) => {
      setCategories(res?.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    toggle();
    let payload = {
      name: e.target[0].value,
      author_id: +e.target[1].value,
      price: +e.target[2].value,
      code: e.target[3].value,
      janr_id: +e.target[4].value,
      description: e.target[6].value
    };
    const formData = new FormData();
    formData.append("file", file);

    if(edit !== ''){
        axiosCleint
        .patch(`/book/${edit.id}`, {...payload})
        .then((res)=>{
            if(res.status === 200){
                window.location.reload()
            }
        })
    }else{
        axiosCleint.post("/files/upload", formData).then((res) => {
          if (res.status === 201) {
            axiosCleint
              .post("/book/create", { ...payload, image: res.data.link })
              .then((res) => {
                if(res.status === 201){
                    window.location.reload()
                }
              });
          }
        });
    }

  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h6>Add Books</h6>
      </ModalHeader>
      <ModalBody>
        <form id="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" className="form-control my-3" defaultValue={edit.name}/>
          <select className="form-control my-3" defaultValue={edit.author_id}>
            <option value="">Select Authors</option>
            {authors?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.full_name}
                </option>
              );
            })}
          </select>
          <input type="number" className="form-control" placeholder="Price" defaultValue={edit.price}/>
          <input
            className="form-control my-[10px]"
            type="number"
            placeholder="code"
            defaultValue={edit.code}
          />
          <select defaultValue={edit.janr_id} className="form-control my-3"> 
            <option value="">Select Categories</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
            <input
              type="file"
              className=" form-control my-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
          <textarea
            rows="5"
            className="form-control"
            placeholder="Description..."
            defaultValue={edit.description}
          ></textarea>
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" form="form" type="submit">
          save
        </button>
      </ModalFooter>
    </Modal>
  );
}
