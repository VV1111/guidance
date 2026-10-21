# Loading data

| Menu | Use it for |
| --- | --- |
| **File → Open DICOMs** | A DICOM study — converts to NIfTI, registers, and opens it (**recommended**) |
| **File → Open Folder** | A folder of `.nii.gz` sequences that were already converted / registered, with an optional `centerline.yaml` |
| **File → Open** | One image (NIfTI / DICOM / TIF), or one centerline file (`.yaml` / `.yml` / `.swc`) |

**File → Resume Workflow…** reopens an earlier *Open DICOMs* session.

## From a DICOM study {#dicom}

::: steps
1. **File → Open DICOMs**.
2. Choose the **working directory** (where the `.nii.gz` files go), then the **DICOM directory**.
3. **Select Sequences**: if series are missing, lower *Slice threshold* and click **Update**. Tick the series to import (series with warnings start unticked) and edit *New Name* if needed. **OK** — the series are converted.
4. **Select Sequences for Registration**: choose the **Reference** (TOF-MRA if available) and tick the **Moving** sequences. **OK**.
5. **Set Initial Parameters**: a point is already placed in each sequence. Move it only if the sequences look misaligned (**Go to Point** jumps to its slice). **OK** — registration runs.
6. **Select Images to Load**: tick the sequences and the one to show first. They open in *3D Tracing*; switch between them with **Display:**.
:::

<StepVideo src="/videos/mocha/open-dicoms.mp4" title="Open DICOMs → working directory → DICOM directory → Select Sequences" loop />

<StepVideo src="/videos/mocha/registration.mp4" title="Reference / Moving → initial points → registration → switch Display" loop />

::: details Select Sequences dialog
![Select Sequences dialog](/images/mocha/select-sequences.png)

- **Slice threshold ≥** (default 20) hides series with fewer slices; **Update** re-scans. **Recursive scan** also searches sub-folders.
- First column: import yes / no. *New Name* is the output file name.
- **Sequence Preview** shows the selected series.
- **Save DICOM metadata as YAML** — next to the NIfTI, or a custom path. **Anonymize patient identifiers** is optional.
:::

## Multi-sequence folder

::: steps
1. **File → Open Folder** → the folder with the `.nii.gz` files. A `centerline.yaml` in the folder is loaded too.
2. Tick the sequences and choose the one to show first.
3. Switch with **Display:**.
:::

::: warning Before switching Display
**Commit to 3D** the current draft first. The folder must have one consistent `reg_*_to_*` reference space — run [Registration](./preprocess#registration) if it does not.
:::

## Single file

**File → Open** → the file. Opening a file starts a new case: a centerline opened this way is shown **without** an image. To see an image with its centerline, put `centerline.yaml` in the image folder and use **Open Folder**.
