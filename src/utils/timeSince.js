export default function timeSince(date) {
  const now = new Date();
  const past = new Date(date);

  const diffInSeconds = Math.floor((now - past) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths =
    now.getMonth() -
    past.getMonth() +
    12 * (now.getFullYear() - past.getFullYear());
  const diffInYears = Math.floor(diffInMonths / 12);

  let formattedString = "";

  if (diffInYears > 0) {
    formattedString +=
      diffInYears === 1 ? `${diffInYears} year` : `${diffInYears} years`;
  } else if (diffInMonths > 0) {
    formattedString +=
      diffInMonths === 1 ? `${diffInMonths} month` : `${diffInMonths} months`;
  } else if (diffInWeeks > 0) {
    formattedString +=
      diffInWeeks === 1 ? `${diffInWeeks} week` : `${diffInWeeks} weeks`;
  } else if (diffInDays > 0) {
    formattedString +=
      diffInDays === 1 ? `${diffInDays} day` : `${diffInDays} days`;
  } else if (diffInHours > 0) {
    formattedString +=
      diffInHours === 1 ? `${diffInHours} hour` : `${diffInHours} hours`;
  } else {
    formattedString = "just now";
  }

  return formattedString !== "just now"
    ? `${formattedString} ago`
    : formattedString;
}