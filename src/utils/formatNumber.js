import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number, currencySymbol = '$') {
  const format = number ? numeral(number).format('$0,0.00') : '';
  const decimalIndex = format.indexOf('.');
  const wholeNumber = format.slice(0, decimalIndex);
  const decimalNumber = format.slice(decimalIndex);
  return result(currencySymbol + wholeNumber.replace(/^\$/, '') + decimalNumber, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
