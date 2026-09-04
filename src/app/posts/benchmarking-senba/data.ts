export type ProteinBenchmark = {
  id: string;
  sourceImprovement: number;
  persistenceImprovement: number;
};

export const benchmarkSummary = {
  parameters: 34_152_521,
  proteins: 28,
  sourceImprovement: 0.0325922111581212,
  sourceImprovementLow: 0.02525014950148637,
  sourceImprovementHigh: 0.040114625364512255,
  proteinsBetterThanSource: 27,
  persistenceImprovement: 0.4364052826817221,
  proteinsBetterThanPersistence: 22,
  retentionGatesPassed: 7,
  retentionGatesTotal: 7,
  improvementOverPreviousSenba: 0.00216273137725704,
  proteinsBetterThanPreviousSenba: 22,
} as const;

export const trainingSummary = {
  epochs: 10,
  optimizerUpdates: 160,
  sampledTransitions: 30_720,
  batchSize: 8,
  learningRate: 3e-6,
  blend: 0.0735,
  selectedRunSeconds: 121.79760014299998,
  replicationSeconds: [
    121.79760014299998,
    125.98805148599999,
    130.42531005700002,
  ],
  replicationTotalSeconds: 378.210961686,
  peakCudaGiB: 60.24,
  campaignCostUsd: 19.451563639999996,
} as const;

export const proteinBenchmarks: ProteinBenchmark[] = [
  { id: "1d1rA00", sourceImprovement: 0.0217256570667832, persistenceImprovement: 0.9537240495659791 },
  { id: "1e7uA04", sourceImprovement: 0.06635897186434292, persistenceImprovement: 0.5149769102211295 },
  { id: "1h4yA00", sourceImprovement: 0.0418509559295579, persistenceImprovement: 0.22033741973402954 },
  { id: "1jeyB03", sourceImprovement: 0.08156112205738353, persistenceImprovement: 1.2044744714309843 },
  { id: "1nktA02", sourceImprovement: 0.04742557231089606, persistenceImprovement: 0.44746261411252775 },
  { id: "1q16B03", sourceImprovement: 0.03660349491889647, persistenceImprovement: 0.7257780606234068 },
  { id: "1rquA01", sourceImprovement: 0.008323592408094882, persistenceImprovement: 1.8858914144742513 },
  { id: "2dp9A01", sourceImprovement: 0.008758476198289067, persistenceImprovement: -0.6272755183938967 },
  { id: "2f2cA02", sourceImprovement: 0.031179340722999882, persistenceImprovement: 0.7645881213225749 },
  { id: "2incC00", sourceImprovement: 0.030418514688641096, persistenceImprovement: 0.4610114264775973 },
  { id: "2izwC00", sourceImprovement: 0.04142448078263605, persistenceImprovement: -0.13981274361730378 },
  { id: "2ji7A03", sourceImprovement: 0.0337787132934011, persistenceImprovement: 0.051978667255809796 },
  { id: "2k4qA00", sourceImprovement: 0.024334332199050124, persistenceImprovement: 0.32883278099041746 },
  { id: "2k54A00", sourceImprovement: 0.040033867338310714, persistenceImprovement: -0.46020310958796884 },
  { id: "2kjrA01", sourceImprovement: 0.016205079020728874, persistenceImprovement: 1.4604137236244572 },
  { id: "3aekA03", sourceImprovement: 0.03710378408937132, persistenceImprovement: 0.5786139214024963 },
  { id: "3atsA01", sourceImprovement: 0.04148384120566462, persistenceImprovement: 0.20788321390406317 },
  { id: "3d8lA00", sourceImprovement: 0.004197499422030404, persistenceImprovement: 2.0063157112889467 },
  { id: "3i01A03", sourceImprovement: 0.04505940499652006, persistenceImprovement: -0.647370447977841 },
  { id: "3mg3A01", sourceImprovement: 0.016587115498079896, persistenceImprovement: -0.3028312878629542 },
  { id: "3pt1A02", sourceImprovement: 0.0493324027839499, persistenceImprovement: 0.6971612857436362 },
  { id: "3tdgA01", sourceImprovement: 0.011343461526418963, persistenceImprovement: 0.48438079640615683 },
  { id: "4b96A00", sourceImprovement: 0.01762705665974007, persistenceImprovement: 0.27100829259371206 },
  { id: "4deqA02", sourceImprovement: -0.0048515754505995545, persistenceImprovement: 0.6473776731505758 },
  { id: "4nreA01", sourceImprovement: 0.007202589613928723, persistenceImprovement: 0.31957326632080196 },
  { id: "4pkiG02", sourceImprovement: 0.051415757478777024, persistenceImprovement: 0.11107006735801939 },
  { id: "4qncB00", sourceImprovement: 0.0626686097356064, persistenceImprovement: -0.1476554018994971 },
  { id: "5k2mA01", sourceImprovement: 0.04342979406789382, persistenceImprovement: 0.20164253642610674 },
];

export const seedBenchmarks = [
  { seed: "Seed 01", improvement: 0.030089207430793796, low: 0.01839214931751365, high: 0.04306723852228189 },
  { seed: "Seed 02", improvement: 0.022905611767840894, low: 0.013268226510653514, high: 0.034294909639703275 },
  { seed: "Seed 03", improvement: 0.029012580049456393, low: 0.01834818349385936, high: 0.038582393840849424 },
] as const;

export const equilibriumMetrics = [
  { label: "Dynamic cross-correlation", short: "DCCM MAE", mean: -0.000659761524, gate: 0.005 },
  { label: "Pairwise ensemble distance", short: "RMSD W1", mean: -0.043699034661, gate: 0.25 },
  { label: "Principal-component overlap", short: "PCA RMSIP", mean: 0.004161025684, gate: 0.03 },
  { label: "Radius of gyration", short: "Rg W1", mean: -0.04215244792, gate: 0.15 },
  { label: "Per-residue flexibility", short: "RMSF RMSE", mean: -0.022244200546, gate: 0.15 },
  { label: "Predicted steric clashes", short: "Clash fraction", mean: -0.00000119536, gate: 0.0005 },
  { label: "Native-contact distribution", short: "Contact W1", mean: 0.000271095576, gate: 0.015 },
] as const;
