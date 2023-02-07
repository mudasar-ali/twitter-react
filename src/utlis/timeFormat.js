import moment from "moment";

export const timeFormat = (date) => {
  if (moment(date).fromNow().includes("days")) {
    return moment(date).format("MMM D");
  } else if (moment(date).fromNow().includes("year")) {
    return moment(date).format("MMM D, YYYY");
  } else {
    return moment(date).fromNow();
  }
};
