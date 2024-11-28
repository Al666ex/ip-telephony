import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input, ConfigProvider, message, Divider,Flex } from 'antd';
import { InfoCircleOutlined, MinusCircleOutlined, PlusOutlined, PhoneOutlined,SaveOutlined,DeleteOutlined } from '@ant-design/icons';
import { postPerson, removeLinkPersonPhone,  findPersonByPk, updatePerson  } from '../../../http/userApi';
import { setPerson, setSearchPerson, setPhone, setEditPersonPhone, setShowModal, setPersonId, setError, setSearchRefresh} from '../../../app/ipPhoneSlice';
import Warning from '../Warning';
import { isObjectEmpty } from '../../../utils/isObjectEmpty';
import { onHandleFormPersonInput } from '../../../utils/onHandleFormPersonInput';
import { useFetch } from '../../../hooks/useFetch';
import { searchForMatches } from '../../../utils/searchForMatches';
import { checkPhonesArray } from '../../../utils/checkPhonesArray';

const ModalPersonADD = ({ setModal2Open, modal2Open }) => {
  const [form] = Form.useForm();  
  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phones, setPhones] = useState(['']); // Состояние для массива телефонов
  const [messageApi, contextHolder] = message.useMessage();  
  const [loading, setLoading] = useState(false);
  const [phoneLink,setPhoneDelLink] = useState({})
  const dispatch = useDispatch();
  const person = useSelector((state) => state.ipPhone.person);
  const error = useSelector((state) => state.ipPhone.error)
  const checkBoxChangePersonData = useSelector(state => state.ipPhone.checkBoxChangePersonData)
  const editPersonPhone = useSelector(state => state.ipPhone.editPersonPhone)
  const searchPerson = useSelector(state => state.ipPhone.searchPerson)    
  //const latinPattern = /^[A-ZŢţŞşĂăÂâŞşÎî-]+$/;
  const latinPattern = /^[A-ZŢţŞşĂăÂâŞşÎîȘșȚț-]+$/;  
  const latinPatternAndNumbers = /^[A-ZŢţŞşĂăÂâŞşÎîȘșȚț0-9-\s]*$/;

  const [onFinishLink, loadingLink, errorLink] = useFetch(async () => {      
      const personId = editPersonPhone.id;
      console.log('phoneLink.id === ',phoneLink.id)
      const phoneId = phoneLink.id; // используем phone.id, переданный в функцию  
      const response = await removeLinkPersonPhone(personId, phoneId);

      messageApi.open({
        type: 'success',
        content: 'Success',
        duration: 2,
        style: { marginTop: '10vh' },
      });

      const updatedPerson = await findPersonByPk(personId);
      dispatch(setEditPersonPhone(updatedPerson));
      setPhoneDelLink({})
  });

  useEffect(() => {
    if(!isObjectEmpty(phoneLink)){
      onFinishLink();
    }
  },[phoneLink])

  useEffect(() => {
    if (checkBoxChangePersonData && !isObjectEmpty(editPersonPhone)) {
      console.log('ModalPersonADD --- editPersonPhone', editPersonPhone);
      
      // Устанавливаем значения полей формы
      form.setFieldsValue({
        last_name: editPersonPhone.last_name,
        first_name: editPersonPhone.first_name,
        patronymic: editPersonPhone.patronymic
      });
  
      setLast_name(editPersonPhone.last_name);
      setFirst_name(editPersonPhone.first_name);
      setPatronymic(editPersonPhone.patronymic)
    }
  }, [checkBoxChangePersonData, editPersonPhone, form]);


  //update start
  const onUpdatePerson= async () => {
    dispatch(setError(''));

    let removeEmptyPhones = phones.filter(item => item.length > 0)
    removeEmptyPhones = removeEmptyPhones.map(item => item.trim())
    const inEditPersonPhone = editPersonPhone.phones.map(({phone_number}) =>phone_number)
    const forPostPhones = [...removeEmptyPhones, ...inEditPersonPhone]
    
    if(searchForMatches(forPostPhones)){
      console.log('Одинаковые номера телефонов')
      dispatch(setError('Одинаковые номера телефонов'))
      return;
    }

    if(!checkPhonesArray(forPostPhones)){
      console.log('Номера телефонов должны содержать цифры')
      dispatch(setError('Номера телефонов должны содержать цифры'))
      return;
    }  

    try {
      setLoading(true);
      const personId = editPersonPhone.id            
      const patron = patronymic === undefined ? "" : patronymic

      const updatedPerson = {
        id : personId,
        last_name : last_name,
        first_name : first_name,
        patronymic : patron,
        phones : removeEmptyPhones
      }      

      const response = await updatePerson(updatedPerson);
      
      let obj = {
        id: response.id,
        last_name: response.last_name,
        first_name: response.first_name,
        patronymic: response.patronymic,
        phones : response.phones
        // patronymic: response.patronymic === undefined ? "" : response.patronymic,
      };

      dispatch(setPerson(obj));

      //form.resetFields();
      setPhones([''])

      const findPerson = await findPersonByPk(personId)

      console.log('findPerson === ',findPerson)
      dispatch(setEditPersonPhone(findPerson))

      messageApi.open({
        type: 'success',
        content: 'Success',
        duration: 2,
        style: { marginTop: '10vh' },
      });

/*      
      setTimeout(() => {
        dispatch(setSearchPerson(searchPerson))
        dispatch(setSearchRefresh(true)); // Принудительно обновляем состояние
      },1500)
*/
    } catch (error) {
      setLoading(false);
      dispatch(setError(`${error.response.data.message}. Status code: ${error.response.data.statusCode}`));
    } finally {
      setLoading(false);
    }
    
  };
  //update end

  const onFinish2 = async () => {    
    dispatch(setError(''));

    let beforesentPhones = [...phones]
    beforesentPhones = beforesentPhones.filter(item => item.length > 0)
    if(searchForMatches(beforesentPhones)){
      console.log('совпадения по номерам')
      dispatch(setError('Одинаковые номера телефонов'))
      return;
    }

    if(!checkPhonesArray(beforesentPhones)){
      console.log('Номера телефонов должны содержать цифры')
      dispatch(setError('Номера телефонов должны содержать цифры'))
      return;
    }    

    const postOject = {
      last_name, first_name, patronymic,phones :beforesentPhones
    }
    
    try {
      setLoading(true);
      console.log()
      const response = await postPerson(postOject);
      dispatch(setPerson(response));
      form.resetFields();
      setPhones([''])

      messageApi.open({
        type: 'success',
        content: 'Success',
        duration: 2,
        style: { marginTop: '10vh' },
      });
    } catch (error) {
      setLoading(false);
      dispatch(setError(`${error.response.data.message}. Status code: ${error.response.data.statusCode}`));
    } finally {
      setLoading(false);
      //      
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setModal2Open(false);
    dispatch(setEditPersonPhone({}))
    dispatch(setShowModal(false))
    dispatch(setPerson({}))
    dispatch(setPhone({}))
    dispatch(setPersonId(null))
    dispatch(setError(''));
          
      // setTimeout(() => {
        dispatch(setSearchPerson(searchPerson))
        dispatch(setSearchRefresh(true)); // Принудительно обновляем состояние
      // },1500)

  };

  const handleAddPhoneField = () => {
    setPhones([...phones, '']); // Добавляем новое поле для телефона
  };

  const handleRemovePhoneField = (index) => {
    const newPhones = phones.filter((_, idx) => idx !== index);
    setPhones(newPhones);
  };

  const handlePhoneChange = (value, index) => {
    // const newPhones = phones.map((phone, idx) => (idx === index ? value : phone));
    // setPhones(newPhones);
      // Применяем регулярное выражение, чтобы оставить только допустимые символы
    const validValue = value.toUpperCase().match(latinPatternAndNumbers) ? value.toUpperCase() : phones[index];
    const newPhones = phones.map((phone, idx) => (idx === index ? validValue : phone));
    setPhones(newPhones);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgMask: 'rgba(0, 0, 0, 0.35)',
        },
      }}
    >
      <Modal
        title={checkBoxChangePersonData ? "Modificarea datelor unei persoane" : "Adăugarea unei persoane"}
        centered
        closable
        open={modal2Open}
        onCancel={handleCancel}
        footer={null}
        width={400}
        style={{ paddingBottom: '15%' }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={isObjectEmpty(editPersonPhone) ? onFinish2 : onUpdatePerson}
          autoComplete="off"
        >
          {error && <Warning error={error} />}
          {contextHolder}

          <Form.Item
            label="last_name"
            name="last_name"
            value={last_name}
            normalize={(value) => value.toUpperCase()}
            onChange={(e) => setLast_name(onHandleFormPersonInput(e))}
            rules={[
              { required: true, message: 'Please input your last name!' },
              { pattern: latinPattern, message: 'Only Latin letters and ŢţŞşĂăÂâÎî- are allowed.' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="first_name"
            name="first_name"
            value={first_name}
            normalize={(value) => value.toUpperCase()}
            onChange={(e) => setFirst_name(onHandleFormPersonInput(e))}
            rules={[
              { required: true, message: 'Please input your first name!' },
              { pattern: latinPattern, message: 'Only Latin letters and ŢţŞşĂăÂâÎî- are allowed.' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="patronymic"
            name="patronymic"
            value={patronymic}
            normalize={(value) => value.toUpperCase()}
            onChange={(e) => setPatronymic(onHandleFormPersonInput(e))}
            tooltip={{ title: 'optional', icon: <InfoCircleOutlined /> }}
            rules={[{ pattern: latinPattern, message: 'Only Latin letters and ŢţŞşĂăÂâÎî- are allowed.' }]}
          >
            <Input />
          </Form.Item>

          {
            (checkBoxChangePersonData && editPersonPhone.phones) &&
              editPersonPhone.phones.map((phone) => 
                <Flex justify="space-between" align="center"
                  key={Math.random() * Date.now()}
                  style={{ marginBottom: '0.7rem' }}
                >
                  <div>Phone number:</div>
                  <Flex justify="space-between" align="center" style={{ width: '70%' }}>
                    <span style={{ flex: 1, textAlign: 'left' }}>{phone.phone_number}</span>
                    <div>
                      <Button 
                        type="primary"
                        onClick={() => {  setPhoneDelLink(phone) }}                      
                        
                      >
                        <DeleteOutlined /> Delete
                      </Button>
                    </div>
                  </Flex>
                </Flex>
              )
          }
          <Divider>Adaugă numere de telefon</Divider>

          {phones.map((phone, index) => (
            <Form.Item
              label={`phone_number ${index + 1}`}
              key={index}              
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input
                value={phone}
                onChange={(e) => handlePhoneChange((e.target.value).toUpperCase(), index)}                
                style={{ width: '85%', marginRight: 8 }}
              />
              {phones.length > 1 && (
                <MinusCircleOutlined
                  style={{ color: 'red' }}
                  onClick={() => handleRemovePhoneField(index)}
                />
              )}
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={handleAddPhoneField} icon={<PlusOutlined />}>
              Add Phone Number
            </Button>
          </Form.Item>

          <Button
            type="primary"            
            htmlType="submit"
            loading={loading}
            style={{ width: '100%' }}            
          >
            <SaveOutlined /> Submit
          </Button>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default ModalPersonADD;