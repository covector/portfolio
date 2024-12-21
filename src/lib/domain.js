const domainRegex = /(?:\/)(animation|game)s?(?=\/|$)/;
const pathRegex = /(?:\/animations?\/)|(?:\/games?\/)(.+)(?=\/|$)/;
const DEFAULT_DOMAIN = 'game';

/** @typedef {'game'|'animation'} Domain */
/** @type {Domain[]} */
export const DOMAINS = ['game', 'animation'];

/** @type (url: string) => string | undefined */
const getDomain = (url) => url.match(domainRegex)?.[1];

/** @type (url: string) => Domain */
export const getDomainFromUrl = (url) => {
	const domain = getDomain(url)?.toLowerCase();
	if (domain == 'game' || domain == 'animation') {
		return domain;
	}
	return DEFAULT_DOMAIN;
};

/** @type (url: string) => boolean */
export const isValidPath = (url) => {
	const domain = getDomain(url);
	return domain == 'game' || domain == 'animation';
};

/** @type (url: string) => string */
export const getPath = (url) => {
	const match = url.match(pathRegex);
	if (!match?.[1]) return '';
	let path = match[1];
	if (path.endsWith('/')) {
		path = path.slice(0, -1);
	}
	return path;
};
