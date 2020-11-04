import qs from 'qs';

export const getCorsProxyUrl = (url) => {
  const urlQueryString = qs.stringify({
    url,
  });

  // Use CORS_PROXY_URL if the environment variable is set
  // Otherwise, use the default Next.js API proxy
  // However, Next.js limits payloads to 5MB
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
  console.log(`formatNumber, type=${typeof val}, val=${val}`);

  if (Number.isNaN(val) || typeof val === 'function') {
    return null;
  } else if (typeof val === 'string') {
    return val;
  } else if (Number.isInteger(val)) {
    return val.toFixed(0);
  } else {
    let formattedVal = null;

    try {
      formattedVal = val.toFixed(precision);
      return formattedVal;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
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
