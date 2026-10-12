# 2D MPR editing

The MPR views are a **draft workspace**. You place sparse points on slices, optionally let *Generate* fit the path along the vessel, then **Commit to 3D** to write the result into the centerline tree. Nothing reaches 3D before the commit.

## Two modes

| Mode | Purpose | How it starts |
| --- | --- | --- |
| **New** | Create a new centerline | Draft starts empty |
| **Edit** (*Existing*) | Modify a segment that already exists in 3D | The selected 3D segment's key points are loaded into the draft |

Draft tools in the control column:

- **Undo** — revert the last draft action (`Ctrl` + `Z`).
- **Del** — delete the selected draft point (`Delete` / `Backspace`).
- **Reset draft** — clear all draft points.

::: tip Clicking in MPR views
When **Edit Sparse Points** is on, a left-click in an MPR view inserts or selects a point instead of moving the crosshair. To browse, use the slider / arrow buttons beside each view, or turn the toggle off.
:::

## Create a centerline in 2D

::: steps
1. Switch the mode to **New**.
2. Turn **2D → Edit Sparse Points** on.
3. Click sparse points along the vessel in the Axial / Coronal / Sagittal views. Points can be placed in any of the three.
4. Choose a fitting mode: **BASE** for bright-blood or standard vessel images, **VWI** for dark-blood or vessel-wall images.
5. Click **Generate**. The system fits the path along the vessel and sparsifies it. The draft is replaced; 3D is still untouched.
6. Click **Commit to 3D**. A new segment is written into the 3D centerline.
:::

<StepVideo src="" title="Draft a centerline in 2D and commit it" />

## Edit an existing segment in 2D {#edit-an-existing-segment-in-2d}

::: steps
1. Select the centerline in the 3D view — it turns **white**.
2. Click **Edit** in the 2D panel. The selected segment is loaded into the 2D draft automatically.
3. Turn **Edit Sparse Points** on (*Edit*).
4. Insert, delete or move points in the MPR views. Use the [straightened view](#straightened-view) to find the right slice, and [Anchor Insert](#anchor-insert) for controlled insertions.
5. Optionally click **Generate** for automatic refinement.
6. Click **Commit to 3D**. The original segment is replaced by the updated one.
:::

<StepVideo src="" title="Edit an existing segment in 2D" />

::: tip Clicks in Edit mode
Plain click = **insert** a new point. `Ctrl` / `Cmd` + click = **select** an existing draft point (for deletion or dragging).
:::

### Draft edits at a glance

| Goal | Action | Result |
| --- | --- | --- |
| Insert | *New:* click on an empty area. *Edit:* plain click | Insert index is chosen along the polyline |
| Select | *New:* click near a point. *Edit:* `Ctrl` / `Cmd` + click near a point | Selection ring, ready for delete or drag |
| Move | After selecting, click again on the **same** MPR view and slice | Updates the coordinates. Clicking on another slice clears the selection without moving |
| Delete | `Delete` / `Backspace` | Removes that draft point |
| Undo | `Ctrl` + `Z` | Reverts the last insert / delete / move |

## Straightened view for precise navigation {#straightened-view}

The *Straightened* view shows the selected vessel flattened, so long or tortuous vessels become easy to walk along.

::: steps
1. Select a centerline segment in the 3D view (it is highlighted).
2. The *Straightened* view shows that vessel as a flat strip.
3. Click a key point in the straightened view.
:::

The system then moves the MPR views to the matching slice, places the crosshair on that point, highlights the same point in 3D and — in *Edit* mode — selects the matching draft point in 2D.

Use it when navigating long or tortuous vessels, when you need to reach a specific region quickly, or to position yourself before a precise edit.

<StepVideo src="" title="Navigate with the straightened view" />

## Anchor Insert for controlled point insertion {#anchor-insert}

Anchor Insert constrains where a new point can be inserted, so a click cannot land on the wrong part of the polyline and create an abnormal curve.

![Anchor Insert controls and anchor states](/images/mocha/anchor-insert.png)

::: steps
1. Turn **Anchor Insert** on.
2. Configure the anchor slots:
   - **Single-anchor** — enable only *Slot 1*. Use it to extend from one side.
   - **Double-anchor** — enable *Slot 1* and *Slot 2*. Use it to insert between two points.
3. In the *Straightened* view, click the points to assign as anchors.
4. Click **✓ Insert** to confirm the insertion constraint.
5. Go back to an MPR view and click once. The new point is placed within the anchor-defined region.
6. **Clear** resets the anchors and removes the inserted points.
:::

Anchor status colours: **grey** = disabled, **green** = enabled but not assigned, **red** = anchor point selected.

<StepVideo src="" title="Insert a point between two anchors" />

## Generate and Commit

**Generate** refines a sparse manual trace along the vessel. Pick **BASE** (bright-lumen cost) or **VWI** (dark-blood / wall-oriented cost), then click *Generate*. The MPR draft is replaced with a fitted sparse path; nothing is written to 3D yet.

**Commit to 3D** freezes the draft into the centerline object. It needs at least two draft points. In *New* mode it adds a segment; in *Edit* mode it replaces the selected one.
