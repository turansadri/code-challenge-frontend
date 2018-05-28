import React from 'react';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';

const RepoList = props => {
  return (
    <div>
      {props.data.map(item => <div key={item.id}>{item.name}</div>)}
      { !props.isLastPage && <button onClick={props.fetchMore}>Load more</button>}
    </div>
  )
};

RepoList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default RepoList;
