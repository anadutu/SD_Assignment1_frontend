// hooks/usePersonActions.ts
import Person from '../model/person.model';
import { PersonService } from '../service/PersonService';

interface UsePersonActionsProps {
    setData: React.Dispatch<React.SetStateAction<Person[]>>;
    setSelectedPerson: React.Dispatch<React.SetStateAction<Person | null>>;
    selectedPerson: Person | null;
}

const usePersonActions = ({ setData, setSelectedPerson, selectedPerson }: UsePersonActionsProps) => {
    const handleAddPerson = async (person: Person) => {
        try {
            const addedPerson = await PersonService.addPerson(person);
            setData(prevData => [...prevData, addedPerson]);
        } catch (error) {
            console.error('Error adding person:', error);
            alert('Failed to add person.');
        }
    };

    const handleUpdatePerson = async (person: Person) => {
        if (!selectedPerson) return;
        try {
            await PersonService.updatePerson(person);
            setData(prevData =>
                prevData.map(p => (p.id === selectedPerson.id ? person : p))
            );
        } catch (error) {
            console.error('Error updating person:', error);
            alert('Failed to update person.');
        }
    };

    const handleDeletePerson = async () => {
        if (!selectedPerson) return;
        try {
            await PersonService.deletePerson(selectedPerson.id);
            setData(prevData => prevData.filter(person => person.id !== selectedPerson.id));
            setSelectedPerson(null);
        } catch (error) {
            console.error('Error deleting person:', error);
            alert('Failed to delete person.');
        }
    };

    return { handleAddPerson, handleUpdatePerson, handleDeletePerson };
};

export default usePersonActions;