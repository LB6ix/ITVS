function formatDate(date) {
  if (date !== null)
    return new Intl.DateTimeFormat('lt-LT').format(new Date(date));
  else {
    return 'nėra';
  }
}

export default formatDate;
