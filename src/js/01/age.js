/**
 * Get the number of days in a given month & year
 * JavaScript's Date's day is 1-indexed i.e. passing a '0' day will result in the last day of last month
 * @param {int} year - The year in question
 * @param {int} month - The month in question
 * */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * Get the number of days between two dates
 * UTC conversion ignored
 * @param {Date} date1 - First comparison date
 * @param {Date} date2 - Second comparison date
 * */
function getDaysDiff(date1, date2) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;  // Number of ms per day
    return Math.floor((date2 - date1) / _MS_PER_DAY)  // date2 - date1 will return a date difference in ms, we then convert this to number of days
}

/**
 * Get a person's age in terms of X years and Y days
 * @param {Date} dob_date - A Date object representing the date of birth
 * @return {Array} - An array containing the person's age, in the format [X years, Y days]
 * */
function getAge(dob_date) {
    let age = [0, 0];

    const today_date = new Date();

    if (today_date <= dob_date) {
        return age
    }

    const days_diff = getDaysDiff(dob_date, today_date);

    age[0] = Math.floor(days_diff / 365);
    age[1] = days_diff % 365;

    return age
}

/**
 * Convert a date string in the format of "DD/MM/YYYY" to a Date object
 * @param {string} dob_str - A string in the format of "DD/MM/YYYY"
 * @return {Date} - A Date object corresponding to the string parameter
 * */
function strToDate(dob_str) {
    const dob_arr = dob_str.split('/');

    const dob_d = parseInt(dob_arr[0], 10);
    const dob_m = parseInt(dob_arr[1], 10);
    const dob_y = parseInt(dob_arr[2], 10);
    return new Date(dob_y, dob_m, dob_d);
}

module.exports = {
    getAge: getAge,
    strToDate: strToDate
};