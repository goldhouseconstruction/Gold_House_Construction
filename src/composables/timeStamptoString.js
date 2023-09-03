let timeStamptoSting = (completedDate) => {
  const year = completedDate.getFullYear();
  const month = String(completedDate.getMonth() + 1).padStart(2, "0");
  const day = String(completedDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export default timeStamptoSting;
