// import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/usersAPI';

const columns: GridColDef[] = [
  { field: 'user_id', headerName: 'User ID', width: 200 },
  { field: 'first_name', headerName: 'First Name', width: 130 },
  { field: 'last_name', headerName: 'Last Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'is_admin', headerName: 'Admin', width: 80 },
  { field: 'created_at', headerName: 'Created At', width: 200 },
];

function Users() {
  const [rows, setRows] = useState([]);

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
        // pageSize={5}
        checkboxSelection
        getRowId={(row) => row.user_id} 
      />
    </div>
  );
}

export default Users;
