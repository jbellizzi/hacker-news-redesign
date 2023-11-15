export const getDomainFromUrl = (url: string): string => {
  try {
    const fullUrl = new URL(url);

    return fullUrl.hostname.replace("www.", "");
  } catch (err) {
    return url.replace("www.", "");
  }
};
