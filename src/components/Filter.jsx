const Filter = ({ filterQuery, handleFilterQueryChange}) => {
    return (
      <div>
        filter shown with{" "}
            <input
                value={filterQuery}
                onChange={handleFilterQueryChange} />
      </div>
    );
}

export default Filter