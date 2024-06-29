const Filter = ({filter, eventClick}) => {
    return(
    <div>
      filter shown with 
      <input value={filter} onChange={eventClick} />
      </div>)
  }

export default Filter