import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import useCategoriesStore from '../../../store/categories'

export default function CategoriesModal({open,edit,toggle}) {
    const {postCategories} = useCategoriesStore()
    const {updateCategories} = useCategoriesStore()
    const handleSubmit = (e)=>{
        toggle()
        e.preventDefault()
        let payload = {
            name: e.target[0].value
        }
        if(edit !== ''){
            updateCategories(edit,payload)
        }else{
            postCategories(payload)
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
