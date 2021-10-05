import React from "react";

interface WithListManagerProps<T> {
  list: {
    data: T[];
    appendItem(item: string): () => void;
    prependItem(item: string): () => void;
    removeItem(item: string): () => void;
  };
}

interface LocalState<T> {
  data: WithListManagerProps<T>["list"]["data"];
}

const withListManager = <ListType, P extends WithListManagerProps<ListType>>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P, LocalState<ListType>> {
    constructor(props: P) {
      super(props);
      this.state = {
        data: [],
      };
    }

    appendItem = (item: ListType) => () => {
      this.setState((prevState) => ({
        data: prevState.data.concat(item),
        input: "",
      }));
    };

    prependItem = (item: ListType) => () => {
      this.setState((prevState) => ({
        data: [item].concat(prevState.data),
        input: "",
      }));
    };

    removeItem = (item: ListType) => () => {
      this.setState((prevState) => {
        return {
          data: prevState.data.filter((current) => current !== item),
        };
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          list={{
            data: this.state.data,
            appendItem: this.appendItem,
            prependItem: this.prependItem,
            removeItem: this.removeItem,
          }}
        />
      );
    }
  };
};

export { withListManager };
export type { WithListManagerProps };
