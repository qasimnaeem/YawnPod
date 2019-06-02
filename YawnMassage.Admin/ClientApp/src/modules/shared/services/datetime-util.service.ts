import * as moment from 'moment';

export const dateTimeUtilService = {
    convertToLocalTime
}

function convertToLocalTime(time: Date) {
    let utcTime = moment.utc(time, 'HH:mm').toDate();

    // 1st January 1901 is an arbitrary date which acts as a common ground for time comparisons, 
    // since we cannot compare only times in Javascript.
    let localTime = new Date(1, 1, 1, utcTime.getHours(), utcTime.getMinutes());
    return localTime;
}
