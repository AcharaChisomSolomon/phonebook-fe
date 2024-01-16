const Persons = ({ personsToShow, handleRemovingPerson }) => {
    return (
      <>
        {personsToShow.map((p) => (
          <p key={p.id}>
            {p.name} {p.number} {' '}
            <button onClick={() => handleRemovingPerson(p.id)}>
              delete
            </button>
          </p>
        ))}
      </>
    );
}

export default Persons