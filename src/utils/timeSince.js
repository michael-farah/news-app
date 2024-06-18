export default function timeSince(date) {
  const now = new Date();
  const past = new Date(date);

  const years = now.getFullYear() - past.getFullYear();
  const months = now.getMonth() - past.getMonth();
  const days = now.getDate() - past.getDate();

  let formattedString = "";

  if (years > 0) {
    formattedString += years === 1 ? `${years} year` : `${years} years`;
  }

  if (months > 0 || (months === 0 && days >= 0)) {
    if (formattedString) formattedString += " and ";
    formattedString += months === 1 ? `${months} month` : `${months} months`;
  } else if (months < 0) {
    if (formattedString) formattedString += " and ";
    formattedString += `${12 + months} months`;
  }

  if (formattedString === "") {
    return "less than a month";
  }

  return formattedString + " ago";
}