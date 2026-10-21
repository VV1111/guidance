# dicom2nifti

Converts DICOM folders to NIfTI (`.nii.gz`). Program: **`Dicom2Nifti V1.1.0.exe`** — double-click to start, nothing to install.

## Quick look

<StepVideo src="/videos/dicom2nifti/quick-look.mp4" title="The whole workflow at 4× speed" loop />

**Pick folders → Search → Set where the files go → Generate.**

![dicom2nifti main window](/images/dicom2nifti/main-window.png)
*Top: folder picking. Middle: one row per DICOM series. Bottom: log. Drag the borders to resize.*

## 1. Pick the folders {#folders}

::: steps
1. **Browse folder…** → choose the top folder of your data, e.g. `…\original`.
2. Select folders in the tree (**Ctrl**/**Shift**-click for several) and click **Add ▶**.
3. Keep the folders you want **ticked** in **2. Folder list**.
:::

You can add a patient folder (every DICOM series below it is found) or single series folders.

<StepVideo src="/videos/dicom2nifti/pick-folders.mp4" title="Browse → select → Add" loop />

::: details More options
| To… | Do this |
| --- | --- |
| Open more tree levels at once | **Expand tree** (set *levels*) |
| Add the top folder itself | **Add root folder to list** |
| Remove folders | Tick them and click **◀ Remove** |
| Find a folder in a long list | Type in **Filter folders…** |
:::

## 2. Search {#search}

Click **Search**. Each DICOM series found becomes one row, named `Modality_SeriesDescription` (e.g. `MR_AX_T2`) and saved next to its DICOM by default.

<StepVideo src="/videos/dicom2nifti/search.mp4" title="Search" loop />

::: details Search options
| Option | Meaning |
| --- | --- |
| **Max depth** | How many folder levels below each listed folder are searched (default 4). Use `0` if you listed the series folders themselves. |
| **SNAP auto-suffix** | Names SNAP reconstructions `_SNAP` / `_I2` / `_I1` automatically. Leave it on. |
:::

## 3. Set where the files go {#save}

Typical case: all files into one folder, one sub-folder per patient.

::: steps
1. Next to **Apply save path to all**, **Browse…** the target folder (e.g. `…\transformed`) and click **Apply to all**.
2. Type a **Sub-folder** for each row (double-click the cell), e.g. the patient ID `retro_0602_mri`. For many rows at once: select them, click **New folder…**.
3. Check the **Output file** column, then click **Create checked now** under **New folders**.
:::

::: tip "Name clash" after Apply to all is normal
Different patients have series with the same name, so they would overwrite each other in one folder. The sub-folders fix it.
:::

<StepVideo src="/videos/dicom2nifti/set-save-path.mp4" title="Save path → sub-folder per patient → create folders" loop />

::: details Table columns and other situations
| Column | What it is |
| --- | --- |
| **Save path** | Folder the file is written to |
| **Sub-folder** | Extra folder(s) after the save path; `A\x` makes a folder inside a folder |
| **Output name** | File name, without extension |
| **Suffix** | Added to the end of the name, e.g. `_pre` (**Name suffix → Apply suffix**: selected rows, or all if none selected) |
| **Output file** | Preview of the final path. *(new folder)* in yellow = the folder does not exist yet |

| Situation | What to do |
| --- | --- |
| Keep files next to their DICOM | Do nothing — that is the default. |
| Change one row only | Double-click its cell and type (also after **Apply to all**). |
| Remove a sub-folder | Select the rows → **Clear sub-folder**. |
| Drop a planned folder | Tick it under **New folders** → **Discard checked**. |
| Skip a series | Untick **Convert** in its row. |
:::

## 4. Generate {#generate}

::: steps
1. Click **Generate**. If some folders do not exist yet, click **Yes** to create them.
2. Wait for the progress bar (**Pause** / **Stop** if needed). A *Done* message lists the files written.
:::

<StepVideo src="/videos/dicom2nifti/generate.mp4" title="Generate and check the output folders" loop />

## Troubleshooting

| Problem | What to do |
| --- | --- |
| Search finds nothing | Tick the folders in the folder list, and increase **Max depth**. |
| *Name clash* on Generate | Two rows would write the same file — add sub-folders or change a name / suffix. The **Output file** column shows which rows collide. |
| One folder gives several rows (`_series1`, `_256x256` …) | The folder holds several series or mixed image sizes. Untick the ones you do not need. |
| *Create folder failed* | No write permission — choose another save path. |
