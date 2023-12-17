import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { DELETE_USER, GET_ALL_USERS, deleteUsers } from '../api/usersQuery';
import { useMutation, useQuery } from '@apollo/client';

function Users() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { data } = useQuery(GET_ALL_USERS);
  const [rows, setRows] = useState([]);
  const [deleteMutation] = useMutation(DELETE_USER);

  useEffect(() => {
    if (!userContext?.userInfo) {
      navigate('/oms/login');
    }
  }, [userContext, navigate]);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        if (data && data.getAllUsers) {
          const allData = data.getAllUsers;
          setRows(allData);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  const handleDeleteUser = async (user_id: string) => {
    try {
      if (userContext?.userInfo?.is_admin) {
        const token = localStorage.getItem('token');
        const {data} = await deleteMutation ({
          variables: {
            input: {
                user_id,
                token
            },
        },
        }) 
        console.log(data);
        setRows((prevRows) => prevRows.filter((row: any) => row.user_id !== user_id));
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection getRowId={(row) => row.user_id} />
    </div>
  );
}

export default Users;
