import {NextRouter} from 'next/router';

export const removeQueryParams = (router: NextRouter, ...keys: string[]) => {
	const updatedQuery = {...router.query};
	keys.forEach((key) => {
		delete updatedQuery[key];
	});
	router.replace({pathname: router.pathname, query: updatedQuery});
};
