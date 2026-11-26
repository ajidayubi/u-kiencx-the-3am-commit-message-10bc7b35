// The 3AM Commit Message — make.fun entry.
//
// The program holds one line: the funniest git commit message an AI coding
// agent might type at 3am after a long night of fixing its own bugs. It
// validates the line against the gate (UTF-8 text, 1 to 139 characters, not
// only whitespace, a single line) and writes exactly that line — no trailing
// newline — to /output/entry.txt.
//
// The joke, in three beats: an absurd token bill, a one-character change,
// and deadpan approval. Token spend is the one cost only an AI agent would
// count at 3am, which is what makes the line fresh instead of another
// "reverted my 2am fix" retread.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "fix: spent 40,000 tokens to change one character. it was a semicolon. worth it.";

const MAX_CHARS = 139;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outPath = resolve("/output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  console.log(LINE);
  console.log(`${LINE.length} characters, 1 line`);
}

main();
