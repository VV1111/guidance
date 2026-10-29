# DCE analysis

Compute **vp** (plasma volume) and **Ktrans** (transfer constant) maps from a DCE series with the Patlak model, using an arterial input function (AIF) picked by hand, and save them as NIfTI.

DCE analysis is available from **MOCHA+ v3.0.5** (*Analysis → DCE*). It runs in its own window and does not need a case to be open.

<StepVideo src="/videos/mocha-dce/quick-look.mp4" title="Open DCE → pick the AIF → Create V-V Image → Save, at 3× speed (the 5-minute computation is cut)" loop />

## Prepare the data

Put the whole DCE series — every slice of every time frame — **in one folder** as `.dcm` files, with no subfolders. Example: 25 slices × 100 frames = 2,500 files.

The files are sorted by their DICOM tags, not by file name, so the following tags must be present: *SliceLocation*, *SliceThickness*, *TemporalPositionIdentifier*, *NumberOfTemporalPositions*, *AcquisitionTime* and *PixelSpacing*. All files must have the same slice thickness and the same number of frames.

## Open the DCE images {#open}

::: steps
1. In MOCHA+, open **Analysis → DCE**. The *DCE Analysis* window opens with the message *Select DCE Image Folder* → **OK**.
2. In *Open DCE Image*, go **into** the folder that holds the `.dcm` files (or select it) and click **Choose**.
3. Wait while the files are read (about 20 s for 2,500 files). The first frame of slice 1 appears on the left, and the counts appear next to **Frame:** and **Slice:** (e.g. `/100`, `/25`).
4. Maximise the window — the image and the curve are easier to read.
:::

To load another series later, click **Open DCE Image** at the top right.

<StepVideo src="/videos/mocha-dce/open-dce.mp4" title="Analysis → DCE → choose the folder" loop />

::: warning If nothing loads
- *No DICOM Files* — the folder you chose has no `.dcm` files directly inside it (they may be one level deeper).
- *DCE Load Error* — usually the folder mixes series (different slice thickness or number of frames). Keep one DCE series per folder.
:::

## Find an artery and pick the AIF {#aif}

::: steps
1. Browse the volume:
   - **Slice:** — the Z position. Slice 1 has the highest *SliceLocation* (usually the top of the volume).
   - **Frame:** — the time point.

   Type a number in the box, or click in it and press `↑` / `↓`. Go to a slice through a large artery (e.g. the internal carotid arteries at the skull base) and a frame after contrast arrival, where the arterial lumen is bright.
2. `Shift` + click in the **centre of the arterial lumen**. A red dot marks the AIF point.
3. Click the dot once to **select** it — it turns yellow. The intensity–time curve of that voxel over all frames is drawn below as the **AIF**.
4. Check the curve: a good AIF rises sharply when the bolus arrives, then decays. A flat or noisy curve means the point is off the lumen — `Shift` + click again to move the selected point.
:::

![DCE Analysis window with the AIF point on the left internal carotid artery and its curve below](/images/mocha-dce/aif.png)
*The AIF point (yellow) and its intensity–time curve (bottom). Frame and slice boxes, V-V settings and Save are on the right.*

::: tip
There is one AIF point. Hovering over it also shows its curve; clicking elsewhere on the image deselects it, and **Create V-V Image** / **Save V-V Image** then do nothing — click the dot again so it is yellow.
:::

## Create the V-V images {#create}

::: steps
1. Under *V-V Image*, set the region to compute:
   - **Path Size** — a square patch (in pixels) centred on the AIF point, applied to every slice. Default 32.
   - **Entire Image** — the whole slice (e.g. 400 × 400). This is what you normally want for a map.
2. **Method/Model** is *Patlak_LSQ* (the only option).
3. Click **Create V-V Image**.
4. Wait. The whole volume is computed in one go; the title bar shows *Not Responding* during this time — **do not close the window**. *Entire Image* on 25 slices takes about 5 minutes; a 32-pixel patch takes seconds.
5. The three panels in the middle show, for the current slice:
   - top — the **RGB composite** (red = vp, green = Ktrans),
   - middle — **vp**,
   - bottom — **Ktrans**.

   Change **Slice:** to look at other slices.
:::

<StepVideo src="/videos/mocha-dce/select-aif.mp4" title="Shift+click the artery → click to select → Entire Image → Create V-V Image" loop />

<StepVideo src="/videos/mocha-dce/vv-result.mp4" title="After the computation: RGB composite, vp and Ktrans" loop />

![V-V images: RGB composite, vp and Ktrans](/images/mocha-dce/vv-result.png)
*Results for the current slice: RGB composite (top), vp (middle), Ktrans (bottom).*

## Save {#save}

::: steps
1. Click **Save V-V Image**. (If a slice has not been computed yet, it is computed first.)
2. The maps are written to a new `xsec_DCE` folder **inside the DCE folder** — there is no confirmation message, check the folder:

   | File | Content |
   | --- | --- |
   | `xsec_<folder>_vp.nii.gz` | vp, 3D |
   | `xsec_<folder>_ktrans.nii.gz` | Ktrans (per minute), 3D |
   | `xsec_<folder>-vp-k.nii.gz` | vp, Ktrans and 0 as three channels — the RGB composite |

   `<folder>` is the name of the DCE folder, e.g. `xsec_brain_dce_vp.nii.gz`.
:::

Saving again overwrites these files.

<StepVideo src="/videos/mocha-dce/save-vv.mp4" title="Save V-V Image → xsec_DCE folder with three NIfTI files" loop />

::: info
The NIfTI files keep the voxel spacing but not the scanner position and orientation, so they will not overlay on other images automatically.
:::
