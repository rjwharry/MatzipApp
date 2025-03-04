const getDateDetails = (dateString: Date | string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};

const getDateWithSeparator = (dateString: Date | string, separator: string = '') => {
  const { year, month, day } = getDateDetails(dateString);
  return [String(year), String(month).padStart(2, '0'), String(day).padStart(2, '0')].join(
    separator
  );
};

const getDateLocaleFormat = (dateString: Date | string) => {
  const { year, month, day } = getDateDetails(dateString);
  return `${year}년 ${month}월 ${day}일`;
};

const getMonthYearDetails = (initialDate: Date) => {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const lastDateString = String(new Date(year, month, 0).getDate());
  const firstDayOfWeek = startDate.getDay();
  const lastDate = Number(lastDateString);

  return { month, year, startDate, firstDayOfWeek, lastDate };
};

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDayOfWeek: number;
  lastDate: number;
};

const getNewMonthYear = (prevData: MonthYear, increment: number) => {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment)
  );
  return getMonthYearDetails(newMonthYear);
};

const isSameAsCurrentDate = (year: number, month: number, date: number) => {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`;

  return currentDate === inputDate;
};

export {
  getDateLocaleFormat,
  getDateWithSeparator,
  getMonthYearDetails,
  getNewMonthYear,
  isSameAsCurrentDate,
};

export type { MonthYear };
