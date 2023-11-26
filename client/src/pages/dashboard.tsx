// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 110,
        editable: true,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, amount: 670 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, amount: 990 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, amount: 123 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, amount: 500 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 37, amount: 490 },
    { id: 6, lastName: 'Melisandre', firstName: 'Jane', age: 150, amount: 320 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, amount: 110 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, amount: 440 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, amount: 945 },
];

export default function Dashboard() {
    return (

        <>
            <div
                style={{ marginTop: '70px' }}
            >
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick />
                </Box>
            </div>
        </>
    );
}