import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store'
import { AsyncRoute } from './AsyncRoute'
import preload = require('../public/data.json');
import { Show } from './Details';
// declare const global: any;
// if (global) {
//   global.System = { import() { } }
// }

interface ShowsData {
  shows: Show[];
}

export interface RouterParams {
  id: string;
}

// Replace routes with config
export const App = () => {
  return (
    <Provider store={ store }>
      <div className='app'>
        <Route
          exact
          path='/'
          component={ (props) => <AsyncRoute props={ props } loadingPromise={ import('./Landing') } /> }
        />
        <Route
          path='/search'
          component={ (props) => <AsyncRoute
            props={ Object.assign({ shows: (preload as ShowsData).shows }, props) }
            loadingPromise={ import('./Search') }
          /> }
        />
        <Route
          path='/details/:id'
          component={ (props: RouteComponentProps<RouterParams>) => {
            const shows = (preload as ShowsData).shows.filter((show: Show) => props.match.params.id === show.imdbID)
            return <AsyncRoute
              props={ Object.assign({ show: shows[0] }, props) }
              loadingPromise={ import('./Details') }
            />
          } }
        />
      </div>
    </Provider>
  )
}
