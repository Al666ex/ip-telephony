import React, { useEffect, useState } from 'react';
import { Button, Flex, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ModalPersonADD from './Modal/ModalPersonADD';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckBoxChangePersonData,setEditPersonPhone } from '../../app/ipPhoneSlice';

const PersonPhoneADD = () => {
  const [modal2Open, setModal2Open] = useState(false);   
  const checkBoxChangePersonData = useSelector(state => state.ipPhone.checkBoxChangePersonData)  
  const showModal = useSelector(state => state.ipPhone.showModal)  
  const role = useSelector(state =>state.auth.user.roles[0].value)
  const dispatch = useDispatch();

  useEffect(() => {
    if(checkBoxChangePersonData === false){      
      dispatch(setEditPersonPhone({}))
    }    
    
    if(checkBoxChangePersonData && showModal){
      setModal2Open(true)
    }    

  },[checkBoxChangePersonData,showModal])

  return (
    <Flex style={{ marginBottom: '10px' }} align='center'>
      {
        role !== 'VIEW' &&
          <Flex align='center' justify='space-between' style={{width : '100%'}}>
            <Button
              type='primary'
              onClick={() => setModal2Open(true)}
              style={{ marginRight: '1rem' }}
              disabled={checkBoxChangePersonData ? true : false}
            >
              <UserAddOutlined /> New Person
            </Button>

            <Checkbox checked={checkBoxChangePersonData} onChange={(e) => dispatch(setCheckBoxChangePersonData(e.target.checked))}>MODIFY PERSON DATA</Checkbox>
          </Flex>
      }
      
      {modal2Open && <ModalPersonADD setModal2Open={setModal2Open} modal2Open={modal2Open} />}      
    </Flex>
  );
};

export default PersonPhoneADD;