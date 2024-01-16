const Persons = ({ personsToShow }) => {
    return (
      <>
        {personsToShow.map((p) => (
          <p key={p.id}>
            {p.name} {p.number}
          </p>
        ))}
      </>
    );
}

export default Persons