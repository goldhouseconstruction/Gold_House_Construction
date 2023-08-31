let timeStamptoString = (timestamp) => {
  const timestampObject = timestamp; // Replace this with your Firebase Timestamp object

  // Calculate the UNIX timestamp
  const unixTimestamp =
    timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1e6;

  // Create a JavaScript Date object
  const timestampDate = new Date(unixTimestamp);

  // Format the Date object into "YYYY-MM-DD" format
  const year = timestampDate.getFullYear();
  const month = String(timestampDate.getMonth() + 1).padStart(2, "0");
  const day = String(timestampDate.getDate()).padStart(2, "0");

  const formattedDateString = `${year}-${month}-${day}`;
};

export default timeStamptoString;
