import type {
  ReadAloudQuestion,
  RepeatSentenceQuestion,
  DescribeImageQuestion,
  RetellLectureQuestion,
  AnswerShortQuestion
} from '../practice-questions';

// ===========================================================================
// SPEAKING QUESTION BANK (250 ITEMS TOTAL - 50 PER ITEM TYPE)
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. READ ALOUD (50 ITEMS - 60-80 words each, academic topics)
// ---------------------------------------------------------------------------
export const PRACTICE_READ_ALOUD: ReadAloudQuestion[] = [
  {
    id: 'ra_01',
    title: 'Market Economy & Innovation',
    text: 'A market economy is an economic system in which economic decisions and the pricing of goods and services are guided by the interactions of a country’s individual citizens and businesses. There may be some government intervention or central planning, but usually this term refers to an economy that is more market-oriented in general.',
    wordCount: 57,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['economic', 'interactions', 'intervention', 'market-oriented']
  },
  {
    id: 'ra_02',
    title: 'Psychological Resilience',
    text: 'Psychological resilience is defined as the ability to mentally or emotionally cope with a crisis or to return to pre-crisis status quickly. Resilience exists when the person uses mental processes and behavior in promoting personal assets and protecting self from the potential negative effects of stressors.',
    wordCount: 47,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Medium',
    phoneticFocusWords: ['resilience', 'emotionally', 'processes', 'stressors']
  },
  {
    id: 'ra_03',
    title: 'Oceanic Microplastics',
    text: 'Microplastics are small plastic pieces less than five millimeters long which can be harmful to our ocean and aquatic life. As synthetic polymer materials breakdown over decades due to solar radiation and wave action, they absorb toxic chemical contaminants that enter the marine food web.',
    wordCount: 46,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Hard',
    phoneticFocusWords: ['microplastics', 'synthetic', 'radiation', 'contaminants']
  },
  {
    id: 'ra_04',
    title: 'Renewable Energy Technologies',
    text: 'Renewable energy technologies harness natural resources like sunlight, wind, and geothermal heat to generate clean power. Transitioning away from fossil fuels reduces greenhouse gas emissions and mitigates climate change, paving the way for sustainable global infrastructure development.',
    wordCount: 39,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Easy',
    phoneticFocusWords: ['geothermal', 'mitigates', 'emissions', 'infrastructure']
  },
  {
    id: 'ra_05',
    title: 'Cognitive Neural Networks',
    text: 'Cognitive neural networks simulate biological neural architectures to process unstructured data sets efficiently. By utilizing multi-layered algorithms, deep learning systems recognize complex patterns, enabling major breakthroughs in autonomous robotics and automated medical imaging analysis.',
    wordCount: 37,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Hard',
    phoneticFocusWords: ['architectures', 'unstructured', 'algorithms', 'autonomous']
  },
  {
    id: 'ra_06',
    title: 'Urban Biodiversity',
    text: 'Urban biodiversity plays a fundamental role in enhancing ecosystem resilience within modern metropolitan regions. Constructing green rooftops, urban parks, and vegetative corridors provides habitats for migratory birds and essential pollinating insects while moderating the urban heat island effect.',
    wordCount: 40,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Medium',
    phoneticFocusWords: ['metropolitan', 'corridors', 'pollinating', 'moderating']
  },
  {
    id: 'ra_07',
    title: 'Cellular Senescence and Aging',
    text: 'Cellular senescence is a state of permanent cell cycle arrest that occurs in response to metabolic stress and genomic damage. Although senescent cells cease division, they remain metabolically active, secreting pro-inflammatory cytokines that contribute to tissue degradation and age-related physiological decline.',
    wordCount: 44,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['senescence', 'metabolic', 'cytokines', 'physiological']
  },
  {
    id: 'ra_08',
    title: 'Macroeconomic Inflation Policies',
    text: 'Central banks utilize monetary policy instruments such as benchmark interest rates and open market operations to stabilize consumer price inflation. When demand exceeds productive capacity, central bankers tighten monetary conditions to prevent runaway inflation and preserve long-term purchasing power.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['monetary', 'benchmark', 'purchasing', 'productive']
  },
  {
    id: 'ra_09',
    title: 'Quantum Computing Fundamentals',
    text: 'Unlike classical computers that process bits representing zeroes or ones, quantum computers leverage quantum bits or qubits capable of existing in superposition states. This allows quantum processing units to perform exponentially faster calculations for complex cryptographic algorithms and molecular simulations.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['superposition', 'cryptographic', 'exponentially', 'simulations']
  },
  {
    id: 'ra_10',
    title: 'Archaeological Excavation Techniques',
    text: 'Modern archaeological excavation relies on precise stratigraphic recording to document spatial relationships between artifact assemblages. By integrating satellite remote sensing and ground-penetrating radar, archaeologists can identify subterranean structural ruins prior to conducting physically invasive excavations.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['stratigraphic', 'assemblages', 'subterranean', 'invasive']
  },
  {
    id: 'ra_11',
    title: 'Deep Sea Hydrothermal Vents',
    text: 'Hydrothermal vents located along oceanic tectonic ridges spew superheated mineral fluids into abyssal waters. Microorganisms residing near these volcanic fissures utilize chemosynthesis rather than photosynthesis to convert inorganic chemicals into organic compounds, forming unique food webs.',
    wordCount: 38,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['hydrothermal', 'tectonic', 'chemosynthesis', 'microorganisms']
  },
  {
    id: 'ra_12',
    title: 'Linguistic Evolution and Dialects',
    text: 'Linguistic drift occurs continuously as spoken language adapts to cultural contact and changing socio-economic environments. Over generations, phonological shifts and lexical borrowings alter regional dialects until mutual intelligibility diminishes, eventually giving rise to distinct branch languages.',
    wordCount: 38,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['phonological', 'intelligibility', 'lexical', 'borrowings']
  },
  {
    id: 'ra_13',
    title: 'Solar Photovoltaic Efficiency',
    text: 'Perovskite solar cells have emerged as a high-efficiency alternative to conventional silicon photovoltaics due to their remarkable light absorption properties. Recent laboratory advancements demonstrate that tandem perovskite-silicon architectures achieve record-breaking solar power conversion rates at reduced manufacturing costs.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['perovskite', 'photovoltaics', 'architectures', 'conversion']
  },
  {
    id: 'ra_14',
    title: 'Cognitive Behavioral Therapy',
    text: 'Cognitive behavioral therapy is an evidence-based psychological treatment that focuses on identifying and restructuring maladaptive thought patterns. By modifying cognitive distortions, patients develop functional coping strategies that foster behavioral adjustments and improve overall emotional self-regulation.',
    wordCount: 37,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Medium',
    phoneticFocusWords: ['evidence-based', 'restructuring', 'distortions', 'self-regulation']
  },
  {
    id: 'ra_15',
    title: 'Soil Micro-Organisms & Agriculture',
    text: 'Soil microbiomes consist of bacteria, fungi, and protozoa that drive essential nutrient cycling processes in agricultural ecosystems. Beneficial mycorrhizal fungi colonize plant roots, expanding root surface area to enhance water and phosphorus absorption while suppressing pathogenic soil microbes.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['microbiomes', 'mycorrhizal', 'phosphorus', 'pathogenic']
  },
  {
    id: 'ra_16',
    title: 'Astronomy & Exoplanet Discovery',
    text: 'Astronomers detect distant exoplanets primarily through transit photometry, which measures the minute decrease in a star brightness when an orbiting planet passes directly across its optical disk. Spectroscopic analysis of starlight passing through exoplanet atmospheres reveals chemical signatures like water vapor and ozone.',
    wordCount: 44,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['photometry', 'spectroscopic', 'atmospheres', 'signatures']
  },
  {
    id: 'ra_17',
    title: 'Behavioral Economics & Nudges',
    text: 'Behavioral economics combines insights from psychology and economics to analyze why individuals frequently make irrational financial decisions. Choice architecture techniques, such as default options and subtle nudges, guide citizens toward healthier choices without restricting individual decision-making freedom.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['irrational', 'architecture', 'techniques', 'restricting']
  },
  {
    id: 'ra_18',
    title: 'Glacial Melting and Sea Level Rise',
    text: 'Thermal expansion of seawater coupled with accelerated ice loss from continental ice sheets drives modern global sea level rise. Satellite altimetry indicates that coastal regions face elevated erosion rates and saltwater intrusion into freshwater aquifers, threatening low-lying coastal human settlements.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['altimetry', 'aquifers', 'intrusion', 'settlements']
  },
  {
    id: 'ra_19',
    title: 'Epigenetics and Gene Expression',
    text: 'Epigenetics investigates heritable changes in gene expression that occur without altering the underlying DNA sequence. Environmental factors such as dietary intake, psychological stress, and toxic chemical exposure trigger DNA methylation patterns that regulate whether specific genes are active or silenced.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['epigenetics', 'heritable', 'methylation', 'underlying']
  },
  {
    id: 'ra_20',
    title: 'Artificial Intelligence Ethics',
    text: 'As autonomous algorithms assume responsibility for automated credit scoring, medical triage, and recruitment filtering, ensuring algorithmic fairness is critical. Biased historical training datasets can perpetuate systemic social discrimination, prompting researchers to develop transparent auditing tools for ethical AI.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['autonomous', 'perpetuate', 'discrimination', 'auditing']
  },
  {
    id: 'ra_21',
    title: 'Historical Archaeology of Trade',
    text: 'Maritime archaeological excavations of ancient shipwrecks provide invaluable insights into international trade networks during antiquity. Recovered ceramic amphorae and metal ingots reveal trade routes, economic commodities, and technological capabilities of ancient Mediterranean seafaring societies.',
    wordCount: 37,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Medium',
    phoneticFocusWords: ['maritime', 'excavations', 'amphorae', 'Mediterranean']
  },
  {
    id: 'ra_22',
    title: 'Nanotechnology in Drug Delivery',
    text: 'Nanotechnology offers targeted drug delivery systems using engineered liposomes and polymeric nanoparticles. These microscopic carriers encapsulate therapeutic agents, protecting them from premature biological degradation while delivering active drugs directly to targeted tumor cells without damaging healthy tissues.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['nanoparticles', 'polymeric', 'liposomes', 'therapeutic']
  },
  {
    id: 'ra_23',
    title: 'Sociological Urbanization Patterns',
    text: 'Rapid urbanization transforms social dynamics by increasing population density and restructuring community networks. While cities provide enhanced economic opportunity and educational infrastructure, unmanaged growth places immense pressure on municipal transportation systems, affordable housing, and public healthcare facilities.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['urbanization', 'infrastructure', 'municipal', 'density']
  },
  {
    id: 'ra_24',
    title: 'Atmospheric Ozone Layer Recovery',
    text: 'International adherence to the Montreal Protocol has led to a gradual recovery of Earth protective ozone layer. By phasing out ozone-depleting chlorofluorocarbons in refrigeration and aerosol products, atmospheric science demonstrates that global policy intervention can reverse severe environmental degradation.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['chlorofluorocarbons', 'refrigeration', 'adherence', 'intervention']
  },
  {
    id: 'ra_25',
    title: 'Neuroplasticity and Learning',
    text: 'Neuroplasticity refers to the central nervous system capacity to reorganize its structure and functional pathways in response to experience. Through repeated learning and physical practice, synaptic connections strengthen, allowing the brain to adapt following neurological injury or cognitive acquisition.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['neuroplasticity', 'reorganize', 'synaptic', 'neurological']
  },
  {
    id: 'ra_26',
    title: 'Agricultural Hydroponic Systems',
    text: 'Controlled environment agriculture utilizes hydroponic systems to cultivate crops without soil using nutrient-rich water solutions. By recirculating water and optimizing LED light spectrums, vertical urban farms yield higher crop outputs per square meter while utilizing up to ninety percent less water than traditional farming.',
    wordCount: 46,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['hydroponic', 'recirculating', 'spectrum,', 'agriculture']
  },
  {
    id: 'ra_27',
    title: 'Volcanic Eruptions and Climate',
    text: 'Major explosive volcanic eruptions inject massive quantities of sulfur dioxide gas high into the stratosphere. These gaseous aerosol plumes reflect incoming solar radiation back into space, causing noticeable global surface cooling effects that persist for several years following large eruptions.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['stratosphere', 'aerosol', 'radiation', 'explosive']
  },
  {
    id: 'ra_28',
    title: 'Sustainable Architecture Design',
    text: 'Sustainable architectural design integrates passive solar orientation, natural ventilation corridors, and high-performance thermal insulation to minimize operational energy consumption. Incorporating locally sourced timber and recycled construction materials further reduces the embodied carbon footprint of modern buildings.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['architectural', 'ventilation', 'insulation', 'embodied']
  },
  {
    id: 'ra_29',
    title: 'Renewable Hydrogen Energy',
    text: 'Green hydrogen produced via water electrolysis using renewable electricity offers a carbon-neutral fuel alternative for heavy industrial sectors. Replacing fossil fuels with hydrogen in steel manufacturing and maritime shipping could drastically eliminate emissions in hard-to-abate global industrial activities.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['electrolysis', 'carbon-neutral', 'maritime', 'hard-to-abate']
  },
  {
    id: 'ra_30',
    title: 'Genomic CRISPR-Cas9 Technology',
    text: 'CRISPR-Cas9 gene editing allows molecular biologists to introduce precise double-stranded breaks in targeted genomic sequences. This revolutionary tool enables researchers to silence defective genes or insert beneficial genetic traits, opening groundbreaking possibilities for treating hereditary human genetic disorders.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['genomic', 'molecular', 'defective', 'hereditary']
  },
  {
    id: 'ra_31',
    title: 'Cognitive Psychology of Attention',
    text: 'Selective attention enables human cognitive systems to prioritize relevant sensory information while filtering out background noise. However, continuous digital notifications tax attentional control mechanisms, leading to cognitive fatigue, lower information retention rates, and reduced performance on complex problem-solving tasks.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['prioritize', 'notifications', 'mechanisms', 'retention']
  },
  {
    id: 'ra_32',
    title: 'Deep Sea Coral Ecosystems',
    text: 'Deep-sea cold-water corals grow in dark ocean depths down to thousands of meters, building structural reefs without relying on photosynthetic algae. These slow-growing marine structures provide critical nursery habitats for commercial fish species, yet they remain vulnerable to bottom trawling fisheries.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['photosynthetic', 'commercial', 'trawling', 'vulnerable']
  },
  {
    id: 'ra_33',
    title: 'Economic Globalization Trends',
    text: 'Globalization has fostered deep economic interdependence through cross-border trade, capital flows, and international supply chain integration. While trade liberalization lowers consumer prices and drives technology diffusion, sudden disruptions in global supply networks can propagate economic instability across nations.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['interdependence', 'liberalization', 'diffusion', 'propagate']
  },
  {
    id: 'ra_34',
    title: 'Cybersecurity & Data Encryption',
    text: 'As asymmetric cryptography secures electronic communications, emerging quantum decryption capabilities pose systemic risks to financial banking networks. Cybersecurity experts are urgently developing post-quantum cryptographic standards to safeguard sensitive digital communications against future decryption threats.',
    wordCount: 37,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['asymmetric', 'cryptography', 'decryption', 'safeguard']
  },
  {
    id: 'ra_35',
    title: 'Biodiversity Hotspots & Conservation',
    text: 'Biodiversity hotspots are biogeographic regions characterized by exceptional levels of endemic plant and animal species suffering severe habitat loss. Concentrating international conservation funding in these threatened hotspots yields the highest ecological protection outcomes per unit of financial expenditure.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['biogeographic', 'characterized', 'endemic', 'expenditure']
  },
  {
    id: 'ra_36',
    title: 'Educational Technology & Learning',
    text: 'Integrating adaptive learning software into educational curricula allows personalized instruction tailored to individual student learning speeds. Algorithmic assessments identify specific knowledge gaps in real time, enabling teachers to deliver targeted academic interventions that support student performance.',
    wordCount: 39,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Easy',
    phoneticFocusWords: ['curricula', 'algorithmic', 'interventions', 'personalized']
  },
  {
    id: 'ra_37',
    title: 'Atmospheric Methane Reduction',
    text: 'Methane is a potent short-lived greenhouse gas with a global warming potential over eighty times greater than carbon dioxide over a twenty-year timeframe. Mitigating agricultural livestock emissions and curbing gas pipeline leaks represent rapid cost-effective strategies to slow near-term global warming.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['methane', 'timeframe', 'mitigating', 'cost-effective']
  },
  {
    id: 'ra_38',
    title: 'Cognitive Memory Consolidation',
    text: 'Memory consolidation converts transient short-term memory traces into stable long-term representations within the neocortex during sleep. Slow-wave sleep cycles play a central role in neural replay, strengthening synaptic connections associated with recently acquired declarative facts and spatial navigation skills.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['consolidation', 'transient', 'neocortex', 'declarative']
  },
  {
    id: 'ra_39',
    title: 'Solar System Planetary Evolution',
    text: 'Terrestrial planets in our solar system underwent early magmatic differentiation, resulting in dense metallic cores surrounded by silicate mantles. Volcanic outgassing subsequently formed primitive planetary atmospheres, which evolved distinct chemical compositions based on solar proximity and gravitational mass.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['differentiation', 'outgassing', 'compositions', 'gravitational']
  },
  {
    id: 'ra_40',
    title: 'Public Health & Vaccine Immunity',
    text: 'Vaccination programs establish population-level herd immunity by decreasing the density of susceptible hosts within a community. When high immunization coverage rates are achieved, viral transmission chains break, effectively protecting immunocompromised individuals who cannot undergo direct vaccination.',
    wordCount: 38,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['immunization', 'susceptible', 'transmission', 'immunocompromised']
  },
  {
    id: 'ra_41',
    title: 'Circular Economy Principles',
    text: 'The circular economy model aims to redefine growth by shifting from linear take-make-waste extraction to closed-loop resource recovery. Designing durable products, repairing industrial machinery, and recycling waste materials keeps economic resources within productive loops while drastically minimizing environmental pollution.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['circular', 'closed-loop', 'extraction', 'minimizing']
  },
  {
    id: 'ra_42',
    title: 'Microbial Antibiotic Resistance',
    text: 'Overuse of antibiotics in clinical medicine and livestock farming drives the rapid evolution of multidrug-resistant bacterial strains. Genes encoding antibiotic resistance spread via horizontal gene transfer among bacterial populations, rendering standard pharmaceutical therapies ineffective against common hospital-acquired infections.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['multidrug-resistant', 'horizontal', 'pharmaceutical', 'ineffective']
  },
  {
    id: 'ra_43',
    title: 'Sociology of Digital Networks',
    text: 'Online social networks alter human communication patterns by facilitating instantaneous global connectivity while creating echo chambers. Algorithmic recommendation feeds tend to amplify emotionally charged content, shaping public opinion dynamics and polarizing socio-political discussions.',
    wordCount: 37,
    prepTimeSeconds: 35,
    recordTimeSeconds: 35,
    difficulty: 'Medium',
    phoneticFocusWords: ['facilitating', 'instantaneous', 'polarizing', 'recommendation']
  },
  {
    id: 'ra_44',
    title: 'Hydrothermal Energy Extraction',
    text: 'Geothermal power plants extract heat energy from subsurface hydrothermal reservoirs to generate clean baseline electricity. By reinjecting cooled geothermal fluids back into deep permeable rock formations, power stations maintain reservoir pressure and ensure continuous renewable energy production without atmospheric carbon emissions.',
    wordCount: 42,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['geothermal', 'subsurface', 'permeable', 'carbon']
  },
  {
    id: 'ra_45',
    title: 'Neurobiology of Emotion',
    text: 'The amygdala serves as a pivotal brain structure involved in processing emotional stimuli, particularly fear responses. Limbic circuits project neural signals to the prefrontal cortex, which exerts top-down cognitive control to regulate affective states and suppress inappropriate emotional reactions in social settings.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['amygdala', 'stimuli', 'prefrontal', 'affective']
  },
  {
    id: 'ra_46',
    title: 'Urban Transportation Mobility',
    text: 'Transitioning urban transit systems to integrated micro-mobility options like electric buses and dedicated bicycle lanes alleviates traffic congestion. City planners report that expanding active transportation corridors improves urban air quality and promotes public health through daily physical exercise.',
    wordCount: 40,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Easy',
    phoneticFocusWords: ['micro-mobility', 'alleviates', 'corridors', 'transportation']
  },
  {
    id: 'ra_47',
    title: 'Space Weather and Satellite Grids',
    text: 'Coronal mass ejections from the Sun release magnetized plasma streams that induce geomagnetic storms upon colliding with Earth magnetosphere. These intense space weather events disrupt satellite navigation systems, induce electrical surges in high-voltage power grids, and degrade high-frequency radio communications.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['coronal', 'magnetosphere', 'geomagnetic', 'navigation']
  },
  {
    id: 'ra_48',
    title: 'Economic Trade Deficits',
    text: 'A trade deficit occurs when a nation imports more goods and services than it exports over a given fiscal period. While chronic trade deficits reflect high domestic consumer demand, long-term balance-of-payments imbalances can increase external debt obligations and weaken domestic currency exchange rates.',
    wordCount: 44,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Medium',
    phoneticFocusWords: ['balance-of-payments', 'obligations', 'imbalances', 'exchange']
  },
  {
    id: 'ra_49',
    title: 'Dendrochronology & Climate Records',
    text: 'Dendrochronology analyzes annual tree-ring growth patterns to reconstruct paleoclimatic conditions across thousands of years. Annual ring width and isotopic density provide detailed proxy data regarding historical precipitation levels, temperature fluctuations, and drought frequencies prior to modern meteorological instrumentation.',
    wordCount: 41,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['dendrochronology', 'paleoclimatic', 'meteorological', 'isotopic']
  },
  {
    id: 'ra_50',
    title: 'Artificial Intelligence in Biomedicine',
    text: 'Deep learning protein-folding algorithms have solved half-century-old challenges in structural biology. By accurately predicting three-dimensional protein structures directly from amino acid sequences, artificial intelligence accelerates target identification in drug discovery and advances personalized molecular medicine.',
    wordCount: 38,
    prepTimeSeconds: 40,
    recordTimeSeconds: 40,
    difficulty: 'Hard',
    phoneticFocusWords: ['protein-folding', 'amino', 'three-dimensional', 'biomedicine']
  }
];

// ---------------------------------------------------------------------------
// 2. REPEAT SENTENCE (50 ITEMS - 8-15 words each)
// ---------------------------------------------------------------------------
export const PRACTICE_REPEAT_SENTENCE: RepeatSentenceQuestion[] = [
  { id: 'rs_01', audioTranscript: 'The library will remain open until midnight during final exam week.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['library', 'open', 'midnight', 'final exam week'] },
  { id: 'rs_02', audioTranscript: 'Students must submit their laboratory reports before Friday afternoon.', wordCount: 9, audioDurationSeconds: 3, difficulty: 'Easy', keywords: ['students', 'submit', 'laboratory reports', 'Friday'] },
  { id: 'rs_03', audioTranscript: 'Technological innovations have significantly transformed contemporary communication methods.', wordCount: 8, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['technological', 'innovations', 'transformed', 'communication'] },
  { id: 'rs_04', audioTranscript: 'The professor requested that all assignments be formatted according to university guidelines.', wordCount: 12, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['professor', 'assignments', 'formatted', 'guidelines'] },
  { id: 'rs_05', audioTranscript: 'Environmental degradation presents an urgent global challenge for future generations.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['environmental', 'degradation', 'urgent', 'challenge'] },
  { id: 'rs_06', audioTranscript: 'Detailed academic research requires comprehensive literature reviews and empirical data validation.', wordCount: 11, audioDurationSeconds: 5, difficulty: 'Hard', keywords: ['academic', 'research', 'literature reviews', 'empirical'] },
  { id: 'rs_07', audioTranscript: 'All international applicants are required to provide proof of English language proficiency.', wordCount: 12, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['international', 'applicants', 'proof', 'proficiency'] },
  { id: 'rs_08', audioTranscript: 'Financial incentives were introduced to encourage sustainable business practices across industries.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['financial incentives', 'sustainable', 'business practices'] },
  { id: 'rs_09', audioTranscript: 'The introduction of digital tools enhanced collaboration among interdisciplinary research groups.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['digital tools', 'collaboration', 'interdisciplinary'] },
  { id: 'rs_10', audioTranscript: 'A comprehensive evaluation of the experiment will be published in next month journal.', wordCount: 13, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['comprehensive', 'evaluation', 'experiment', 'journal'] },
  { id: 'rs_11', audioTranscript: 'Careful planning and execution are essential for achieving project objectives on schedule.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['careful planning', 'execution', 'project objectives'] },
  { id: 'rs_12', audioTranscript: 'Lectures will resume promptly after the mid-semester break.', wordCount: 8, audioDurationSeconds: 3, difficulty: 'Easy', keywords: ['lectures', 'resume', 'mid-semester break'] },
  { id: 'rs_13', audioTranscript: 'Renewable energy adoption has expanded rapidly across developing nations in recent years.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['renewable energy', 'adoption', 'developing nations'] },
  { id: 'rs_14', audioTranscript: 'Faculty members must attend the administrative meeting held in the main auditorium.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['faculty members', 'administrative meeting', 'auditorium'] },
  { id: 'rs_15', audioTranscript: 'Understanding statistical probability is critical for analyzing complex scientific experiment outcomes.', wordCount: 11, audioDurationSeconds: 5, difficulty: 'Hard', keywords: ['statistical probability', 'scientific experiment', 'outcomes'] },
  { id: 'rs_16', audioTranscript: 'Online education platforms provide flexible learning opportunities for working professionals worldwide.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['online education', 'flexible learning', 'working professionals'] },
  { id: 'rs_17', audioTranscript: 'The computer engineering department will host an artificial intelligence seminar tomorrow morning.', wordCount: 12, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['computer engineering', 'artificial intelligence', 'seminar'] },
  { id: 'rs_18', audioTranscript: 'All safety gear must be worn when entering the chemistry research lab.', wordCount: 12, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['safety gear', 'entering', 'chemistry research lab'] },
  { id: 'rs_19', audioTranscript: 'The economic report highlights a steady increase in international trade volume.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['economic report', 'steady increase', 'international trade'] },
  { id: 'rs_20', audioTranscript: 'Students must verify their course enrollment status before the registration deadline.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['students', 'course enrollment', 'registration deadline'] },
  { id: 'rs_21', audioTranscript: 'Climate policy reform requires active cooperation between national governments and private industries.', wordCount: 11, audioDurationSeconds: 5, difficulty: 'Hard', keywords: ['climate policy', 'active cooperation', 'governments'] },
  { id: 'rs_22', audioTranscript: 'Regular exercise improves cardiovascular health and boosts cognitive mental performance.', wordCount: 9, audioDurationSeconds: 3, difficulty: 'Easy', keywords: ['exercise', 'cardiovascular health', 'cognitive performance'] },
  { id: 'rs_23', audioTranscript: 'The research team published their findings in a prestigious peer-reviewed scientific journal.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['research team', 'findings', 'peer-reviewed journal'] },
  { id: 'rs_24', audioTranscript: 'Urban traffic congestion can be reduced through efficient public transit systems.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['traffic congestion', 'reduced', 'public transit'] },
  { id: 'rs_25', audioTranscript: 'Postgraduate scholarships are available for outstanding candidates pursuing environmental engineering.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['postgraduate scholarships', 'environmental engineering'] },
  { id: 'rs_26', audioTranscript: 'The guest lecturer delivered an insightful discourse on historical monetary systems.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['guest lecturer', 'insightful discourse', 'monetary systems'] },
  { id: 'rs_27', audioTranscript: 'Please register your attendance at the front desk upon arriving at campus.', wordCount: 12, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['register attendance', 'front desk', 'campus'] },
  { id: 'rs_28', audioTranscript: 'Advanced machine learning algorithms require large datasets for accurate model calibration.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['machine learning', 'large datasets', 'model calibration'] },
  { id: 'rs_29', audioTranscript: 'The university library contains an extensive collection of rare historical manuscripts.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['library', 'extensive collection', 'rare manuscripts'] },
  { id: 'rs_30', audioTranscript: 'Critical thinking and analytical reasoning are essential skills for successful researchers.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['critical thinking', 'analytical reasoning', 'successful researchers'] },
  { id: 'rs_31', audioTranscript: 'The annual biology conference will feature keynote presentations from global experts.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['annual biology conference', 'keynote presentations'] },
  { id: 'rs_32', audioTranscript: 'Synthetic polymers are widely utilized in modern industrial manufacturing processes.', wordCount: 9, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['synthetic polymers', 'industrial manufacturing'] },
  { id: 'rs_33', audioTranscript: 'All undergraduate students must complete a final capstone project before graduation.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['undergraduate students', 'final capstone project'] },
  { id: 'rs_34', audioTranscript: 'Financial market instability can cause severe fluctuations in consumer spending patterns.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['financial market', 'fluctuations', 'consumer spending'] },
  { id: 'rs_35', audioTranscript: 'The new campus facility includes state-of-the-art laboratories and collaborative study areas.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['campus facility', 'state-of-the-art laboratories'] },
  { id: 'rs_36', audioTranscript: 'Global warming poses a direct threat to polar sea ice ecosystems.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['global warming', 'direct threat', 'polar sea ice'] },
  { id: 'rs_37', audioTranscript: 'Academic integrity policies prohibit plagiarism and unauthorized collaboration on assignments.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['academic integrity', 'prohibit plagiarism', 'assignments'] },
  { id: 'rs_38', audioTranscript: 'Cellular respiration releases biochemical energy stored within organic nutrient molecules.', wordCount: 9, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['cellular respiration', 'biochemical energy', 'organic nutrient'] },
  { id: 'rs_39', audioTranscript: 'The career guidance office offers resume workshops and mock interview sessions.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['career guidance', 'resume workshops', 'mock interview'] },
  { id: 'rs_40', audioTranscript: 'Effective time management allows students to balance academic commitments with personal activities.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['time management', 'balance commitments', 'personal activities'] },
  { id: 'rs_41', audioTranscript: 'The archaeological team discovered ancient artifacts dating back to the bronze age.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['archaeological team', 'ancient artifacts', 'bronze age'] },
  { id: 'rs_42', audioTranscript: 'Genetic engineering has revolutionized crop yields and food security in dry regions.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['genetic engineering', 'crop yields', 'food security'] },
  { id: 'rs_43', audioTranscript: 'All submitted research papers will undergo double-blind peer review prior to publication.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['submitted research', 'double-blind peer review'] },
  { id: 'rs_44', audioTranscript: 'Student health services provide free medical consultations and mental health support.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['student health', 'medical consultations', 'mental health'] },
  { id: 'rs_45', audioTranscript: 'Technological advancements in robotics are changing industrial automation processes rapidly.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['technological advancements', 'robotics', 'industrial automation'] },
  { id: 'rs_46', audioTranscript: 'Water conservation measures must be implemented during severe summer drought periods.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['water conservation', 'implemented', 'summer drought'] },
  { id: 'rs_47', audioTranscript: 'The sociology lecture explained how cultural norms influence individual human behavior.', wordCount: 10, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['sociology lecture', 'cultural norms', 'human behavior'] },
  { id: 'rs_48', audioTranscript: 'Quantum physics introduces novel principles that challenge classical thermodynamic theories.', wordCount: 9, audioDurationSeconds: 4, difficulty: 'Hard', keywords: ['quantum physics', 'novel principles', 'thermodynamic'] },
  { id: 'rs_49', audioTranscript: 'The university administration announced new funding opportunities for sustainable campus initiatives.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Medium', keywords: ['university administration', 'funding opportunities', 'sustainable'] },
  { id: 'rs_50', audioTranscript: 'Regular sleep patterns are fundamental for optimal brain function and emotional resilience.', wordCount: 11, audioDurationSeconds: 4, difficulty: 'Easy', keywords: ['regular sleep', 'optimal brain function', 'resilience'] }
];

// ---------------------------------------------------------------------------
// 3. DESCRIBE IMAGE (50 ITEMS - Bar, Line, Pie, Map, Process, Table)
// ---------------------------------------------------------------------------
export const PRACTICE_DESCRIBE_IMAGE: DescribeImageQuestion[] = [
  {
    id: 'di_01',
    title: 'Global Renewable Energy Sources (Bar Chart)',
    type: 'bar_chart',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600',
    keyPointsToCover: ['Solar energy highest at 45%', 'Geothermal energy lowest at 5%', 'Wind power at 30%', 'Hydroelectric power at 20%'],
    sampleModelAnswer: 'The given bar chart illustrates the percentage distribution of global renewable energy sources. Looking closely at the data, solar power accounts for the highest proportion at 45 percent, whereas geothermal energy registers the lowest figure at 5 percent. Additionally, wind energy and theoretical hydroelectric power stand at 30 percent and 20 percent respectively. In conclusion, the chart highlights the dominant role of solar power in the renewable energy sector.'
  },
  {
    id: 'di_02',
    title: 'Worldwide Internet Users Growth 2010-2025 (Line Graph)',
    type: 'line_graph',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    keyPointsToCover: ['Steady upward trend from 2 billion to 5.4 billion', 'Peak in 2025', 'Lowest count in 2010'],
    sampleModelAnswer: 'The presented line graph depicts the steady growth of global internet users from 2010 to 2025. In 2010, the total user base recorded its lowest figure at approximately 2 billion. Over the fifteen-year period, internet usage rose sharply, reaching a peak of 5.4 billion users by 2025. Overall, the line graph demonstrates a continuous upward trajectory in worldwide digital connectivity.'
  },
  {
    id: 'di_03',
    title: 'Household Budget Allocation (Pie Chart)',
    type: 'pie_chart',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
    keyPointsToCover: ['Housing largest expense at 35%', 'Food at 25%', 'Transportation at 15%', 'Entertainment lowest at 10%'],
    sampleModelAnswer: 'The given pie chart provides information about average household expenditure categories. It is clear that housing represents the major share of expenditure at 35 percent, followed by food at 25 percent. Conversely, entertainment constitutes the smallest slice of the budget at 10 percent. In conclusion, the pie chart indicates that basic living essentials dominate household spending.'
  },
  {
    id: 'di_04',
    title: 'Water Cycle Process (Process Diagram)',
    type: 'process_diagram',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600',
    keyPointsToCover: ['Evaporation from oceans', 'Condensation into clouds', 'Precipitation as rainfall', 'Runoff back into bodies of water'],
    sampleModelAnswer: 'The provided process diagram illustrates the natural water cycle across four main stages. In the first phase, solar energy causes water evaporation from ocean surfaces. Next, water vapor undergoes condensation to form clouds in the atmosphere. Subsequently, precipitation occurs in the form of rainfall, leading to surface runoff back into reservoirs. In summary, the diagram depicts a continuous ecological cycle.'
  },
  {
    id: 'di_05',
    title: 'Urban Expansion Comparison 1995 vs 2025 (Map)',
    type: 'map',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600',
    keyPointsToCover: ['Significant commercial development in the North', 'Replacement of green belt with residential housing', 'New highway system built'],
    sampleModelAnswer: 'The maps compare the structural evolution of a coastal city between 1995 and 2025. In 1995, the northern area consisted primarily of agricultural farmland and natural forests. By 2025, extensive urban development replaced green spaces with commercial zones and a major highway network. In conclusion, the maps highlight rapid urban expansion and infrastructure development over thirty years.'
  },
  {
    id: 'di_06',
    title: 'Global CO2 Emissions by Sector (Table)',
    type: 'table',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
    keyPointsToCover: ['Electricity generation highest emission sector at 40%', 'Transportation at 24%', 'Manufacturing at 20%', 'Agriculture lowest at 16%'],
    sampleModelAnswer: 'The table displays the distribution of global carbon dioxide emissions across four primary economic sectors. Electricity generation accounts for the highest share at 40 percent, whereas agriculture produces the lowest emission level at 16 percent. Transportation and manufacturing generate 24 and 20 percent respectively. Overall, energy production remains the largest single contributor to global emissions.'
  },
  {
    id: 'di_07',
    title: 'University Enrollment Trends (Bar Chart)',
    type: 'bar_chart',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    keyPointsToCover: ['STEM fields highest at 42%', 'Humanities at 28%', 'Business at 20%', 'Arts lowest at 10%'],
    sampleModelAnswer: 'The bar chart shows student enrollment percentages across university departments. Science and technology subjects record the highest enrollment at 42 percent, followed by humanities at 28 percent. Fine arts shows the lowest participation rate at 10 percent. In summary, technical and scientific disciplines attract the majority of university applicants.'
  },
  {
    id: 'di_08',
    title: 'Global Literacy Rate Growth (Line Graph)',
    type: 'line_graph',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
    keyPointsToCover: ['Literacy rose from 65% in 1980 to 87% in 2020', 'Steepest growth in developing regions', 'Highest overall literacy in youth demographic'],
    sampleModelAnswer: 'This line graph depicts the steady rise in worldwide adult literacy rates over forty years from 1980 to 2020. Starting at 65 percent in 1980, the global literacy rate steadily climbed to reach 87 percent by 2020. The most dramatic gains were recorded in developing regions. In conclusion, access to basic education has expanded significantly worldwide.'
  },
  {
    id: 'di_09',
    title: 'Cellular Respiration Process (Process Diagram)',
    type: 'process_diagram',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600',
    keyPointsToCover: ['Glycolysis in cytoplasm', 'Krebs cycle in mitochondria', 'Electron transport chain generating ATP'],
    sampleModelAnswer: 'The process diagram illustrates the three key stages of cellular respiration within biological cells. First, glycolysis converts glucose in the cytoplasm. Next, pyruvate enters the mitochondria to undergo the Krebs cycle. Finally, the electron transport chain produces maximum ATP energy molecules. Overall, the diagram summarizes the biochemical production of cellular energy.'
  },
  {
    id: 'di_10',
    title: 'Global Smartphone Market Share (Pie Chart)',
    type: 'pie_chart',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    keyPointsToCover: ['Brand A holds 32%', 'Brand B holds 28%', 'Brand C holds 20%', 'Other manufacturers hold 20%'],
    sampleModelAnswer: 'The pie chart illustrates the global market share of leading smartphone manufacturers. Brand A commands the largest market share at 32 percent, closely followed by Brand B at 28 percent. Smaller producers collectively account for 20 percent. In summary, two major tech companies control over half of the global smartphone market.'
  },
  { id: 'di_11', title: 'Average Annual Rainfall by Region (Bar Chart)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600', keyPointsToCover: ['Tropical zone highest at 2500mm', 'Arid zone lowest at 150mm', 'Temperate zone at 900mm'], sampleModelAnswer: 'The bar chart compares annual precipitation levels across geographical zones. Tropical regions receive the highest rainfall at 2500 millimeters, while arid regions record under 150 millimeters. Temperate areas average 900 millimeters. In conclusion, rainfall distribution varies dramatically by climate zone.' },
  { id: 'di_12', title: 'Global Temperature Anomaly 1900-2020 (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', keyPointsToCover: ['Stable temperatures pre-1970', 'Sharp increase of +1.2C by 2020', 'Accelerated warming in last two decades'], sampleModelAnswer: 'The line graph charts global mean temperature anomalies relative to twentieth-century averages. Temperatures remained baseline stable until 1970 before experiencing a sharp rise, reaching 1.2 degrees Celsius above historic norms by 2020. Overall, the graph demonstrates rapid modern planetary warming.' },
  { id: 'di_13', title: 'Primary Energy Consumption Sources (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600', keyPointsToCover: ['Oil dominates at 33%', 'Coal at 27%', 'Natural gas at 24%', 'Renewables at 16%'], sampleModelAnswer: 'The pie chart shows global primary energy consumption by energy source. Oil constitutes the largest single share at 33 percent, followed by coal at 27 percent and natural gas at 24 percent. Renewable energy represents 16 percent. In conclusion, fossil fuels continue to satisfy the vast majority of global energy demand.' },
  { id: 'di_14', title: 'Solar Panel Manufacturing Steps (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600', keyPointsToCover: ['Silicon refinement into wafers', 'Photovoltaic cell assembly', 'Panel encapsulation and testing'], sampleModelAnswer: 'The flowchart illustrates the sequential steps in manufacturing solar photovoltaic panels. Raw silicon is refined and cut into thin wafers before undergoing chemical doping to form functioning PV cells. Finally, cells are wired, encapsulated in protective glass, and performance tested. Overall, panel production requires precision engineering.' },
  { id: 'di_15', title: 'Reforestation Progress in South America (Map)', type: 'map', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600', keyPointsToCover: ['Restoration zones concentrated in southern basin', 'Protected reserve growth of 15%', 'Degraded areas along northern border'], sampleModelAnswer: 'The geographical map illustrates reforestation initiative outcomes in South America over the past decade. Forest recovery is most prominent in southern watershed zones, expanding total protected woodland cover by 15 percent. However, northern frontier regions continue to suffer localized habitat fragmentation. In conclusion, conservation efforts show positive regional impact.' },
  { id: 'di_16', title: 'Top Exporting Economies Data (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', keyPointsToCover: ['Country A leads with $3.3 trillion', 'Country B second at $2.5 trillion', 'Country C at $1.6 trillion'], sampleModelAnswer: 'The table outlines key economic performance metrics for leading global exporting nations. Country A ranks first with 3.3 trillion dollars in annual exports, while Country B follows at 2.5 trillion dollars. Country C records 1.6 trillion dollars. In summary, export trade remains concentrated among major industrial economies.' },
  { id: 'di_17', title: 'Global Population by Continent (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', keyPointsToCover: ['Asia largest share at 59%', 'Africa second at 18%', 'Europe at 9%', 'Americas combined at 13%'], sampleModelAnswer: 'The pie chart displays the geographical distribution of the global human population. Asia accounts for the dominant share at 59 percent, while Africa constitutes 18 percent. Europe and the Americas comprise 9 percent and 13 percent respectively. In conclusion, the majority of the human population resides on the Asian continent.' },
  { id: 'di_18', title: 'Electric Vehicle Sales Trends 2015-2025 (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600', keyPointsToCover: ['Exponential growth from 1 million to 14 million sales', 'Rapid growth acceleration post-2020'], sampleModelAnswer: 'The line graph charts annual global electric vehicle sales between 2015 and 2025. Sales grew modestly initially before accelerating dramatically after 2020, reaching 14 million units annually by 2025. Overall, the chart demonstrates a major transition toward electrified automotive transport.' },
  { id: 'di_19', title: 'Plastic Waste Disposal Methods (Bar Chart)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600', keyPointsToCover: ['Landfill disposal highest at 55%', 'Incineration at 25%', 'Recycling lowest at 20%'], sampleModelAnswer: 'The bar chart presents the percentage breakdown of global plastic waste management methods. Landfills absorb the highest proportion at 55 percent, whereas thermal incineration accounts for 25 percent. Mechanical recycling records the lowest share at 20 percent. In summary, sustainable recycling remains underutilized globally.' },
  { id: 'di_20', title: 'Desalination Plant Workflow (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', keyPointsToCover: ['Seawater intake and pre-filtration', 'High-pressure reverse osmosis membranes', 'Potable water mineral treatment'], sampleModelAnswer: 'The diagram outlines the multi-stage operational workflow of seawater reverse osmosis desalination plants. Seawater is initially drawn through coarse filters to remove suspended solids before high-pressure pumps force water through semi-permeable membranes. Finally, purified water receives mineral balancing before municipal distribution. In conclusion, desalination provides essential freshwater supplies.' },
  { id: 'di_21', title: 'Global Tourism Arrival Revenues (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600', keyPointsToCover: ['Europe highest arrivals at 700M', 'Americas at 220M', 'Asia-Pacific at 360M'], sampleModelAnswer: 'The table summarizes international tourist arrival numbers and financial expenditure across global regions. Europe led international tourism with 700 million arrivals, whereas Asia-Pacific and the Americas recorded 360 million and 220 million visitors respectively. Overall, European destinations attract the largest global tourist volume.' },
  { id: 'di_22', title: 'Agricultural Water Usage Breakdown (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600', keyPointsToCover: ['Crop irrigation 70%', 'Industrial processing 20%', 'Domestic usage 10%'], sampleModelAnswer: 'The pie chart breaks down global freshwater withdrawals by usage sector. Agricultural irrigation consumes the dominant proportion at 70 percent, compared to industrial processing at 20 percent and domestic household use at 10 percent. In conclusion, farming operations represent the primary user of global water resources.' },
  { id: 'di_23', title: 'Urban Air Pollution Index 2010-2024 (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600', keyPointsToCover: ['PM2.5 levels dropped from 80ug to 35ug', 'Significant decline following low-emission zone policies'], sampleModelAnswer: 'The line graph measures average particulate matter levels in major cities between 2010 and 2024. Air pollution concentrations declined steadily from 80 micrograms per cubic meter to 35 micrograms following clean air policy enforcement. In summary, urban environmental regulations significantly improved atmospheric air quality.' },
  { id: 'di_24', title: 'Geothermal Power Generation Cycle (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600', keyPointsToCover: ['Deep steam extraction', 'Turbine electricity generation', 'Condensed water reinjection'], sampleModelAnswer: 'This process diagram illustrates energy extraction within a binary geothermal power plant. High-temperature subterranean steam rises through production wells to drive electrical turbines. Afterwards, condensed water is reinjected deep into rock strata to sustain reservoir pressure. Overall, geothermal energy provides clean baseline power.' },
  { id: 'di_25', title: 'National High-Speed Rail Network (Map)', type: 'map', imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600', keyPointsToCover: ['High density rail along eastern corridor', 'Proposed western extension lines', 'Central hub connections'], sampleModelAnswer: 'The map displays existing and planned high-speed rail transportation corridors across the country. High-speed passenger lines are densely concentrated along eastern coastal metropolises, while western expansions remain under construction. In conclusion, high-speed rail infrastructure prioritizes densely populated industrial corridors.' },
  { id: 'di_26', title: 'University Graduate Employment Status (Bar Chart)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', keyPointsToCover: ['Full-time employment 68%', 'Further study 18%', 'Part-time work 9%', 'Unemployed 5%'], sampleModelAnswer: 'The bar chart highlights post-graduation outcomes for university graduates within six months of completing their degrees. A substantial 68 percent secured full-time professional employment, while 18 percent pursued postgraduate studies. Only 5 percent remained unemployed. Overall, higher education yields strong employment prospects.' },
  { id: 'di_27', title: 'Global Grain Production Volumes (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600', keyPointsToCover: ['Corn highest at 1.2 billion tons', 'Wheat at 780 million tons', 'Rice at 520 million tons'], sampleModelAnswer: 'The data table summarizes global production volumes for major staple cereal crops. Corn leads global agricultural production at 1.2 billion metric tons, followed by wheat at 780 million tons and rice at 520 million tons. In conclusion, corn and wheat form the foundation of global food production.' },
  { id: 'di_28', title: 'Global E-Commerce Revenue Growth (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600', keyPointsToCover: ['Sales grew from $1.3T in 2014 to $6.3T in 2024', 'Accelerated online retail shift'], sampleModelAnswer: 'The line graph charts global e-commerce retail sales volume over a ten-year period from 2014 to 2024. Global online market revenue expanded significantly from 1.3 trillion dollars to 6.3 trillion dollars. Overall, the chart demonstrates a major consumer transition toward digital retail platforms.' },
  { id: 'di_29', title: 'Paper Recycling & Pulping Workflow (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600', keyPointsToCover: ['Waste paper collection and sorting', 'Chemical de-inking and pulping', 'Paper sheet rolling and drying'], sampleModelAnswer: 'The process diagram outlines industrial paper recycling operations from waste collection to finished paper product. Recovered paper products are sorted and processed in chemical pulping vats to remove ink residues. Clean pulp fibers are subsequently pressed and dried into new paper sheets. In conclusion, recycling conserves natural timber resources.' },
  { id: 'di_30', title: 'Public Transportation Spending Share (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600', keyPointsToCover: ['Metro rail infrastructure 45%', 'Bus network 30%', 'Road maintenance 15%', 'Cycling paths 10%'], sampleModelAnswer: 'The pie chart details municipal transit budget allocation across urban transport categories. Metro rail systems receive the largest budget allocation at 45 percent, while bus networks absorb 30 percent. Cycling infrastructure receives 10 percent. In summary, heavy rail transport dominates municipal capital investments.' },
  { id: 'di_31', title: 'Average Sleep Duration vs Productivity (Scatter Plot)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600', keyPointsToCover: ['Optimal performance at 7-8 hours', 'Significant performance drops below 6 hours'], sampleModelAnswer: 'The chart illustrates the relationship between nightly sleep duration and daily workplace productivity scores. Individuals sleeping 7 to 8 hours daily achieve peak cognitive performance ratings, whereas sleep under 6 hours causes noticeable declines. In conclusion, adequate sleep is essential for optimal human productivity.' },
  { id: 'di_32', title: 'Global Carbon Capture Capacity (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600', keyPointsToCover: ['Capacity expanded to 45 million tons by 2024', 'Rapid commercial project deployment'], sampleModelAnswer: 'The line graph charts total commercial carbon capture and storage capacity globally from 2010 to 2024. Total operational capture capacity increased from under 10 million metric tons to 45 million tons by 2024. Overall, carbon capture technologies are expanding rapidly across heavy industries.' },
  { id: 'di_33', title: 'Global Meat Production Breakdown (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600', keyPointsToCover: ['Poultry 39%', 'Pork 34%', 'Beef 20%', 'Sheep and goat 7%'], sampleModelAnswer: 'The pie chart breaks down global livestock meat production volume by animal species. Poultry accounts for the largest market share at 39 percent, followed by pork at 34 percent and beef at 20 percent. In summary, poultry and pork represent over seventy percent of global meat production.' },
  { id: 'di_34', title: 'Hydropower Dam Electricity Workflow (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600', keyPointsToCover: ['Water intake from reservoir penstock', 'Turbine spinning generator', 'Electricity transmission to grid'], sampleModelAnswer: 'The process diagram details how hydroelectric dams convert kinetic water flow into grid electricity. Reservoir water enters penstock pipes, driving heavy hydraulic turbines connected to electrical generators. The generated power is subsequently stepped up by transformers for grid distribution. In summary, dams utilize gravity to generate clean electricity.' },
  { id: 'di_35', title: 'National Land Use Distribution (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', keyPointsToCover: ['Agricultural land 48%', 'Forest cover 32%', 'Urban area 12%', 'Wasteland and water 8%'], sampleModelAnswer: 'The pie chart details national land surface utilization across major land use categories. Agricultural farming covers nearly half of total land area at 48 percent, whereas native forests occupy 32 percent. Urban settlements account for 12 percent. In conclusion, agricultural food production dominates total land utilization.' },
  { id: 'di_36', title: 'Global Semiconductor Shipments (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', keyPointsToCover: ['Shipments surged to 1.1 trillion units', 'Strong demand driven by AI and automotive tech'], sampleModelAnswer: 'The line graph charts total global semiconductor chip shipments over the past fifteen years. Microchip supply grew exponentially to reach 1.1 trillion units annually, driven by surging demand in cloud computing and automotive automation. In summary, semiconductor production underpins global technology expansion.' },
  { id: 'di_37', title: 'Global Medical Research Expenditures (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600', keyPointsToCover: ['Oncology research leads at $45 billion', 'Cardiology at $28 billion', 'Neurology at $22 billion'], sampleModelAnswer: 'The table summarizes annual research and development expenditure across major medical disciplines. Cancer research receives the largest financial allocation at 45 billion dollars, while cardiovascular and neurological research receive 28 billion and 22 billion dollars respectively. In conclusion, oncology commands primary healthcare R&D funding.' },
  { id: 'di_38', title: 'Geographic Distribution of Wind Farms (Map)', type: 'map', imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600', keyPointsToCover: ['Offshore wind farms concentrated in North Sea', 'Onshore wind along coastal plains'], sampleModelAnswer: 'The geographical map highlights major operational offshore and onshore wind energy farms across Europe. Offshore turbine installations are heavily concentrated in the North Sea region, while onshore wind parks line western coastal corridors. In summary, marine wind resources provide significant renewable power.' },
  { id: 'di_39', title: 'Corporate Workforce Gender Representation (Bar Chart)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600', keyPointsToCover: ['Entry level near 50-50 parity', 'Executive positions 72% male vs 28% female'], sampleModelAnswer: 'The bar chart compares gender balance across corporate career hierarchy levels. While entry-level roles achieve near gender parity at 50 percent, executive leadership remains unevenly distributed with 72 percent male representation. Overall, female representation declines at senior corporate decision-making levels.' },
  { id: 'di_40', title: 'Biogas Digester Energy Production (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', keyPointsToCover: ['Organic waste anaerobic digestion', 'Methane gas capture and scrubbing', 'Biofertilizer byproduct extraction'], sampleModelAnswer: 'The diagram outlines the biological breakdown of organic waste inside anaerobic biogas digesters. Bacteria decompose agricultural waste in sealed tanks to produce methane gas, which is refined for heat and electricity generation. Additionally, nutrient-rich digestate is collected as biofertilizer. Overall, biogas plants transform waste into clean energy.' },
  { id: 'di_41', title: 'Global Commercial Aviation Traffic (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600', keyPointsToCover: ['Growth to 4.5 billion passengers', 'Sharp drop in 2020 followed by rapid recovery'], sampleModelAnswer: 'The line graph charts global commercial airline passenger volume over two decades. Following a temporary decline in 2020, global air travel rebounded strongly to surpass pre-pandemic levels at 4.5 billion annual passengers. In conclusion, long-term international passenger mobility continues to expand.' },
  { id: 'di_42', title: 'Primary Causes of Forest Loss (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600', keyPointsToCover: ['Commercial cattle ranching 40%', 'Soybean farming 25%', 'Timber logging 20%', 'Wildfires 15%'], sampleModelAnswer: 'The pie chart illustrates the main drivers of global tropical deforestation. Commercial agricultural livestock ranching accounts for forty percent of tree clearing, followed by commercial crop farming at 25 percent. Wildfires represent 15 percent. In summary, agricultural land expansion remains the primary cause of global forest destruction.' },
  { id: 'di_43', title: 'Global Patent Applications by Country (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600', keyPointsToCover: ['China leads with 1.5M filings', 'USA second with 600K', 'Japan third with 300K'], sampleModelAnswer: 'The table displays annual patent filing volumes submitted to global intellectual property organizations. China leads international innovation filings with 1.5 million annual applications, followed by the United States with 600 thousand and Japan with 300 thousand. Overall, Asian nations drive global patent application volume.' },
  { id: 'di_44', title: 'Nuclear Fission Power Plant Loop (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600', keyPointsToCover: ['Reactor core heat generation', 'Steam generator driving turbine', 'Cooling tower condensation loop'], sampleModelAnswer: 'The diagram details thermal energy transfer inside a pressurized water nuclear reactor plant. Atomic fission in the reactor core heats pressurized primary coolant, which converts secondary water into high-pressure steam. Steam drives turbines generating electricity before being cooled in cooling towers. In conclusion, nuclear energy provides continuous baseline power.' },
  { id: 'di_45', title: 'Global Freshwater Storage Allocation (Pie Chart)', type: 'pie_chart', imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600', keyPointsToCover: ['Glaciers and ice caps 68.7%', 'Groundwater 30.1%', 'Surface water and lakes 1.2%'], sampleModelAnswer: 'The pie chart presents the distribution of global freshwater reserves across environmental reservoirs. Glaciers and polar ice caps lock up 68.7 percent of Earth freshwater, while subterranean groundwater contains 30.1 percent. Accessible surface lakes and rivers comprise only 1.2 percent. In conclusion, usable freshwater resources are extremely limited.' },
  { id: 'di_46', title: 'Urban Population vs Rural Population (Line Graph)', type: 'line_graph', imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600', keyPointsToCover: ['Urban population crossed rural in 2007', 'Urban expected to reach 68% by 2050'], sampleModelAnswer: 'The line graph charts the demographic shift between urban and rural global populations from 1950 projected to 2050. Urban inhabitants officially surpassed rural populations in 2007 and are projected to reach 68 percent of global population by 2050. Overall, humanity is becoming increasingly urbanized.' },
  { id: 'di_47', title: 'Lithium Battery Recycling Steps (Process Diagram)', type: 'process_diagram', imageUrl: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?w=600', keyPointsToCover: ['Mechanical shredding and sorting', 'Hydrometallurgical chemical extraction', 'Cathode precursor refining'], sampleModelAnswer: 'The flowchart illustrates chemical hydrometallurgical recycling of spent lithium-ion batteries. Batteries undergo mechanical dismantling and shredding to recover raw metals like cobalt, nickel, and lithium. Chemical leaching subsequently purifies these battery-grade elements for new battery manufacturing. In summary, recycling secures critical battery raw materials.' },
  { id: 'di_48', title: 'Global Wealth Distribution Pyramids (Bar Chart)', type: 'bar_chart', imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600', keyPointsToCover: ['Top 1% holds 45% of global wealth', 'Bottom 50% holds less than 2%'], sampleModelAnswer: 'The chart illustrates the concentration of global personal financial wealth across population brackets. The top one percent of global adults holds 45 percent of worldwide assets, whereas the bottom fifty percent controls under two percent of global wealth. In conclusion, severe economic wealth disparity persists globally.' },
  { id: 'di_49', title: 'Solar Energy Radiation Intensity (Map)', type: 'map', imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600', keyPointsToCover: ['Highest solar irradiance along equatorial belt', 'Desert regions record over 2500 kWh/m2'], sampleModelAnswer: 'The geographic map displays global solar irradiance levels across continents. Solar power potential reaches peak values along the equatorial desert belts of North Africa and Australia, recording over 2500 kilowatt-hours per square meter annually. Overall, solar generation potential is concentrated in arid tropical regions.' },
  { id: 'di_50', title: 'Global Robotics Density by Industry (Table)', type: 'table', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600', keyPointsToCover: ['Automotive industry highest at 1000 robots per 10k workers', 'Electronics second at 650', 'Food processing at 120'], sampleModelAnswer: 'The table outlines operational industrial robot density per ten thousand employees across manufacturing sectors. Automotive manufacturing exhibits the highest automation density at 1000 robots per ten thousand workers, followed by electronics at 650. In summary, automotive factories lead industrial automation integration.' }
];

// ---------------------------------------------------------------------------
// 4. RE-TELL LECTURE (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_RETELL_LECTURE: RetellLectureQuestion[] = [
  {
    id: 'rl_01',
    title: 'The Evolution of Artificial Intelligence in Medicine',
    audioTranscript: 'Artificial intelligence is rapidly transforming modern healthcare diagnostic systems. By training machine learning algorithms on millions of anonymized patient scans, AI tools can identify early-stage tumors with greater accuracy than human radiologists. However, medical experts emphasize that AI should assist rather than replace clinical decision-making, ensuring patient safety and maintaining human empathy in healthcare delivery.',
    keyPoints: ['AI diagnostic transformation', 'Algorithms trained on patient scans', 'High tumor detection accuracy', 'Assistance rather than total replacement of doctors'],
    sampleModelAnswer: 'The speaker in the audio lecture discussed the integration of artificial intelligence into medical diagnostics. Firstly, the lecturer highlighted that machine learning algorithms analyze patient medical scans to detect early-stage diseases with high precision. Secondly, the lecture emphasized that AI serves as a supportive tool for doctors rather than a complete replacement. Overall, the lecture underscored the potential of technology to enhance patient care quality.'
  },
  {
    id: 'rl_02',
    title: 'Biodiversity Loss and Ecosystem Services',
    audioTranscript: 'Biodiversity is not merely about counting species; it underpins the essential ecosystem services that sustain human life. Forests, wetlands, and coral reefs provide clean air, water purification, flood protection, and climate regulation. When species disappear due to habitat destruction, these ecosystems lose their functional resilience, threatening agricultural food security and human welfare globally.',
    keyPoints: ['Biodiversity supports ecosystem services', 'Forests and wetlands purify air and water', 'Habitat destruction leads to resilience loss', 'Threats to food security and human welfare'],
    sampleModelAnswer: 'The lecture provided important insights regarding biodiversity and essential ecosystem services. The speaker explained that natural habitats such as forests and wetlands deliver vital benefits including water purification and climate regulation. Furthermore, habitat destruction compromises ecosystem resilience and poses severe risks to global food security. In conclusion, preserving biodiversity is crucial for human survival.'
  },
  {
    id: 'rl_03',
    title: 'Quantum Computing Breakthroughs',
    audioTranscript: 'Quantum computing represents a paradigm shift in processing power. Traditional computers rely on binary bits, but quantum processing units utilize qubits capable of superposition and entanglement. This capability enables quantum systems to process vast, multi-variable calculations simultaneously, transforming cryptography, material science, and climate modeling.',
    keyPoints: ['Quantum computing paradigm shift', 'Qubits utilize superposition and entanglement', 'Simultaneous complex calculations', 'Applications in cryptography and material science'],
    sampleModelAnswer: 'The lecture focused on recent breakthroughs in quantum computing architecture. The speaker pointed out that qubits utilize principles of superposition and entanglement to execute complex calculations exponentially faster than classical binary systems. Additionally, the lecturer noted that these advancements will revolutionize cryptography and climate modeling. In conclusion, quantum technology holds immense potential for high-performance computing.'
  },
  {
    id: 'rl_04',
    title: 'Urban Heat Island Mitigation',
    audioTranscript: 'Urban areas consistently record higher temperatures than surrounding rural landscapes due to the thermal mass of concrete and asphalt. City planners are actively implementing green infrastructure solutions, such as vegetative roofs, urban tree canopies, and permeable pavements to reflect solar radiation and lower surface temperatures through natural evapotranspiration.',
    keyPoints: ['Urban heat islands caused by concrete and asphalt', 'Temperatures higher than surrounding rural areas', 'Mitigation using green roofs and tree canopies', 'Cooling through natural evapotranspiration'],
    sampleModelAnswer: 'The speaker delivered an informative talk on urban heat island effects and urban planning solutions. The lecture explained that dense building materials trap thermal energy, making metropolitan areas significantly warmer than rural surroundings. To counter this, municipal authorities are adopting vegetative roofs and urban forestry to cool cities naturally. Overall, green infrastructure is vital for urban environmental sustainability.'
  },
  {
    id: 'rl_05',
    title: 'Cognitive Science of Multitasking',
    audioTranscript: 'Modern psychological studies demonstrate that human brains cannot truly focus on multiple complex tasks simultaneously. Instead, what we call multitasking is rapid task switching, which incurs significant cognitive switching costs. This results in heightened mental fatigue, elevated error rates, and reduced overall productivity in workplace environments.',
    keyPoints: ['Human brain cannot focus on multiple complex tasks', 'Multitasking is actually rapid task switching', 'High cognitive switching costs', 'Increased error rates and mental fatigue'],
    sampleModelAnswer: 'The lecture discussed psychological research on human cognitive limitations regarding multitasking. The speaker highlighted that the brain does not process multiple complex activities at once, but rather switches focus rapidly between them. Consequently, this process causes cognitive fatigue and increases workplace error rates. In conclusion, single-task focus yields superior productivity.'
  },
  { id: 'rl_06', title: 'Deep Sea Hydrothermal Vent Biology', audioTranscript: 'Hydrothermal vents emit volcanic mineral fluids into oceanic abyssal zones, supporting unique biological ecosystems. Microorganisms near these vents utilize chemosynthesis instead of sunlight to synthesize organic molecules, forming food webs that operate independent of solar energy.', keyPoints: ['Volcanic vents in deep ocean', 'Chemosynthesis instead of photosynthesis', 'Ecosystems independent of sunlight'], sampleModelAnswer: 'The speaker discussed deep sea hydrothermal vent biology. The lecture explained that vent ecosystems rely on chemosynthetic bacteria to convert volcanic minerals into energy without sunlight. In conclusion, these ocean communities demonstrate remarkable biological adaptation.' },
  { id: 'rl_07', title: 'Macroeconomic Central Bank Policy', audioTranscript: 'Central banks adjust benchmark interest rates to regulate money supply and curb inflationary pressures. Raising interest rates increases borrowing costs, slowing consumer spending and cooling over-heated economic growth to maintain price stability.', keyPoints: ['Central bank interest rate adjustments', 'Regulating inflation and money supply', 'Higher borrowing costs cool consumer spending'], sampleModelAnswer: 'The lecture examined central bank monetary policies and inflation control. The lecturer explained that raising interest rates reduces borrowing and moderates consumer demand. Overall, central bank intervention maintains national macroeconomic stability.' },
  { id: 'rl_08', title: 'Epigenetics and Environmental Triggers', audioTranscript: 'Epigenetics explores how environmental factors alter gene expression without changing underlying DNA sequences. Dietary choices, chronic stress, and chemical exposure leave chemical marks on DNA that turn specific genes on or off across generations.', keyPoints: ['Environmental factors modify gene expression', 'DNA sequence remains unchanged', 'Epigenetic marks can pass through generations'], sampleModelAnswer: 'The speaker discussed epigenetics and environmental impacts on gene expression. The lecture highlighted that stress and diet alter how genes function without changing the genetic code. In conclusion, lifestyle factors exert long-term genomic consequences.' },
  { id: 'rl_09', title: 'Behavioral Economics Choice Architecture', audioTranscript: 'Behavioral economics demonstrates that human decision making is influenced by subtle structural nudges. By altering choice architecture, such as defaulting employees into retirement savings plans, policymakers guide individuals toward beneficial long-term outcomes without mandating behavior.', keyPoints: ['Decision making influenced by nudges', 'Choice architecture guides behavior', 'Default retirement enrollment increases savings'], sampleModelAnswer: 'The lecture covered behavioral economics and choice architecture. The speaker emphasized that default settings and strategic nudges encourage better long-term decisions without restricting personal freedom. Overall, choice architecture improves public policy outcomes.' },
  { id: 'rl_10', title: 'Archaeological Satellite Remote Sensing', audioTranscript: 'Archaeologists use satellite imagery and LiDAR technology to discover hidden ancient ruins beneath dense forest canopies. Light pulses penetrate vegetation to reveal buried roads and structures, revolutionizing archaeological mapping.', keyPoints: ['LiDAR technology penetrates forest cover', 'Satellite imagery reveals buried ruins', 'Transforms archaeological mapping efficiency'], sampleModelAnswer: 'The speaker presented insights into satellite remote sensing in archaeology. The lecture explained that airborne laser technology detects sub-surface historical structures hidden under dense jungle foliage. In conclusion, modern sensors accelerate archaeological discovery.' },
  { id: 'rl_11', title: 'Renewable Hydrogen Energy Grid', audioTranscript: 'Green hydrogen generated through water electrolysis using solar power provides carbon-free fuel for heavy industries. Storing hydrogen in industrial tanks resolves solar power storage limitations and decarbonizes steel manufacturing.', keyPoints: ['Green hydrogen produced via electrolysis', 'Carbon-free industrial fuel source', 'Overcomes renewable energy storage challenges'], sampleModelAnswer: 'The lecture discussed green hydrogen as a clean industrial energy carrier. The speaker explained that hydrogen electrolysis allows long-term renewable power storage and reduces industrial emissions. Overall, hydrogen energy supports global decarbonization.' },
  { id: 'rl_12', title: 'Microbial Antibiotic Resistance', audioTranscript: 'Overusing antibiotics in human medicine and livestock farming accelerates bacterial resistance. Resistant strains exchange genetic resistance traits rapidly, creating superbugs that withstand standard clinical therapies.', keyPoints: ['Antibiotic overuse accelerates resistance', 'Horizontal gene transfer spreads resistance', 'Rise of drug-resistant superbugs'], sampleModelAnswer: 'The lecture addressed the growing crisis of microbial antibiotic resistance. The speaker noted that excessive pharmaceutical use encourages bacterial mutation and rapid gene transfer. In conclusion, cautious antibiotic stewardship is urgent.' },
  { id: 'rl_13', title: 'Circular Economy Industrial Design', audioTranscript: 'The circular economy contrasts with linear production by eliminating industrial waste through closed-loop recycling. Manufacturing products for modular repair and remanufacturing preserves raw materials and minimizes environmental impact.', keyPoints: ['Circular economy eliminates industrial waste', 'Closed-loop recycling and repair', 'Preserves natural resources'], sampleModelAnswer: 'The speaker explained circular economy principles in manufacturing. The lecture highlighted that designing products for repair and remanufacturing prevents waste and conserves global resources. Overall, circular systems enhance sustainability.' },
  { id: 'rl_14', title: 'Neuroplasticity and Brain Recovery', audioTranscript: 'Neuroplasticity enables the human brain to reorganize neural connections after stroke or brain injury. Through repeated therapeutic physical exercises, undamaged brain regions adapt to take over impaired cognitive and motor functions.', keyPoints: ['Brain reorganizes neural pathways', 'Recovery after stroke and brain injury', 'Targeted physical therapy drives neural adaptation'], sampleModelAnswer: 'The lecture explored neuroplasticity and brain rehabilitation. The speaker explained that structured rehabilitation enables undamaged brain tissue to adapt and restore lost physical functions. In conclusion, neuroplasticity drives neurological recovery.' },
  { id: 'rl_15', title: 'Atmospheric Ozone Layer Healing', audioTranscript: 'Global international treaties like the Montreal Protocol successfully phased out ozone-depleting CFC chemicals. Environmental monitoring confirms that Earth protective stratospheric ozone layer is gradually repairing itself.', keyPoints: ['Montreal Protocol phased out CFCs', 'Stratospheric ozone layer recovery', 'Success of international environmental treaties'], sampleModelAnswer: 'The speaker discussed international policy efforts to restore the ozone layer. The lecture highlighted that global bans on CFC gases allowed the stratospheric ozone layer to recover. In conclusion, cooperative treaties effectively address climate issues.' },
  { id: 'rl_16', title: 'Sociological Impact of Automation', audioTranscript: 'Workplace automation increases industrial productivity but causes structural displacement among low-skilled workers. Economists advocate for universal digital skills training to help displaced workers transition into emerging technical roles.', keyPoints: ['Automation boosts industrial productivity', 'Displacement of low-skilled labor', 'Workforce retraining programs required'], sampleModelAnswer: 'The lecture covered the socio-economic impacts of robotic workplace automation. The speaker pointed out that while automation enhances productivity, it displaces manual workers, requiring government workforce retraining. Overall, education must adapt to automation.' },
  { id: 'rl_17', title: 'Exoplanet Atmospheric Analysis', audioTranscript: 'Astronomers analyze starlight filtering through exoplanet atmospheres to detect spectral signatures of water vapor, methane, and oxygen. Identifying atmospheric chemical composition assists astrobiologists in determining potential planetary habitability.', keyPoints: ['Spectroscopic analysis of exoplanet atmospheres', 'Detecting water vapor and methane', 'Evaluating planetary habitability'], sampleModelAnswer: 'The lecture focused on methods for detecting atmospheric gases on distant exoplanets. The speaker explained that transit spectroscopy identifies chemical markers indicative of habitable environments. In conclusion, optical spectroscopy aids the search for life.' },
  { id: 'rl_18', title: 'Glacial Ice Sheet Dynamics', audioTranscript: 'Warming ocean currents melt coastal ice shelves from below, accelerating continental glacier flow into sea waters. Glaciologists report that ice shelf destabilization is the primary driver of rapid global sea level rise.', keyPoints: ['Warm ocean currents melt ice shelves', 'Accelerated flow of continental glaciers', 'Primary driver of global sea level rise'], sampleModelAnswer: 'The speaker presented research on ice shelf melting and ocean warming. The lecture explained that ocean thermal currents weaken ice shelves, accelerating sea level rise. In conclusion, polar ocean monitoring is vital for climate forecasting.' },
  { id: 'rl_19', title: 'CRISPR Gene Editing in Agriculture', audioTranscript: 'CRISPR gene editing technology enables plant scientists to edit crop genomes precisely, breeding drought-resistant and pest-tolerant crop varieties without inserting foreign transgenic DNA, speeding up agricultural breeding cycles.', keyPoints: ['Precise CRISPR genome editing in crops', 'Drought and pest resistance', 'Faster breeding without foreign transgenic DNA'], sampleModelAnswer: 'The lecture examined CRISPR applications in agricultural science. The speaker emphasized that precise gene editing creates resilient crop varieties faster than conventional breeding methods. Overall, gene editing supports agricultural food security.' },
  { id: 'rl_20', title: 'Cognitive Memory and Sleep Cycles', audioTranscript: 'During slow-wave deep sleep, the brain consolidates short-term memory traces into long-term storage within the cerebral cortex. Depriving individuals of restful sleep impairs neural memory stabilization and degrades learning capacity.', keyPoints: ['Memory consolidation occurs during slow-wave sleep', 'Transfer of memories to cerebral cortex', 'Sleep deprivation impairs learning retention'], sampleModelAnswer: 'The speaker discussed the biological link between sleep cycles and memory consolidation. The lecture explained that deep sleep stabilizes short-term memories into long-term knowledge. In conclusion, adequate sleep is essential for effective learning.' },
  { id: 'rl_21', title: 'Nanomedicine Drug Delivery', audioTranscript: 'Polymeric nanoparticles deliver targeted cancer chemotherapy directly to tumor sites while avoiding healthy tissues. Encapsulating toxic drugs inside nanocarriers reduces systemic chemotherapy side effects and enhances therapeutic efficacy.', keyPoints: ['Nanoparticles deliver targeted chemotherapy', 'Avoids damage to healthy tissue', 'Reduces chemotherapy side effects'], sampleModelAnswer: 'The lecture explored nanomedicine and targeted drug delivery systems. The speaker highlighted that encapsulating drugs in microscopic nanoparticles improves treatment accuracy while minimizing adverse side effects. Overall, nanotechnology transforms cancer treatment.' },
  { id: 'rl_22', title: 'Global Trade Interdependence', audioTranscript: 'Modern global supply chains interconnect specialized manufacturing across multiple continents. While international division of labor lowers production costs, geographic concentration creates supply chain vulnerabilities during global crises.', keyPoints: ['Interconnected global supply chains', 'Lower production costs via specialization', 'Vulnerability to regional supply disruptions'], sampleModelAnswer: 'The speaker discussed global trade networks and supply chain security. The lecture explained that geographic specialization reduces costs but increases exposure to regional trade bottlenecks. In conclusion, supply chain diversification is critical.' },
  { id: 'rl_23', title: 'Soil Microbiome and Plant Health', audioTranscript: 'Healthy agricultural soil relies on complex microbial communities that fix atmospheric nitrogen and solubilize soil minerals for root absorption. Chemical pesticide overuse degrades soil microbiomes, reducing long-term crop fertility.', keyPoints: ['Soil microbes fix nitrogen and solubilize minerals', 'Pesticide overuse degrades soil microbiomes', 'Microbial diversity essential for crop fertility'], sampleModelAnswer: 'The lecture covered soil microbiomes and sustainable agriculture. The speaker noted that beneficial microbes nourish crops, but chemical overuse damages soil biology. Overall, protecting soil ecology ensures long-term agricultural fertility.' },
  { id: 'rl_24', title: 'Solar Photovoltaic Cell Efficiency', audioTranscript: 'Perovskite-silicon tandem solar cells capture different wavelengths of the solar spectrum, elevating solar panel conversion efficiency above thirty percent. Commercial scaling of tandem cells could dramatically lower solar electricity costs.', keyPoints: ['Perovskite-silicon tandem solar cells', 'Capture broader solar light spectrum', 'Efficiency exceeds thirty percent'], sampleModelAnswer: 'The speaker discussed advances in high-efficiency solar photovoltaic materials. The lecture explained that tandem cell technology captures more sunlight and boosts power efficiency significantly. In conclusion, material innovations lower solar energy costs.' },
  { id: 'rl_25', title: 'Cybersecurity Asymmetric Encryption', audioTranscript: 'Asymmetric encryption relies on public and private key pairs to secure internet banking and electronic communication. Emerging quantum computing capabilities pose future risks to standard RSA encryption algorithms, spurring post-quantum research.', keyPoints: ['Asymmetric encryption secures online transactions', 'Public and private cryptographic keys', 'Quantum computers threaten existing encryption'], sampleModelAnswer: 'The lecture examined cybersecurity and quantum threats to digital encryption. The speaker highlighted that while current asymmetric keys protect online data, quantum computing requires new cryptographic defenses. Overall, post-quantum security is paramount.' },
  { id: 'rl_26', title: 'Dendrochronology and Climate Proxies', audioTranscript: 'Tree ring growth analysis provides precise paleoclimate records dating back thousands of years. Annual ring thickness reflects historical moisture and temperature variations, giving scientists accurate proxy climate data prior to thermometer records.', keyPoints: ['Tree ring width reveals historical climate', 'Reconstructing paleoclimate data', 'Proxy records prior to instrument measurements'], sampleModelAnswer: 'The speaker presented dendrochronology as a tool for climate reconstruction. The lecture explained that analyzing annual tree rings provides proxy data on historic temperatures and rainfall. In conclusion, tree rings enhance historical climate modeling.' },
  { id: 'rl_27', title: 'Urban Biodiversity Corridors', audioTranscript: 'Constructing connected green corridors between urban parks enables wildlife populations to move safely across urban infrastructure. These ecological bridges prevent genetic isolation among urban animal species and bolster urban ecosystems.', keyPoints: ['Green corridors connect isolated urban parks', 'Facilitate wildlife movement across highways', 'Prevents genetic isolation in urban animal species'], sampleModelAnswer: 'The lecture examined urban biodiversity corridors. The speaker explained that linking urban green spaces allows wildlife movement and preserves genetic diversity in animal populations. Overall, eco-corridors promote urban wildlife conservation.' },
  { id: 'rl_28', title: 'Volcanic Aerosols and Global Cooling', audioTranscript: 'Massive volcanic eruptions launch sulfur dioxide gas into the stratosphere, forming reflective sulfate aerosols. These stratospheric aerosol layers reflect sunlight back into space, temporary lowering global surface temperatures for several years.', keyPoints: ['Volcanic sulfur dioxide reaches stratosphere', 'Reflective sulfate aerosols form', 'Temporary global cooling effect'], sampleModelAnswer: 'The speaker discussed how volcanic eruptions influence global climate patterns. The lecture explained that stratospheric sulfate aerosols deflect solar radiation and temporarily cool global temperatures. In conclusion, volcanic events exert powerful climate forcing.' },
  { id: 'rl_29', title: 'Behavioral Finance and Investor Bias', audioTranscript: 'Behavioral finance demonstrates that investor decisions are often driven by loss aversion and herd mentality rather than rational market analysis. Recognizing emotional biases helps financial advisors design portfolios that minimize impulsive panic selling.', keyPoints: ['Investor decisions influenced by emotional biases', 'Loss aversion and herd behavior drive market movements', 'Behavioral insights prevent panic selling'], sampleModelAnswer: 'The lecture covered behavioral finance and investor psychology. The speaker pointed out that emotional biases like loss aversion lead to irrational financial choices. Overall, understanding behavioral economics improves financial planning.' },
  { id: 'rl_30', title: 'Desalination Reverse Osmosis Advances', audioTranscript: 'Modern seawater desalination plants utilize high-efficiency energy recovery devices and graphene membranes to reduce electrical power consumption by forty percent, making ocean water purification economically viable for arid regions.', keyPoints: ['Graphene membranes in reverse osmosis', 'Energy recovery devices cut power consumption', 'Economic freshwater supply for arid regions'], sampleModelAnswer: 'The speaker discussed technological innovations in seawater desalination. The lecture highlighted that graphene membranes and energy recovery systems lower water purification costs significantly. In conclusion, advanced desalination relieves regional water scarcity.' },
  { id: 'rl_31', title: 'Artificial Intelligence in Drug Discovery', audioTranscript: 'Deep learning algorithms analyze millions of chemical compounds in virtual screens, predicting biological activity and toxicity in hours. AI accelerates drug candidate identification, cutting pharmaceutical R&D timelines from years to months.', keyPoints: ['AI virtual screening of chemical compounds', 'Predicts drug activity and toxicity rapidly', 'Shortens pharmaceutical R&D timelines'], sampleModelAnswer: 'The lecture explored AI applications in pharmaceutical discovery. The speaker explained that machine learning models screen drug compounds rapidly, accelerating life-saving medicine development. Overall, AI transforms biotechnology R&D.' },
  { id: 'rl_32', title: 'Ocean Acidification and Shellfish', audioTranscript: 'Absorbing excess atmospheric carbon dioxide increases ocean acidity, reducing carbonate ion availability for shellfish. Mussels, oysters, and coral larvae struggle to build calcium carbonate shells, threatening marine food chains.', keyPoints: ['Ocean absorbs atmospheric carbon dioxide', 'Rising acidity lowers carbonate ion levels', 'Impaired shell formation in marine organisms'], sampleModelAnswer: 'The speaker examined the impact of ocean acidification on marine life. The lecture explained that higher acidity prevents shellfish from building protective calcium shells, disrupting aquatic food webs. In conclusion, carbon emissions severely harm ocean ecosystems.' },
  { id: 'rl_33', title: 'Smart Grid Energy Distribution', audioTranscript: 'Smart electrical grids utilize real-time digital sensors and automated switches to balance solar and wind power fluctuations. Automated load balancing prevents blackout events and integrates distributed renewable energy seamlessly.', keyPoints: ['Smart grids use digital sensors and automation', 'Balances intermittent renewable power supply', 'Prevents electrical blackout events'], sampleModelAnswer: 'The lecture covered smart grid technology and renewable energy integration. The speaker emphasized that automated digital monitoring stabilizes power distribution and prevents power grid failures. Overall, smart grids enable clean energy adoption.' },
  { id: 'rl_34', title: 'Cognitive Linguistics and Conceptual Metaphors', audioTranscript: 'Cognitive linguistics reveals that human thought processes are fundamentally structured by spatial metaphors. Phrases like looking forward or falling behind demonstrate that abstract concepts like time are comprehended through physical spatial relationships.', keyPoints: ['Human thought structured by conceptual metaphors', 'Abstract concepts understood via spatial ideas', 'Language reflects underlying cognitive architecture'], sampleModelAnswer: 'The speaker discussed cognitive linguistics and spatial metaphors. The lecture explained that people understand abstract ideas such as time using physical spatial concepts. In conclusion, language structure reveals how human minds operate.' },
  { id: 'rl_35', title: 'Deep Ocean Mining Environmental Risks', audioTranscript: 'Seabed mining for cobalt and nickel polymetallic nodules creates underwater sediment plumes that smother benthic marine organisms. Marine scientists urge international moratoriums until long-term deep ocean ecological impacts are fully understood.', keyPoints: ['Seabed mining for battery metals', 'Sediment plumes smother benthic life', 'Calls for environmental moratoriums'], sampleModelAnswer: 'The lecture addressed environmental concerns surrounding deep ocean mineral mining. The speaker warned that mining polymetallic nodules generates harmful sediment plumes that destroy deep sea habitats. Overall, marine conservation requires cautious regulation.' },
  { id: 'rl_36', title: 'Vertical Farming Agricultural Innovation', audioTranscript: 'Indoor vertical farms cultivate crops in stacked hydroponic trays under automated LED light spectrums. Recirculating nutrient solutions uses 95% less water than open field farming while producing crops year-round without chemical pesticides.', keyPoints: ['Stacked hydroponic vertical farming', 'Automated LED lighting and nutrient recycling', 'Drastically reduced water and pesticide use'], sampleModelAnswer: 'The speaker presented indoor vertical farming as a solution for urban food production. The lecture highlighted that hydro-LED vertical systems conserve water and grow crops year-round without pesticides. In conclusion, vertical farming enhances urban agricultural resilience.' },
  { id: 'rl_37', title: 'Public Health Herd Immunity Dynamics', audioTranscript: 'Vaccination establishes herd immunity when a high threshold of population members become immune to infectious pathogens. Protecting susceptible individuals depends on maintaining high immunization coverage to prevent transmission chains from expanding.', keyPoints: ['Herd immunity protects vulnerable population', 'Requires high vaccination coverage thresholds', 'Breaks infectious disease transmission chains'], sampleModelAnswer: 'The lecture covered public health dynamics and herd immunity. The speaker explained that widespread vaccination prevents epidemic spreading and safeguards vulnerable individuals unable to be vaccinated. Overall, immunization programs safeguard public health.' },
  { id: 'rl_38', title: 'Quantum Cryptography QKD Security', audioTranscript: 'Quantum Key Distribution leverages quantum physics laws to create unhackable communications. Intercepting quantum key signals alters photon quantum states instantly, alerting network operators to eavesdropping attempts immediately.', keyPoints: ['Quantum Key Distribution (QKD) security', 'Based on photon quantum physics laws', 'Eavesdropping instantly alters photon states'], sampleModelAnswer: 'The speaker discussed quantum cryptography and unhackable data communication. The lecture explained that any attempt to intercept quantum keys alters photon states and alerts operators. In conclusion, quantum key distribution guarantees ultimate data security.' },
  { id: 'rl_39', title: 'Archaeological Isotope Analysis', audioTranscript: 'Isotopic analysis of human tooth enamel reveals dietary habits and geographic migration patterns of ancient populations. Strontium isotopes locked in teeth match local geological water signatures, allowing researchers to trace ancient individual movements.', keyPoints: ['Strontium isotope testing in ancient teeth', 'Reveals historical migration and diet', 'Matches geological water signatures'], sampleModelAnswer: 'The lecture highlighted chemical isotope analysis in bioarchaeology. The speaker explained that strontium ratios in human teeth indicate where ancient individuals lived and migrated. In conclusion, isotope testing provides detailed historical mobility records.' },
  { id: 'rl_40', title: 'Macroeconomic Trade Deficit Factors', audioTranscript: 'Trade deficits occur when domestic consumption exceeds national goods production, resulting in higher net import values. Economists stress that while trade deficits allow consumer choice, persistent deficits can increase national external debt levels.', keyPoints: ['Imports exceed national export value', 'Reflects high domestic consumption rates', 'Long-term deficits increase foreign debt'], sampleModelAnswer: 'The speaker examined national trade deficits and economic consequences. The lecture explained that spending more on imports than exports increases foreign debt obligations over time. Overall, trade balance regulation is essential for long-term economic stability.' },
  { id: 'rl_41', title: 'Atmospheric Methane Capture Technologies', audioTranscript: 'Capturing fugitive methane emissions from dairy livestock manure and landfills prevents potent greenhouse warming. Converting captured biomethane into renewable natural gas produces clean vehicle fuel while decreasing atmospheric emissions.', keyPoints: ['Methane capture from landfills and agriculture', 'Conversion into biomethane vehicle fuel', 'Reduces near-term atmospheric global warming'], sampleModelAnswer: 'The lecture discussed methane capture technologies and biomethane utilization. The speaker highlighted that capturing waste methane converts a potent greenhouse pollutant into clean energy. In conclusion, biomethane capture supports climate change mitigation.' },
  { id: 'rl_42', title: 'Neurobiology of Chronic Stress', audioTranscript: 'Prolonged exposure to elevated cortisol stress hormones damages neurons within the hippocampus, degrading spatial navigation and short-term memory function. Mindful stress reduction therapies protect hippocampal neural volume.', keyPoints: ['Chronic cortisol stress damages hippocampal neurons', 'Degrades short-term memory and navigation', 'Mindfulness therapies protect brain volume'], sampleModelAnswer: 'The speaker presented research on how chronic stress affects brain architecture. The lecture explained that sustained stress hormone exposure damages memory centers in the hippocampus. Overall, managing stress is vital for cognitive brain health.' },
  { id: 'rl_43', title: 'Sociology of Digital Media Echo Chambers', audioTranscript: 'Social media recommendation algorithms group users into ideological echo chambers that reinforce pre-existing beliefs. Filter bubbles reduce exposure to opposing viewpoints, accelerating political polarization across online communities.', keyPoints: ['Algorithmic recommendation feeds create echo chambers', 'Limits exposure to diverse perspectives', 'Drives online political polarization'], sampleModelAnswer: 'The lecture explored the sociological impacts of social media algorithms. The speaker explained that recommendation algorithms isolate users in echo chambers and amplify political polarization. In conclusion, digital media literacy is necessary to combat ideological polarization.' },
  { id: 'rl_44', title: 'Passive Solar Building Architecture', audioTranscript: 'Passive solar architectural design uses south-facing window arrays, thermal concrete walls, and natural ventilation corridors to heat and cool buildings naturally, cutting artificial heating and air conditioning energy demand by sixty percent.', keyPoints: ['Passive solar orientation and thermal mass', 'Natural heating and ventilation corridors', 'Reduces building energy demand by 60%'], sampleModelAnswer: 'The speaker discussed passive solar design in sustainable architecture. The lecture explained that building orientation and thermal concrete walls regulate indoor temperature naturally without high energy costs. Overall, passive solar design reduces carbon emissions in construction.' },
  { id: 'rl_45', title: 'Bilingualism and Cognitive Reserve', audioTranscript: 'Lifelong bilingualism requires constant mental suppression of non-active language structures, exercising prefrontal executive control networks. Research demonstrates this neural workout builds cognitive reserve, delaying Alzheimer symptoms by four years.', keyPoints: ['Bilingualism exercises prefrontal executive control', 'Builds neural cognitive reserve', 'Delays dementia and Alzheimer symptoms'], sampleModelAnswer: 'The lecture examined cognitive advantages associated with bilingualism. The speaker highlighted that managing two languages exercises executive brain functions and delays memory decline in older adults. In conclusion, bilingualism provides powerful neuroprotective benefits.' },
  { id: 'rl_46', title: 'Space Weather Geomagnetic Storms', audioTranscript: 'Coronal mass ejections from solar flares bombard Earth magnetosphere with energized solar particles. Severe geomagnetic storms induce unwanted electrical currents in long-distance electrical power grids, causing regional blackout risks.', keyPoints: ['Solar flares launch coronal mass ejections', 'Geomagnetic storms hit Earth magnetosphere', 'Induces surges in electrical power grids'], sampleModelAnswer: 'The speaker discussed space weather phenomena and power grid vulnerabilities. The lecture explained that solar particle storms disrupt satellite communications and risk electrical blackout failures. Overall, space weather forecasting protects national infrastructure.' },
  { id: 'rl_47', title: 'Ecosystem Restoration Rewilding', audioTranscript: 'Rewilding projects reintroduce missing apex predators like wolves to restored natural reserves. Top-down predator control regulates herbivore populations, allowing overgrazed riverbank vegetation to recover and restoring natural biodiversity.', keyPoints: ['Rewilding reintroduces apex predators', 'Predators control herbivore overgrazing', 'Restores riverbank vegetation and biodiversity'], sampleModelAnswer: 'The lecture covered ecological rewilding and apex predator reintroduction. The speaker explained that introducing top predators prevents overgrazing and restores native plant and animal habitats. In conclusion, rewilding rejuvenates damaged natural ecosystems.' },
  { id: 'rl_48', title: 'Macroeconomic Fiscal Stimulus', audioTranscript: 'During economic recessions, governments implement expansionary fiscal stimulus by increasing public infrastructure spending and reducing tax burdens, boosting consumer demand and restoring commercial employment growth.', keyPoints: ['Expansionary fiscal stimulus during recessions', 'Public infrastructure spending and tax cuts', 'Restores consumer demand and employment'], sampleModelAnswer: 'The speaker discussed fiscal policy mechanisms used during economic downturns. The lecture explained that public spending and tax reductions stimulate market demand and rebuild employment. Overall, fiscal intervention aids economic recovery.' },
  { id: 'rl_49', title: 'Synthetic Biology Microbial Engineering', audioTranscript: 'Synthetic biology re-engineers bacterial metabolic pathways to synthesize bio-based industrial chemicals, biodegradable plastics, and pharmaceutical precursors from simple plant sugars, replacing petrochemical manufacturing methods.', keyPoints: ['Microbial metabolic pathways re-engineered', 'Produces bio-plastics and pharmaceuticals', 'Replaces petroleum-based manufacturing'], sampleModelAnswer: 'The lecture explored synthetic biology and industrial biotechnology. The speaker highlighted that engineered microorganisms produce sustainable bioplastics and pharmaceuticals without fossil fuels. In conclusion, synthetic biology promotes green chemical manufacturing.' },
  { id: 'rl_50', title: 'Astronomy Gravitational Wave Astronomy', audioTranscript: 'Gravitational wave observatories like LIGO detect subatomic space-time ripples generated by colliding black holes billions of light years away, opening a non-optical observational window into cosmic phenomena across the universe.', keyPoints: ['LIGO detects space-time gravitational ripples', 'Generated by colliding black holes', 'Non-optical window into cosmic astrophysics'], sampleModelAnswer: 'The speaker presented gravitational wave astronomy as a new astronomical frontier. The lecture explained that laser detectors measure space-time ripples caused by merging black holes. Overall, gravitational waves revolutionize deep space exploration.' }
];

// ---------------------------------------------------------------------------
// 5. ANSWER SHORT QUESTION (50 ITEMS)
// ---------------------------------------------------------------------------
export const PRACTICE_ANSWER_SHORT_QUESTION: AnswerShortQuestion[] = [
  { id: 'asq_01', questionAudioTranscript: 'What instrument is used to measure body temperature?', correctAnswer: 'Thermometer', acceptableSynonyms: ['A thermometer'] },
  { id: 'asq_02', questionAudioTranscript: 'What is the frozen form of water called?', correctAnswer: 'Ice', acceptableSynonyms: ['Ice cube'] },
  { id: 'asq_03', questionAudioTranscript: 'How many sides does a triangle have?', correctAnswer: 'Three', acceptableSynonyms: ['3'] },
  { id: 'asq_04', questionAudioTranscript: 'Which organ pumps blood throughout the human body?', correctAnswer: 'Heart', acceptableSynonyms: ['The heart'] },
  { id: 'asq_05', questionAudioTranscript: 'What do you call a publication issued daily containing news?', correctAnswer: 'Newspaper', acceptableSynonyms: ['Paper', 'Daily newspaper'] },
  { id: 'asq_06', questionAudioTranscript: 'What is the term for a period of ten years?', correctAnswer: 'Decade', acceptableSynonyms: ['A decade'] },
  { id: 'asq_07', questionAudioTranscript: 'Which natural satellite orbits the Earth?', correctAnswer: 'Moon', acceptableSynonyms: ['The moon'] },
  { id: 'asq_08', questionAudioTranscript: 'What do we call a person who studies rocks and the Earth structure?', correctAnswer: 'Geologist', acceptableSynonyms: ['A geologist'] },
  { id: 'asq_09', questionAudioTranscript: 'What is the financial document that lists income and planned expenses?', correctAnswer: 'Budget', acceptableSynonyms: ['A budget'] },
  { id: 'asq_10', questionAudioTranscript: 'What branch of science deals with the study of living organisms?', correctAnswer: 'Biology', acceptableSynonyms: ['Biological science'] },
  { id: 'asq_11', questionAudioTranscript: 'What device is used to take photographs?', correctAnswer: 'Camera', acceptableSynonyms: ['A camera'] },
  { id: 'asq_12', questionAudioTranscript: 'How many years are there in a century?', correctAnswer: 'One hundred', acceptableSynonyms: ['100', 'Hundred'] },
  { id: 'asq_13', questionAudioTranscript: 'What primary liquid do humans need to drink to survive?', correctAnswer: 'Water', acceptableSynonyms: ['Fresh water'] },
  { id: 'asq_14', questionAudioTranscript: 'What do you call a practitioner who treats dental problems?', correctAnswer: 'Dentist', acceptableSynonyms: ['A dentist'] },
  { id: 'asq_15', questionAudioTranscript: 'Which instrument is used to view microscopic cells?', correctAnswer: 'Microscope', acceptableSynonyms: ['A microscope'] },
  { id: 'asq_16', questionAudioTranscript: 'What gas do plants absorb from the atmosphere during photosynthesis?', correctAnswer: 'Carbon dioxide', acceptableSynonyms: ['CO2'] },
  { id: 'asq_17', questionAudioTranscript: 'What force keeps human feet grounded on Earth surface?', correctAnswer: 'Gravity', acceptableSynonyms: ['Gravitational force'] },
  { id: 'asq_18', questionAudioTranscript: 'What is the written story of a person life written by someone else?', correctAnswer: 'Biography', acceptableSynonyms: ['A biography'] },
  { id: 'asq_19', questionAudioTranscript: 'Which geometric shape has four equal straight sides?', correctAnswer: 'Square', acceptableSynonyms: ['A square'] },
  { id: 'asq_20', questionAudioTranscript: 'What is the main subject of study in botany?', correctAnswer: 'Plants', acceptableSynonyms: ['Plant life', 'Flora'] },
  { id: 'asq_21', questionAudioTranscript: 'What do we call a period of one thousand years?', correctAnswer: 'Millennium', acceptableSynonyms: ['A millennium'] },
  { id: 'asq_22', questionAudioTranscript: 'What instrument is used by captains to determine direction north?', correctAnswer: 'Compass', acceptableSynonyms: ['A compass'] },
  { id: 'asq_23', questionAudioTranscript: 'Which organ in the human body is responsible for filtering blood?', correctAnswer: 'Kidney', acceptableSynonyms: ['The kidneys', 'Kidneys'] },
  { id: 'asq_24', questionAudioTranscript: 'What is the chemical symbol for gold?', correctAnswer: 'Au', acceptableSynonyms: ['AU'] },
  { id: 'asq_25', questionAudioTranscript: 'What do you call an author who writes plays for theater?', correctAnswer: 'Playwright', acceptableSynonyms: ['Dramatist', 'A playwright'] },
  { id: 'asq_26', questionAudioTranscript: 'Which planet in our solar system is known as the Red Planet?', correctAnswer: 'Mars', acceptableSynonyms: ['Planet Mars'] },
  { id: 'asq_27', questionAudioTranscript: 'What do we call a person who flies an aircraft?', correctAnswer: 'Pilot', acceptableSynonyms: ['Aviator', 'A pilot'] },
  { id: 'asq_28', questionAudioTranscript: 'What seasonal event occurs when day and night are of equal length?', correctAnswer: 'Equinox', acceptableSynonyms: ['An equinox'] },
  { id: 'asq_29', questionAudioTranscript: 'What hard skeleton structure protects the human brain?', correctAnswer: 'Skull', acceptableSynonyms: ['Cranium', 'The skull'] },
  { id: 'asq_30', questionAudioTranscript: 'What subject examines historical human artifacts and excavations?', correctAnswer: 'Archaeology', acceptableSynonyms: ['Archeology'] },
  { id: 'asq_31', questionAudioTranscript: 'What is the room in a university where chemical experiments are performed?', correctAnswer: 'Laboratory', acceptableSynonyms: ['Lab', 'A laboratory'] },
  { id: 'asq_32', questionAudioTranscript: 'What is the opposite of the word transparent?', correctAnswer: 'Opaque', acceptableSynonyms: ['Non-transparent'] },
  { id: 'asq_33', questionAudioTranscript: 'What scale is used to measure earthquake intensity?', correctAnswer: 'Richter scale', acceptableSynonyms: ['Richter', 'Moment magnitude scale'] },
  { id: 'asq_34', questionAudioTranscript: 'What is the main language spoken in Brazil?', correctAnswer: 'Portuguese', acceptableSynonyms: ['Portuguese language'] },
  { id: 'asq_35', questionAudioTranscript: 'What type of animal eats only plants?', correctAnswer: 'Herbivore', acceptableSynonyms: ['An herbivore'] },
  { id: 'asq_36', questionAudioTranscript: 'What document is issued by governments allowing international travel?', correctAnswer: 'Passport', acceptableSynonyms: ['A passport'] },
  { id: 'asq_37', questionAudioTranscript: 'Which continent is completely covered in ice and uninhabited permanently?', correctAnswer: 'Antarctica', acceptableSynonyms: ['Antarctic'] },
  { id: 'asq_38', questionAudioTranscript: 'What do you call a scientist who studies stars and galaxies?', correctAnswer: 'Astronomer', acceptableSynonyms: ['An astronomer', 'Astrophysicist'] },
  { id: 'asq_39', questionAudioTranscript: 'What natural disaster is caused by underwater tectonic movements?', correctAnswer: 'Tsunami', acceptableSynonyms: ['A tsunami', 'Tidal wave'] },
  { id: 'asq_40', questionAudioTranscript: 'What is the largest organ on the exterior human body?', correctAnswer: 'Skin', acceptableSynonyms: ['The skin'] },
  { id: 'asq_41', questionAudioTranscript: 'Which term describes a book of maps?', correctAnswer: 'Atlas', acceptableSynonyms: ['An atlas'] },
  { id: 'asq_42', questionAudioTranscript: 'What do we call the list of chapters and page numbers at the beginning of a book?', correctAnswer: 'Table of contents', acceptableSynonyms: ['Contents page', 'Contents'] },
  { id: 'asq_43', questionAudioTranscript: 'Which angle measures exactly ninety degrees?', correctAnswer: 'Right angle', acceptableSynonyms: ['A right angle'] },
  { id: 'asq_44', questionAudioTranscript: 'What do you call a legal agreement between two nations?', correctAnswer: 'Treaty', acceptableSynonyms: ['A treaty', 'Pact'] },
  { id: 'asq_45', questionAudioTranscript: 'What fundamental particle carries a negative electrical charge in an atom?', correctAnswer: 'Electron', acceptableSynonyms: ['An electron'] },
  { id: 'asq_46', questionAudioTranscript: 'What is the term for a animal that eats both plants and meat?', correctAnswer: 'Omnivore', acceptableSynonyms: ['An omnivore'] },
  { id: 'asq_47', questionAudioTranscript: 'Which mathematical operation is the inverse of multiplication?', correctAnswer: 'Division', acceptableSynonyms: ['Dividing'] },
  { id: 'asq_48', questionAudioTranscript: 'What currency is used across the European Union monetary zone?', correctAnswer: 'Euro', acceptableSynonyms: ['The Euro'] },
  { id: 'asq_49', questionAudioTranscript: 'What color do blue and yellow paint create when mixed together?', correctAnswer: 'Green', acceptableSynonyms: ['The color green'] },
  { id: 'asq_50', questionAudioTranscript: 'What medical specialty focuses on treating diseases in children?', correctAnswer: 'Pediatrics', acceptableSynonyms: ['Paediatrics'] }
];
