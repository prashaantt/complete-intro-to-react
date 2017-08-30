import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchTerm } from './actionCreators'
import { withRouter, RouteComponentProps } from "react-router";
const { string, func, object } = React.PropTypes

interface InjectedProps {
  dispatchSetSearchTerm: (term: string) => void;
  searchTerm: string;
}

@withRouter
class Landing extends React.Component<InjectedProps & RouteComponentProps<any>> {
  // contextTypes: {
  //   router: object
  // }

  constructor(props: InjectedProps & RouteComponentProps<any>) {
    super(props);

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  // propTypes: {
  //   searchTerm: string,
  //   dispatchSetSearchTerm: func
  // }

  handleSearchTermChange(event) {
    this.props.dispatchSetSearchTerm(event.target.value)
  }

  handleSearchSubmit(event) {
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

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetSearchTerm(searchTerm) {
      dispatch(setSearchTerm(searchTerm))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
