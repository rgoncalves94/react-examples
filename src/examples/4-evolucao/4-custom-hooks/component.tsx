import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useLists } from "./hooks";

const TodoList: FunctionComponent = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: tasks,
    prependItem,
    appendItem,
    removeItem,
    itemExists,
  } = useLists<string>();

  useEffect(() => {
    setInput("");
    inputRef.current?.focus();
  }, [tasks]);

  const disableActions = !input || itemExists(input);

  return (
    <main>
      <h1>Tarefas (Custom Hook)</h1>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <button
        disabled={disableActions}
        type="button"
        onClick={prependItem(input)}
      >
        adicionar ao inicio
      </button>
      <button
        disabled={disableActions}
        type="button"
        onClick={appendItem(input)}
      >
        adicionar ao final
      </button>

      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task}>
            {task}
            <button type="button" onClick={removeItem(task)}>
              remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export { TodoList as TodoListCustomHook };
