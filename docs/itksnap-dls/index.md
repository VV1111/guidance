# ITK-SNAP DLS (nn Intracranial)

AI-assisted segmentation of intracranial structures inside ITK-SNAP. A **Deep Learning Server (DLS)** runs the model on the lab GPU machine; ITK-SNAP connects to it over the network and segments a structure with one click in the paintbrush tool.

## Environment

| Item | Value |
| --- | --- |
| GPU / server | Server **46** |
| ITK-SNAP version | **4.4.0** or later |
| Installed at | `C:\Program Files\ITK-SNAP 4.4\bin\ITK-SNAP.exe` |

Launch ITK-SNAP from that directory.

![ITK-SNAP 4.4 bin folder](/images/itksnap-dls/itksnap-bin-folder.png)

## 1. Start the Deep Learning Server

::: tip Only one person needs to do this
The server is shared. If it is already running, skip to [step 2](#connect).
:::

::: steps
1. In the Windows search bar type `cmd` and open **Command Prompt**.
2. Run:

   ```bat
   C:\ProgramData\itksnap-dls\venv\Scripts\python.exe -m itksnap_dls
   ```

3. Read the output and match it to one of the two cases below.
:::

**Case A — the server is already running.** You see an error like:

```
ERROR: [WinError 10048] error while attempting to bind on ... only one usage of each socket address ...
```

Another user already started it. Nothing to do; continue with [step 2](#connect).

![Server already running](/images/itksnap-dls/server-already-running.png)

**Case B — the server starts.** You see:

```
Application startup complete
```

GPU inference is now available. Keep this Command Prompt window **open** for as long as the server is needed.

![Server started](/images/itksnap-dls/server-started.png)

<StepVideo src="" title="Start the Deep Learning Server" />

## 2. Connect ITK-SNAP to the server {#connect}

Full configuration is only needed the **first time**. Afterwards, just check that the status says *Connected*.

::: steps
1. In ITK-SNAP open **Tools → Preferences → AI Extensions**.

   ![AI Extensions preferences](/images/itksnap-dls/ai-extensions-new.png)

2. Click **New** (or **Edit**) and fill in:
   - Connection type: **Network connection to GPU server**
   - Server: `127.17.112.1`
   - Port: `8911`

   ![Server configuration](/images/itksnap-dls/server-config.png)

3. Click **OK** to return to the *AI Extensions* panel.
4. Click **Reconnect** and wait until the status shows **Connected**.

   ![Connected](/images/itksnap-dls/server-connected.png)

:::

<StepVideo src="" title="Connect ITK-SNAP to the server" />

## 3. Load the label colours and descriptions {#labels}

::: warning Required every session
Before AI segmentation, load the predefined label set. Repeat this each time ITK-SNAP is opened, unless you work inside a saved workspace that already contains the labels.
:::

::: steps
1. In the **Paintbrush** panel find the *Active Label* section.
2. Open the dropdown to the right of the active label and choose **Edit Label**.

   ![Active label dropdown](/images/itksnap-dls/active-label-menu.png)

3. In the *Segmentation Label Editor*, open **Actions → Import**.

   ![Label editor: Actions → Import](/images/itksnap-dls/label-editor-import.png)

4. Choose the file:

   ```
   D:\Xin\itk_label\label description.txt
   ```

   ![Label description file](/images/itksnap-dls/label-description-file.png)

5. Click **Open**, then check that the label list shows the expected names and colours.
:::

::: tip
You may copy `label description.txt` to any convenient location — just pick that path when importing.
:::

<StepVideo src="" title="Import the label descriptions" />

## 4. Segment with AI

::: steps
1. Return to the main ITK-SNAP window and load the image to segment.
2. Make sure the correct label is the **Active Label**.
3. Select the **Paintbrush** tool.
4. Enable **AI mode** in the tool options.
5. Click on the anatomical structure of interest.
6. Wait for the segmentation to appear.
:::

![AI segmentation in the paintbrush tool](/images/itksnap-dls/ai-segmentation.png)

<StepVideo src="" title="Segment a structure with one click" />
