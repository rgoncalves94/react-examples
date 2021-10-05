import {
  createContext,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { DictionaryMeaning, Meaning } from "../../../types";
import { useLists } from "../../4-evolucao/4-custom-hooks/hooks";
import { Button } from "./button";
import { TextField } from "./input";
import { WordList } from "./word-list";

type Language = "es" | "pt" | "en";

interface State {
  currentLanguage: Language;
  word: string;
}

interface DictionaryContextProps {
  words: Meaning[];
  appendItem?: (item: Meaning) => () => void;
  prependItem?: (item: Meaning) => () => void;
  removeItem?: (item: Meaning) => () => void;
  itemExists?: (item: Meaning) => void;
}

export const DictionaryContext = createContext<DictionaryContextProps>({
  words: [],
});

const DictionaryHooks: FunctionComponent = () => {
  const [{ currentLanguage, word }, setState] = useState<State>({
    currentLanguage: "es",
    word: "",
  });

  const {
    data: words,
    appendItem,
    prependItem,
    removeItem,
    itemExists,
  } = useLists<Meaning>();

  const wordReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState((currentState) => ({ ...currentState, word: "" }));
    wordReference.current?.focus();
  }, [words]);

  const handleChange = (field: keyof State) => (value: string) => {
    setState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
  };

  const searchWord =
    (incrementFunction: typeof appendItem | typeof prependItem) => async () => {
      const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${currentLanguage}/${word}`
      );

      const meaning = (await result.json()) as DictionaryMeaning[];

      meaning.forEach(({ word, meanings }) => {
        meanings.forEach(({ definitions }) => {
          console.log({ word }, incrementFunction);
          incrementFunction({
            word,
            definitions: definitions.map(({ definition }) => definition),
          })();
        });
      });
    };

  return (
    <DictionaryContext.Provider
      value={{
        words,
        appendItem,
        prependItem,
        removeItem,
        itemExists,
      }}
    >
      <TextField
        label="Language"
        value={currentLanguage}
        onChange={handleChange("currentLanguage")}
      />
      <TextField
        label="Word"
        value={word}
        ref={wordReference}
        onChange={handleChange("word")}
        onKeyDown={(e) => e.key === "Enter" && searchWord(appendItem)}
      />
      <Button disabled={!word} onClick={searchWord(prependItem)}>
        Prepend Word
      </Button>
      <Button disabled={!word} onClick={searchWord(appendItem)}>
        Append Word
      </Button>
      <WordList />
    </DictionaryContext.Provider>
  );
};

export { DictionaryHooks };
