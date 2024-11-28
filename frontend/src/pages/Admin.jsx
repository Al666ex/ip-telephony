import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Table, Input, Button, Flex } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { getUsersAPI, getRolesAPI, } from '../http/userApi';
import { useFetch } from '../hooks/useFetch';
import { v4 } from 'uuid';
import { columns } from '../utils/getColumns';
import { formatData } from '../utils/formatData';
import ModalSistemUserADD from '../components/UI/Modal/ModalSistemUserADD';
import { setOptions } from '../app/ipPhoneSlice';
import { formatDataRoles } from '../utils/formatDataRoles';
import { useHeight } from '../hooks/useHeight';

const Admin = () => {
  const role = useSelector((state) => state.auth.user.roles[0].value);
  const [modal2Open, setModal2Open] = useState(false);         
  const [updateUsers,setUpdateUsers] = useState(false)
  const [viewData, setViewData] = useState([]);
  const [searchText, setSearchText] = useState(''); // Состояние для текста поиска
  const dispatch = useDispatch()
  // const height = `${useHeight()}+300px`;
  // console.log('height-----',height)

  const [fetchQueries, loading, error] = useFetch(async () => {
    setViewData([]);
    const response = await getUsersAPI();
    let viewData = formatData(response.data);
    setViewData(viewData);

    const responseRoles = await getRolesAPI()
    const options = formatDataRoles(responseRoles.data);
    dispatch(setOptions(options));

  });

  useEffect(() => {
    if(updateUsers === true){
      fetchQueries()
      setUpdateUsers(false)
    }
  },[updateUsers])

  useEffect(() => {
    if (role === 'ADMIN') {
      fetchQueries();
    }
  }, []);

  // Фильтрация данных на основе текста поиска
  const filteredData = viewData.filter((item) =>
    item.login.toUpperCase().includes(searchText.toUpperCase())
  );

  return (
    <div className="main_admin">
      <div className="container">
        <div className="left" >
          <h2>Crearea și editarea utilizatorilor sistemului</h2>
          <Flex >
            <Input
              placeholder="Search by login"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: 16, marginRight : '1rem' }}
              allowClear
            />
            <Button
              type='primary'
              onClick={() =>{
                setModal2Open(true)                
              }}
            >
              <UserAddOutlined /> New System User
            </Button>
          </Flex>
          
          
          <Table
            columns={columns}
            loading={loading}
            rowKey={() => v4()}
            dataSource={filteredData} // Используем отфильтрованные данные
            pagination={false}    
            scroll={{y : '700px'}}         
            
          />

          
        </div>
      </div>
      {modal2Open && <ModalSistemUserADD 
                        setModal2Open={setModal2Open} 
                        modal2Open={modal2Open} 
                        updateUsers={updateUsers}
                        setUpdateUsers={setUpdateUsers}
                     />}      
    </div>
  );
};

export default Admin;

