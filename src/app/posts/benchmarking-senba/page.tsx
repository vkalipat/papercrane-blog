import type { Metadata } from "next";

import {
  ProteinImprovementFigure,
  RetentionFigure,
  SeedRepeatabilityFigure,
} from "./figures";
import styles from "./post.module.css";

const title = "Senba";
const description =
  "How we fine-tuned Senba from MarS-FM, what it cost, and how it performed on 28 mdCATH validation proteins.";
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
            Senba is a 34.2 million parameter protein dynamics model we built from
            Valence Labs&apos;{" "}
            <a
              href="https://huggingface.co/valencelabs/mars-fm"
              target="_blank"
              rel="noreferrer"
            >
              MarS-FM
            </a>{" "}
            checkpoint. Give it one structure and it generates possible
            conformations 50 frames later.
          </p>

          <p>
            MarS-FM had already learned molecular motion from simulation. We gave
            Senba a narrower job: model the transition from one frame to the frame
            exactly 50 steps later. Training pairs came from mdCATH trajectories
            at 450 K. We used 128 protein domains to train and 32 to choose the
            checkpoint.
          </p>

          <h2 className={styles.sectionHeading}>How Senba was trained</h2>

          <h3 className={styles.subheading}>What we did</h3>

          <p>
            We fine-tuned all 34,152,521 parameters for ten epochs at batch size 8
            and a learning rate of 3 × 10⁻⁶. That came to 160 optimizer updates
            over 30,720 sampled transitions.
          </p>

          <p>
            The direct fine-tune learned the transition but moved too far from
            MarS-FM&apos;s ensemble behavior. We used source-weight interpolation
            to retain 7.35 percent of its weight displacement.
          </p>

          <div
            className={styles.equation}
            role="img"
            aria-label="Senba weights equal source weights plus 7.35 percent of adapted weights minus source weights"
          >
            θ<sub>Senba</sub> = θ<sub>source</sub> + 0.0735(θ<sub>adapted</sub> − θ<sub>source</sub>)
          </div>

          <h3 className={styles.subheading}>What it took</h3>

          <p>
            The selected training run took 121.8 seconds on one H100 and peaked
            at 60.2 GiB of CUDA memory. The two repetitions took 126.0 and 130.4
            seconds.
          </p>

          <p>
            We also tried a 160-epoch branch, which learned a bigger update. Most
            of it had to be removed to preserve the ensemble, and the anchored
            checkpoint did not beat the ten-epoch version.
          </p>

          <p>
            The whole search and benchmark campaign cost $19.45 on Modal. That
            includes the epoch sweep, rejected and interrupted runs, weight
            blending, the 28-protein comparison, equilibrium checks, and two
            confirmation seeds.
          </p>

          <h2 className={styles.sectionHeading}>Results</h2>

          <h3 className={styles.subheading}>Senba vs. MarS-FM</h3>

          <p>
            Senba and the source checkpoint used the same 28 mdCATH validation
            proteins, transitions, and sampling protocol. Endpoint RMSD tells us
            how far each generated endpoint lands from the target structure; lower
            is better. Senba improved on 27 of the 28 proteins. The mean
            improvement was 0.0326 Å, with a 95% bootstrap interval from 0.0253 to
            0.0401 Å.
          </p>

          <ProteinImprovementFigure />

          <p>
            Coordinate persistence assumes the structure does not move. Senba beat
            this baseline on 22 proteins, by an average 0.4364 Å. It also beat the
            first five-epoch Senba checkpoint by 0.0022 Å across all 28 proteins
            and won 22 comparisons.
          </p>

          <h3 className={styles.subheading}>Did it repeat?</h3>

          <p>
            On a compact eight-protein panel, three independently trained
            checkpoints improved on MarS-FM by 0.0301, 0.0229, and 0.0290 Å. Each
            checkpoint improved all eight proteins, and each confidence interval
            stayed above zero.
          </p>

          <SeedRepeatabilityFigure />

          <h3 className={`${styles.subheading} ${styles.transition}`}>
            Did the ensemble hold up?
          </h3>

          <p>
            We also checked the generated ensemble: cross-correlation, pairwise
            distances, principal-component overlap, radius of gyration,
            per-residue flexibility, steric clashes, and native contacts.
          </p>

          <RetentionFigure />

          <p>
            Five of the seven aggregate means improved relative to the source. PCA
            overlap and native contacts moved slightly the other way, but both
            stayed well inside their limits. Every protein passed the individual
            limits on all seven measurements.
          </p>

          <p className={styles.conclusion}>
            Senba suggests that today&apos;s dynamics models still have room to
            improve. This low-budget fine-tune produced a small, consistent gain
            that future training campaigns can try to extend.
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
