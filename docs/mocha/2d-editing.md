# 2D MPR editing

Place a few points on the slices, let **Generate** fit the path along the vessel, then **Commit to 3D**. Nothing reaches 3D before the commit. Best for vessel wall images, where the vessel is clearer on the slices than in the 3D render.

## Create a centerline {#create}

::: steps
1. **CENTERLINE: New**. Turn **Draw points: 2D** on.
2. Click a few points along the vessel in the axial / sagittal / coronal views.
3. Choose **BASE** (bright-blood) or **VWI** (dark-blood / vessel wall), then **Generate**.
4. **Commit to 3D** — the new segment appears in 3D, and the mode switches to **Existing** with it loaded.
:::

<StepVideo src="/videos/mocha/draft-2d.mp4" title="2D points → VWI → Generate → Commit to 3D" loop />

## Navigate with the straightened view {#straightened-view}

Select a segment in 3D (it turns **white**). The *Straightened* strip shows that vessel flattened, with its key points marked. Click a **key-point marker** on the strip: the point is selected and all MPR views jump to it. *Cross-section* shows the vessel at that point.

<StepVideo src="/videos/mocha/straightened-view.mp4" title="Select in 3D → straightened view and cross-section" loop />

## Edit an existing segment {#edit}

::: steps
1. Click the segment in 3D. The mode switches to **Existing** and its points load into the 2D draft.
2. Turn **Draw points: 2D** on. Use the straightened view to reach the right slice.
3. Add, move or delete points (table below).
4. **Commit to 3D** replaces the segment.
:::

<StepVideo src="/videos/mocha/edit-2d.mp4" title="Existing → edit points on the slices" loop />

| Goal | *New* | *Existing* |
| --- | --- | --- |
| Add a point | Click an empty area | Click |
| Select a point | Click near it | `Shift` + click near it, or click it in the straightened view |
| Move it | After selecting, click again on the **same** view and slice | same |
| Delete it | `Delete` / `Backspace` | same |
| Undo | `Ctrl` + `Z` | same |

While **Draw points: 2D** is on, clicking a slice edits points instead of moving the crosshair — browse with the scroll wheel or the slider.

## Anchor Insert {#anchor-insert}

Restricts a new point to a chosen stretch of the vessel, so a click cannot land on the wrong part of the line. Available in **Existing**, with **Draw points: 2D** on.

::: steps
1. Turn **Insert Points** on. Slot 1 is always on; enable slot 2 to insert **between** two points.
2. In the *Straightened* view, click the anchor point(s), then **✓ Insert**.
3. Click once in an MPR view — the point is inserted between the anchors.
4. **Clear** drops the anchors and the inserted points.
:::

Slot colours: **grey** off · **green** on, not assigned · **red** anchor assigned.

<StepVideo src="/videos/mocha/anchor-insert.mp4" title="Insert Points → anchors in the straightened view → ✓ Insert" loop />

![Anchor Insert controls and anchor states](/images/mocha/anchor-insert.png)
