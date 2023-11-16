/** Get Domain From Url
 * Converts a full url to a domain for display next to story
 * ex. https://www.google.com/page -> google.com */
export const getDomainFromUrl = (url: string): string => {
  try {
    const fullUrl = new URL(url);

    return fullUrl.hostname.replace("www.", "");
  } catch (err) {
    return url.replace("www.", "");
  }
};
