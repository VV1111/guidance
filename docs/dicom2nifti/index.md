# dicom2nifti

A small desktop tool that converts DICOM folders to NIfTI (`.nii.gz`). It scans a folder tree, lets you choose what to convert, and shows progress and a log while it runs.

![Main window](/images/dicom2nifti/main-window.png)
*The main window: input DICOM folder, output folder, output filename, progress and log.*

## Select the DICOM folder

::: steps
1. Click **Select DICOM Folder…** and choose a folder containing DICOM data.
2. The program fills in the folder path, proposes an output filename from the folder name, and scans the folder and its subfolders (up to 4 levels) for DICOM series. If nothing is found, a warning appears.
3. A **Choose Conversion Mode** dialog opens. Only the modes that make sense for this folder are enabled.
:::

![Choose conversion mode](/images/dicom2nifti/mode-dialog-subfolders.png)

<StepVideo src="" title="Select a folder and pick a mode" />

Which mode to pick:

| Mode | Pick it when | Pros | Cons |
| --- | --- | --- | --- |
| **A — Convert subfolders (batch)** | You don't know the folder's internal structure; a root may hold several cases, time points or sequences in different subfolders | Flexible per-batch control over output paths and names | The initial scan can take a while |
| **B — Convert current folder (all series)** | The folder is one case and you want every series it contains | Fastest | Cannot exclude individual series |
| **C — Batch select (partial series)** | The folder is one case with several series and you only need some of them | Most control; avoids unneeded exports | Needs manual review; slower when there are many series |

## Mode A — Convert subfolders (batch)

Detects every subfolder that contains DICOM and converts each one to a NIfTI file.

![A root folder with several series subfolders](/images/dicom2nifti/folder-structure.png)
*Example: folder P414 contains subfolders CTA, S101, S103, …*

### A1. Confirm and edit the batch

After choosing this mode, **Confirm Subfolder Batch Conversion** lists all subfolders that contain DICOM.

![Confirm Subfolder Batch Conversion](/images/dicom2nifti/batch-confirm.png)

::: steps
1. Tick or untick rows to include or exclude a subfolder.
2. Set the output folder per row, or type one folder at the top and click **Apply to all**.
3. Edit the output filename per row if you like.
4. Click **OK**.
:::

### A2. Run, pause, stop

::: steps
1. The progress bar appears and the log updates in real time.
2. Use **Pause** / **Resume** / **Stop** as needed.
3. A *Done* dialog lists the generated files.
:::

![Conversion finished](/images/dicom2nifti/batch-done.png)

<StepVideo src="" title="Batch-convert all subfolders" />

## Mode B — Convert current folder (all series)

![Choose conversion mode with the current-folder option](/images/dicom2nifti/mode-dialog-current.png)

::: steps
1. Choose **Convert current folder (all)**.
2. Back in the main window, set the **Output folder** and **Output filename**.
3. Click **Convert**.
:::

<StepVideo src="" title="Convert one case folder" />

## Mode C — Batch select (partial series)

::: steps
1. Choose **Batch select (partial)**.
2. In **Batch Select DICOM Series**, tick the series to export (multiple allowed).
3. Set the **Output filename** and **Output folder** at the bottom.
4. Click **OK**.
:::

![Series selection](/images/dicom2nifti/batch-select-series.png)

<StepVideo src="" title="Convert only selected series" />
