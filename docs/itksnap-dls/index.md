# ITK-SNAP DLS (nnInteractive)

AI-assisted segmentation of intracranial arteries and plaque. The **nnInteractive** model runs on the lab GPU server; ITK-SNAP sends it your outlines and gets back a 3D segmentation.

The lab uses a **custom ITK-SNAP 4.4 build** with one extra feature, [AI edit mode](#edit-mode), which stops a later AI correction from erasing an earlier result.

## Quick look

<StepVideo src="/videos/itksnap-dls/quick-look.mp4" title="The whole workflow at 4× speed" loop />

| | Step | Tool | Active label | Paint over |
| --- | --- | --- | --- | --- |
| 1 | [Start the AI server](#start) | desktop shortcut | — | — |
| 2 | [Connect ITK-SNAP](#connect) | Tools → Preferences | — | — |
| 3 | [Open the image](#open-image) | drag & drop | — | — |
| 4 | [Load the labels](#labels) | Edit Label → Import | — | — |
| 5 | [Paint the plaque ROI](#roi) | Paintbrush · manual · 3D | **ROI** | **All labels** |
| 6 | [Draw the artery](#artery) | Polygon · AI mode · Refine | artery (e.g. `ICA_L`) | **ROI** |
| 7 | [Label the confidence](#confidence) | Paintbrush · manual · 3D | **High_con** / **Low_con** | **ROI** |
| 8 | [Save](#save) | Segmentation → Save | — | — |

## Where things are

| Item | Value |
| --- | --- |
| GPU server | **DESKTOP2** — `128.208.221.39` (university **VPN** required) |
| ITK-SNAP | Desktop shortcut **ITK-SNAP 4.4 DLS** — not the official 4.2, which cannot use the AI |
| AI server | Desktop shortcut **Start ITK-SNAP AI Server** · port `8911` |
| Label file | `F:\Apps\itksnap-dls\labels\label description.txt` |

**How to work:** log in to DESKTOP2 with Remote Desktop and run ITK-SNAP there (**recommended**). Running ITK-SNAP on your own computer is possible too — see [Own computer](#mode-b).

## 1. Start the AI server {#start}

Only one person needs to do this — the server is shared. If it is already running, skip this step.

::: steps
1. On DESKTOP2, double-click **Start ITK-SNAP AI Server**.
2. A black window opens. `Application startup complete` = started. Keep the window **open** (minimising is fine).
3. `ERROR: [WinError 10048] … 8911` instead = someone already started it. Just close this window.
:::

![Start ITK-SNAP AI Server shortcut](/images/itksnap-dls/server-start-script.png)

<StepVideo src="/videos/itksnap-dls/start-ai-server.mp4" title="Double-click the shortcut; the server window opens" loop />

::: warning
Closing the server window, or **signing out** of DESKTOP2, stops the server for everyone — just disconnect Remote Desktop. If the window says `No GPU available, using CPU.`, tell the administrator.
:::

## 2. Connect ITK-SNAP to the server {#connect}

Only needed the first time. Afterwards just check that the **●** next to *Model* is **green**.

::: steps
1. Start **ITK-SNAP 4.4 DLS** → **Tools → Preferences … → AI Extensions**.
2. **New…** → *Network connection to GPU server*, Server `127.0.0.1`, Port `8911`. Leave SSH **unticked**.
3. **OK** → **Reconnect** → status shows **Connected** in green.
:::

![AI Extensions: server configuration and Reconnect](/images/itksnap-dls/ai-extensions-settings.png)

<StepVideo src="/videos/itksnap-dls/connect-ai-extensions.mp4" title="Preferences → AI Extensions → New → OK → Reconnect" loop />

## 3. Open the image {#open-image}

Drag the `.nii.gz` file from File Explorer onto the ITK-SNAP window (or **Open Image …**). To continue earlier work, use **Open Workspace …** instead.

<StepVideo src="/videos/itksnap-dls/open-image.mp4" title="Drag the image into ITK-SNAP" loop />

## 4. Load the labels {#labels}

::: steps
1. **…** menu next to **Active label** → **Edit Label …**
2. **Actions… → Import…** → `label description.txt` → **Open** → **Close**.
3. Check that **ROI**, the artery labels and **High_con** / **Low_con** are in the list.
:::

<StepVideo src="/videos/itksnap-dls/load-labels.mp4" title="Edit Label → Actions → Import" loop />

::: details Do I need to import every time?
| Situation | What to do |
| --- | --- |
| New image | Import **before** drawing. |
| Opened a workspace (`.itksnap`) | Labels are already there — no import. |
| Loaded a segmentation file (`.nii.gz`) | Import **after** loading it. |
| List shows `Label 1`, `Label 2`… | Import did not happen — repeat. |
:::

## 5. Paint the plaque ROI {#roi}

**Settings:** Paintbrush · round · **Manual drawing** · ☑ 3D brush · Active label **ROI** · Paint over **All labels**

![Paintbrush settings for the plaque ROI](/images/itksnap-dls/roi-paintbrush-settings.png)

::: steps
1. Scroll through **all slices** (mouse wheel or `Page Up` / `Page Down`).
2. Wherever there is plaque, **left-click / drag** to paint it. Adjust **Brush Size** to the plaque.
3. Painted too much? **Right-drag** to erase, or `Ctrl+Z`.
:::

<StepVideo src="/videos/itksnap-dls/draw-roi.mp4" title="Paint the plaque ROI" loop />

## 6. Draw the artery inside the ROI {#artery}

**Settings:** Polygon · ☑ **AI mode** · Model **nnInteractive** (● green) · AI edit mode **Refine** · Active label = the artery (e.g. `ICA_L`) · Paint over **ROI**

![Polygon settings for the artery in AI mode](/images/itksnap-dls/artery-polygon-settings.png)

::: steps
1. On a slice where the artery crosses the ROI, click points around the artery; click the first point again to close.
2. Click **accept** (or `Enter`). Wait a few seconds — the artery appears in 3D.
3. Missing a part? Draw another outline there and **accept** again. Too much? `Ctrl+Z`.
:::

Because *Paint over* is **ROI**, the artery is only written inside the ROI.

<StepVideo src="/videos/itksnap-dls/draw-artery.mp4" title="Outline → accept → nnInteractive fills the artery" loop />

::: details Other situations
| Situation | What to do |
| --- | --- |
| Came back to the artery after editing the ROI | Keep **Refine** — the existing artery is protected. |
| Want to redo the artery from scratch | Switch to **Replace**, or delete the artery label first. |
| *No voxels updated* after accept | Check **Active label**, and that the ROI is painted there (Paint over = ROI). |
| ● is red | Server not reachable — see [step 2](#connect) and [Troubleshooting](#troubleshooting). |
| ROI has holes after an AI correction | Voxels the AI removes become empty, not ROI — touch them up with the paintbrush. |
:::

## 7. Label the plaque confidence {#confidence}

**Settings:** Paintbrush · **Manual drawing** · ☑ 3D brush · Active label **High_con** or **Low_con** · Paint over **ROI**

Paint over the plaque. Only ROI voxels change, so the brush can be larger than the plaque — the artery is not touched. Scroll through the slices to check no ROI is left.

<StepVideo src="/videos/itksnap-dls/confidence-label.mp4" title="Low_con over the ROI — the artery stays" loop />

## 8. Save {#save}

**Segmentation → Save Segmentation Image …** → file name, e.g. `<image name>_seg.nii.gz` → **Finish**. Save after each plaque.

<StepVideo src="/videos/itksnap-dls/save-segmentation.mp4" title="Save Segmentation Image → Finish" loop />

## AI edit mode {#edit-mode}

nnInteractive returns the *whole* structure after every outline. Original ITK-SNAP then erased every voxel of the label not in that prediction, so a second correction could cut gaps into the first result. The three buttons in the Polygon / Paintbrush panel control this:

| Mode | The AI may… | Use |
| --- | --- | --- |
| **Refine (erase own only)** | add, and remove only what it added since you selected this label | **Default — almost always** |
| **Add (never erase)** | only add | Filling gaps when nothing may shrink |
| **Replace (original)** | replace the label with its latest prediction | Redrawing an artery from scratch |

A new "AI object" starts when you change the **active label** or load another image; from then on, **Refine** protects everything the label already had.

## Own computer (mode B) {#mode-b}

ITK-SNAP on your own computer reaches the AI server through an **SSH tunnel**. Slower than Remote Desktop, because images go over the VPN.

:::: details One-time setup
::: code-group

```text [Windows]
1. Remote Desktop into DESKTOP2 with your local drive shared
   (Show Options → Local Resources → More… → tick your drive).
2. Copy into a FOLDER on your drive (not the drive root):
   F:\Apps\itksnap-dls\installer\itksnap-4.4.0-20250909-win64-AMD64.exe
   F:\Apps\itksnap-dls\labels\label description.txt
3. Install to its own folder, e.g. C:\Program Files\ITK-SNAP 4.4 DLS
4. English interface: shortcut → Properties → add  --lang en  to "Target".
```

```text [Mac]
1. Install the official ITK-SNAP 4.4 for macOS from itksnap.org.
   (No AI edit mode on Mac — it behaves like "Replace".)
2. Copy F:\Apps\itksnap-dls\labels\label description.txt to your Mac.
```

:::
::::

### Open the tunnel — every session {#tunnel}

::: steps
1. Connect to the VPN. In **PowerShell** / **Terminal** run (Remote Desktop username and password):

   ```bash
   ssh -N -L 8911:127.0.0.1:8911 YOUR_USERNAME@128.208.221.39
   ```

2. After the password the window shows **nothing** — the tunnel is open. Leave it open; `Ctrl+C` when done.
3. ITK-SNAP settings are the same as in [step 2](#connect).
:::

::: warning Type 127.0.0.1, not localhost
With `localhost` the tunnel does not reach the server and ITK-SNAP shows *server returned nothing*.
:::

## Troubleshooting {#troubleshooting}

| Problem | What to do |
| --- | --- |
| *Not connected* / ● red | Is the AI server running ([step 1](#start))? Server `127.0.0.1`, port `8911` → **Reconnect**. |
| AI erased part of the artery | `Ctrl+Z`, set AI edit mode to **Refine**, repeat. |
| *Error creating session … internal server error* | Tell the administrator. (The first AI action after a server start takes ~30 s — that is normal.) |
| Server window: `CUDA out of memory` | Someone else is using the GPU — wait, or ask in the lab channel. |
| Interface in Chinese | Use the **ITK-SNAP 4.4 DLS** shortcut, or start with `--lang en`. |
| Mode B: *server returned nothing* | Tunnel uses `localhost` instead of `127.0.0.1`, or is closed. Check: `curl --noproxy "*" http://127.0.0.1:8911/` should answer `{"detail":"Not Found"}`. |
| Mode B: `Address already in use` | Use another local port: `-L 8912:127.0.0.1:8911`, and port `8912` in ITK-SNAP. |
| Mode B: `curl` works, ITK-SNAP fails | Turn off proxy / VPN-accelerator programs, or bypass `127.0.0.1`. |
| Mode B: `ssh` times out | Connect to the VPN first. |
