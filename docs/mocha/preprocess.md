# Preprocess: DICOM → NIfTI & registration

Both entries live under the top menu **Preprocess**. Use them when you want to prepare data without opening a tracked workflow session.

| Entry | Does | Writes workflow state? |
| --- | --- | --- |
| **Preprocess → MV: Open Raw Data** | Batch-converts a DICOM tree to `.nii.gz`, then optionally runs the registration chain | No |
| **Preprocess → Registration** | Rigidly aligns `.nii.gz` files that are already in one folder | No |
| **File → Open DICOMs** | Same conversion + registration, and also tracks the session (`.workflow_state.yaml`, Workflow Banner) | Yes |

## MV: Open Raw Data {#open-raw-data}

Converts every selected series under a DICOM root to `{New Name}.nii.gz` in the output folder, then continues into [Registration](#registration) unless you cancel.

::: steps
1. **Preprocess → MV: Open Raw Data**.
2. **Select DICOM Directory** — pick the DICOM root.
3. **Select/Create Output Directory** — pick or create the folder that will receive all `.nii.gz` files.
4. In the **Select Sequences** dialog, tick the series to import, adjust *New Name* if needed, and confirm. A *Converting sequences…* progress bar follows.
5. On success the app continues into the registration flow below.
:::

<StepVideo src="" title="Convert a DICOM tree with MV: Open Raw Data" />

### Select Sequences dialog {#select-sequences-dialog}

![Select Sequences dialog](/images/mocha/select-sequences.png)

- **Top row** — *Slice threshold ≥* hides small series; **Update** re-runs the scan with the current threshold; **Recursive scan** also searches subdirectories.
- **Table** — *Series #*, *S##*, *Case*, *Description*, *# slices*, *New Name*, ⚠. The first column selects whether a series is imported.
- **Sequence Preview** shows the selected series.
- **YAML metadata export** is optional — *Same as NIfTI* or *Custom* location.

## Registration {#registration}

Rigid inter-sequence alignment for `.nii` / `.nii.gz` files already in one folder. It writes `reg_<moving>_to_<reference>.txt` and updates the stored volume origins so all sequences share one reference space. This is the same logic that runs after *File → Open DICOMs*.

::: warning Data requirement
The chosen folder must contain at least one `.nii` / `.nii.gz`. Otherwise you get *No NIfTI Files* and the flow stops.
:::

::: steps
1. **Preprocess → Registration**, then **Select Folder with NIfTI Files of 3D Scans**.
2. In **Select Sequences for Registration**, choose one **Reference** (radio), tick the **Moving** sequences, and optionally set *Transform Same As* to reuse one moving sequence's transform for another. TOF-MRA is the recommended reference when available.

   ![Select sequences for registration](/images/mocha/registration-select.png)

3. In **Set Initial Parameters**, set a seed point per sequence: left-click on the image to move the point on the current slice, **Go to Point** jumps to that slice, **Reset Point** restores the default centre.

   ![Set initial parameters: one seed point per sequence](/images/mocha/registration-initial-params.png)

4. Click **OK**. *Registration Progress* shows the metric plot and a progress bar.
:::

<StepVideo src="" title="Register sequences to a reference" />

**Result:** `reg_<moving>_to_<reference>.txt` next to the NIfTI files, plus updated origins in each `{seq}.nii.gz`. Opening that folder with **File → Open Folder** and switching *Display* keeps the anatomy aligned across sequences.
