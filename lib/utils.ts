import qs from 'qs';

export const getCorsProxyUrl = (url) => {
  const urlQueryString = qs.stringify({
    url,
  });

  const proxyUrl = process.env.CORS_PROXY_URL
    ? process.env.CORS_PROXY_URL
    : '/api/proxy/csv';

  const proxiedUrl = `${proxyUrl}?${urlQueryString}`;

  console.log(proxiedUrl);

  return proxiedUrl;
};

export const formatNumber = (
  val: number | string,
  precision: number = 2
): string | null => {
  if (Number.isNaN(val)) {
    return null;
  } else if (typeof val === 'string') {
    return val;
  }

  if (Number.isInteger(val)) {
    precision = 0;
  }

  return val.toFixed(precision);
};

export const toPercentage = (val: number, precision: number = 2): string => {
  const percentage = val * 100;
  if (Number.isInteger(percentage)) {
    precision = 0;
  }

  return (val * 100).toFixed(precision) + '%';
};

export const toKiloBytes = (val: number, precision: number = 2): string => {
  return (val / 1024).toFixed(precision) + ' KB';
};
