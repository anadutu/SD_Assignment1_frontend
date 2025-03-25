// components/UserModal.tsx
import React, { useState, useEffect } from 'react';
import {User} from "../model/user.model"; // Import the User model

interface UserModalProps {
    isOpen: boolean;
    isUpdateMode: boolean;
    initialUser: User; // Replace Person with User
    onClose: () => void;
    onAdd: (user: User) => Promise<void>; // Replace Person with User
    onUpdate: (user: User) => Promise<void>; // Replace Person with User
}

function UserModal({ isOpen, isUpdateMode, initialUser, onClose, onAdd, onUpdate }: UserModalProps) {
    const [user, setUser] = useState<User>(initialUser); // Replace Person with User

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (isUpdateMode) {
            await onUpdate(user); // Call onUpdate for updating a user
        } else {
            await onAdd(user); // Call onAdd for adding a new user
        }
        onClose(); // Close the modal after submission
    };

    if (!isOpen) {
        return null; // Don't render the modal if it's not open
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{isUpdateMode ? 'Update User' : 'Add User'}</h2>
                {isUpdateMode && (
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={user.id || ''}
                        disabled
                    />
                )}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="role"
                    placeholder="Role (e.g., admin, customer)"
                    value={user.role}
                    onChange={handleInputChange}
                />
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>
                        {isUpdateMode ? 'Update' : 'Add'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UserModal;