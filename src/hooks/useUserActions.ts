// hooks/useUserActions.ts
import {User} from '../model/user.model'; // Import the User model
import { UserService } from '../service/UserService'; // Update the service import

interface UseUserActionsProps {
    setData: React.Dispatch<React.SetStateAction<User[]>>; // Replace Person with User
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>; // Replace Person with User
    selectedUser: User | null; // Replace Person with User
}

const useUserActions = ({ setData, setSelectedUser, selectedUser }: UseUserActionsProps) => {
    const handleAddUser = async (user: Omit<User, 'id'>) => { // Replace Person with User
        try {
            const addedUser = await UserService.addUser(user); // Replace PersonService with UserService
            setData(prevData => [...prevData, addedUser]);
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user.');
        }
    };

    const handleUpdateUser = async (user: User) => { // Replace Person with User
        if (!selectedUser) return;
        try {
            await UserService.updateUser(user); // Replace PersonService with UserService
            setData(prevData =>
                prevData.map(u => (u.id === selectedUser.id ? user : u)) // Replace Person with User
            );
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        try {
            await UserService.deleteUser(selectedUser.id!); // Replace PersonService with UserService
            setData(prevData => prevData.filter(u => u.id !== selectedUser.id)); // Replace Person with User
            setSelectedUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    return { handleAddUser, handleUpdateUser, handleDeleteUser }; // Replace Person with User
};

export default useUserActions;