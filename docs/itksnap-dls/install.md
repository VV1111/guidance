# Install & setup

How to install the custom ITK-SNAP on Windows, macOS or Ubuntu, and how to connect it to an nnInteractive AI server. For daily use, see the [user guide](./).

## What you need

| Part | Runs on | Purpose |
| --- | --- | --- |
| **Custom ITK-SNAP** | The computer you segment on — Windows, macOS or Ubuntu | The viewer, with the extra [AI edit modes](./edit-modes) |
| **AI server** (itksnap-dls + nnInteractive) | A computer with an **NVIDIA GPU** — Windows or Linux | Computes the AI segmentation |

The custom build only changes ITK-SNAP. Any standard itksnap-dls server works with it, and the AI edit mode buttons need nothing on the server side.

## 1. Install the custom ITK-SNAP {#client}

Download the package for your system from the [Releases page](https://github.com/VV1111/itksnap-custom/releases) of `VV1111/itksnap-custom`.

| System | File | Install |
| --- | --- | --- |
| Windows 10/11 | `…-win64-AMD64.exe` | Run the installer. Pick its own folder (e.g. `C:\Program Files\ITK-SNAP 4.4 DLS`) so it does not replace another ITK-SNAP. |
| Mac with Apple silicon (M1–M4) | `…-Darwin-arm64.dmg` | Open the `.dmg` and drag **ITK-SNAP** into **Applications**. See the note below. |
| Mac with Intel | No ready-made package | Build one yourself — see [Build from the GitHub code](#build). |
| Ubuntu 24.04 or newer | `…-Linux-x86_64.tar.gz` | `sudo apt install libssh-4 libcurl4 libxcb-cursor0`, extract the archive, run `bin/itksnap`. |

::: tip Which Mac do I have?
Apple menu → **About This Mac**. "Chip Apple M…" means Apple silicon; "Processor Intel…" means Intel.
:::

::: warning macOS: first launch is blocked
The macOS packages are not signed with an Apple developer certificate, so macOS refuses to open them at first. In **Applications**, right-click **ITK-SNAP → Open → Open** once. Or run in Terminal:

```bash
xattr -dr com.apple.quarantine /Applications/ITK-SNAP.app
```
:::

The interface is in **English** by default. Start ITK-SNAP with `--lang zh_CN` (or another language code) to use a translation.

### Build from the GitHub code {#build}

Only needed for a system without a ready-made package (Intel Mac), or to build your own copy. GitHub builds it for you; nothing has to be installed locally.

The repository has two branches:

| Branch | Contents | Use it for |
| --- | --- | --- |
| `feature/dls-edit-mode` (default) | ITK-SNAP 4.4.0 + AI edit mode + English default + build workflow | The custom ITK-SNAP — this is the main branch |
| `baseline-4.4.0-ci` | Unmodified ITK-SNAP 4.4.0 + the same build workflow (Windows only) | An official-equivalent build, for comparing with the custom one |

::: steps
1. Sign in to GitHub and **Fork** [VV1111/itksnap-custom](https://github.com/VV1111/itksnap-custom).
2. For an Intel Mac: in your fork, edit `.github/workflows/build.yml` and add `macos-15-intel` to the `os:` list (the settings for it are already in the file). Commit the change to `feature/dls-edit-mode`.
3. Open the **Actions** tab of your fork, enable workflows if asked, select **Build custom ITK-SNAP**, click **Run workflow** and choose the `feature/dls-edit-mode` branch.
4. Wait for the run to finish — 1 to 3 hours the first time, while ITK and VTK are compiled; later runs reuse them.
5. Open the finished run and download the package under **Artifacts**. Artifacts are kept for 90 days.
:::

To build on your own computer instead, follow the [official build instructions](http://www.itksnap.org/pmwiki/pmwiki.php?n=Documentation.BuildingITK-SNAP) with ITK 5.4.0, VTK 9.3.1 and Qt 6.8.1.

## 2. Choose an AI server {#server}

| | Option A — VIL server | Option B — your own AI server |
| --- | --- | --- |
| Who can use it | People with an account on the VIL server | Anyone with an NVIDIA GPU |
| You need | UW VPN (UW NetID) and a DESKTOP2 account | A Windows or Linux computer with an NVIDIA GPU |
| Setup | None — the server is already running | About 30 minutes, see [Option B](#own-server) |

### Option A — VIL server {#vil-server}

1. Ask the VIL server administrator for an account on **DESKTOP2** (`128.208.221.39`). A UW NetID alone does not log in: the server uses its own accounts.
2. Connect to the UW VPN (Husky OnNet).
3. Follow the [user guide](./): use the server through Remote Desktop (mode A), or run ITK-SNAP on your own computer through an SSH tunnel (mode B).

### Option B — your own AI server {#own-server}

Requirements: NVIDIA GPU with an up-to-date driver, Python 3.10 or newer, about 10 GB of disk space.

::: steps
1. Create a Python environment.

   ```bash
   python -m venv itksnap-dls-env
   source itksnap-dls-env/bin/activate        # Windows: itksnap-dls-env\Scripts\activate
   ```

2. Install PyTorch with CUDA **first**, so that pip does not pick a CPU-only build. Use `cu126` for GTX 10-series / TITAN Xp and older drivers; `cu128` also works for RTX 20-series and newer.

   ```bash
   pip install torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu126
   ```

3. Install the server.

   ```bash
   pip install itksnap-dls
   ```

4. Download the nnInteractive model with `huggingface_hub` directly. The download built into itksnap-dls 0.1.5 fails with current `huggingface_hub` (`307 Temporary Redirect`).

   ```bash
   python -c "from huggingface_hub import snapshot_download; snapshot_download('MIC-DKFZ/nnInteractive', allow_patterns=['nnInteractive_v1.0/*'], local_dir='models')"
   ```

5. Start the server in offline mode, so it uses the downloaded model and does not go online again.

   ```bash
   HF_HUB_OFFLINE=1 python -m itksnap_dls -m models                  # Linux
   set HF_HUB_OFFLINE=1 && python -m itksnap_dls -m models           # Windows (cmd)
   ```

6. Check the output: `Using GPU 0: <your GPU>` and `Application startup complete`. The server listens on port **8911**.
:::

If ITK-SNAP runs on another computer, either open port 8911 in the server's firewall, or connect through an SSH tunnel:

```bash
ssh -N -L 8911:127.0.0.1:8911 user@your-server
```

Write `127.0.0.1` in the tunnel command, not `localhost` (the server does not listen on IPv6).

## 3. Connect ITK-SNAP {#connect}

**Tools → Preferences → AI Extensions → New**:

| Setting | Value |
| --- | --- |
| Connection type | Network connection to GPU server |
| Server | `127.0.0.1` if the server runs on the same computer or through an SSH tunnel; otherwise the server's address |
| Port | `8911` |

Click **OK**, then **Reconnect**. The status turns **Connected**, and the **●** next to *Model* turns green.

::: warning Avoid "Setup Python Packages"
The *Local computer* option in AI Extensions can install itksnap-dls for you, but on Windows it tends to install a CPU-only PyTorch and runs into the model download error above. Use Option B instead.
:::

## Troubleshooting {#troubleshooting}

| Problem | Fix |
| --- | --- |
| macOS: "cannot be opened because the developer cannot be verified" | Right-click → **Open**, or run the `xattr` command above. |
| Ubuntu: ITK-SNAP does not start, a library is missing | Install `libssh-4 libcurl4 libxcb-cursor0`. Ubuntu older than 24.04 is not supported by this package. |
| Server prints `No GPU available, using CPU` | PyTorch is a CPU build. Repeat step 2 of Option B. |
| `307 Temporary Redirect` when the server starts a session | The model was not downloaded beforehand, or offline mode is off. Repeat steps 4–5. |
| *Error creating session on DLS server: internal server error* | Same cause as above — check the server window for the error. |
| *CUrl library error, server returned nothing* | The SSH tunnel uses `localhost`; use `127.0.0.1`. |
| `CUDA out of memory` in the server window | Another program is using the GPU memory. nnInteractive needs several GB free. |
