import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { DictionaryMeaning } from "../../../types";

type Language = "es" | "pt" | "en";

interface State {
  currentLanguage: Language;
  word: string;
  meaning?: DictionaryMeaning[] | null;
}

const DictionaryLifecycle: FunctionComponent = () => {
  const [{ currentLanguage, word, meaning }, setState] = useState<State>({
    currentLanguage: "pt",
    word: "",
    meaning: null,
  });

  const wordReference = useRef<HTMLInputElement>(null);

  const filteredMeaning = meaning?.filter(({ word }) => word.charAt(0) === "p");

  //componentDidMount
  useEffect(() => {
    const word = localStorage.getItem("dictionary_word") || "";
    const currentLanguage =
      (localStorage.getItem("dictionary_language") as Language) || "pt";

    setState((currentState) => ({ ...currentState, word, currentLanguage }));
  }, []);

  //componentDidMount e componentDidUpdate
  useEffect(() => {
    localStorage.setItem("dictionary_word", word);
    localStorage.setItem("dictionary_language", currentLanguage);

    //componentWillUnmount
    return () => {
      localStorage.setItem("dictionary_word", word);
      localStorage.setItem("dictionary_language", currentLanguage);
    };
  }, [word, currentLanguage]);

  useEffect(() => {
    setState((currentState) => ({ ...currentState, word: "" }));
    wordReference.current?.focus();
  }, [meaning]);

  // componentDidCatch ???????
  // Este é o único ciclo de vida que não existe em componentes funcionais
  // Caso seja necessário, deve-se utilizar em um componente de classe

  const handleChange =
    (field: keyof State) => (e: ChangeEvent<HTMLInputElement>) => {
      setState((currentState) => ({
        ...currentState,
        [field]: e.target.value,
      }));
    };

  const searchWord = async () => {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${currentLanguage}/${word}`
    );

    const meaning = (await result.json()) as DictionaryMeaning[];

    setState((currentState) => ({
      ...currentState,
      meaning,
    }));
  };

  return (
    <main>
      <label htmlFor="language">Language:</label>
      <input
        aria-label="language"
        type="text"
        placeholder="type a language"
        value={currentLanguage}
        onChange={handleChange("currentLanguage")}
      />
      <br />
      <label htmlFor="word">Word: </label>
      <input
        aria-label="word"
        type="text"
        placeholder="type a word"
        ref={wordReference}
        onKeyDown={(e) => e.key === "Enter" && searchWord()}
        value={word}
        onChange={handleChange("word")}
      />

      <br />

      <button type="button" onClick={searchWord}>
        buscar
      </button>

      <br />
      <br />
      <ul>
        {filteredMeaning
          ?.filter(({ word }) => word.charAt(0) === "p")
          .map(({ word, meanings }) => (
            <li key={word}>
              <strong>{word}</strong> definition:
              {meanings.map(({ definitions }, index) => (
                <ol key={`${word}-${index}`}>
                  {definitions.map(({ definition }) => (
                    <li>{definition}</li>
                  ))}
                </ol>
              ))}
            </li>
          ))}
      </ul>
    </main>
  );
};

export { DictionaryLifecycle };
