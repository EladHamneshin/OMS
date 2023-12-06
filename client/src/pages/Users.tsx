import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { deleteUsers, getAllUsers } from '../api/usersAPI';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme/theme';
import TabelBox from '../components/tabelBox';

function Users() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userContext?.userInfo) {
      navigate('/oms/login');
    }
  }, [userContext, navigate]);

  const [rows, setRows] = useState([]);

  const handleDeleteUser = async (userId: string) => {
    try {
      if (userContext?.userInfo?.is_admin) {
        const response = await deleteUsers(userId);
        console.log(response);
        setRows((prevRows) => prevRows.filter((row: any) => row.user_id !== userId));
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
    ...(userContext?.userInfo?.is_admin
      ? [
        {
          field: 'delete',
          headerName: 'Delete',
          width: 100,
          renderCell: (params: GridRenderCellParams) => (
            <DeleteIcon
              onClick={() => handleDeleteUser(params.row.user_id)}
              style={{ cursor: 'pointer' }}
            />
          ),
        },
      ]
      : []),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setRows(data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <TabelBox >
        <DataGrid rows={rows} columns={columns} checkboxSelection getRowId={(row) => row.user_id} />
      </TabelBox>
    </div>
  );
}

export default Users;
