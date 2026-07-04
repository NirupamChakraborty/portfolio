// Computes a grid-column span for each project card so a bento-style grid
// (first card wide) never leaves an empty gap in the final row.
export function getProjectSpans(count, cols = 3, firstSpan = 2) {
  const spans = Array(count).fill(1);
  if (count > 0) spans[0] = Math.min(firstSpan, cols);
  const total = spans.reduce((a, b) => a + b, 0);
  const remainder = total % cols;
  if (remainder !== 0 && count > 0) {
    spans[count - 1] += cols - remainder;
  }
  return spans;
}
