# Compare centerlines

Puts two centerline files side by side (e.g. AI result vs reviewer) and shows where they differ. Open it from **Tracing → Comparison** — window *Centerline Comparison — AICafe/Reviewer vs Reviewer*.

![Comparison window: Source, Reviewer and Difference panels, legend on the right](/images/mocha/compare-layout.png)

## Compare two files

::: steps
1. **Browse Source** and **Browse Reviewer** — `.swc`, `.yaml` or `.yml`.
2. **Load**, then **Compare**.
3. Inspect the *Source*, *Reviewer* and *Difference* panels. Selecting a vessel in one panel highlights it in all; **Sync camera** (on by default) rotates them together.
:::

![Load, then Compare](/images/mocha/compare-workflow.png)

| Colour category | Meaning |
| --- | --- |
| Matched | In both files |
| Unmatched label | In both, labelled differently |
| Unmatched Source | Only in *Source* |
| Unmatched Reviewer | Only in *Reviewer* |

*Diff: unmatched only* hides the matched part. Ticking vessel types in the legend recolours the segments by vessel type and dims the others; changing a category option switches back to category colours.

## Metrics for one vessel

::: steps
1. **Load** (and **Compare** if you use the Difference panel).
2. **Metrics mode**:
   - **Loaded graph (memory radii)** (default) — uses the radii in the files. Fastest.
   - **TIF mask (loaded centerlines)** — recomputes radii from a mask: set **Mask TIF:** (**Browse**), and if needed **TIF keypoint:** / **TIF ref YAML:**.
3. Set **Spacing (mm):**, or **Load spacing XML**.
4. Pick the vessel: click it in 3D, or choose it in the panel's dropdown (default *(3D selection)*).
5. **Compute**.
:::

::: warning Volume needs a radius
Volume is only computed if the data carries radii.
:::

::: details Metrics mode screenshots
![Metrics mode: Loaded graph](/images/mocha/compare-metrics-loaded.png)

![Metrics mode: TIF mask](/images/mocha/compare-metrics-tif.png)
:::
