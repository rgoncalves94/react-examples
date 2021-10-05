interface DictionaryMeaning {
  word: string;
  meanings: {
    partOfSpeach: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

interface Meaning {
  word: string;
  definitions: string[];
}

export type { DictionaryMeaning, Meaning };
