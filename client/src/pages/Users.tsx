// import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { deleteUsers, getAllUsers } from '../api/usersAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';

function Users() {
  
  const navigate = useNavigate()

  useEffect(() => {
      if (!userContext?.userInfo) {
        navigate('/login');
      }
    });
    
  const [rows, setRows] = useState([]);
  const userContext = useContext(UserContext);

  const handleDeleteUser = async (userId: string) => {
    try {
      if (userContext?.userInfo?.is_admin) {
        const response = await deleteUsers(userId);
        console.log(response);
        setRows((prevRows) => prevRows.filter((row:any) => row.user_id !== userId));
      } else {
        console.error('User does not have permission to delete.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'user_id', headerName: 'User ID', width: 200 },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'is_admin', headerName: 'Admin', width: 80 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => handleDeleteUser(params.row.user_id)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setRows(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        getRowId={(row) => row.user_id}
      />
    </div>
  );
}

export default Users;
