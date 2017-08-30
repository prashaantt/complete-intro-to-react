import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { getOMDBDetails } from './actionCreators'
import { HeaderContainer } from './Header'
const { shape, string, func } = React.PropTypes

interface Data {
  imdbRating: string;
}

export interface Show {
  title: string;
  year: string;
  poster: string;
  trailer: string;
  description: string;
  imdbID: string;
}

interface DetailsProps {
  show: Show;
}

interface InjectedProps {
  dispatch: Dispatch<any>;
  omdbData: Data;
}

class Details extends React.Component<DetailsProps & InjectedProps> {
  // propTypes: {
  //   show: shape({
  //     title: string,
  //     year: string,
  //     poster: string,
  //     trailer: string,
  //     description: string,
  //     imdbID: string
  //   }),
  //   omdbData: shape({
  //     imdbID: string
  //   }),
  //   dispatch: func
  // }

  componentDidMount() {
    if (!this.props.omdbData.imdbRating) {
      this.props.dispatch(getOMDBDetails(this.props.show.imdbID))
    }
  }

  render() {
    const { title, description, year, poster, trailer } = this.props.show
    let rating
    if (this.props.omdbData.imdbRating) {
      rating = <h3>{ this.props.omdbData.imdbRating }</h3>
    } else {
      rating = <img src='/public/img/loading.png' alt='loading indicator' />
    }
    return (
      <div className='details'>
        <HeaderContainer />
        <section>
          <h1>{ title }</h1>
          <h2>({ year })</h2>
          { rating }
          <img src={ `/public/img/posters/${poster}` } />
          <p>{ description }</p>
        </section>
        <div>
          <iframe src={ `https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0` } frameBorder='0' allowFullScreen />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps: DetailsProps) => {
  const omdbData = state.omdbData[ownProps.show.imdbID] ? state.omdbData[ownProps.show.imdbID] : {}
  // if (state.omdbData[ownProps.show.imdbID]) {
  //   omdbData = state.omdbData[ownProps.show.imdbID]
  // } else {
  //   omdbData = {}
  // }
  return {
    omdbData
  }
}

export default connect(mapStateToProps)(Details)
