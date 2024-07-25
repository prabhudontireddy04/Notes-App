import { format } from 'date-fns';

export function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return format(date, 'dd MMM yyyy');
}
