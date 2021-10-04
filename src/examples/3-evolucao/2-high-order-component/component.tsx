import React from "react";
import { withListManager, WithListManagerProps } from "./high-order";

interface State {
  input: string;
}

type TodoListProps = WithListManagerProps<string>;

class TodoList extends React.Component<TodoListProps, State> {
  componentDidUpdate(prevProps: TodoListProps) {
    if (prevProps.list.data.length !== this.props.list.data.length) {
      this.setState({ input: "" });
    }
  }

  render() {
    const {
      list: { data: tasks, appendItem, prependItem, removeItem },
    } = this.props;

    return (
      <main>
        <h1>Tarefas (Classes)</h1>

        <input
          type="text"
          value={this.state.input}
          onChange={(event) => this.setState({ input: event.target.value })}
        />

        <button
          disabled={!this.state.input}
          type="button"
          onClick={prependItem(this.state.input)}
        >
          Adicionar ao Inicio
        </button>
        <button
          disabled={!this.state.input}
          type="button"
          onClick={appendItem(this.state.input)}
        >
          Adicionar ao Final
        </button>

        <br />

        <ul>
          {tasks.map((task) => (
            <li key={task}>
              {task}
              <button type="button" onClick={removeItem(task)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

const TodoListHighOrder = withListManager(TodoList);

export { TodoListHighOrder };
