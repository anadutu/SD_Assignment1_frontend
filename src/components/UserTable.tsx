// components/UserTable.tsx
import DataTable, { TableColumn } from 'react-data-table-component';
import {User} from '../model/user.model'; // Import the User model

interface UserTableProps {
    data: User[]; // Replace Person with User
    loading: boolean;
    isError: boolean;
    onRowSelected: (state: { selectedRows: User[] }) => void; // Replace Person with User
    theme: 'light' | 'dark';
}

function UserTable({ data, loading, isError, onRowSelected, theme }: UserTableProps) {
    const columns: TableColumn<User>[] = [ // Replace Person with User
        { name: 'ID', selector: (row: User) => row.id || '', sortable: true },
        { name: 'Name', selector: (row: User) => row.name, sortable: true },
        { name: 'Email', selector: (row: User) => row.email, sortable: true },
        { name: 'Role', selector: (row: User) => row.role, sortable: true },
    ];

    return (
        <>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : isError ? (
                <p className="error-text">An error occurred while fetching data</p>
            ) : (
                <div className="table-container">
                    <DataTable
                        title="Users" // Update the title
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover
                        selectableRows
                        onSelectedRowsChange={onRowSelected}
                        theme={theme === "dark" ? "dark" : "default"}
                    />
                </div>
            )}
        </>
    );
}

export default UserTable;