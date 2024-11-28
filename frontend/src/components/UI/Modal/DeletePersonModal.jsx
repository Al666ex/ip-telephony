import React from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

const DeletePersonModal = ({ visible, onConfirm, onCancel, loading }) => {
  const editPersonPhone = useSelector(state => state.ipPhone.editPersonPhone)
  return(
    <Modal
    title="Confirmați eliminarea"
    open={visible}
    onOk={onConfirm}
    onCancel={onCancel}
    confirmLoading={loading}
    className="custom-modal-footer"
  >
    <div style={{ fontSize: '1.3rem' }} >
      <div>Sigur doriți să eliminați persoana:</div>
      <div>
        <strong className='remove_person'>{editPersonPhone.last_name} {editPersonPhone.first_name}</strong> din aplicație?
      </div>
    </div>
  </Modal>
  )
}



export default DeletePersonModal;