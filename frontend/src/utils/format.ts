/** Strips the protocol and trailing slash so a URL reads cleanly in the UI. */
export const displayUrl = (url: string): string => url.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
