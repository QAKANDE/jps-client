import React, { useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Modal } from 'react-bootstrap'

const AddToCartModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const re = useRef()
  useImperativeHandle(ref, () => ({
    handleShow() {
      setShow(true)
    },
  }))
  useImperativeHandle(ref, () => ({
    handleClose() {
      setShow(false)
    },
  }))

  return (
    <div>
      <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Body>
          <div>
            <p>Unable to add item to cart</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
})

export default AddToCartModal
