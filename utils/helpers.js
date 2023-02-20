module.exports = {
  format_date: (date) => {
    const newDate = new Date(date);
    // Format date  MM/DD/YYYY
    return newDate.toLocaleDateString();
  },
};
