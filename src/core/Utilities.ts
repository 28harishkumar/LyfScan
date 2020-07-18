export function appendZero(str: string | number): string {
  str = Number(str);

  if(str < 10) {
    return `0${str}`;
  }

  return str.toString();
}

export function getDate(date: Date, _format: string): string {
  date = date || new Date();
  _format = _format || 'DD/MM/YYYY';
  
  const dateOnly = appendZero(date.getDate());
  const month = appendZero(date.getMonth() + 1);
  const year = appendZero(date.getFullYear());

  switch(_format) {
    case 'DD/MM/YYYY':
      return `${dateOnly}/${month}/${year}`;
    case 'DD-MM-YYYY':
      return `${dateOnly}-${month}-${year}`
    default:
      return ''
  }
}