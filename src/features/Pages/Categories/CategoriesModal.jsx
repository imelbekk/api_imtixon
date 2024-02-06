import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axiosCleint from '../../../plugins/AxiosCleint'

export default function CategoriesModal({open,edit,toggle}) {
    const handleSubmit = (e)=>{
        toggle()
        e.preventDefault()
        let payload = {
            name: e.target[0].value
        }
        if(edit !== ''){
            axiosCleint.patch(`/category/update/${edit.id}`, { ...payload })
            .then((res)=>{
                if(res?.status === 200){
                    window.location.reload()
                }
            })
        }else{
        axiosCleint.post('/category/create', {...payload})
        .then((res)=>{
            if(res?.status === 201){
                window.location.reload()
            }
        })
    }
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>
            <h6>Add Categories</h6>
        </ModalHeader>
        <ModalBody>
            <form id='form' onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' className='form-control my-3' defaultValue={edit.name}/>
            </form>
        </ModalBody>
        <ModalFooter>
            <button className='btn btn-success' form='form' type='submit'>save</button>
        </ModalFooter>
    </Modal>
  )
}
