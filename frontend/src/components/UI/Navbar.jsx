import React from 'react'
import {Button, Flex} from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuth, setUser} from '../../app/authSlice'
import {setFilter,setOptions, setPerson,setSearchPerson,setEditPersonPhone,setFindPerson,setCheckBoxChangePersonData,setShowModal} from '../../app/ipPhoneSlice'
import ConfigMenu from './ConfigMenu';

const Navbar = () => {  
  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)   
  const dispatch = useDispatch()
  
  const logout = () => {
    dispatch(setIsAuth(false));
    dispatch(setUser({}));
    dispatch(setFilter("Search"));
    dispatch(setPerson({}));
    dispatch(setSearchPerson(''));
    dispatch(setEditPersonPhone({}));    
    dispatch(setFindPerson([]));    
    dispatch(setCheckBoxChangePersonData(false))
    dispatch(setShowModal(false))
    dispatch(setOptions([]))
    localStorage.removeItem('token');
  }

  return (

    <Flex justify='center' align='center' className='navbar'>
      <Flex justify='space-between' align='center' style={{ width: '1280px' }}>        
        <ConfigMenu />
        
        <Flex align='center' style={{ paddingRight: '1em' }}>          
          {isAuth && <div className='user'>{user.login}</div>}
          <Button 
            type='primary' 
            onClick={logout} 
            size='middle'>                          
            {<LogoutOutlined />} Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navbar;