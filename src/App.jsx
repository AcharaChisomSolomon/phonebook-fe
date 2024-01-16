import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const newPersonAlreadyExists = persons.some(p => p.name === newName)

    if (newPersonAlreadyExists) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
      };

      axios
        .post('http://localhost:3002/persons', newPersonObj)
        .then(response => {
          setPersons(persons.concat(response.data));
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

  const personsToShow = filterQuery
    ? persons.filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
