import * as React from 'react'
const { object } = React.PropTypes

interface AsyncRouteProps {
  props: any;
  loadingPromise: Promise<any>;
}

interface AsyncRouteState {
  loaded: boolean;
}

export class AsyncRoute extends React.Component<AsyncRouteProps, AsyncRouteState> {
  // propTypes: {
  //   props: object,
  //   loadingPromise: object
  // },
  private component: any;
  constructor(props: AsyncRouteProps) {
    super(props);
    this.state = {
      loaded: false
    }
  }
  // getInitialState() {
  //   return {
  //     loaded: false
  //   }
  // },
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
