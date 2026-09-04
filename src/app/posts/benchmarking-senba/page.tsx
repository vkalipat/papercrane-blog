import type { Metadata } from "next";

import {
  ProteinImprovementFigure,
  RetentionFigure,
  SeedRepeatabilityFigure,
} from "./figures";
import styles from "./post.module.css";

const title = "Senba";
const description =
  "How Senba was fine-tuned from MarS-FM, what the training cost, and how it performed on 28 mdCATH validation proteins.";
const canonicalPath = "/posts/benchmarking-senba";
const publishedDate = "2026-08-25";

export const metadata: Metadata = {
  title: { absolute: `${title} | papercrane` },
  description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    type: "article",
    siteName: "papercrane",
    title,
    description,
    url: canonicalPath,
    publishedTime: publishedDate,
    authors: ["Vedant K.", "Harsha P."],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: [
    { "@type": "Person", name: "Vedant K." },
    { "@type": "Person", name: "Harsha P." },
  ],
  publisher: {
    "@type": "Organization",
    name: "papercrane",
  },
  citation: [
    "https://arxiv.org/abs/2509.24779",
    "https://doi.org/10.1038/s41597-024-04140-z",
  ],
  mainEntityOfPage: canonicalPath,
};

export default function SenbaPost() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className={styles.article} aria-label={title}>
        <div className={styles.prose}>
          <div className={styles.postMeta}>
            <span>Written by Vedant K. and Harsha P.</span>
            <time dateTime={publishedDate}>August 25, 2026</time>
          </div>

          <p className={styles.lead}>
            Senba is a 34.2 million parameter protein dynamics model built from
            Valence Labs&apos; public{" "}
            <a
              href="https://huggingface.co/valencelabs/mars-fm"
              target="_blank"
              rel="noreferrer"
            >
              MarS-FM
            </a>{" "}
            checkpoint. Given one structure, it generates possible conformations
            at a fixed 50-frame horizon. It keeps the same architecture and
            parameter count while adapting the weights.
          </p>

          <p>
            MarS-FM already learned molecular motion from simulation. Senba
            narrows that ability to one transition: an input frame and the frame
            exactly 50 steps later. Training pairs came from mdCATH trajectories
            at 450 K, using 128 protein domains for training and 32 for choosing
            the checkpoint.
          </p>

          <h2 className={styles.sectionHeading}>How Senba was trained</h2>

          <p>
            All 34,152,521 parameters were fine-tuned for ten epochs with batch
            size 8 and a learning rate of 3 × 10⁻⁶. That came to 160 optimizer
            updates over 30,720 sampled transitions.
          </p>

          <p>
            The direct fine-tuned checkpoint learned the transition but moved
            too far from the source model&apos;s ensemble behavior. Senba keeps
            7.35 percent of that learned weight change.
          </p>

          <div
            className={styles.equation}
            role="img"
            aria-label="Senba weights equal source weights plus 7.35 percent of adapted weights minus source weights"
          >
            θ<sub>Senba</sub> = θ<sub>source</sub> + 0.0735(θ<sub>adapted</sub> − θ<sub>source</sub>)
          </div>

          <p>
            The 7.35 percent is not the fraction of parameters trained. All
            parameters were optimized. It is the fraction of the final weight
            displacement retained afterward. The exact description is a
            full-model fine-tune followed by source-weight interpolation.
          </p>

          <p>
            The selected training run took 121.8 seconds on one H100 and peaked
            at 60.2 GiB of CUDA memory. Two repetitions took 126.0 and 130.4
            seconds. Together, the three final training runs used 6 minutes 18
            seconds of H100 time.
          </p>

          <p>
            A 160-epoch branch was tested as well. It learned a larger update,
            but most of that update had to be removed to preserve the ensemble,
            and its anchored checkpoint did not beat the ten-epoch version.
            The longer run was useful as a boundary test, but it did not produce
            the best model.
          </p>

          <p>
            The full search and benchmark campaign cost $19.45 on Modal. That
            includes the epoch sweep, rejected and interrupted runs, weight
            blending, the 28-protein comparison, equilibrium checks, and the two
            confirmation seeds. The final model&apos;s own fine-tuning was the
            two-minute part.
          </p>

          <h2 className={styles.sectionHeading}>Results</h2>

          <p>
            Senba and the source checkpoint were given the same 28 mdCATH
            validation proteins, transitions, and sampling protocol. Endpoint RMSD
            measures the distance from each generated endpoint to the target
            structure, and lower is better. Senba improved 27 of the 28
            proteins. The mean improvement was 0.0326 Å, with a 95% bootstrap
            interval from 0.0253 to 0.0401 Å.
          </p>

          <ProteinImprovementFigure />

          <p>
            Coordinate persistence predicts that the structure does not move.
            Senba beat that baseline on 22 proteins, with an average margin of
            0.4364 Å. It also improved on the first five-epoch Senba checkpoint
            by 0.0022 Å across the 28 proteins, winning 22 of the comparisons.
          </p>

          <SeedRepeatabilityFigure />

          <p>
            On the compact eight-protein panel, the three independently trained
            checkpoints improved on MarS-FM by 0.0301, 0.0229, and 0.0290 Å.
            Every checkpoint improved all eight proteins, and each confidence
            interval stayed above zero.
          </p>

          <p className={styles.transition}>
            The last comparison looked at the generated ensembles rather than
            one endpoint. It covered cross-correlation, pairwise distances,
            principal-component overlap, radius of gyration, per-residue
            flexibility, steric clashes, and native contacts. All seven
            aggregate means stayed within their limits.
          </p>

          <RetentionFigure />

          <p>
            Five aggregate means improved relative to the source. PCA overlap
            and native contacts shifted slightly in the other direction, but
            both stayed well inside their limits. Every protein passed the
            individual limits on all seven measurements.
          </p>

          <p className={styles.conclusion}>
            Senba is a small but consistent improvement over MarS-FM: about two
            minutes of fine-tuning, lower endpoint RMSD on 27 of 28 validation
            proteins, the same direction across three training seeds, and all
            seven ensemble checks passed.
          </p>

          <section
            className={styles.references}
            aria-labelledby="senba-references"
          >
            <h2 id="senba-references">References</h2>
            <ol>
              <li>
                Kapuśniak, K., Gabellini, C., Bronstein, M., Tossou, P., and Di
                Giovanni, F. <cite>MarS-FM: Generative Modeling of Molecular
                Dynamics via Markov State Models.</cite> ICLR 2026.{" "}
                <a
                  href="https://arxiv.org/abs/2509.24779"
                  target="_blank"
                  rel="noreferrer"
                >
                  Paper
                </a>
                ,{" "}
                <a
                  href="https://github.com/valence-labs/mars-fm"
                  target="_blank"
                  rel="noreferrer"
                >
                  code
                </a>
                , and{" "}
                <a
                  href="https://huggingface.co/valencelabs/mars-fm"
                  target="_blank"
                  rel="noreferrer"
                >
                  weights
                </a>
                .
              </li>
              <li>
                Mirarchi, A., Giorgino, T., and De Fabritiis, G.{" "}
                <cite>mdCATH: A Large-Scale MD Dataset for Data-Driven
                Computational Biophysics.</cite> <i>Scientific Data</i> 11, 1299
                (2024).{" "}
                <a
                  href="https://doi.org/10.1038/s41597-024-04140-z"
                  target="_blank"
                  rel="noreferrer"
                >
                  Paper
                </a>
                {" "}and{" "}
                <a
                  href="https://huggingface.co/datasets/compsciencelab/mdCATH"
                  target="_blank"
                  rel="noreferrer"
                >
                  dataset
                </a>
                .
              </li>
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}
