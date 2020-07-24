export function appendZero(str: string | number): string {
  str = Number(str);

  if (str < 10) {
    return `0${str}`;
  }

  return str.toString();
}

export function getDate(date: Date | string | number, _format?: string): string {
  date = date || new Date();
  _format = _format || 'DD/MM/YYYY';

  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  const dateOnly = appendZero(date.getDate());
  const month = appendZero(date.getMonth() + 1);
  const year = appendZero(date.getFullYear());

  switch (_format) {
    case 'DD/MM/YYYY':
      return `${dateOnly}/${month}/${year}`;
    case 'DD-MM-YYYY':
      return `${dateOnly}-${month}-${year}`;
    case 'DD-MM-YYYY-Z':
      // used for default pdf name
      return `${dateOnly}-${month}-${year}-${date.getTime()}`;
    default:
      return '';
  }
}
