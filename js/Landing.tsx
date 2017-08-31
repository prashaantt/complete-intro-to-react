import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchTerm } from './actionCreators'
import { withRouter, RouteComponentProps } from "react-router";
import { AppState, ActionType } from "./reducers";
import { Dispatch } from "redux";
import { RouterParams } from "./App";

interface InjectedProps {
  dispatchSetSearchTerm: (term: string) => void;
  searchTerm: string;
}

@withRouter
class Landing extends React.Component<InjectedProps & RouteComponentProps<RouterParams>> {
  constructor(props: InjectedProps & RouteComponentProps<RouterParams>) {
    super(props);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchTermChange(event: React.ChangeEvent<{ value: string }>) {
    this.props.dispatchSetSearchTerm(event.target.value);
  }

  handleSearchSubmit(event: React.FormEvent<any>) {
    event.preventDefault()
    this.props.history.replace('/search')
  }

  render() {
    return (
      <div className='landing'>
        <h1>svideo</h1>
        <form onSubmit={ this.handleSearchSubmit }>
          <input onChange={ this.handleSearchTermChange } value={ this.props.searchTerm } type='text' placeholder='Search' />
        </form>
        <Link to='/search'>or Browse All</Link>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppState, ActionType>) => {
  return {
    dispatchSetSearchTerm(searchTerm: string) {
      dispatch(setSearchTerm(searchTerm))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
