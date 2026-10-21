# 3D tracing

Click directly on the vessel in the 3D view. Points go straight into the centerline — no *Commit to 3D* needed. Best when the vessel is bright in the 3D render (typical TOF-MRA); otherwise use [2D MPR editing](./2d-editing).

![3D Tracing layout](/images/mocha/tracing-layout.png)

## Trace in 3D {#create}

::: steps
1. Set **Display:** to a sequence where the vessels are bright (e.g. the TOF).
2. Turn **Draw points: 3D** on (`Ctrl` + `A`).
3. Click along the vessel in the 3D view. Rotate the volume so each click hits the lumen.
4. Turn **3D** off — the segment is created.
:::

- Click an existing key point first to start a **branch** from it.
- Clicking the same spot twice, or `Ctrl` + `Z` (3D view maximised), removes the last point.
- A dense centerline (e.g. from an `.swc`) must be converted first: **Tracing → To Key Point Based**.

<StepVideo src="/videos/mocha/trace-3d.mp4" title="Display TOF → Draw points 3D → click along the vessel" loop />

## Change a segment in 3D

With **Draw points: 3D** off:

| To… | Do this |
| --- | --- |
| Select a whole segment | Click its line (it turns white; the mode switches to **Existing**) |
| Select one key point | Click the point |
| Delete | `Delete` — removes the selected point, or the **whole segment** if the line is selected. Right-click also deletes the key point under the cursor |
| Move a key point | Select one point, then `Shift` + click — it snaps to the brightest voxel along the view ray |

For finer corrections use [2D editing](./2d-editing#edit).

## Cross-sections

Select **one** segment and click **Cross** — see [Contour labeling](./contour-labeling).

::: details Control column, top to bottom
| Control | Role |
| --- | --- |
| **Display:** | Active sequence for MPR, 3D and edits |
| **Heatmap**, **Opacity**, *Translucent / Isosurface*, *Soft* | Optional segmentation overlay (display only) |
| **CENTERLINE: New / Existing** | *Commit to 3D* adds a segment, or replaces the selected one |
| **1 Draw points: 2D / 3D** | Edit the 2D draft on the slices / click points in the 3D view |
| **2 Insert Points** *(Existing only)* | [Anchor Insert](./2d-editing#anchor-insert) |
| **3 Select** *(Existing only)* | Hover priority between key points and dense points (`Ctrl` + `D`) |
| **BASE / VWI** + **Generate** *(New only)* | Auto-fit the 2D draft |
| **Commit to 3D** | Write the 2D draft into the centerline (≥ 2 points) |
| **Cross** | Open the selected vessel in *Contour Labeling* |

Menus: **Tracing → Add Vessel Type**, **Tracing → To Key Point Based**, **Tracing → Comparison** ([compare tool](./compare)).
:::
