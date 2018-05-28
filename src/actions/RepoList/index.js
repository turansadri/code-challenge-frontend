import parseLinkHeaders from 'parse-link-header';

export const FETCH_START = '@fetch/start';
export const FETCH_ERROR = '@fetch/error';
export const FETCH_SUCCESS = '@fetch/success';

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

const fetchSuccess = ({ nextPage, data }) => ({
  type: FETCH_SUCCESS,
  nextPage,
  data,
});

/**
 * Fetches repositories asyncronously for the given username, see {@link https://developer.github.com/v3/repos/#list-user-repositories}
 * @param { string } username - username to fetch
 */
export const fetchUserRepos = () => async (dispatch, getState) => {
  dispatch(fetchStart());

  try {
    const page = (getState().RepoList.nextPage === null) ? 1 : getState().RepoList.nextPage;
    const res = await fetch(`https://api.github.com/user/repos?per_page=20&page=${page}`, {
      cache: 'no-cache',
      headers: {
        'Authorization': `Token ${process.env.REACT_APP_GITHUB_OAUTH_TOKEN}`,
      },
      method: 'GET',
    });

    const linkHeaders = parseLinkHeaders(res.headers.get('Link'));
    const { next } = linkHeaders;
    const data = await res.json();
    const nextPage = next ? next.page : false;
    return dispatch(fetchSuccess({ nextPage, data }));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
