# Contour labeling

Draw the lumen, outer wall and calcification on cross-sections along a traced vessel. All selected sequences are shown side by side on the same cross-section.

## Open a vessel's cross-sections

::: steps
1. In *3D Tracing*, select exactly **one** segment (it turns white) and click **Cross**.
2. In *Sequences to show*, tick the sequences → **OK**.
3. The *Contour Labeling* tab opens with one panel per sequence.
:::

::: warning Save before pressing Cross again
Pressing **Cross** again rebuilds the tab **without asking** — unsaved contours are lost.
:::

## Draw a contour

::: steps
1. Go to a slice: `Q` / `E` (previous / next), or type it next to **slice:**. The mouse wheel zooms, it does not change slice.
2. Turn **draw** on for **Lumen** (or press `1`). Click at least **3 points** around the lumen in one panel.
3. Turn **draw** off (click the toggle or press `1` again) — the points close into a smooth contour, shown on all panels.
4. Same for **Outer Wall** (`2`) and **Calcification** (`3`).
5. **save** (or `Ctrl` + `S`) writes `contour.yaml` into the vessel's folder.
:::

There is **no auto-save**. Changing slice keeps the contours in memory; closing the window asks whether to save.

<StepVideo src="/videos/mocha/contour-labeling.mp4" title="Cross → sequences → Lumen and Outer Wall" loop />

## Correct a contour

With **draw** off:

| To… | Do this |
| --- | --- |
| Move a point | Drag it |
| Select a point / the whole contour | Click the point / click the curve |
| Add a point | `Ctrl` + click on the curve |
| Delete the selected point or contour | `Delete` / `Backspace` (a contour keeps at least 3 points) |
| Move / shrink / grow the selected contour | Arrow keys / `-` / `=` |
| Copy it to another slice | `Ctrl` + `C`, go to the slice, `Ctrl` + `V` |
| Undo / redo | `Ctrl` + `Z` / `Ctrl` + `Y` |

::: details Other controls and shortcuts
| Control | What it does |
| --- | --- |
| **show** | Show / hide that contour type |
| **Pan** (on by default) | Drag to pan, wheel to zoom |
| **Shift** | Drag one panel's image to align that sequence by hand on this slice (**Show → Apply Shift** copies it to other slices) |
| **Grid** | Overlay a grid |
| **MPR** | Add longitudinal views; the red line on each cross-section sets the cut |
| **Drag Control** | Drag an image to change its intensity window |
| **Min / Max**, **Default** | Intensity window per sequence; *Default* resets all sequences |
| **rel.** | Slice number relative to a reference slice (**Show → Set Ref. Slice**) |
| **Same-level folders** | Other folders under `xsec/` — **double-click** to open (asks to save first) |
| **Copy Folder Name** | Copies the folder name (the full path is shown next to it) |
| **Original Img** tab | The original images in 3 orthogonal views, crosshair at the current centerline point |

Shortcuts: `Shift` + `Q` / `Shift` + `E` jump to the previous / next slice with a contour; `↑` / `↓` in the slice box step the slice. Change them in **Settings → Hotkeys**.
:::
