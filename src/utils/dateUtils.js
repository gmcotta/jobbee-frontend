import moment from 'moment';

export function convertISODateToDateFromNow(date) {
  return moment.utc(date).local().startOf('seconds').fromNow();
}

export function convertISODateToDDMMYYYY(date) {
  return date.substring(0, 10);
}

export function isLastDateLessThanNow(date) {
  return new Date(date).getTime() < Date.now();
}