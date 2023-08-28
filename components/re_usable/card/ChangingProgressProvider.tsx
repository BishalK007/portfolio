import React, { Component, ReactNode } from 'react';

interface ChangingProgressProviderProps {
  interval?: number;
  values: number[];
  children: (value: number) => ReactNode;
}

interface ChangingProgressProviderState {
  valuesIndex: number;
}

class ChangingProgressProvider extends Component<ChangingProgressProviderProps, ChangingProgressProviderState> {
  static defaultProps: ChangingProgressProviderProps = {
    interval: 1000,
    values: [],
    children: () => null,
  };

  private observer: IntersectionObserver | null = null;

  state: ChangingProgressProviderState = {
    valuesIndex: 0,
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.startInterval();
        } else {
          this.stopInterval();
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (this.observer) {
      this.observer.observe(this.containerElement!);
    }
  }

  componentWillUnmount() {
    this.stopInterval();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  startInterval() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length,
        }));
      }, this.props.interval);
    }
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private containerElement: HTMLElement | null = null;
  private interval: NodeJS.Timeout | null = null;

  render() {
    return (
      <div
        ref={(element) => (this.containerElement = element)}
        style={{ visibility: this.observer && this.observer.takeRecords && this.observer.takeRecords()[0]?.isIntersecting ? 'visible' : 'hidden' }}
      >
        {this.props.children(this.props.values[this.state.valuesIndex])}
      </div>
    );
  }
}

export default ChangingProgressProvider;
