import {
  benchmarkSummary,
  equilibriumMetrics,
  proteinBenchmarks,
  seedBenchmarks,
} from "./data";
import styles from "./post.module.css";

const signed = (value: number, digits = 3) =>
  `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(digits)}`;

const axisValue = (value: number, digits = 2) =>
  value === 0
    ? "0"
    : `${value < 0 ? "−" : ""}${Math.abs(value).toFixed(digits)}`;

type FigureShellProps = {
  id: string;
  caption: string;
  children: React.ReactNode;
  scrollLabel: string;
};

function FigureShell({
  id,
  caption,
  children,
  scrollLabel,
}: FigureShellProps) {
  const captionId = `${id}-caption`;

  return (
    <figure className={styles.figure} aria-labelledby={captionId}>
      <figcaption id={captionId} className={styles.figureCaption}>
        {caption}
      </figcaption>
      <div
        className={styles.chartScroll}
        tabIndex={0}
        role="region"
        aria-label={scrollLabel}
      >
        {children}
      </div>
    </figure>
  );
}

export function ProteinImprovementFigure() {
  const data = [...proteinBenchmarks].sort(
    (a, b) => b.sourceImprovement - a.sourceImprovement,
  );
  const width = 900;
  const height = 580;
  const left = 108;
  const right = 42;
  const top = 60;
  const rowHeight = 17;
  const plotBottom = top + data.length * rowHeight;
  const axisY = plotBottom + 8;
  const min = -0.01;
  const max = 0.09;
  const plotWidth = width - left - right;
  const x = (value: number) => left + ((value - min) / (max - min)) * plotWidth;
  const zeroX = x(0);
  const ticks = [-0.01, 0, 0.02, 0.04, 0.06, 0.08];
  const meanX = x(benchmarkSummary.sourceImprovement);
  const ciLowX = x(benchmarkSummary.sourceImprovementLow);
  const ciHighX = x(benchmarkSummary.sourceImprovementHigh);

  return (
    <FigureShell
      id="protein-improvement"
      caption="Endpoint RMSD improvement by protein. The mean was 0.0326 Å, with a 95% confidence interval from 0.0253 to 0.0401 Å."
      scrollLabel="Per-protein endpoint RMSD improvement. Scroll horizontally on narrow screens."
    >
      <svg
        className={`${styles.chartSvg} ${styles.chartWide}`}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="protein-chart-title protein-chart-description"
      >
        <title id="protein-chart-title">
          Senba improvement over the source model for 28 proteins
        </title>
        <desc id="protein-chart-description">
          Twenty-seven proteins improved and one had a small negative result.
          The mean improvement was 0.0326 angstrom.
        </desc>

        <line
          className={styles.meanInterval}
          x1={ciLowX}
          x2={ciHighX}
          y1={31}
          y2={31}
        />
        <line
          className={styles.meanIntervalCap}
          x1={ciLowX}
          x2={ciLowX}
          y1={27}
          y2={35}
        />
        <line
          className={styles.meanIntervalCap}
          x1={ciHighX}
          x2={ciHighX}
          y1={27}
          y2={35}
        />
        <circle className={styles.meanPoint} cx={meanX} cy={31} r={3.5} />
        <text
          className={styles.meanLabel}
          x={meanX}
          y={18}
          textAnchor="middle"
        >
          mean 0.0326 Å
        </text>

        <line
          className={styles.zeroLine}
          x1={zeroX}
          x2={zeroX}
          y1={top - 10}
          y2={axisY}
        />

        {data.map((item, index) => {
          const centerY = top + index * rowHeight + rowHeight / 2;
          const valueX = x(item.sourceImprovement);
          const positive = item.sourceImprovement >= 0;

          return (
            <g key={item.id}>
              <text
                className={styles.rowLabel}
                x={left - 13}
                y={centerY + 3.5}
                textAnchor="end"
              >
                {item.id}
              </text>
              <line
                className={positive ? styles.dataStem : styles.negativeStem}
                x1={zeroX}
                x2={valueX}
                y1={centerY}
                y2={centerY}
              />
              <circle
                className={positive ? styles.dataPoint : styles.negativePoint}
                cx={valueX}
                cy={centerY}
                r={3.2}
              />
            </g>
          );
        })}

        <line
          className={styles.axisBaseline}
          x1={x(min)}
          x2={x(max)}
          y1={axisY}
          y2={axisY}
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.axisTick}
              x1={x(tick)}
              x2={x(tick)}
              y1={axisY}
              y2={axisY + 5}
            />
            <text
              className={styles.axisText}
              x={x(tick)}
              y={axisY + 20}
              textAnchor="middle"
            >
              {axisValue(tick)}
            </text>
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}

export function SeedRepeatabilityFigure() {
  const width = 780;
  const height = 220;
  const left = 98;
  const right = 84;
  const plotWidth = width - left - right;
  const max = 0.045;
  const x = (value: number) => left + (value / max) * plotWidth;
  const ticks = [0, 0.02, 0.04];
  const rows = [54, 104, 154];
  const axisY = 180;

  return (
    <FigureShell
      id="seed-repeatability"
      caption="The same ten-epoch run repeated across three training seeds. Lines show 95% confidence intervals."
      scrollLabel="Seed repeatability. Scroll horizontally on narrow screens."
    >
      <svg
        className={`${styles.chartSvg} ${styles.chartMedium}`}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="seed-chart-title seed-chart-description"
      >
        <title id="seed-chart-title">
          Improvement over source across three random seeds
        </title>
        <desc id="seed-chart-description">
          All three seed means are positive and all three 95 percent confidence
          intervals exclude zero.
        </desc>

        <line
          className={styles.zeroLine}
          x1={x(0)}
          x2={x(0)}
          y1={34}
          y2={axisY}
        />

        {seedBenchmarks.map((item, index) => {
          const y = rows[index];
          return (
            <g key={item.seed}>
              <text
                className={styles.rowLabel}
                x={left - 15}
                y={y + 4}
                textAnchor="end"
              >
                {item.seed.toLowerCase()}
              </text>
              <line
                className={styles.intervalLine}
                x1={x(item.low)}
                x2={x(item.high)}
                y1={y}
                y2={y}
              />
              <circle
                className={styles.meanPoint}
                cx={x(item.improvement)}
                cy={y}
                r={4.2}
              />
              <text
                className={styles.valueText}
                x={x(item.high) + 10}
                y={y + 4}
              >
                {signed(item.improvement, 4)} Å
              </text>
            </g>
          );
        })}

        <line
          className={styles.axisBaseline}
          x1={x(0)}
          x2={x(max)}
          y1={axisY}
          y2={axisY}
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.axisTick}
              x1={x(tick)}
              x2={x(tick)}
              y1={axisY}
              y2={axisY + 5}
            />
            <text
              className={styles.axisText}
              x={x(tick)}
              y={axisY + 20}
              textAnchor="middle"
            >
              {tick.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}

export function RetentionFigure() {
  const data = equilibriumMetrics.map((metric) => ({
    ...metric,
    ratio: metric.mean / metric.gate,
  }));
  const width = 860;
  const height = 326;
  const left = 218;
  const right = 42;
  const top = 42;
  const rowHeight = 34;
  const min = -0.3;
  const max = 1.05;
  const plotWidth = width - left - right;
  const x = (value: number) => left + ((value - min) / (max - min)) * plotWidth;
  const zeroX = x(0);
  const gateX = x(1);
  const ticks = [-0.25, 0, 0.5, 1];
  const plotBottom = top + (data.length - 1) * rowHeight;
  const axisY = plotBottom + 23;

  return (
    <FigureShell
      id="retention"
      caption="Mean change relative to each allowed degradation gate. Negative values favor Senba; 1.0 is the limit."
      scrollLabel="Equilibrium retention. Scroll horizontally on narrow screens."
    >
      <svg
        className={`${styles.chartSvg} ${styles.chartWide}`}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="retention-chart-title retention-chart-description"
      >
        <title id="retention-chart-title">
          Mean degradation for seven equilibrium metrics relative to their gates
        </title>
        <desc id="retention-chart-description">
          Every metric is below its mean rejection boundary. Five metrics
          improved. PCA overlap and native contacts changed slightly but stayed
          inside their limits.
        </desc>

        <line
          className={styles.zeroLine}
          x1={zeroX}
          x2={zeroX}
          y1={top - 15}
          y2={axisY}
        />
        <line
          className={styles.gateLine}
          x1={gateX}
          x2={gateX}
          y1={top - 15}
          y2={axisY}
        />

        {data.map((item, index) => {
          const y = top + index * rowHeight;
          const valueX = x(item.ratio);
          const degraded = item.ratio > 0;

          return (
            <g key={item.short}>
              <text
                className={styles.rowLabel}
                x={left - 16}
                y={y + 4}
                textAnchor="end"
              >
                {item.label}
              </text>
              <line
                className={degraded ? styles.negativeStem : styles.dataStem}
                x1={zeroX}
                x2={valueX}
                y1={y}
                y2={y}
              />
              <circle
                className={degraded ? styles.negativePoint : styles.dataPoint}
                cx={valueX}
                cy={y}
                r={3.8}
              />
              <text
                className={degraded ? styles.negativeText : styles.valueText}
                x={valueX + 9}
                y={y + 4}
                textAnchor="start"
              >
                {signed(item.ratio * 100, 1)}%
              </text>
            </g>
          );
        })}

        <line
          className={styles.axisBaseline}
          x1={x(min)}
          x2={x(max)}
          y1={axisY}
          y2={axisY}
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className={styles.axisTick}
              x1={x(tick)}
              x2={x(tick)}
              y1={axisY}
              y2={axisY + 5}
            />
            <text
              className={tick === 1 ? styles.gateLabel : styles.axisText}
              x={x(tick)}
              y={axisY + 20}
              textAnchor="middle"
            >
              {tick === 1 ? "limit" : `${Math.round(tick * 100)}%`}
            </text>
          </g>
        ))}
      </svg>
    </FigureShell>
  );
}
