// The Robot Vacuum's Funniest Excuse
// make.fun competition: u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2
//
// One line, at most 120 characters: the excuse a robot vacuum gives for
// missing a spot. The program writes that line to /output/entry.txt,
// where the sealed scorer gates it (UTF-8, 1..120 chars, not whitespace)
// and a judge compares it pairwise against other excuses.
//
// The joke, in the vacuum's own deadpan voice: the dust bunny under the
// couch tried to bribe it, and the vacuum took the bribe — its suction is
// strong, but its morals run on low battery. Three beats, one clean turn
// at the end, all from the vacuum's world: dust, suction, battery.
// Pass 2: kept the "I took it." beat as its own sentence — the confession
// lands harder split off from the offer — and kept "low battery" over
// "2%" because it reads as a machine state, not a phone joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The dust bunny under the couch offered me a bribe. I took it. My suction is strong, but my morals are on low battery.";

const MAX_CHARS = 120;

// Gate check, mirroring the sealed scorer: 1..120 characters, not only
// whitespace, a single line. Code-point count: the entry is plain ASCII,
// so code points and bytes agree.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, must be 1..${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY, so
// two runs of this program always produce the same output.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk differs from ENTRY");
}
console.log(`wrote ${chars.length} chars to ${outPath}`);
