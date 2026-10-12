# MOCHA+

MOCHA+ (version 3.0.5) is the lab's tool for tracing and editing vessel centerlines on 3D medical images (TOF-MRA, vessel wall imaging, CTA). It also converts DICOM series to NIfTI, registers sequences to one reference space, and compares two centerline files.

![MOCHA+ main interface: control column on the left, 3D view in the centre, MPR views around it](/images/mocha/main-interface.png)
*Main interface — 3D Tracing tab.*

## Core idea: 3D is the result, 2D is the draft

Everything in MOCHA+ follows one two-layer rule:

| Layer | Role | When edits take effect |
| --- | --- | --- |
| **3D view** | The final centerline (ground truth) | Immediately |
| **2D MPR views** | A temporary editing workspace (draft) | Only after you click **Commit to 3D** |

- Edits made in 2D never touch the 3D centerline until you commit them.
- Edits made in 3D are applied at once, and in *Edit* mode they are synced back into the 2D draft.

## Interface

- **3D view** — the volume with the centerline tree. Click a segment to select it (it turns white).
- **Axial / Coronal / Sagittal MPR views** — slice views with a slider and arrow buttons for the slice index.
- **Straightened view** — the selected vessel shown flattened, used for precise navigation.
- **Control column** (left) — display options, tracing mode, draft tools, *Generate* and *Commit to 3D*. See [3D tracing](./3d-tracing#control-column) for a full list.
- **Tabs** — *3D Tracing* (this guide) and *Contour Labeling* (cross-sections).

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `M` | Maximise the current view |
| `G` | Return to the grid layout |
| Scroll | Change slice |
| `Shift` / `Ctrl` + scroll | Zoom |
| `Delete` / `Backspace` | Delete the selected point |
| `Ctrl` + `Z` | Undo the last draft edit |
| `Ctrl` + `S` | Save the centerline |

## Where to go next

| I want to… | Read |
| --- | --- |
| Open a single image, a folder of sequences, or a DICOM study | [Loading data](./loading) |
| Convert DICOM to NIfTI and register sequences first | [Preprocess](./preprocess) |
| Trace a vessel by clicking directly in the 3D view | [3D tracing](./3d-tracing) |
| Draft or fix a centerline in the 2D slice views, with auto-fit | [2D MPR editing](./2d-editing) |
| Compare two centerline files (e.g. AI vs reviewer) | [Compare centerlines](./compare) |

<StepVideo src="" title="MOCHA+ in two minutes — interface tour" />
