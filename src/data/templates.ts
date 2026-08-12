/**
 * PTE Academic Score-Maximizing Templates & Scoring Criteria
 * Standard 2-Hour Exam Format Specification
 */

export interface DescribeImageTemplate {
  id: string;
  chartType: 'bar_chart' | 'line_graph' | 'pie_chart' | 'process_diagram' | 'map' | 'flowchart' | 'table' | 'generic';
  title: string;
  templateText: string;
  placeholders: string[];
  sampleFilledText: string;
  speakingTips: string[];
}

export interface RetellLectureTemplate {
  id: string;
  title: string;
  templateText: string;
  placeholders: string[];
  sampleFilledText: string;
  keyStrategy: string;
}

export interface SummarizeSpokenTextTemplate {
  id: string;
  title: string;
  templateText: string;
  targetWordCount: { min: number; max: number };
  sampleFilledText: string;
  guidelines: string[];
}

export interface EssayTemplate {
  id: string;
  title: string;
  type: 'opinion' | 'agree_disagree' | 'problem_solution' | 'advantages_disadvantages' | 'discussion';
  templateStructure: {
    paragraph: number;
    name: string;
    templateText: string;
    guidelines: string;
  }[];
  fullTemplate: string;
  sampleFilledEssay: string;
  samplePrompt: string;
  wordCountTarget: { min: number; max: number };
  transitionPhrases: string[];
}

export interface ScoringRule {
  itemType: string;
  code: string;
  section: 'Speaking' | 'Writing' | 'Reading' | 'Listening';
  maxPoints: number;
  enablingSkills: { skill: string; maxPts: number; criteria: string }[];
  scoringType: 'Partial Credit' | 'Correct/Incorrect' | 'Negative Marking';
  crossSkillContributions: { skill: string; description: string }[];
}

// ---------------------------------------------------------------------------
// 1. DESCRIBE IMAGE TEMPLATES
// ---------------------------------------------------------------------------

export const DESCRIBE_IMAGE_TEMPLATES: DescribeImageTemplate[] = [
  {
    id: 'di_bar_line_pie',
    chartType: 'bar_chart',
    title: 'Standard Statistical Chart Template (Bar, Line, Pie, Table)',
    templateText: `The given {CHART_TYPE} provides comprehensive information about {MAIN_TOPIC}. Looking closely at the data, it is clear that {HIGHEST_CATEGORY} registered the highest figure at {HIGHEST_VALUE}, whereas {LOWEST_CATEGORY} accounted for the lowest proportion at {LOWEST_VALUE}. Furthermore, significant trends can be observed in {KEY_TREND_1} and {KEY_TREND_2}. In conclusion, the presented graph highlights key insights regarding {MAIN_TOPIC} and demonstrates a clear pattern over the given context.`,
    placeholders: ['{CHART_TYPE}', '{MAIN_TOPIC}', '{HIGHEST_CATEGORY}', '{HIGHEST_VALUE}', '{LOWEST_CATEGORY}', '{LOWEST_VALUE}', '{KEY_TREND_1}', '{KEY_TREND_2}'],
    sampleFilledText: `The given bar chart provides comprehensive information about global renewable energy consumption between 2010 and 2020. Looking closely at the data, it is clear that solar energy registered the highest figure at 45 percent, whereas geothermal energy accounted for the lowest proportion at 5 percent. Furthermore, significant trends can be observed in wind power growth and hydroelectricity stability. In conclusion, the presented graph highlights key insights regarding global renewable energy consumption and demonstrates a clear pattern over the given context.`,
    speakingTips: [
      'Maintain continuous oral fluency. Never pause for more than 2 seconds.',
      'Speak smoothly at a moderate pace (120-140 words per minute).',
      'Do not worry if content accuracy is not 100% precise; Pearson AI prioritizes fluency and pronunciation over deep statistical precision.',
      'Aim for a response time between 30 to 38 seconds out of the 40-second limit.'
    ]
  },
  {
    id: 'di_process_flowchart',
    chartType: 'process_diagram',
    title: 'Process Diagram & Flowchart Template',
    templateText: `The provided process diagram illustrates the sequential stages of {PROCESS_NAME}. Overall, there are {NUMBER_OF_STAGES} main phases shown in the diagram, beginning with {FIRST_STAGE} and concluding with {FINAL_STAGE}. In the initial step, {INITIAL_DETAIL} takes place. Following this, the procedure moves into {INTERMEDIATE_STAGE}, where {INTERMEDIATE_DETAIL} is processed. Finally, the outcome results in {FINAL_OUTCOME}. In summary, the diagram effectively demonstrates the complete cycle of {PROCESS_NAME}.`,
    placeholders: ['{PROCESS_NAME}', '{NUMBER_OF_STAGES}', '{FIRST_STAGE}', '{FINAL_STAGE}', '{INITIAL_DETAIL}', '{INTERMEDIATE_STAGE}', '{INTERMEDIATE_DETAIL}', '{FINAL_OUTCOME}'],
    sampleFilledText: `The provided process diagram illustrates the sequential stages of paper recycling. Overall, there are four main phases shown in the diagram, beginning with waste collection and concluding with new paper production. In the initial step, paper waste collection and sorting takes place. Following this, the procedure moves into washing and de-inking, where impurities and ink are removed. Finally, the outcome results in recycled paper sheets. In summary, the diagram effectively demonstrates the complete cycle of paper recycling.`,
    speakingTips: [
      'Use clear transition signals like "firstly", "following this", "subsequently", and "finally".',
      'If stage labels contain difficult words, read them phonetically with steady intonation.',
      'Never hesitate when moving from one stage to the next.'
    ]
  },
  {
    id: 'di_map_comparison',
    chartType: 'map',
    title: 'Map & Geographic Change Template',
    templateText: `The presented map diagram highlights key geographic features and structural developments of {LOCATION_NAME} between {YEAR_1} and {YEAR_2}. Looking at the layout, significant transformations occurred in the {NORTH_SOUTH_EAST_WEST} region, where {KEY_CHANGE_1} was constructed. Additionally, the area previously occupied by {OLD_FEATURE} has been replaced by {NEW_FEATURE}. Overall, the map shows substantial urban expansion and modernization across {LOCATION_NAME}.`,
    placeholders: ['{LOCATION_NAME}', '{YEAR_1}', '{YEAR_2}', '{NORTH_SOUTH_EAST_WEST}', '{KEY_CHANGE_1}', '{OLD_FEATURE}', '{NEW_FEATURE}'],
    sampleFilledText: `The presented map diagram highlights key geographic features and structural developments of City Center between 2000 and 2020. Looking at the layout, significant transformations occurred in the northern region, where a modern shopping mall was constructed. Additionally, the area previously occupied by farmland has been replaced by residential apartments. Overall, the map shows substantial urban expansion and modernization across City Center.`,
    speakingTips: [
      'Mention compass directions (North, South, East, West, Central).',
      'Contrast past vs present features smoothly using past tense ("was built", "was transformed").'
    ]
  }
];

// ---------------------------------------------------------------------------
// 2. RE-TELL LECTURE & SUMMARIZE SPOKEN TEXT TEMPLATES
// ---------------------------------------------------------------------------

export const RETELL_LECTURE_TEMPLATES: RetellLectureTemplate[] = [
  {
    id: 'rl_universal',
    title: 'Universal High-Fluency Re-tell Lecture Template',
    templateText: `The speaker in the audio lecture was primarily discussing {MAIN_TOPIC}. Firstly, the lecturer highlighted that {KEY_NOTE_1}, which plays a vital role in understanding the overall concept. Secondly, the audio emphasized important information regarding {KEY_NOTE_2}, supported by evidence related to {KEY_NOTE_3}. Additionally, the speaker pointed out crucial details concerning {KEY_NOTE_4}. In conclusion, the lecture provided valuable academic insights into {MAIN_TOPIC} and emphasized the significance of {FINAL_KEYWORD}.`,
    placeholders: ['{MAIN_TOPIC}', '{KEY_NOTE_1}', '{KEY_NOTE_2}', '{KEY_NOTE_3}', '{KEY_NOTE_4}', '{FINAL_KEYWORD}'],
    sampleFilledText: `The speaker in the audio lecture was primarily discussing climate change impact on marine biology. Firstly, the lecturer highlighted that ocean temperatures are rising rapidly, which plays a vital role in understanding the overall concept. Secondly, the audio emphasized important information regarding coral bleaching, supported by evidence related to biodiversity loss. Additionally, the speaker pointed out crucial details concerning carbon dioxide absorption by oceans. In conclusion, the lecture provided valuable academic insights into climate change impact on marine biology and emphasized the significance of global marine conservation.`,
    keyStrategy: 'Note down 4-5 key phrases or nouns/verbs during the 60-90s audio. Plug them directly into the template slots. Maintain 100% oral fluency without pauses.'
  }
];

export const SUMMARIZE_SPOKEN_TEXT_TEMPLATES: SummarizeSpokenTextTemplate[] = [
  {
    id: 'sst_band9',
    title: 'Band 9 Summarize Spoken Text Structural Template (50-70 Words)',
    templateText: `The lecture provided insightful information regarding {MAIN_SUBJECT}. Firstly, the speaker highlighted that {KEY_POINT_1}, which plays a fundamental role in {RELATED_CONTEXT}. Furthermore, the audio emphasized {KEY_POINT_2} as well as {KEY_POINT_3}. Ultimately, the speaker concluded that {FINAL_CONCLUSION}, demonstrating the broader significance of this research.`,
    targetWordCount: { min: 50, max: 70 },
    sampleFilledText: `The lecture provided insightful information regarding artificial intelligence in healthcare. Firstly, the speaker highlighted that automated diagnostic algorithms significantly improve early disease detection, which plays a fundamental role in modern patient care. Furthermore, the audio emphasized machine learning accuracy as well as clinical data security. Ultimately, the speaker concluded that technological integration will revolutionize medical treatment, demonstrating the broader significance of this research.`,
    guidelines: [
      'Strict Word Count: 50 to 70 words. Anything below 40 or above 100 receives 0 for Form.',
      'Check spelling carefully (US or UK consistency throughout).',
      'Ensure clear grammatical punctuation (periods, commas, subject-verb agreement).',
      'Extract 3-4 specific academic nouns/concepts heard in the recording.'
    ]
  }
];

// ---------------------------------------------------------------------------
// 3. WRITE ESSAY TEMPLATES (BAND 90)
// ---------------------------------------------------------------------------

export const ESSAY_TEMPLATES: EssayTemplate[] = [
  {
    id: 'we_universal_band9',
    title: 'PTE Band 90 Universal Essay Template (200-300 Words)',
    type: 'opinion',
    samplePrompt: 'Some people believe that artificial intelligence will replace human jobs in the near future, while others argue it will create new opportunities. Discuss both views and give your opinion.',
    wordCountTarget: { min: 200, max: 300 },
    transitionPhrases: [
      'In recent years', 'Primarily', 'Furthermore', 'For instance',
      'On the other hand', 'Consequently', 'In conclusion', 'From a broader perspective'
    ],
    templateStructure: [
      {
        paragraph: 1,
        name: 'Introduction',
        templateText: `In recent years, the issue of {TOPIC} has sparked intense debate among experts and the general public alike. While some individuals argue that {SIDE_A_SUMMARY}, others contend that {SIDE_B_SUMMARY}. This essay will analyze both perspectives before arriving at a reasoned conclusion.`,
        guidelines: 'Introduce topic clearly. Rephrase the prompt. State essay scope. Target word count: 40-50 words.'
      },
      {
        paragraph: 2,
        name: 'Body Paragraph 1 (Arguments for Side A)',
        templateText: `On the one hand, there are compelling reasons to support the notion of {SIDE_A_CORE_CLAIM}. Primarily, {ARGUMENT_1} plays a fundamental role because {EXPLANATION_1}. For instance, recent empirical studies demonstrate that {CONCRETE_EXAMPLE_1}. Consequently, this clearly illustrates why {SUMMARY_POINT_1}.`,
        guidelines: 'Focus on first major argument with explanation and concrete example. Target word count: 70-80 words.'
      },
      {
        paragraph: 3,
        name: 'Body Paragraph 2 (Arguments for Side B / My Stance)',
        templateText: `On the other hand, proponents of {SIDE_B_CORE_CLAIM} point out that {ARGUMENT_2}. The key driver behind this perspective is that {EXPLANATION_2}. Furthermore, {ADDITIONAL_SUPPORTING_FACT}. As a result, this approach offers substantial benefits regarding {POSITIVE_OUTCOME}.`,
        guidelines: 'Focus on second viewpoint or your personal stance with logical flow. Target word count: 70-80 words.'
      },
      {
        paragraph: 4,
        name: 'Conclusion',
        templateText: `In conclusion, although {SIDE_A_SUMMARY} presents valid considerations, I firmly believe that {MY_FINAL_STANCE} is more advantageous in the long run. Moving forward, policy makers and society should collaborate to foster positive developments in this field.`,
        guidelines: 'Summarize main points without introducing new arguments. End with a forward-looking statement. Target word count: 35-45 words.'
      }
    ],
    fullTemplate: `In recent years, the issue of {TOPIC} has sparked intense debate among experts and the general public alike. While some individuals argue that {SIDE_A_SUMMARY}, others contend that {SIDE_B_SUMMARY}. This essay will analyze both perspectives before arriving at a reasoned conclusion.

On the one hand, there are compelling reasons to support the notion of {SIDE_A_CORE_CLAIM}. Primarily, {ARGUMENT_1} plays a fundamental role because {EXPLANATION_1}. For instance, recent empirical studies demonstrate that {CONCRETE_EXAMPLE_1}. Consequently, this clearly illustrates why {SUMMARY_POINT_1}.

On the other hand, proponents of {SIDE_B_CORE_CLAIM} point out that {ARGUMENT_2}. The key driver behind this perspective is that {EXPLANATION_2}. Furthermore, {ADDITIONAL_SUPPORTING_FACT}. As a result, this approach offers substantial benefits regarding {POSITIVE_OUTCOME}.

In conclusion, although {SIDE_A_SUMMARY} presents valid considerations, I firmly believe that {MY_FINAL_STANCE} is more advantageous in the long run. Moving forward, policy makers and society should collaborate to foster positive developments in this field.`,
    sampleFilledEssay: `In recent years, the issue of artificial intelligence in the modern workforce has sparked intense debate among experts and the general public alike. While some individuals argue that automation will cause widespread job displacement, others contend that technology will generate innovative employment opportunities. This essay will analyze both perspectives before arriving at a reasoned conclusion.

On the one hand, there are compelling reasons to support the notion of workforce automation. Primarily, routine industrial processes play a fundamental role because automated systems perform mechanical tasks with superior speed and precision. For instance, recent empirical studies demonstrate that manufacturing plants using robotics experienced a forty percent increase in productivity. Consequently, this clearly illustrates why routine manual labor is increasingly automated.

On the other hand, proponents of technological expansion point out that artificial intelligence creates high-skilled employment positions. The key driver behind this perspective is that software development, data science, and AI maintenance require human creativity and complex decision-making. Furthermore, new industries emerge whenever breakthrough technologies are implemented. As a result, this approach offers substantial benefits regarding economic growth and professional specialization.

In conclusion, although potential job displacement presents valid considerations, I firmly believe that technological innovation is more advantageous in the long run. Moving forward, policy makers and society should collaborate to foster positive developments in education and retraining programs.`
  }
];

// ---------------------------------------------------------------------------
// 4. SCORING MATRIX & CRITERIA BLUEPRINT
// ---------------------------------------------------------------------------

export const PTE_SCORING_RULES: ScoringRule[] = [
  {
    itemType: 'Read Aloud',
    code: 'RA',
    section: 'Speaking',
    maxPoints: 15,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 5, criteria: 'Proportion of correct words spoken in exact order.' },
      { skill: 'Oral Fluency', maxPts: 5, criteria: 'Smooth, natural rhythm, continuous speech, zero pauses > 2s.' },
      { skill: 'Pronunciation', maxPts: 5, criteria: 'Vowel/consonant accuracy, correct word stress and intonation.' }
    ],
    crossSkillContributions: [
      { skill: 'Speaking', description: 'Contributes to Speaking overall score.' },
      { skill: 'Reading', description: 'Contributes directly to Reading score based on text recognition.' }
    ]
  },
  {
    itemType: 'Repeat Sentence',
    code: 'RS',
    section: 'Speaking',
    maxPoints: 13,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 3, criteria: '3 = 100% words in sequence; 2 = 50%+ words; 1 = <50% words; 0 = no words.' },
      { skill: 'Oral Fluency', maxPts: 5, criteria: 'Natural tempo without hesitation or repetition.' },
      { skill: 'Pronunciation', maxPts: 5, criteria: 'Phonetic clarity and native-like stress.' }
    ],
    crossSkillContributions: [
      { skill: 'Speaking', description: 'Major contribution to Speaking score.' },
      { skill: 'Listening', description: 'High contribution to Listening score.' }
    ]
  },
  {
    itemType: 'Describe Image',
    code: 'DI',
    section: 'Speaking',
    maxPoints: 15,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 5, criteria: 'Key trends, high/low values, main topic, conclusion.' },
      { skill: 'Oral Fluency', maxPts: 5, criteria: 'Fluid speech rate, smooth phrasing.' },
      { skill: 'Pronunciation', maxPts: 5, criteria: 'Intelligible pronunciation and correct stress.' }
    ],
    crossSkillContributions: [
      { skill: 'Speaking', description: 'Directly impacts Speaking score.' }
    ]
  },
  {
    itemType: 'Re-tell Lecture',
    code: 'RL',
    section: 'Speaking',
    maxPoints: 15,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 5, criteria: 'Core theme, key supporting points, lecturer conclusion.' },
      { skill: 'Oral Fluency', maxPts: 5, criteria: 'Continuous speech, steady speed.' },
      { skill: 'Pronunciation', maxPts: 5, criteria: 'Clear phonemes and sentence stress.' }
    ],
    crossSkillContributions: [
      { skill: 'Speaking', description: 'Contributes to Speaking.' },
      { skill: 'Listening', description: 'Contributes to Listening.' }
    ]
  },
  {
    itemType: 'Summarize Written Text',
    code: 'SWT',
    section: 'Writing',
    maxPoints: 7,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 2, criteria: '2 = Full key point coverage; 1 = Partial; 0 = Misrepresents text.' },
      { skill: 'Form', maxPts: 1, criteria: '1 = Exactly ONE sentence, 5-75 words; 0 = Multiple sentences or <5/>75 words.' },
      { skill: 'Grammar', maxPts: 2, criteria: 'Correct complex clause structures and punctuation.' },
      { skill: 'Vocabulary', maxPts: 2, criteria: 'Appropriate word choice matching context.' }
    ],
    crossSkillContributions: [
      { skill: 'Reading', description: 'Contributes to Reading comprehension.' },
      { skill: 'Writing', description: 'Contributes to Writing score.' }
    ]
  },
  {
    itemType: 'Write Essay',
    code: 'WE',
    section: 'Writing',
    maxPoints: 15,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 3, criteria: 'Addresses prompt fully with arguments and examples.' },
      { skill: 'Form', maxPts: 2, criteria: '2 = 200-300 words; 1 = 120-199 or 301-380 words; 0 = <120 or >380 words.' },
      { skill: 'Development & Coherence', maxPts: 2, criteria: 'Logical progression and paragraph structure.' },
      { skill: 'Grammar', maxPts: 2, criteria: 'Grammatical control and complex sentences.' },
      { skill: 'General Vocabulary', maxPts: 2, criteria: 'Academic vocabulary range.' },
      { skill: 'Spelling', maxPts: 2, criteria: '2 = 0 spelling errors; 1 = 1 error; 0 = 2+ errors.' }
    ],
    crossSkillContributions: [
      { skill: 'Writing', description: 'Major contributor to Writing overall score.' }
    ]
  },
  {
    itemType: 'Fill in the Blanks (R&W)',
    code: 'FIB-RW',
    section: 'Reading',
    maxPoints: 5,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Reading & Grammar', maxPts: 5, criteria: '1 point per correct inline dropdown selection.' }
    ],
    crossSkillContributions: [
      { skill: 'Reading', description: 'Contributes to Reading.' },
      { skill: 'Writing', description: 'Contributes to Writing.' }
    ]
  },
  {
    itemType: 'Re-order Paragraphs',
    code: 'ROP',
    section: 'Reading',
    maxPoints: 4,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Cohesion & Structure', maxPts: 4, criteria: '1 point for each correct adjacent pair (e.g. A-B, B-C).' }
    ],
    crossSkillContributions: [
      { skill: 'Reading', description: 'Contributes to Reading.' }
    ]
  },
  {
    itemType: 'Summarize Spoken Text',
    code: 'SST',
    section: 'Listening',
    maxPoints: 10,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Content', maxPts: 2, criteria: 'Captures main ideas and supporting facts.' },
      { skill: 'Form', maxPts: 2, criteria: '2 = 50-70 words; 1 = 40-49 or 71-100 words; 0 = <40 or >100 words.' },
      { skill: 'Grammar', maxPts: 2, criteria: 'Sentence mechanics.' },
      { skill: 'Vocabulary', maxPts: 2, criteria: 'Academic word selection.' },
      { skill: 'Spelling', maxPts: 2, criteria: '2 = 0 errors; 1 = 1 error; 0 = 2+ errors.' }
    ],
    crossSkillContributions: [
      { skill: 'Listening', description: 'Contributes to Listening.' },
      { skill: 'Writing', description: 'Contributes to Writing.' }
    ]
  },
  {
    itemType: 'Write from Dictation',
    code: 'WFD',
    section: 'Listening',
    maxPoints: 14,
    scoringType: 'Partial Credit',
    enablingSkills: [
      { skill: 'Exact Word Recall', maxPts: 14, criteria: '1 point per correctly spelled word in correct sequence.' }
    ],
    crossSkillContributions: [
      { skill: 'Listening', description: 'Highest weight task for Listening.' },
      { skill: 'Writing', description: 'Highest weight task for Writing.' }
    ]
  }
];
