// App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import {User} from "./model/user.model"; // Import the User model
import ThemeSwitcher from "./components/ThemeSwitcher";
import UserTable from "./components/UserTable"; // Update the table component name
import { UserService } from "./service/UserService"; // Update the service import
import UserModal from "./components/UserModal"; // Update the modal component name
import useUserActions from "./hooks/useUserActions"; // Update the hook name
import useUserModal from "./hooks/useUserModal"; // Update the hook name
import { DARK_THEME, LIGHT_THEME } from "./constants/theme";

function App() {
    const [data, setData] = useState<User[]>([]); // Replace Person with User
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Replace Person with User
    const [currentTheme, setCurrentTheme] =
        useState<typeof LIGHT_THEME | typeof DARK_THEME>(LIGHT_THEME);

    useEffect(() => {
        fetchData();
    }, []);

    const { handleAddUser, handleUpdateUser, handleDeleteUser } =
        useUserActions({
            setData,
            setSelectedUser,
            selectedUser,
        });

    const {
        isModalOpen,
        isUpdateMode,
        newUser,
        openModal,
        closeModal,
    } = useUserModal({ selectedUser }); // Replace Person with User

    const fetchData = async () => {
        setLoading(true);
        setIsError(false);
        try {
            const users = await UserService.getUsers(); // Replace PersonService with UserService
            setData(users);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            setIsError(true);
        }
    };

    const handleRowSelected = (state: { selectedRows: User[] }) => { // Replace Person with User
        setSelectedUser(state.selectedRows[0] || null);
    };

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setCurrentTheme(newTheme);
    };

    return (
        <div className="app-container">
            <h1>User List</h1> {/* Update the title */}
            <ThemeSwitcher onThemeChange={handleThemeChange} />
            <div className="button-group">
                <button onClick={() => openModal()}>Add</button>
                <button onClick={() => openModal(true)} disabled={!selectedUser}>Update</button> {/* Replace Person with User */}
                <button onClick={handleDeleteUser} disabled={!selectedUser}>Delete</button> {/* Replace Person with User */}
            </div>
            <br />
            <UserTable // Replace PersonTable with UserTable
                data={data}
                loading={loading}
                isError={isError}
                onRowSelected={handleRowSelected}
                theme={currentTheme}
            />
            <UserModal // Replace PersonModal with UserModal
                isOpen={isModalOpen}
                isUpdateMode={isUpdateMode}
                initialUser={newUser} // Replace Person with User
                onClose={closeModal}
                onAdd={handleAddUser} // Replace Person with User
                onUpdate={handleUpdateUser} // Replace Person with User
            />
        </div>
    );
}

export default App;