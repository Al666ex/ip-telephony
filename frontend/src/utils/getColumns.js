export const columns = [
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      sorter: (a, b) => a.login < b.login ? -1 : 1,   
        
    },  
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        filters: [
            {
              text: 'ADMIN',
              value: 'ADMIN',
            },
            {
              text: 'CHANGE',
              value: 'CHANGE',
            },            
            {
              text: 'VIEW',
              value: 'VIEW',
            }
          ],
          onFilter: (value, record) => record.role === value, // Updated line        
          filterSearch: true, 
    },  
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    // {
    //   title: 'Banned',
    //   dataIndex: 'banned',
    //   key: 'banned',      
    // },
    // {
    //   title: 'Ban reason',
    //   dataIndex: 'banReason',
    //   key: 'banReason',
    // }
  ];


  /*
  ,
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    }
   */