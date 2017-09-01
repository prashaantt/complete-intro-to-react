import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store'
import { AsyncRoute } from './AsyncRoute'
import { Show } from './Details';
import { routes } from "./routes";
// declare const global: any;
// if (global) {
//   global.System = { import() { } }
// }

const RouteWithSubRoutes = (route: any) => (
  <Route path={ route.path } render={ props => (
    <route.component {...props} routes={ route.routes } />
  ) } />
)

export const App = () => {
  return (
    <Provider store={ store }>
      <div className='app'>
        {
          routes.map((route, i) => <RouteWithSubRoutes key={ i } {...route} />)
        }
      </div>
    </Provider>
  )
}
