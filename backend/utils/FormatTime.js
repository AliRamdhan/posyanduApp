const formatTime = (time) => {
  const date = new Date(time);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('id-ID', options);
  const formattedTime = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return `${formattedDate} ${formattedTime}`;
};

module.exports = {
  formatTime,
};
