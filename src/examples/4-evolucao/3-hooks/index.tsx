import React, { FunctionComponent, useState } from "react";

const TodoList: FunctionComponent = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const removeTask = (task: string) => () => {
    setTasks((currentTasks) =>
      currentTasks.filter((currentTask) => currentTask !== task)
    );
  };

  const prependTask = (task: string) => () => {
    setTasks((currentTasks) => [task].concat(currentTasks));
    setInput("");
  };

  const appendTask = (task: string) => () => {
    setTasks((currentTasks) => currentTasks.concat(task));
    setInput("");
  };

  return (
    <main>
      <h1>Tarefas (Hooks)</h1>

      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <br />

      <button disabled={!input} type="button" onClick={prependTask(input)}>
        adicionar ao inicio
      </button>
      <button disabled={!input} type="button" onClick={appendTask(input)}>
        adicionar ao final
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task}>
            {task}
            <button type="button" onClick={removeTask(task)}>
              remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export { TodoList as TodoListHooks };
