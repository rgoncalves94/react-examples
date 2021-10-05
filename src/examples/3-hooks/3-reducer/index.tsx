import {
  createContext,
  FunctionComponent,
  Reducer,
  useReducer,
  useRef,
} from "react";
import { DictionaryMeaning, Meaning } from "../../../types";
import { useLists } from "../../4-evolucao/4-custom-hooks/hooks";
import { Button } from "./button";
import { TextField } from "./input";
import { WordList } from "./word-list";

type Language = "es" | "pt" | "en";

interface State {
  status: "idle" | "fetching" | "fetched" | "error";
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

const defaultState: State = {
  status: "idle",
  currentLanguage: "es",
  word: "",
};

const DictionaryReducer: FunctionComponent = () => {
  const [{ status, currentLanguage, word }, dispatch] = useReducer<
    Reducer<State, { type: string; payload?: Partial<State> }>
  >((state, action) => {
    switch (action.type) {
      case "fetching":
        return { ...state, status: "fetching" };
      case "fetched":
        return { ...state, status: "fetched", word: "" };
      case "error":
        return { ...state, status: "error" };
      case "change":
        return { ...state, ...action.payload };
      default:
        return { ...state };
    }
  }, defaultState);

  const {
    data: words,
    appendItem,
    prependItem,
    removeItem,
    itemExists,
  } = useLists<Meaning>();

  const wordReference = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof State) => (value: string) => {
    dispatch({ type: "change", payload: { [field]: value } });
  };

  const searchWord =
    (incrementFunction: typeof appendItem | typeof prependItem) => async () => {
      dispatch({ type: "fetching" });
      try {
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

        dispatch({ type: "fetched" });
      } catch {
        dispatch({ type: "error" });
      }
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
      <span>STATUS: {status}</span>
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
      <Button
        disabled={!word && status !== "fetching"}
        onClick={searchWord(prependItem)}
      >
        Prepend Word
      </Button>
      <Button
        disabled={!word && status !== "fetching"}
        onClick={searchWord(appendItem)}
      >
        Append Word
      </Button>
      <WordList />
    </DictionaryContext.Provider>
  );
};

export { DictionaryReducer };
