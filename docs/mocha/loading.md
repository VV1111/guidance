# Loading data

There are three ways to get volumes (and optionally a centerline) into the *3D Tracing* tab. They differ only in what is on disk beforehand; tracing works the same afterwards.

| # | Menu | What you need | After loading |
| --- | --- | --- | --- |
| 1 | **File → Open** | One `.nii` / `.nii.gz`, **or** a single DICOM series, **or** a centerline (`.yaml` / `.yml` / `.swc`) | One entry in *Display*; a centerline file attaches to the current volume |
| 2 | **File → Open Folder** | Several `.nii` / `.nii.gz` in one folder; `reg_*_to_*.txt` from registration (recommended for alignment); optional `centerline.yaml` | *Select Images to Load* dialog → pick sequences and the initial display; switch with *Display* |
| 3 | **File → Open DICOMs** | A valid DICOM directory and a writable working directory | Series are converted to NIfTI and (usually) registered; *Display* lists the sequences in the working directory |

**File → Resume Workflow…** reopens a previous *Open DICOMs* session; it is not a separate data type.

## Single image

::: steps
1. **File → Open**.
2. Select the image: NIfTI, DICOM or TIF.
3. Optionally open a centerline file (`.yaml`, `.yml`, `.swc`) the same way — it is attached to the current volume.
:::

<StepVideo src="" title="Open a single image and a centerline" />

## Multi-sequence folder

::: steps
1. **File → Open Folder** and choose the folder that holds the `.nii.gz` files.
2. In *Select Images to Load*, tick the sequences you want and choose the one to display first.
3. Switch between sequences with the **Display:** dropdown in the control column.
:::

<StepVideo src="" title="Open a folder with several sequences" />

::: warning Keep one reference space
*Open Folder* expects a single consistent `reg_*_to_*` reference space. A folder with conflicting transforms may fail to load. Run [Registration](./preprocess#registration) once on the folder to produce matching transforms.
:::

::: tip Before switching Display
Finish the current MPR draft and **Commit to 3D** before changing *Display*. An unfinished draft can become inconsistent with the new volume. After finishing one vessel in a multi-sequence folder, the recommended order is **Cross → Contour Labeling → switch Display**.
:::

## From a DICOM study

::: steps
1. **File → Open DICOMs**.
2. Choose a **working directory** (output) and the **DICOM directory**.
3. In *Select Sequences*, tick the series to import and rename them if needed — see [Preprocess](./preprocess#select-sequences-dialog) for the dialog.
4. Confirm. The series are converted to `.nii.gz`, a `.workflow_state.yaml` and the *Workflow Banner* are written, and the registration dialogs follow.
5. Open the working directory in *3D Tracing* (it is usually opened for you).
:::

<StepVideo src="" title="Open a DICOM study end-to-end" />

::: tip
`.workflow_state.yaml` and the Workflow Banner are only created through **File → Open DICOMs**. *Preprocess → MV: Open Raw Data* does the same conversion without tracking a workflow session.
:::
