import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setSearchTerm } from './actionCreators'
import { Link } from 'react-router-dom'
import { AppState, ActionType } from "./reducers";

interface HeaderProps {
  showSearch?: boolean;
}

interface InjectedProps {
  dispatch: Dispatch<AppState, ActionType>;
  searchTerm: string;
}

class Header extends React.Component<HeaderProps & InjectedProps> {
  constructor(props: HeaderProps & InjectedProps) {
    super(props)

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange(event: React.ChangeEvent<{ value: string }>) {
    this.props.dispatch(setSearchTerm(event.target.value))
  }

  render() {
    let utilSpace
    if (this.props.showSearch) {
      utilSpace = <input onChange={ this.handleSearchTermChange } value={ this.props.searchTerm } type='text' placeholder='Search' />
    } else {
      utilSpace = (
        <h2>
          <Link to='/search'>
            Back
          </Link>
        </h2>
      )
    }
    return (
      <header>
        <h1>
          <Link to='/'>
            svideo
          </Link>
        </h1>
        { utilSpace }
      </header>
    )
  }
}

const mapStateToProps = (state: { searchTerm: string }) => {
  return {
    searchTerm: state.searchTerm
  }
}

export const HeaderContainer = connect(mapStateToProps)(Header)
