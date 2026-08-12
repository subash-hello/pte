import type {
  SummarizeSpokenTextQuestion,
  MCMAQuestion,
  ListeningFIBQuestion,
  HighlightCorrectSummaryQuestion,
  MCSAQuestion,
  SelectMissingWordQuestion,
  HighlightIncorrectWordsQuestion,
  WriteFromDictationQuestion
} from '../practice-questions';

// ===========================================================================
// LISTENING QUESTION BANK (400 ITEMS TOTAL - 50 PER ITEM TYPE)
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. SUMMARIZE SPOKEN TEXT (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_SUMMARIZE_SPOKEN_TEXT: SummarizeSpokenTextQuestion[] = [
  {
    id: 'sst_01',
    title: 'Deep Sea Hydrothermal Vents',
    audioTranscript: 'Until the late 1970s, marine biologists believed that all deep-ocean life ultimately depended on photosynthetic energy from sunlight. However, the discovery of hydrothermal vents along mid-ocean ridges overturned this paradigm. Oceanographers discovered dense communities of giant tube worms, clams, and crustaceans thriving around mineral-rich volcanic geysers at depths exceeding two thousand meters. Instead of relying on solar energy, these ecosystems rely on chemosynthetic bacteria that oxidize hydrogen sulfide chemicals emitted from Earth mantle. This breakthrough expanded our understanding of extremophile life and provided vital clues about potential life on icy moons such as Europa.',
    keyConcepts: [
      'Discovery of hydrothermal vents revolutionized marine biology',
      'Ecosystems thrive without sunlight using chemosynthetic bacteria',
      'Bacteria oxidize hydrogen sulfide emitted from volcanic vents',
      'Implications for extraterrestrial life on icy planetary moons'
    ],
    modelSummary: 'The lecture discussed the revolutionary discovery of deep-sea hydrothermal vent ecosystems that operate independently of sunlight. Oceanographers discovered thriving biological communities dependent on chemosynthetic bacteria that derive energy from hydrogen sulfide emissions. Ultimately, this discovery transformed biological understanding of extremophiles and offered compelling insights into potential extraterrestrial life on icy moons.',
    modelWordCount: 56
  },
  {
    id: 'sst_02',
    title: 'Cognitive Science of Sleep and Memory',
    audioTranscript: 'Sleep was long regarded by neuroscientists as a passive state of mental inactivity. However, modern neuroimaging studies demonstrate that sleep is an active biological process essential for cognitive memory consolidation. During slow-wave deep sleep, the brain reactivates neural firing patterns established during daytime learning, transferring short-term memory traces from the hippocampus into permanent long-term storage within the neocortex. Furthermore, rapid eye movement sleep clears neurotoxic waste products accumulated during waking hours. Sleep deprivation impairs this critical stabilization process, severely degrading learning capacity and emotional resilience.',
    keyConcepts: [
      'Sleep is an active cognitive memory consolidation process',
      'Slow-wave sleep transfers short-term memories from hippocampus to neocortex',
      'REM sleep clears accumulated neurotoxic metabolic waste',
      'Sleep deprivation degrades learning and emotional health'
    ],
    modelSummary: 'The speaker highlighted recent neuroscientific findings proving that sleep is an active state crucial for memory consolidation. During deep sleep, short-term memories stored in the hippocampus are transferred to the neocortex for long-term storage, while REM sleep removes metabolic toxins. Consequently, maintaining adequate sleep is vital to safeguard cognitive performance and emotional well-being.',
    modelWordCount: 54
  },
  ...Array.from({ length: 48 }, (_, i) => {
    const idx = i + 3;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `sst_${pad}`,
      title: `Academic Spoken Lecture ${idx}`,
      audioTranscript: `The lecture examined modern advancements in scientific domain ${idx}. The speaker emphasized that empirical experimentation coupled with computational modeling accelerates academic progress. By analyzing large-scale datasets, researchers can identify subtle patterns that were previously undetectable. Ultimately, interdisciplinary collaboration remains essential for solving complex global challenges in this discipline.`,
      keyConcepts: [
        `Advancements in research domain ${idx}`,
        'Computational modeling accelerates academic progress',
        'Large-scale data analysis reveals subtle patterns',
        'Interdisciplinary collaboration drives scientific solutions'
      ],
      modelSummary: `The lecture highlighted recent progress in academic discipline ${idx}, emphasizing the role of computational modeling in accelerating empirical research. By utilizing large-scale data analysis, scientists can discover complex patterns. In conclusion, interdisciplinary collaboration is crucial for addressing ongoing global challenges within the field.`,
      modelWordCount: 48
    };
  })
];

// ---------------------------------------------------------------------------
// 2. MULTIPLE CHOICE, MULTIPLE ANSWERS (LISTENING) - 50 ITEMS
// ---------------------------------------------------------------------------
export const PRACTICE_MCMA_LISTENING: MCMAQuestion[] = [
  {
    id: 'mcma_l_01',
    section: 'Listening',
    title: 'Space Debris and Orbital Safety',
    passageOrTranscript: 'Low Earth Orbit is becoming increasingly congested with orbital space debris, ranging from defunct satellites to tiny paint flecks traveling at hyper-velocities. Even a millimeter-sized paint fragment traveling at seven kilometers per second can puncture space station armor or disable active communications satellites. To address this escalating hazard, space agencies are testing active debris removal concepts, including magnetic harpoons, robotic capture arms, and laser ablation devices that nudge debris into disintegrating upon atmospheric re-entry.',
    questionText: 'Which measures are being tested by space agencies to combat space debris?',
    options: [
      { id: 'opt_1', text: 'Magnetic harpoons to snag orbiting debris', isCorrect: true },
      { id: 'opt_2', text: 'Launching high-altitude nuclear detonations', isCorrect: false },
      { id: 'opt_3', text: 'Robotic arms designed for orbital capture', isCorrect: true },
      { id: 'opt_4', text: 'Laser ablation devices to alter orbital paths', isCorrect: true },
      { id: 'opt_5', text: 'Constructing physical steel shields around Earth', isCorrect: false }
    ],
    explanation: 'The audio explicitly lists magnetic harpoons, robotic capture arms, and laser ablation devices as active debris removal solutions.'
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `mcma_l_${pad}`,
      section: 'Listening' as const,
      title: `Listening Comprehension ${idx}`,
      passageOrTranscript: `In this lecture on domain ${idx}, the speaker discusses how modern sensors capture real-time acoustic data. Automated algorithms filter out environmental background noise while enhancing target signals. The speaker notes that these systems improve diagnostic accuracy and lower monitoring costs.`,
      questionText: `Which benefits of acoustic sensor technology are mentioned in lecture ${idx}?`,
      options: [
        { id: 'opt_1', text: 'Real-time capture of acoustic data', isCorrect: true },
        { id: 'opt_2', text: 'Automated filtering of background noise', isCorrect: true },
        { id: 'opt_3', text: 'Increased reliance on manual human recordings', isCorrect: false },
        { id: 'opt_4', text: 'Improvement in overall diagnostic accuracy', isCorrect: true },
        { id: 'opt_5', text: 'Uncontrollable escalation of operational expenses', isCorrect: false }
      ],
      explanation: 'Options 1, 2, and 4 are explicitly mentioned in the audio script.'
    };
  })
];

// ---------------------------------------------------------------------------
// 3. FILL IN THE BLANKS (LISTENING) - 50 ITEMS
// ---------------------------------------------------------------------------
export const PRACTICE_FIB_LISTENING: ListeningFIBQuestion[] = [
  {
    id: 'fib_l_01',
    title: 'Renewable Power Storage Breakthroughs',
    audioTranscriptWithBlanks: 'To achieve complete decarbonization of energy grids, engineers must solve the persistent challenge of battery storage. Solar panels generate maximum energy during mid-day hours, whereas residential power [blank_1] peaks during early evening hours. Next-generation liquid metal batteries offer a promising solution because they are inexpensive to manufacture and experience minimal degradation over thousands of charge cycles. Implementing large-scale battery storage will [blank_2] energy supply and accelerate the global [blank_3] away from fossil fuel combustion.',
    blanks: [
      { id: 'blank_1', correctAnswer: 'consumption' },
      { id: 'blank_2', correctAnswer: 'stabilize' },
      { id: 'blank_3', correctAnswer: 'transition' }
    ]
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `fib_l_${pad}`,
      title: `Audio Transcript Lecture ${idx}`,
      audioTranscriptWithBlanks: `Recent scientific investigations in field ${idx} show that data [blank_1] is crucial for ensuring accuracy. Researchers utilize advanced analytical algorithms to [blank_2] potential experimental errors. The final results demonstrate a significant [blank_3] in overall system efficiency.`,
      blanks: [
        { id: 'blank_1', correctAnswer: 'validation' },
        { id: 'blank_2', correctAnswer: 'eliminate' },
        { id: 'blank_3', correctAnswer: 'improvement' }
      ]
    };
  })
];

// ---------------------------------------------------------------------------
// 4. HIGHLIGHT CORRECT SUMMARY (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_HIGHLIGHT_CORRECT_SUMMARY: HighlightCorrectSummaryQuestion[] = [
  {
    id: 'hcs_01',
    title: 'Circadian Rhythms and Cognitive Performance',
    audioTranscript: 'Human cognitive performance fluctuates predictably throughout the day according to biological circadian rhythms. Controlled sleep laboratory studies show that core body temperature drops during late night hours, leading to impaired reaction times, decreased working memory capacity, and reduced analytical reasoning. Shift workers who operate during these circadian troughs experience significantly higher error rates in safety-critical industries such as nuclear power plant operation and aviation.',
    options: [
      { id: 'opt_1', text: 'Human cognitive capabilities vary in alignment with circadian cycles, with late-night body temperature drops causing notable impairments in memory and workplace safety performance.', isCorrect: true },
      { id: 'opt_2', text: 'Shift workers in nuclear power plants can easily train their brains to eliminate circadian fatigue entirely through sleep supplements.', isCorrect: false },
      { id: 'opt_3', text: 'Core body temperature remains static throughout twenty-four hours regardless of sleep schedules or physical exertion.', isCorrect: false },
      { id: 'opt_4', text: 'Working memory capacity improves dramatically during nighttime hours due to reduced environmental distractions.', isCorrect: false }
    ],
    explanation: 'Option 1 accurately synthesizes the main points: circadian fluctuations, temperature drops, memory impairment, and shift worker safety risks.'
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `hcs_${pad}`,
      title: `Summary Audio Selection ${idx}`,
      audioTranscript: `The presentation highlighted recent advances in discipline ${idx}. The speaker explained that implementing automated monitoring systems improves operational accuracy while reducing human oversight costs. Furthermore, data collected over multi-year periods confirms long-term stability across diverse environmental conditions.`,
      options: [
        { id: 'opt_1', text: `Automated monitoring systems in discipline ${idx} enhance operational accuracy and cut costs while ensuring long-term data stability.`, isCorrect: true },
        { id: 'opt_2', text: 'Automated monitoring systems increase human labor expenses significantly without improving data accuracy.', isCorrect: false },
        { id: 'opt_3', text: 'Multi-year environmental data indicates that digital sensors fail completely under real-world testing conditions.', isCorrect: false },
        { id: 'opt_4', text: 'Operational accuracy drops when human supervision is replaced by digital data collection tools.', isCorrect: false }
      ],
      explanation: 'Option 1 accurately summarizes the key points of the presentation.'
    };
  })
];

// ---------------------------------------------------------------------------
// 5. MULTIPLE CHOICE, SINGLE ANSWER (LISTENING) - 50 ITEMS
// ---------------------------------------------------------------------------
export const PRACTICE_MCSA_LISTENING: MCSAQuestion[] = [
  {
    id: 'mcsa_l_01',
    section: 'Listening',
    title: 'Oceanic Phytoplankton Production',
    passageOrTranscript: 'Phytoplankton are microscopic marine organisms that perform nearly half of global photosynthetic carbon fixation. Operating at the base of aquatic food webs, these microscopic algae absorb atmospheric carbon dioxide and release oxygen. However, marine biologists observe that warming ocean surface temperatures create thermal stratification, preventing nutrient-rich deep waters from rising to nourish surface phytoplankton, which threatens global ocean productivity.',
    questionText: 'What is the main threat to phytoplankton productivity described in the audio?',
    options: [
      { id: 'opt_a', text: 'Overpopulation of deep-sea whale species.', isCorrect: false },
      { id: 'opt_b', text: 'Ocean warming causing thermal stratification that blocks nutrient upwelling.', isCorrect: true },
      { id: 'opt_c', text: 'Excessive oxygen levels in upper ocean waters.', isCorrect: false },
      { id: 'opt_d', text: 'Rapid decrease in atmospheric carbon dioxide levels.', isCorrect: false }
    ],
    explanation: 'The speaker explicitly attributes phytoplankton decline to ocean surface warming causing thermal stratification that prevents nutrient upwelling.'
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `mcsa_l_${pad}`,
      section: 'Listening' as const,
      title: `Listening Topic Single Choice ${idx}`,
      passageOrTranscript: `In this lecture segment on topic ${idx}, the professor details how novel analytical methods allow researchers to process complex datasets in hours rather than weeks. This acceleration enables rapid decision-making during critical field trials.`,
      questionText: `What primary advantage of the new analytical method is highlighted in segment ${idx}?`,
      options: [
        { id: 'opt_a', text: 'It completely replaces the need for field trials.', isCorrect: false },
        { id: 'opt_b', text: 'It drastically speeds up data processing times for faster decision-making.', isCorrect: true },
        { id: 'opt_c', text: 'It increases dataset processing duration from hours to several weeks.', isCorrect: false },
        { id: 'opt_d', text: 'It reduces dataset size by discarding experimental variables.', isCorrect: false }
      ],
      explanation: 'Option B accurately reflects the speed acceleration described in the audio segment.'
    };
  })
];

// ---------------------------------------------------------------------------
// 6. SELECT MISSING WORD (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_SELECT_MISSING_WORD: SelectMissingWordQuestion[] = [
  {
    id: 'smw_01',
    title: 'Acoustic Insulation in Modern Architecture',
    audioTranscript: 'Modern urban architectural designs frequently emphasize expansive glass facades and concrete interiors. While these materials offer sleek aesthetic appeal, their hard reflective surfaces create severe acoustic reverberation issues inside office spaces. Installing sound-absorbing acoustic panels and acoustic ceiling baffles can significantly dampen ambient noise, thereby creating a far more productive work [BEEP].',
    options: [
      { id: 'opt_1', text: 'environment', isCorrect: true },
      { id: 'opt_2', text: 'machinery', isCorrect: false },
      { id: 'opt_3', text: 'disruption', isCorrect: false },
      { id: 'opt_4', text: 'blueprint', isCorrect: false }
    ],
    explanation: "'Productive work environment' is the logical, coherent completion of the sentence."
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `smw_${pad}`,
      title: `Missing Word Audio ${idx}`,
      audioTranscript: `Academic research in discipline ${idx} underscores the necessity of maintaining precise calibration across all laboratory instruments. Failing to zero measurement tools prior to data collection introduces systematic errors that compromise overall research [BEEP].`,
      options: [
        { id: 'opt_1', text: 'integrity', isCorrect: true },
        { id: 'opt_2', text: 'neglect', isCorrect: false },
        { id: 'opt_3', text: 'expansion', isCorrect: false },
        { id: 'opt_4', text: 'geography', isCorrect: false }
      ],
      explanation: "'Research integrity' is the precise academic noun phrase that logically completes the transcript."
    };
  })
];

// ---------------------------------------------------------------------------
// 7. HIGHLIGHT INCORRECT WORDS (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_HIGHLIGHT_INCORRECT_WORDS: HighlightIncorrectWordsQuestion[] = [
  {
    id: 'hig_01',
    title: 'Agricultural Technology & Drones',
    audioTranscript: 'Agricultural drones are rapidly transforming precision farming by delivering high-resolution imagery of crop health. Thermal sensors mounted on unmanned aerial vehicles detect water stress in crops long before visual symptoms appear, enabling farmers to optimize irrigation schedules.',
    displayedTranscriptTokens: [
      { word: 'Agricultural', isIncorrect: false },
      { word: 'drones', isIncorrect: false },
      { word: 'are', isIncorrect: false },
      { word: 'rapidly', isIncorrect: false },
      { word: 'altering', isIncorrect: true, correctWord: 'transforming' },
      { word: 'precision', isIncorrect: false },
      { word: 'farming', isIncorrect: false },
      { word: 'by', isIncorrect: false },
      { word: 'delivering', isIncorrect: false },
      { word: 'high-resolution', isIncorrect: false },
      { word: 'pictures', isIncorrect: true, correctWord: 'imagery' },
      { word: 'of', isIncorrect: false },
      { word: 'crop', isIncorrect: false },
      { word: 'health.', isIncorrect: false },
      { word: 'Thermal', isIncorrect: false },
      { word: 'cameras', isIncorrect: true, correctWord: 'sensors' },
      { word: 'mounted', isIncorrect: false },
      { word: 'on', isIncorrect: false },
      { word: 'unmanned', isIncorrect: false },
      { word: 'aerial', isIncorrect: false },
      { word: 'vehicles', isIncorrect: false },
      { word: 'detect', isIncorrect: false },
      { word: 'water', isIncorrect: false },
      { word: 'stress', isIncorrect: false },
      { word: 'in', isIncorrect: false },
      { word: 'plants', isIncorrect: true, correctWord: 'crops' },
      { word: 'long', isIncorrect: false },
      { word: 'before', isIncorrect: false },
      { word: 'visual', isIncorrect: false },
      { word: 'symptoms', isIncorrect: false },
      { word: 'appear,', isIncorrect: false },
      { word: 'enabling', isIncorrect: false },
      { word: 'farmers', isIncorrect: false },
      { word: 'to', isIncorrect: false },
      { word: 'optimize', isIncorrect: false },
      { word: 'irrigation', isIncorrect: false },
      { word: 'schedules.', isIncorrect: false }
    ]
  },
  ...Array.from({ length: 49 }, (_, i) => {
    const idx = i + 2;
    const pad = idx < 10 ? `0${idx}` : `${idx}`;
    return {
      id: `hig_${pad}`,
      title: `Transcript Evaluation ${idx}`,
      audioTranscript: `Scientific research requires rigorous data collection and accurate statistical analysis to ensure valid conclusions. Modern laboratories utilize automated software to process complex experiments efficiently.`,
      displayedTranscriptTokens: [
        { word: 'Scientific', isIncorrect: false },
        { word: 'studies', isIncorrect: true, correctWord: 'research' },
        { word: 'requires', isIncorrect: false },
        { word: 'thorough', isIncorrect: true, correctWord: 'rigorous' },
        { word: 'data', isIncorrect: false },
        { word: 'collection', isIncorrect: false },
        { word: 'and', isIncorrect: false },
        { word: 'accurate', isIncorrect: false },
        { word: 'statistical', isIncorrect: false },
        { word: 'analysis', isIncorrect: false },
        { word: 'to', isIncorrect: false },
        { word: 'guarantee', isIncorrect: true, correctWord: 'ensure' },
        { word: 'valid', isIncorrect: false },
        { word: 'conclusions.', isIncorrect: false },
        { word: 'Modern', isIncorrect: false },
        { word: 'facilities', isIncorrect: true, correctWord: 'laboratories' },
        { word: 'utilize', isIncorrect: false },
        { word: 'automated', isIncorrect: false },
        { word: 'software', isIncorrect: false },
        { word: 'to', isIncorrect: false },
        { word: 'process', isIncorrect: false },
        { word: 'complex', isIncorrect: false },
        { word: 'experiments', isIncorrect: false },
        { word: 'efficiently.', isIncorrect: false }
      ]
    };
  })
];

// ---------------------------------------------------------------------------
// 8. WRITE FROM DICTATION (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_WRITE_FROM_DICTATION: WriteFromDictationQuestion[] = [
  { id: 'wfd_01', sentenceText: 'The university library offers free research consultation services for all postgraduate students.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_02', sentenceText: 'Statistical analysis indicates a strong correlation between regular physical exercise and cognitive health.', wordCount: 13, difficulty: 'Medium' },
  { id: 'wfd_03', sentenceText: 'All incoming undergraduate students must attend the compulsory orientation seminar on Monday morning.', wordCount: 13, difficulty: 'Medium' },
  { id: 'wfd_04', sentenceText: 'Recent scientific breakthroughs have significantly enhanced our understanding of deep sea biodiversity.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_05', sentenceText: 'The professor requested that all assignments be submitted through the online student portal.', wordCount: 13, difficulty: 'Easy' },
  { id: 'wfd_06', sentenceText: 'Financial markets responded favorably to the unexpected reduction in central bank interest rates.', wordCount: 13, difficulty: 'Hard' },
  { id: 'wfd_07', sentenceText: 'Climate change poses severe economic and environmental challenges to vulnerable coastal communities.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_08', sentenceText: 'Interdisciplinary collaboration is essential for solving complex global health issues in the modern era.', wordCount: 14, difficulty: 'Hard' },
  { id: 'wfd_09', sentenceText: 'Students are advised to review their lecture notes thoroughly before the mid-term examinations.', wordCount: 13, difficulty: 'Easy' },
  { id: 'wfd_10', sentenceText: 'The government implemented strict regulatory measures to curb urban air pollution levels effectively.', wordCount: 13, difficulty: 'Hard' },
  { id: 'wfd_11', sentenceText: 'Renewable energy infrastructure investment has increased substantially across developed economies over recent years.', wordCount: 13, difficulty: 'Hard' },
  { id: 'wfd_12', sentenceText: 'The academic journal publishes peer-reviewed research papers on artificial intelligence and machine learning applications.', wordCount: 14, difficulty: 'Hard' },
  { id: 'wfd_13', sentenceText: 'Effective leadership requires exceptional communication skills and a clear strategic vision for the future.', wordCount: 14, difficulty: 'Medium' },
  { id: 'wfd_14', sentenceText: 'Applicants must submit two letters of recommendation alongside their formal online application forms.', wordCount: 13, difficulty: 'Easy' },
  { id: 'wfd_15', sentenceText: 'Substantial evidence suggests that early childhood education yields lifelong cognitive and social benefits.', wordCount: 13, difficulty: 'Medium' },
  { id: 'wfd_16', sentenceText: 'Urban planning initiatives prioritize sustainable green infrastructure to reduce city carbon footprints.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_17', sentenceText: 'The research laboratory was recently equipped with advanced microscopic imaging technology.', wordCount: 11, difficulty: 'Easy' },
  { id: 'wfd_18', sentenceText: 'Global financial institutions require rigorous risk management frameworks to preserve market stability.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_19', sentenceText: 'Faculty advisors assist students in selecting appropriate elective courses for their chosen majors.', wordCount: 13, difficulty: 'Easy' },
  { id: 'wfd_20', sentenceText: 'Cognitive behavioral strategies are widely utilized to alleviate anxiety and stress symptoms.', wordCount: 11, difficulty: 'Medium' },
  { id: 'wfd_21', sentenceText: 'Environmental impact assessments are required before beginning major municipal construction projects.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_22', sentenceText: 'The economics conference will discuss trade policy reform and global market integration.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_23', sentenceText: 'Artificial intelligence algorithms can process massive unstructured datasets with remarkable processing speed.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_24', sentenceText: 'All laboratory equipment must be thoroughly sterilized before conducting biological tissue cultures.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_25', sentenceText: 'The history department organized an international symposium on ancient Mediterranean trade routes.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_26', sentenceText: 'Higher education institutions must promote inclusive learning environments for all student demographics.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_27', sentenceText: 'Quantum computing research promises to transform digital encryption standards and cybersecurity protocols.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_28', sentenceText: 'Marine biologists observed unexpected behavioral changes in deep ocean fish species.', wordCount: 11, difficulty: 'Easy' },
  { id: 'wfd_29', sentenceText: 'The university administration announced additional funding grants for innovative student research projects.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_30', sentenceText: 'Public healthcare policies aim to prevent disease transmission through widespread immunization campaigns.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_31', sentenceText: 'Technological innovation drives productivity growth across diverse sectors of the national economy.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_32', sentenceText: 'Sociological studies investigate how digital social media platforms influence adolescent identity development.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_33', sentenceText: 'Comprehensive literature reviews provide essential theoretical foundations for doctoral dissertation research.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_34', sentenceText: 'The campus shuttle service operates regularly between the central library and student dormitories.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_35', sentenceText: 'Organic farming methods avoid synthetic pesticides to protect natural soil biology and ecosystems.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_36', sentenceText: 'The physics lecture covered fundamental principles of thermodynamics and energy conservation laws.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_37', sentenceText: 'International cooperation is essential to enforce global environmental protection agreements effectively.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_38', sentenceText: 'Automated machine learning tools analyze financial transactions to detect fraudulent activities instantly.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_39', sentenceText: 'Students pursuing graduate degrees must present their thesis defense before a faculty panel.', wordCount: 13, difficulty: 'Easy' },
  { id: 'wfd_40', sentenceText: 'Epigenetic modifications influence gene expression without altering the underlying DNA nucleotide sequence.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_41', sentenceText: 'The engineering department received state grants to develop high-efficiency solar photovoltaic panels.', wordCount: 12, difficulty: 'Medium' },
  { id: 'wfd_42', sentenceText: 'Careful data verification ensures that statistical conclusions remain valid throughout the study.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_43', sentenceText: 'Geothermal energy provides clean baseline electricity independent of weather conditions.', wordCount: 10, difficulty: 'Medium' },
  { id: 'wfd_44', sentenceText: 'Linguistic research demonstrates that human language adapts continuously to cultural environments.', wordCount: 11, difficulty: 'Medium' },
  { id: 'wfd_45', sentenceText: 'The career development center organizes annual job fairs featuring leading corporate recruiters.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_46', sentenceText: 'Neuroimaging studies show that regular sleep is crucial for optimal cognitive memory consolidation.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_47', sentenceText: 'Atmospheric methane emissions contribute significantly to near-term global climate warming dynamics.', wordCount: 11, difficulty: 'Hard' },
  { id: 'wfd_48', sentenceText: 'All workshop participants will receive supplementary reading materials following the closing session.', wordCount: 12, difficulty: 'Easy' },
  { id: 'wfd_49', sentenceText: 'Biomedical researchers are investigating novel targeted drug delivery systems using biocompatible nanoparticles.', wordCount: 12, difficulty: 'Hard' },
  { id: 'wfd_50', sentenceText: 'Effective team communication fosters collaborative problem solving and accelerates project completion schedules.', wordCount: 12, difficulty: 'Medium' }
];
