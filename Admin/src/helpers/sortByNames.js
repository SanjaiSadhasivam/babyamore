const SortBasedOnNames = (a, b) => {
    let nameA = a.text.toUpperCase();
    let nameB = b.text.toUpperCase();
    if (nameA > nameB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    }
  
    return 0;
  };
  
  export default SortBasedOnNames;
  