export const tryGetYear = (dateStr) => {
    return dateStr ? new Date(dateStr).getFullYear() : '';
}