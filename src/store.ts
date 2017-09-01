import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

interface WindowCustom extends Window {
  devToolsExtension: Function;
}

declare const window: WindowCustom;

export const store = createStore(rootReducer, <any>compose(
  applyMiddleware(thunk),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f: any) => f
))
