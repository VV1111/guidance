# 3D tracing

Open the **3D Tracing** tab (next to *Contour Labeling*). Left: the control column. Centre: the 3D volume. Around it: Axial / Sagittal / Coronal MPR views, each with a slider and arrow buttons for the slice index.

![3D Tracing layout](/images/mocha/tracing-layout.png)

## Two ways to annotate

| Mode | Use it when | Where the points go |
| --- | --- | --- |
| **3D volume** | The vessel has strong contrast in the 3D render (typical TOF) | Directly into the centerline tree — no *Commit to 3D* needed |
| **2D MPR** | The render is weak but the vessel is visible on axial / sagittal / coronal slices (typical T1, dark-blood VWI), or you want fewer clicks plus auto-fit | Into the MPR draft first; *Commit to 3D* writes the tree |

This page covers the 3D mode. For the MPR mode see [2D MPR editing](./2d-editing).

### New vs Existing

The **CENTERLINE** switch decides what the next commit does:

- **New** — the next *Commit to 3D* adds a new segment.
- **Existing** — select one segment in 3D, switch to *Existing*; its key points load into the MPR draft and *Commit to 3D* replaces that segment's geometry.

## Create a new centerline in 3D

::: steps
1. Set **New** (or keep an existing centerline selected if you are extending it).
2. Turn **3D → Add Points** on.
3. Left-click on the vessel in the central 3D view. Rotate the volume as needed so the click ray hits the lumen. Each valid click adds a key point.
4. Turn **Add Points** off — the segment is created.
:::

<StepVideo src="" title="Create a centerline in 3D" />

::: tip Undo in 3D
With the 3D view maximised and *Add Points* still on, `Ctrl` + `Z` removes the last 3D-added point. This is a separate undo stack from the MPR draft.
:::

## Modify an existing centerline in 3D

::: steps
1. Click a segment in the 3D view to select it. It turns **white**.
2. Press `Delete` to remove the selected point.
3. `Shift` + click to adjust a point's position.
4. Use the cross-section view to refine the point position precisely.
:::

<StepVideo src="" title="Select, delete and move points in 3D" />

For finer corrections (inserting points between two anchors, or re-fitting a stretch of vessel) switch to [2D MPR editing](./2d-editing#edit-an-existing-segment-in-2d).

## Control column {#control-column}

Top to bottom, using the labels shown in the UI.

| Area | Control | Role |
| --- | --- | --- |
| Row 1 | **Display:** + combo box | Active sequence. MPR, 3D rendering and voxel coordinates for edits follow this choice |
| Row 1 (right) | **Heatmap**, —, × | Optional segmentation NIfTI overlay on 3D + MPR; × clears it |
| Row 2 | **Opacity** slider, *Translucent / Isosurface*, *Soft* | Heatmap display only; no effect on centerline data |
| CENTERLINE | **New / Existing** | Whether *Commit to 3D* adds a segment or replaces the selected one |
| Step 1 Draw points | **2D → Edit Sparse Points** | When on: edit sparse draft points in the MPR views (not in the tree until *Commit to 3D*) |
| Same row | **3D → Add Points** | When on: left-click on the 3D volume adds points directly to the centerline |
| Step 2 Insert Points | Small toggle, slot buttons, **✓ Insert**, **Clear** | Anchor-based single insertions on MPR (mainly under *Existing*); *Clear* drops anchors and anchor-inserted points |
| Step 3 Select | **○ > ～ / ～ > ○** | Hover priority between key points and dense points in 3D |
| Fit row | **BASE / VWI** + **Generate** | Auto-fit the MPR draft and resparse it; replaces the draft only |
| Commit | **Commit to 3D** | Writes the MPR draft into the 3D centerline; needs ≥ 2 draft points |
| Bottom | **Cross** | With exactly one vessel selected in 3D, jump to *Contour Labeling* for cross-sections |

## Menus you will need

- **Tracing → Add Vessel Type / Delete Vessel Type** — manage vessel labels.
- **Tracing → To Key Point Based** — downsample dense polylines to key points.
- **Tracing → Comparison** — open the [comparison tool](./compare).
- **File → Save** (`Ctrl` + `S`) / **Save As…** — persist the centerline.

## Cross-sections (Contour Labeling)

**Cross** opens *Contour Labeling* along the selected vessel. Select exactly **one** segment in 3D, then click **Cross**. If the selection is not unique, a message is printed and nothing happens.

<StepVideo src="" title="Jump from a vessel to its cross-sections" />
