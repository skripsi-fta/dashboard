import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import id from 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.locale(id);

const dayjsUtils = dayjs;

export default dayjsUtils;
