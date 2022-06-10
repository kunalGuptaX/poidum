export const dateRightNow: () => string = () => {
  const date = new Date();
  const [day, month, year] = date
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .split(" ");

  return `${month[0].toUpperCase() + month.slice(1)} ${day}, ${year}`;
};
