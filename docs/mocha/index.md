# MOCHA+

MOCHA traces and edits vessel centerlines on 3D images (TOF-MRA, vessel wall imaging, CTA), and labels lumen / wall contours on the cross-sections.

## Quick look

<StepVideo src="/videos/mocha/quick-look.mp4" title="Open DICOMs → register → trace → cross-sections → save, at 6× speed" loop />

## Location
|version | Server |location|
| --- | --- | --- |
| MOCHA v3.0.1 | 39 | G:\zhiwei\projects\tool\MOCHA_GUI\output|
| MOCHA v3.0.1 | 46 | D:\Zhiwei\tool|

## Typical workflow

| | Step | Where | Page |
| --- | --- | --- | --- |
| 1 | Convert DICOM to NIfTI and register the sequences | **File → Open DICOMs** | [Loading data](./loading#dicom) |
| 2 | Trace a centerline — on the slices with auto-fit, or by clicking in 3D | **Draw points: 2D** / **3D** | [2D MPR editing](./2d-editing) · [3D tracing](./3d-tracing) |
| 3 | Correct it — straightened view, Anchor Insert | **Existing** | [2D MPR editing](./2d-editing#edit) |
| 4 | Draw lumen and outer wall on the cross-sections | **Cross** → *Contour Labeling* | [Contour labeling](./contour-labeling) |
| 5 | Save the centerline | `Ctrl` + `S` | [below](#save) |

![MOCHA+ main interface: control column on the left, 3D view in the centre, MPR views around it](/images/mocha/main-interface.png)
*3D Tracing tab: control column (left), straightened view, 3D / MPR views, vessel labels (right).*

## Core idea: 3D is the result, 2D is the draft

| Layer | Role | Edits take effect |
| --- | --- | --- |
| **3D view** | The final centerline | Immediately |
| **2D MPR views** | A draft workspace | Only after **Commit to 3D** |

## Save {#save}

`Ctrl` + `S` (or **File → Save**). If the centerline is new, choose a name, e.g. `centerline.yaml` → **Save**; if it was opened from a `.yaml`, that file is overwritten. The path appears as **Centerline:** above the views.

In the *Contour Labeling* tab, `Ctrl` + `S` saves the contours instead — see [Contour labeling](./contour-labeling).

<StepVideo src="/videos/mocha/save-centerline.mp4" title="Ctrl+S → centerline.yaml" loop />

## Keyboard shortcuts (3D Tracing)

| Key | Action |
| --- | --- |
| `M` / `G` | Maximise the current view / back to the grid |
| Scroll | Change slice (MPR views); zoom (3D view) |
| `Shift` / `Ctrl` + scroll | Zoom (MPR views) |
| `Ctrl` + `A` / `Ctrl` + `Shift` + `A` | Draw points 3D / 2D on–off |
| `Q` / `E` | Previous / next key point |
| `Delete` / `Backspace` | Delete the selected point (or the selected segment in 3D) |
| `Ctrl` + `Z` | Undo the last draft edit |
| `Ctrl` + `S` | Save the centerline |

::: details More shortcuts
| Key | Action |
| --- | --- |
| Right-click (3D) | Delete the key point under the cursor |
| `Ctrl` + click / `Ctrl` + drag (3D) | Add to selection / lasso select |
| `Shift` + `A` | Turn the hovered dense point into a key point |
| `Shift` + `S` | Split the segment at the hovered point |
| `Shift` + `V` / `Ctrl` + `Shift` + `V` | Hide / show all centerlines / the volume |
| `Shift` + `Q` / `Shift` + `E` | Rotate the straightened view ±5° |
| `Ctrl` + `D` | Switch the *Select* hover priority |

Shortcuts can be changed in **Settings → Hotkeys**.
:::
