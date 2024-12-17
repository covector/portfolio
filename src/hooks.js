import { isValidPath } from '$lib/domain';
import { i18n } from '$lib/i18n';
/** @typedef {import('@sveltejs/kit').Reroute} Reroute */
/** @type {Reroute} */
export const reroute = (event) => {
	let path = i18n.reroute()(event);
	return isValidPath(path ?? '') ? '/' : path;
};
