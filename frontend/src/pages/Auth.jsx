import React, { useState } from 'react'
import { LogoutOutlined } from '@ant-design/icons';
import {  Button, Form, Input } from 'antd' ;
import {useDispatch} from 'react-redux'
import {setIsAuth, setUser} from '../app/authSlice'
import { login } from '../http/userApi';
import { useFetch } from '../hooks/useFetch';
import Spinner from '../assets/spinner.svg'
import Warning from '../components/UI/Warning';

const Auth = () => {
  const [login_,setLogin_] = useState('');
  const [password,setPassword] = useState('')   
  const dispatch = useDispatch()
  
  const [onFinish, loading, error] = useFetch(async () => {
    const response = await login(login_,password)
    dispatch(setIsAuth(true))
    dispatch(setUser(response))
  }); 

  return (
    <>
    {error && <Warning error={error} />}
    {loading && 
      <div className='center'>
        <img src={Spinner} className={'spinner'} alt='spinner'/> 
      </div> 
    }
    {!loading &&  
    <div className='center'>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
      >
        
        <Form.Item
          label="Username"
          name="username"        
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={login_} onChange={e => setLogin_(e.target.value)}  />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {<LogoutOutlined />} Login            
          </Button>
        </Form.Item>
      </Form>
      </div> 
    }
    </>

  )
}

export default Auth