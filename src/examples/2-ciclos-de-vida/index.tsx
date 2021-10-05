import React, { ChangeEvent } from "react";
import { DictionaryMeaning } from "../../types";

type Language = "en" | "pt" | "en";

interface State {
  currentLanguage: Language;
  word: string;
  meaning?: DictionaryMeaning[] | null;
}

class Dictionary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentLanguage: "pt",
      word: "",
      meaning: null,
    };
  }

  wordReference: HTMLInputElement | null = null;

  componentDidMount() {
    const word = localStorage.getItem("dictionary_word") || "";
    const currentLanguage =
      (localStorage.getItem("dictionary_language") as Language) || "pt";

    this.setState({ word, currentLanguage });
  }

  componentWillUnmount() {
    localStorage.setItem("dictionary_word", this.state.word);
    localStorage.setItem("dictionary_language", this.state.currentLanguage);
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.meaning?.length !== this.state.meaning?.length) {
      localStorage.setItem("dictionary_word", this.state.word);
      localStorage.setItem("dictionary_language", this.state.currentLanguage);
      this.setState({ word: "" });
      this.wordReference?.focus();
    }
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  handleChange = (field: keyof State) => (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((currentState) => ({
      ...currentState,
      [field]: e.target.value,
    }));
  };

  searchWord = async () => {
    const { currentLanguage, word } = this.state;
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/${currentLanguage}/${word}`
    );

    this.setState({
      meaning: (await result.json()) as DictionaryMeaning[],
    });
  };

  render() {
    return (
      <main>
        <label htmlFor="language">Language:</label>
        <input
          aria-label="language"
          type="text"
          placeholder="type a language"
          value={this.state.currentLanguage}
          onChange={this.handleChange("currentLanguage")}
        />
        <br />
        <label htmlFor="word">Word: </label>
        <input
          aria-label="word"
          type="text"
          placeholder="type a word"
          ref={(node) => (this.wordReference = node)}
          onKeyDown={(e) => e.key === "Enter" && this.searchWord()}
          value={this.state.word}
          onChange={this.handleChange("word")}
        />

        <br />

        <button type="button" onClick={this.searchWord}>
          buscar
        </button>

        <br />
        <br />
        <ul>
          {this.state.meaning?.map(({ word, meanings }) => (
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
  }
}

export { Dictionary };
