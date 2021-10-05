import { useContext } from "react";
import { DictionaryContext } from ".";

export const WordList = () => {
  const { words: items, removeItem } = useContext(DictionaryContext);

  return (
    <ul>
      {items?.map((item) => (
        <li key={item.word}>
          <button type="button" onClick={removeItem?.(item)}>
            X
          </button>
          <strong>{item.word}</strong> definition:
          <ol>
            {item.definitions.map((definition) => (
              <li>{definition}</li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
};
