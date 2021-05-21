function formatDate(date) {
  if (date !== null)
    return new Intl.DateTimeFormat('lt-LT').format(new Date(date));
  else {
    return 'nėra';
  }
}

function formatPostDate(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  if (date !== null)
    return new Intl.DateTimeFormat('lt-LT', options).format(new Date(date));
  else {
    return 'nėra';
  }
}

export { formatPostDate, formatDate };
