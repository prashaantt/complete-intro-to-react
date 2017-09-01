import * as React from 'react'
import { connect } from 'react-redux'
import { ShowCard } from './ShowCard'
import { HeaderContainer } from './Header'
import { Show } from "./Details";
import { AppState } from "./reducers";

export interface SearchProps {
  shows: Show[]
}

interface InjectedProps {
  searchTerm: string;
}

class Search extends React.Component<SearchProps & InjectedProps> {
  render() {
    return (
      <div className='search'>
        <HeaderContainer showSearch />
        <div>
          { this.props.shows
            .filter((show) => `${show.title} ${show.description}`.toUpperCase().indexOf(this.props.searchTerm.toUpperCase()) >= 0)
            .map((show) => {
              return (
                <ShowCard key={ show.imdbID } {...show} />
              )
            }) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    searchTerm: state.searchTerm
  }
}

export const Unwrapped = Search

export default connect(mapStateToProps)(Search);
