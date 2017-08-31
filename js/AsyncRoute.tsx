import * as React from 'react'

interface Module {
  default: any;
}

interface AsyncRouteProps {
  props: any;
  loadingPromise: Promise<Module>;
}

interface AsyncRouteState {
  loaded: boolean;
}

export class AsyncRoute extends React.Component<AsyncRouteProps, AsyncRouteState> {
  private component: React.ComponentType;

  constructor(props: AsyncRouteProps) {
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
