import React,{useEffect, useState} from 'react'
import {Menu, ConfigProvider} from 'antd'
import { ToolOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import {setFilter} from '../../app/ipPhoneSlice'

const ConfigMenu = () => {    
    const user = useSelector(state => state.auth.user)   
    const [role,setRole] = useState(user.roles[0].value)  
    const [items,setItems] = useState([])
    const dispatch = useDispatch()
    
    console.log('ROLE-----',role)

    useEffect(() => {
        if(role){
            if(role === "CHANGE" || role === 'VIEW'){
            setItems([
                { label: "Search", key: `Search`, icon: <SearchOutlined /> },          
            ])
            }
            if(role === "ADMIN"){
            setItems([
                { label: "Search", key: `Search`, icon: <SearchOutlined /> },
                { label: "Admin", key: `Admin`, icon: <ToolOutlined /> },
            ])
            }
        }
    },[])

    const handleMenuClick = (e) => {
    console.log(`Clicked on menu item with key: ${e.key}`);         
    dispatch(setFilter(e.key))
    };

  return (
    <ConfigProvider
        theme={{
        token: {
            colorPrimary: 'white',  // Основной цвет
            colorTextBase: 'white',    // Основной цвет текста      
            menuItemHoverColor: 'white',  // Цвет текста при hover
            menuHorizontalItemHoverColor: 'red',  // Цвет текста при hover в горизонтальном меню    
            horizontalLineHeight : '10px',
            itemHeight : '20px'
        },
        }}
    >
        <Menu
            onClick={handleMenuClick}
            mode="horizontal"
            defaultSelectedKeys={['Search']}
            items={items}
            style={{ display: 'inline-block', minWidth: '200px', background : 'transparent' }} 
            className='customMenu'
        />   
    </ConfigProvider>
  )
}

export default ConfigMenu