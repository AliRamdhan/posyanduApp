const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("id-ID") : "";
};

module.exports = { formatDate };
