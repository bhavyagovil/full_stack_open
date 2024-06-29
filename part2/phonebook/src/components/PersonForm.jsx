const PersonForm = ({submitPerson, name, number, onNameChange, onNumChange}) => {
    return(
      <div>
        <form onSubmit={submitPerson}>
          <div>
            name: <input value={name} onChange={onNameChange} />
          </div>
          <div>number: <input value={number} onChange={onNumChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  
  )}

  export default PersonForm