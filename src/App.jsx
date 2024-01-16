import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = e => {
    e.preventDefault()
    const newPersonNameAlreadyExists = persons.some(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    

    if (newPersonNameAlreadyExists) {
      const newPersonNumberAlreadyExists = persons.some(
        (p) => p.number === newNumber
      );

      if (newPersonNumberAlreadyExists) {
        window.alert(`${newName} is already added to phonebook`);
      } else {
        const personThatAlreadyExists = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        const message = `${personThatAlreadyExists.name} is already added to phonebook, replace the old number with the new one?`;

        if (window.confirm(message)) {
          const updatedPerson = {
            ...personThatAlreadyExists,
            number: newNumber
          }

          personService
            .update(personThatAlreadyExists.id, updatedPerson)
            .then(updatedPerson => {
              const updatedPersons = persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)
              setPersons(updatedPersons)
              setNewName("");
              setNewNumber("");
            })
            .catch(error => {
              setMessage({
                display: `Information of ${personThatAlreadyExists.name} has already been removed from server`,
                isError: true
              })
              setTimeout(() => setMessage(null), 5000)
              const newPersons = persons.filter(
                (p) => p.id !== personThatAlreadyExists.id
              );
              setPersons(newPersons);
            })
        }
      }
    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPersonObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson));
          setMessage({
            display: `Added ${newPerson.name}`,
            isError: false
          })
          setTimeout(() => setMessage(null), 5000)
          setNewName("");
          setNewNumber("");
        })
    }
  }


  const handleNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }
  const handleFilterQueryChange = e => {
    setFilterQuery(e.target.value)
  }


  const handleRemovingPerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          const newPersons = persons.filter(p => p.id !== deletedPerson.id)
          setPersons(newPersons)
        })
    }
  }


  const personsToShow = filterQuery
    ? persons.filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()))
    : persons

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filterQuery={filterQuery}
        handleFilterQueryChange={handleFilterQueryChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleRemovingPerson={handleRemovingPerson}
      />
    </div>
  );
};

export default App;
