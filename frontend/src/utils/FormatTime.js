export default function formatTime(time) {
  const date = new Date(time);

  const options = {
    weekday: "long", // full name of the day of the week
    day: "numeric", // day of the month as a numeric value
    month: "long", // full name of the month
    year: "numeric", // full year as a numeric value
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  return formattedDate;
}

// const isoDateString = "2015-06-15T00:00:00.000Z";
// const formattedDateString = formatDate(isoDateString);
// console.log(formattedDateString); // Output: "Senin, 15 Juni 2015"
