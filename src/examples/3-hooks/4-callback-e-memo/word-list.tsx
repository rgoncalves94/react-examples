import { useContext, useMemo } from "react";
import { DictionaryContext } from ".";

const alphabeticSort = (first: string, second: string) =>
  first.localeCompare(second);

export const WordList = () => {
  const { words: items, removeItem } = useContext(DictionaryContext);

  const alphabeticOrderedItems = useMemo(() => {
    return items.map((item) => {
      const orderedDefinition = [...item.definitions];
      orderedDefinition.sort(alphabeticSort);
      return { ...item, definitions: orderedDefinition };
    });
  }, [items]);

  return (
    <ul>
      {alphabeticOrderedItems?.map((item, index) => (
        <li key={item.word}>
          <button type="button" onClick={removeItem?.(items[index])}>
            X
          </button>
          <strong>{item.word}</strong> definition:
          <ol>
            {item.definitions.map((definition) => (
              <li key={definition}>{definition}</li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  );
};
