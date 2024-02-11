import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axiosCleint from "../../../plugins/AxiosCleint";
import useBooksStore from "../../../store/books";


export default function BooksModal({ open, toggle, edit }) {
  const [file, setFile] = useState("");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const {updateBooks} = useBooksStore()
  const {postBook} = useBooksStore()
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
      updateBooks(edit, payload)
    }else{
        axiosCleint.post("/files/upload", formData).then((res) => {
          if (res?.status === 201) {
            postBook({...payload, image: res?.data})
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
