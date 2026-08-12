/**
 * PTE Academic High-Frequency Vocabulary & Collocations Data Bank
 * Features Academic Word List (AWL), PTE Collocations, Topic Banks, and Homophones.
 */

export interface AWLWord {
  id: string;
  word: string;
  sublist: number;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  definition: string;
  wordFamily: {
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
  };
  exampleSentence: string;
  pteTaskUsage: string[]; // e.g. ['SWT', 'WE', 'FIB-RW', 'WFD']
}

export interface PTECollocation {
  id: string;
  phrase: string;
  category: 'Verb + Noun' | 'Adjective + Noun' | 'Verb + Preposition' | 'Prepositional Phrase' | 'Adverb + Adjective';
  meaning: string;
  exampleSentence: string;
}

export interface TopicVocabulary {
  topic: 'Environment & Ecology' | 'Technology & AI' | 'Science & Healthcare' | 'Education & Society' | 'Economics & Business';
  words: {
    term: string;
    definition: string;
    collocations: string[];
    sampleSentence: string;
  }[];
}

export interface HomophonePair {
  id: string;
  wordA: string;
  wordB: string;
  definitionA: string;
  definitionB: string;
  exampleA: string;
  exampleB: string;
  wfdWarningNote: string;
}

// ===========================================================================
// 1. ACADEMIC WORD LIST (AWL) HIGH-FREQUENCY SELECTION
// ===========================================================================

export const AWL_WORDS: AWLWord[] = [
  {
    id: 'awl_01',
    word: 'analyze',
    sublist: 1,
    partOfSpeech: 'verb',
    definition: 'To examine something in detail in order to discover or understand its structure and features.',
    wordFamily: { noun: 'analysis', verb: 'analyze', adjective: 'analytical', adverb: 'analytically' },
    exampleSentence: 'Researchers must analyze empirical data before drawing definitive academic conclusions.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-RW', 'SST']
  },
  {
    id: 'awl_02',
    word: 'constitute',
    sublist: 1,
    partOfSpeech: 'verb',
    definition: 'To be a part of a whole; to form or establish.',
    wordFamily: { noun: 'constitution', verb: 'constitute', adjective: 'constitutional', adverb: 'constitutionally' },
    exampleSentence: 'Renewable resources now constitute over forty percent of total electricity production.',
    pteTaskUsage: ['DI', 'FIB-RW', 'FIB-R']
  },
  {
    id: 'awl_03',
    word: 'establish',
    sublist: 1,
    partOfSpeech: 'verb',
    definition: 'To set up on a firm or permanent basis; to prove or demonstrate.',
    wordFamily: { noun: 'establishment', verb: 'establish', adjective: 'established' },
    exampleSentence: 'The study aims to establish a clear correlation between sleep patterns and cognitive performance.',
    pteTaskUsage: ['WE', 'SWT', 'WFD']
  },
  {
    id: 'awl_04',
    word: 'indicate',
    sublist: 1,
    partOfSpeech: 'verb',
    definition: 'To point out or show; to be a sign of.',
    wordFamily: { noun: 'indication', verb: 'indicate', adjective: 'indicative', adverb: 'indicatively' },
    exampleSentence: 'Statistical findings indicate a significant decline in global carbon emissions.',
    pteTaskUsage: ['DI', 'SWT', 'SST', 'WFD']
  },
  {
    id: 'awl_05',
    word: 'significant',
    sublist: 1,
    partOfSpeech: 'adjective',
    definition: 'Sufficiently great or important to be worthy of attention; noteworthy.',
    wordFamily: { noun: 'significance', adjective: 'significant', adverb: 'significantly' },
    exampleSentence: 'There was a significant improvement in student test scores following the intervention.',
    pteTaskUsage: ['DI', 'WE', 'SST', 'FIB-RW']
  },
  {
    id: 'awl_06',
    word: 'mitigate',
    sublist: 2,
    partOfSpeech: 'verb',
    definition: 'To make less severe, serious, or painful.',
    wordFamily: { noun: 'mitigation', verb: 'mitigate', adjective: 'mitigating' },
    exampleSentence: 'Policy makers implemented strict building regulations to mitigate flood risks.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-RW']
  },
  {
    id: 'awl_07',
    word: 'facilitate',
    sublist: 2,
    partOfSpeech: 'verb',
    definition: 'To make an action or process easy or easier.',
    wordFamily: { noun: 'facilitation', verb: 'facilitate', adjective: 'facilitative' },
    exampleSentence: 'Modern digital platforms facilitate international collaboration among research teams.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-R', 'WFD']
  },
  {
    id: 'awl_08',
    word: 'consequence',
    sublist: 2,
    partOfSpeech: 'noun',
    definition: 'A result or effect of an action or condition.',
    wordFamily: { noun: 'consequence', adjective: 'consequent', adverb: 'consequently' },
    exampleSentence: 'Global warming has severe environmental consequences for coastal ecosystems.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-RW']
  },
  {
    id: 'awl_09',
    word: 'demonstrate',
    sublist: 3,
    partOfSpeech: 'verb',
    definition: 'To clearly show the existence or truth of something by giving proof or evidence.',
    wordFamily: { noun: 'demonstration', verb: 'demonstrate', adjective: 'demonstrable', adverb: 'demonstrably' },
    exampleSentence: 'Clinical trials demonstrate the safety and efficacy of the new vaccine.',
    pteTaskUsage: ['DI', 'WE', 'SWT', 'WFD']
  },
  {
    id: 'awl_10',
    word: 'implement',
    sublist: 4,
    partOfSpeech: 'verb',
    definition: 'To put a decision, plan, or agreement into effect.',
    wordFamily: { noun: 'implementation', verb: 'implement' },
    exampleSentence: 'The government will implement new economic policies starting next fiscal quarter.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-RW', 'WFD']
  },
  {
    id: 'awl_11',
    word: 'inevitable',
    sublist: 8,
    partOfSpeech: 'adjective',
    definition: 'Certain to happen; unavoidable.',
    wordFamily: { noun: 'inevitability', adjective: 'inevitable', adverb: 'inevitably' },
    exampleSentence: 'Technological automation makes job restructuring an inevitable reality across manufacturing.',
    pteTaskUsage: ['WE', 'SWT', 'FIB-RW']
  },
  {
    id: 'awl_12',
    word: 'predominant',
    sublist: 8,
    partOfSpeech: 'adjective',
    definition: 'Present as the strongest or main element.',
    wordFamily: { noun: 'predominance', adjective: 'predominant', adverb: 'predominantly' },
    exampleSentence: 'Fossil fuels remain the predominant source of industrial energy in developing nations.',
    pteTaskUsage: ['DI', 'FIB-RW', 'FIB-R']
  }
];

// ===========================================================================
// 2. PTE ACADEMIC COLLOCATIONS LIST
// ===========================================================================

export const PTE_COLLOCATIONS: PTECollocation[] = [
  {
    id: 'col_01',
    phrase: 'conduct research',
    category: 'Verb + Noun',
    meaning: 'To carry out scholarly investigation',
    exampleSentence: 'University scientists conduct research on renewable solar energy.'
  },
  {
    id: 'col_02',
    phrase: 'play a vital role',
    category: 'Verb + Noun',
    meaning: 'To have an essential contribution',
    exampleSentence: 'Clean water plays a vital role in public health maintenance.'
  },
  {
    id: 'col_03',
    phrase: 'raise concerns',
    category: 'Verb + Noun',
    meaning: 'To cause people to feel worried',
    exampleSentence: 'Rapid AI development has raised concerns regarding workplace automation.'
  },
  {
    id: 'col_04',
    phrase: 'empirical evidence',
    category: 'Adjective + Noun',
    meaning: 'Information acquired by observation or experimentation',
    exampleSentence: 'The scientific theory is supported by strong empirical evidence.'
  },
  {
    id: 'col_05',
    phrase: 'significant difference',
    category: 'Adjective + Noun',
    meaning: 'A notable discrepancy or statistical variation',
    exampleSentence: 'There is a significant difference between the two experimental groups.'
  },
  {
    id: 'col_06',
    phrase: 'sustainable development',
    category: 'Adjective + Noun',
    meaning: 'Economic growth that preserves environmental resources',
    exampleSentence: 'Policy makers must prioritize sustainable development in urban planning.'
  },
  {
    id: 'col_07',
    phrase: 'contribute to',
    category: 'Verb + Preposition',
    meaning: 'To help cause or bring about an outcome',
    exampleSentence: 'High greenhouse gas emissions contribute to ocean acidification.'
  },
  {
    id: 'col_08',
    phrase: 'in terms of',
    category: 'Prepositional Phrase',
    meaning: 'With regard to a particular aspect',
    exampleSentence: 'The project was successful in terms of cost efficiency.'
  },
  {
    id: 'col_09',
    phrase: 'highly effective',
    category: 'Adverb + Adjective',
    meaning: 'Extremely successful at producing a desired result',
    exampleSentence: 'Vaccination programs have proven highly effective against viral diseases.'
  },
  {
    id: 'col_10',
    phrase: 'rapidly growing',
    category: 'Adverb + Adjective',
    meaning: 'Expanding at a fast pace',
    exampleSentence: 'Biotechnology is a rapidly growing sector in the modern economy.'
  }
];

// ===========================================================================
// 3. HIGH-FREQUENCY TOPIC VOCABULARY BANKS
// ===========================================================================

export const TOPIC_VOCABULARY_BANKS: TopicVocabulary[] = [
  {
    topic: 'Environment & Ecology',
    words: [
      {
        term: 'Biodiversity',
        definition: 'The variety of plant and animal life in the world or in a particular habitat.',
        collocations: ['preserve biodiversity', 'biodiversity loss', 'rich biodiversity'],
        sampleSentence: 'Deforestation severely degrades tropical biodiversity.'
      },
      {
        term: 'Deforestation',
        definition: 'The action of clearing a wide area of trees.',
        collocations: ['halt deforestation', 'widespread deforestation', 'rate of deforestation'],
        sampleSentence: 'Uncontrolled deforestation threatens global carbon sinks.'
      },
      {
        term: 'Decarbonization',
        definition: 'The reduction or elimination of carbon dioxide emissions from energy sources.',
        collocations: ['grid decarbonization', 'accelerate decarbonization', 'decarbonization strategy'],
        sampleSentence: 'Transitioning to wind power is essential for industrial decarbonization.'
      }
    ]
  },
  {
    topic: 'Technology & AI',
    words: [
      {
        term: 'Algorithm',
        definition: 'A process or set of rules to be followed in calculations by a computer.',
        collocations: ['predictive algorithm', 'algorithmic bias', 'execute algorithms'],
        sampleSentence: 'Search engines utilize complex algorithms to rank web pages.'
      },
      {
        term: 'Automation',
        definition: 'The use of largely automatic equipment in a system of operation.',
        collocations: ['industrial automation', 'workforce automation', 'automation technology'],
        sampleSentence: 'Robotic automation has transformed automobile manufacturing.'
      },
      {
        term: 'Cybersecurity',
        definition: 'Measures taken to protect computer systems against criminal or unauthorized access.',
        collocations: ['cybersecurity protocol', 'enhance cybersecurity', 'cybersecurity breach'],
        sampleSentence: 'Financial institutions invest heavily in advanced cybersecurity systems.'
      }
    ]
  },
  {
    topic: 'Education & Society',
    words: [
      {
        term: 'Pedagogy',
        definition: 'The method and practice of teaching, especially as an academic subject.',
        collocations: ['innovative pedagogy', 'pedagogical framework', 'digital pedagogy'],
        sampleSentence: 'Modern pedagogy emphasizes interactive problem-solving over rote learning.'
      },
      {
        term: 'Demographics',
        definition: 'Statistical data relating to the population and particular groups within it.',
        collocations: ['demographic shift', 'changing demographics', 'demographic trends'],
        sampleSentence: 'Aging demographics present financial challenges for pension systems.'
      }
    ]
  }
];

// ===========================================================================
// 4. HOMOPHONES & COMMONLY CONFUSED WORDS (FOR WFD & FIB-L)
// ===========================================================================

export const HOMOPHONE_PAIRS: HomophonePair[] = [
  {
    id: 'hom_01',
    wordA: 'affect',
    wordB: 'effect',
    definitionA: 'To influence or produce a change in (Verb)',
    definitionB: 'A result or consequence of an action (Noun)',
    exampleA: 'Climate change will severely affect agricultural yields.',
    exampleB: 'The new regulation had an immediate positive effect on air quality.',
    wfdWarningNote: 'Check if sentence requires a verb ("will affect") or a noun ("the effect").'
  },
  {
    id: 'hom_02',
    wordA: 'principal',
    wordB: 'principle',
    definitionA: 'First in order of importance; head of a school (Noun/Adj)',
    definitionB: 'A fundamental truth or proposition (Noun)',
    exampleA: 'The principal investigator published the research findings.',
    exampleB: 'Scientific theories are based on fundamental principles of physics.',
    wfdWarningNote: 'Rule of thumb: "Principal" is a person/main factor; "Principle" is a rule/truth.'
  },
  {
    id: 'hom_03',
    wordA: 'lead',
    wordB: 'led',
    definitionA: 'To guide or direct (Present tense verb / Metal noun)',
    definitionB: 'Guided or directed (Past tense verb)',
    exampleA: 'Effective leaders lead by personal example.',
    exampleB: 'The breakthrough led to significant advancements in medicine.',
    wfdWarningNote: 'Pay close attention to sentence tense in Write from Dictation!'
  },
  {
    id: 'hom_04',
    wordA: 'stationary',
    wordB: 'stationery',
    definitionA: 'Not moving or changing (Adjective)',
    definitionB: 'Writing materials such as paper and envelopes (Noun)',
    exampleA: 'The traffic remained stationary for over an hour.',
    exampleB: 'The university office ordered new letterhead stationery.',
    wfdWarningNote: 'Remember: StationERy with ER is for PapER.'
  }
];
