function formatDate(date) {
  return new Intl.DateTimeFormat('lt-LT').format(new Date(date));
}

export default formatDate;
