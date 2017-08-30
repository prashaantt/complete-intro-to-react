import * as React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import { AsyncRoute } from './AsyncRoute'
import preload = require('../public/data.json');
declare const global: any;
// if (global) {
//   global.System = { import() { } }
// }

const App = () => {
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
            props={ Object.assign({ shows: (preload as any).shows }, props) }
            loadingPromise={ import('./Search') }
          /> }
        />
        <Route
          path='/details/:id'
          component={ (props: any) => {
            const shows = (preload as any).shows.filter((show: any) => props.match.params.id === show.imdbID)
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

export default App
