import React, { Component } from 'react';
import { number, string, func, shape, bool, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRepos } from '../../actions';
import RepoList from '../../components/RepoList';
import LoadingSpinner from '../../components/LoadingSpinner';

class RepoListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserRepos(this.props.username));
  }
  fetchMore = () => {
    this.props.dispatch(fetchUserRepos(this.props.username));
  };
  render() {
    const { loading, error, data, username, ...rest } = this.props;

    if (error) {
      return <div>{error}</div>;
    }

    return [
      loading && <LoadingSpinner key="loading" />,
      data.length > 0 && (
        <RepoList
          data={data}
          fetchMore={this.fetchMore}
          {...rest}
          key="RepoList"
        />
      ),
    ];
  }
}

RepoListContainer.propTypes = {
  dispatch: func.isRequired,
  error: string,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
    }),
  ),
};

RepoListContainer.defaultProps = {
  error: null,
  data: null,
};

const mapStateToProps = (state) => {
  const { 
    data,
    isLastPage,
    nextPage,
  } = state.RepoList;
  return {
    data,
    isLastPage,
    nextPage,
  }
};/* TODO: mapStateToProps should get the repo data from the store */

export default connect(mapStateToProps)(RepoListContainer);
