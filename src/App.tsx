// App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import Person from "./model/person.model.tsx";
import ThemeSwitcher from "./components/ThemeSwitcher.tsx";
import PersonTable from "./components/PersonTable.tsx";
import { PersonService } from "./service/PersonService.ts";
import PersonModal from "./components/PersonModal.tsx";
import usePersonActions from "./hooks/usePersonActions.ts";
import usePersonModal from "./hooks/usePersonModal.ts";
import {DARK_THEME, LIGHT_THEME} from "./constants/theme.ts";

function App() {
    const [data, setData] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [currentTheme, setCurrentTheme] =
        useState<typeof LIGHT_THEME | typeof DARK_THEME>(LIGHT_THEME);

    useEffect(() => {
        fetchData();
    }, []);

    const { handleAddPerson, handleUpdatePerson, handleDeletePerson } =
        usePersonActions({
            setData,
            setSelectedPerson,
            selectedPerson,
        });

    const {
        isModalOpen,
        isUpdateMode,
        newPerson,
        openModal,
        closeModal,
    } = usePersonModal({ selectedPerson });

    const fetchData = async () => {
        setLoading(true);
        setIsError(false);
        try {
            const persons = await PersonService.getPersons();
            setData(persons);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            setIsError(true);
        }
    };

    const handleRowSelected = (state: { selectedRows: Person[] }) => {
        setSelectedPerson(state.selectedRows[0] || null);
    };

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setCurrentTheme(newTheme);
    };

    return (
        <div className="app-container">
            <h1>Person List</h1>
            <ThemeSwitcher onThemeChange={handleThemeChange} />
            <div className="button-group">
                <button onClick={() => openModal()}>Add</button>
                <button onClick={() => openModal(true)} disabled={!selectedPerson}>Update</button>
                <button onClick={handleDeletePerson} disabled={!selectedPerson}>Delete</button>
            </div>
            <br />
            <PersonTable
                data={data}
                loading={loading}
                isError={isError}
                onRowSelected={handleRowSelected}
                theme={currentTheme}
            />
            <PersonModal
                isOpen={isModalOpen}
                isUpdateMode={isUpdateMode}
                initialPerson={newPerson}
                onClose={closeModal}
                onAdd={handleAddPerson}
                onUpdate={handleUpdatePerson}
            />
        </div>
    );
}

export default App;