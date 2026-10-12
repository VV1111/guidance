# Compare centerlines

The comparison tool (*Centerline Comparison — AI/Reviewer*, MOCHA+ 3.0.4) puts two centerline files side by side and shows where they differ. Open it from **Tracing → Comparison**.

![Comparison window: Source, Reviewer and Difference panels, legend on the right](/images/mocha/compare-layout.png)

## Basic workflow (visualisation only)

::: steps
1. **Browse** a *Source* file and a *Reviewer* file (`.swc` or `.yaml`).
2. Click **Load**.
3. Click **Compare**.
4. Inspect the *Source*, *Reviewer* and *Difference* panels.
:::

![Load, then Compare](/images/mocha/compare-workflow.png)

<StepVideo src="" title="Load two centerlines and compare them" />

### Linked interaction

- Selecting a vessel (artery / segment) in **any** panel highlights the same vessel in **all** panels.
- Enable **Sync camera** to rotate and zoom all panels together.

### Two-layer colouring in the Difference panel

**Layer 1 — difference categories.** After *Compare*, colours follow these categories only:

| Category | Meaning |
| --- | --- |
| Matched | Present in both files |
| Unmatched Label | Present in both, but labelled differently |
| Unmatched Source | Only in *Source* |
| Unmatched Reviewer | Only in *Reviewer* |

*Diff: unmatched only* belongs to this layer.

**Layer 2 — vessel-type filter (legend).** Toggling vessel checkboxes in the legend keeps selected vessels at full brightness, dims unselected ones, and recolours the same segments by vessel type.

**Priority rule.** Changing a Layer 1 option restores category-only colouring. Changing a Layer 2 checkbox overlays vessel colouring on the current segments.

## Metrics

::: warning Volume needs a radius
Volume is computed only if the data carries radii (e.g. YAML / SWC with radius). Without a radius, volume is **not** computed.
:::

### Mode 1 — Loaded graph (default)

Uses the radii from the SWC / YAML file or the viewer defaults. No mask needed; fastest.

![Metrics mode: Loaded graph](/images/mocha/compare-metrics-loaded.png)

::: steps
1. **Load** (and **Compare** if you use the Difference panel).
2. Keep **Metrics mode = Loaded graph**.
3. Optionally set **Spacing (mm)** or load an XML with the spacing.
4. Select a vessel in a panel — either click a segment in 3D, or pick a label from the **Vessel** dropdown.
5. Click **Compute**.
:::

### Mode 2 — TIF mask

Radii are recomputed from a segmentation mask. More accurate, but needs the mask as extra input.

![Metrics mode: TIF mask](/images/mocha/compare-metrics-tif.png)

::: steps
1. **Load** (and **Compare** if you use the Difference panel).
2. Set **Metrics mode = TIF mask**.
3. **Select Mask TIF** (the `.whole.tif` file).
4. Set the spacing as above.
5. Configure the TIF key point if needed.
6. Select a vessel, then click **Compute**.
:::

<StepVideo src="" title="Compute metrics for one vessel" />
