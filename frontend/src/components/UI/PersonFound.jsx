import React, { useEffect, useState } from 'react'
import { setEditPersonPhone,setShowModal,setPersonId, setSearchPerson, setSearchRefresh } from '../../app/ipPhoneSlice'
import { useDispatch,useSelector } from 'react-redux'
import {useFetch} from '../../hooks/useFetch'
import {findPersonByPk, removePerson} from '../../http/userApi'
import { Button, Flex, ConfigProvider, Divider, Modal, message } from 'antd'
import { UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons'
// import ModalPersonDelete from './Modal/ModalPersonDelete'
import DeletePersonModal from './Modal/DeletePersonModal'

const PersonFound = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [modalVisible, setModalVisible] = useState(false);
    const checkBoxChangePersonData = useSelector(state => state.ipPhone.checkBoxChangePersonData);
    const findPerson = useSelector(state => state.ipPhone.findPerson);
    const personId = useSelector(state => state.ipPhone.personId);
    const showModal = useSelector(state => state.ipPhone.showModal)
    const searchPerson = useSelector(state => state.ipPhone.searchPerson)    
  
    const dispatch = useDispatch();
  
    const [onFinish, loading, error] = useFetch(async () => {
      if (checkBoxChangePersonData) {
        const response = await findPersonByPk(personId);
        const { id, last_name, first_name, patronymic, phones } = response;
        setObject({ id, last_name, first_name, patronymic, phones });
        dispatch(setShowModal(true));
      }
    });
  
    const [onDelete, loadingDelete, errorDelete] = useFetch(async () => {
      if (checkBoxChangePersonData && modalVisible) {
        try {
          const response = await removePerson({personId});
          messageApi.open({
            type: 'success',
            content: `Success. ${response.message}`,
            duration: 3,
            style: { marginTop: '10vh' },
          });
          console.log('person was removed');
          setModalVisible(false);
          setTimeout(() => {
            dispatch(setSearchPerson(searchPerson))
            dispatch(setSearchRefresh(true)); // Принудительно обновляем состояние
            return response;
          },2300)
          
        } catch (error) {
          console.log('error ',errorDelete)
        }
      }
    });
  
    useEffect(() => {
      if (personId && showModal) {    
        onFinish();
      }
    }, [personId, modalVisible]);
  
    const setObject = obj => {
      dispatch(setEditPersonPhone(obj));
      console.log('obj=====', obj);
    };
  
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            colorPrimaryHover: '#ff4d4f',
          },
        }}
      >
        {contextHolder}
        <div className="findPerson" style={{paddingRight : '0.2rem'}}>
          
          {findPerson.map(({ id, last_name, first_name, patronymic, phones }) => (
            <div
              key={id}
              className={checkBoxChangePersonData ? 'person_found' : ''}
            >
              {/* <Divider style={{ marginTop: '10px', marginBottom: '10px' }} /> */}
              <div className="last_first_names">
                {last_name} {first_name} {patronymic}
              </div>
              {phones.map(phone => (
                <div key={phone.id}>{phone.phone_number}</div>
              ))}
              {checkBoxChangePersonData && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ConfigProvider
                      theme={{
                          token: {                                
                              colorPrimary: '#1890ff', // Основной цвет (можете изменить)
                              colorPrimaryHover: 'red', // Цвет фона при наведении                                
                          },
                      }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setModalVisible(true);
                        dispatch(setEditPersonPhone({ id, last_name, first_name}))
                        dispatch(setPersonId(id));
                      }}
                    >
                      
                      <UserDeleteOutlined /> Delete
                    </Button>

                  </ConfigProvider>  

                  <ConfigProvider
                            theme={{
                                token: {                                
                                    colorPrimary: '#1890ff', // Основной цвет (можете изменить)
                                    colorPrimaryHover: 'green', // Цвет фона при наведении                                
                                },
                            }}
                        >
    
                  <Button
                    type="primary"
                    onClick={() => {
                        dispatch(setEditPersonPhone({ id, last_name, first_name}))
                        dispatch(setShowModal(true))
                        dispatch(setPersonId(id))
                        onFinish()
                    }}
                  >
                    <UserSwitchOutlined /> Update
                  </Button>
                  </ConfigProvider>
                </div>
              )}
              <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
            </div>
          ))}
          <DeletePersonModal
            visible={modalVisible}
            onConfirm={onDelete}
            loading={loadingDelete} 
            onCancel={() => setModalVisible(false)}
            // last_name={editPersonPhone.last_name}
            // first_name={editPersonPhone.first_name}
          />
        </div>
      </ConfigProvider>
    );
  };

  export default PersonFound;