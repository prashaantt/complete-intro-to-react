import * as React from 'react'

interface Module {
  default: any;
}

export interface AsyncRouteProps<T = any> {
  props: T;
  loadingPromise: Promise<Module>;
}

export interface AsyncRouteState {
  loaded: boolean;
}

export class AsyncRoute<T = any> extends React.Component<AsyncRouteProps<T>, AsyncRouteState> {
  private component: React.ComponentType;

  constructor(props: AsyncRouteProps<T>) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.props.loadingPromise.then((module) => {
      this.component = module.default
      this.setState({ loaded: true })
    })
  }

  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />
    } else {
      return <h1>loading...</h1>
    }
  }
}
