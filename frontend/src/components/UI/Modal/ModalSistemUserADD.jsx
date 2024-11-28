import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Flex,Button,Form,Modal,ConfigProvider,Input,Select } from 'antd';
import { useFetch } from '../../../hooks/useFetch';
import { SaveOutlined } from '@ant-design/icons';
import { userRegistration } from '../../../http/userApi';

const ModalSistemUserADD = ({ setModal2Open, modal2Open, updateUsers, setUpdateUsers }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role ,setRole] = useState('')
    const [form] = Form.useForm();  
    const options = useSelector(state => state.ipPhone.options)
    
    const handleCancel = () => {
        form.resetFields();
        setModal2Open(false);
    };

    const roleChange = (value) => setRole(value)
    
    const [onFinish, onLoading, onError] = useFetch(async () => {          
      const response = await userRegistration(login,password,role);
      console.log('response registration user ',response)          
      setUpdateUsers(true);
      handleCancel()
    });
  
    return (
        <ConfigProvider
        theme={{
          token: {
            colorBgMask: 'rgba(0, 0, 0, 0.35)',
          },
        }}
      >
        <Modal
        //   title={checkBoxChangePersonData ? "Modificarea datelor unei persoane" : "Adăugarea unei persoane"}
          title={"Adăugarea un nou utilizator de sistem"}
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
            // onFinish={isObjectEmpty(editPersonPhone) ? onFinish2 : onUpdatePerson}
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* {error && <Warning error={error} />}
            {contextHolder} */}
  
            <Form.Item
              label="user login"
              name="login"
              value={login}                          
              onChange={(e) => setLogin((e.target.value))}
              rules={[
                { required: true, message: 'Please input login!' },
                // { pattern: latinPattern, message: 'Only Latin letters and ŢţŞşĂăÂâÎî- are allowed.' },
              ]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item
              label="user password"
              name="password"
              value={password}
              // normalize={(value) => value.toUpperCase()}
            //   onChange={(e) => setPassword(onHandleFormPersonInput(e))}
              onChange={(e) => setPassword((e.target.value))}
              rules={[
                { required: true, message: 'Please input password!' },
                // { pattern: latinPattern, message: 'Only Latin letters and ŢţŞşĂăÂâÎî- are allowed.' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="option" 
              rules={[
                { required: true, message: 'Please select an option role!' },
              ]}
            >
              <Select 
                placeholder="Please select role"
                options={options}
                onChange={roleChange}
              >                
              </Select>
            </Form.Item>
  
            <Button
              type="primary"            
              htmlType="submit"
              loading={onLoading}
              style={{ width: '100%' }}            
            >
              <SaveOutlined /> Submit
            </Button>
          </Form>
        </Modal>
      </ConfigProvider>
    );
  };

export default ModalSistemUserADD