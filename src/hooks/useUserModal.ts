// hooks/useUserModal.ts
import { useState } from 'react';
import {User} from '../model/user.model'; // Import the User model

interface UseUserModalProps {
    selectedUser: User | null; // Replace Person with User
}

const useUserModal = ({ selectedUser }: UseUserModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '', password: '', role: '' }); // Replace Person with User

    const openModal = (update = false) => {
        setIsModalOpen(true);
        setIsUpdateMode(update);
        if (update && selectedUser) {
            setNewUser({ ...selectedUser }); // Pre-fill form with selected user data
        } else {
            setNewUser({ id: '', name: '', email: '', password: '', role: '' }); // Reset form for new user
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewUser({ id: '', name: '', email: '', password: '', role: '' }); // Reset form
        setIsUpdateMode(false);
    };

    return {
        isModalOpen,
        isUpdateMode,
        newUser, // Replace newPerson with newUser
        openModal,
        closeModal,
        setNewUser, // Replace setNewPerson with setNewUser
    };
};

export default useUserModal;