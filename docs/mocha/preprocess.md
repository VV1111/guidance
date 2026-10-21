# Preprocess: DICOM → NIfTI & registration

The **Preprocess** menu runs the same conversion and registration as [File → Open DICOMs](./loading#dicom), without opening the result. Use it to prepare data in advance.

| Entry | Does |
| --- | --- |
| **Preprocess → Convert DICOM** | DICOM tree → `.nii.gz`, then registration |
| **Preprocess → Registration** | Registers `.nii.gz` files that are already in one folder |

## Convert DICOM {#convert-dicom}

::: steps
1. **Preprocess → Convert DICOM**.
2. Choose the DICOM root, then the output folder.
3. In **Select Sequences**, tick the series and check *New Name* → **OK**. Registration follows (below).
:::

The dialog is described under [Loading data](./loading#dicom).

## Registration {#registration}

Rigidly aligns all sequences in a folder to one reference. Writes `reg_<moving>_to_<reference>.txt` next to the NIfTI files.

::: steps
1. **Preprocess → Registration** → the folder with the `.nii.gz` files.
2. Choose one **Reference** (TOF-MRA if available) and tick the **Moving** sequences. *Transform Same As* reuses one moving sequence's transform for another.

   ![Select sequences for registration](/images/mocha/registration-select.png)

3. **Set Initial Parameters**: a point is pre-placed in each sequence where the volumes overlap. Leave them if the sequences look aligned; otherwise move them onto the same anatomy. **Go to Point** jumps to its slice, **Reset Point** restores the pre-placed point.

   ![Set initial parameters: one seed point per sequence](/images/mocha/registration-initial-params.png)

4. **OK** — a progress window shows the registration.
:::

::: warning
Moving a point rewrites the origin stored in the `.nii.gz` files.
:::

<StepVideo src="/videos/mocha/registration.mp4" title="Reference / Moving → initial points → registration" loop />

Afterwards, **File → Open Folder** on that folder keeps the anatomy aligned when you switch *Display*.
