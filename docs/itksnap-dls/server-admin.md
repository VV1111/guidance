# Server admin notes

How the AI server on **DESKTOP2** is set up, and the problems met so far with their fixes. For administrators of that machine; users only need the [user guide](./).

## Overview

| Item | Value |
| --- | --- |
| Machine | DESKTOP2, `128.208.221.39`, 2 × NVIDIA TITAN Xp (12 GB, Pascal) |
| Accounts | Local Windows accounts on DESKTOP2 (not UW NetIDs). Remote access needs membership in *Remote Desktop Users*. |
| Network | UW VPN required. The firewall is managed by UW group policy: only Remote Desktop (3389) and SSH (22) are reachable; local firewall rules are ignored. |
| Python | 3.12.10 at `F:\Apps\Python312` |
| Server environment | `F:\Apps\itksnap-dls\venv` — PyTorch 2.8.0+cu126, itksnap-dls 0.1.5, nnInteractive 2.6.0, huggingface_hub 2.2.0 |
| Model | `F:\Apps\itksnap-dls\models\nnInteractive_v1.0` (MIC-DKFZ, ≈ 411 MB checkpoint) |
| Start script | `F:\Apps\itksnap-dls\start-server.bat` (desktop shortcut **Start ITK-SNAP AI Server**) |
| ITK-SNAP | `F:\Apps\ITK-SNAP 4.4 DLS` (desktop shortcut **ITK-SNAP 4.4 DLS**) |
| Installer copy | `F:\Apps\itksnap-dls\installer\` |
| Label file | `F:\Apps\itksnap-dls\labels\label description.txt` |

## Start script

```bat
@echo off
title ITK-SNAP AI Server - do not close
set HF_HOME=F:\Apps\itksnap-dls\hf
set HF_HUB_OFFLINE=1
set CUDA_VISIBLE_DEVICES=0
"F:\Apps\itksnap-dls\venv\Scripts\python.exe" -m itksnap_dls -m F:\Apps\itksnap-dls\models
pause
```

| Line | Why |
| --- | --- |
| `HF_HOME` | Keeps the Hugging Face cache in a shared folder instead of each user's profile. |
| `HF_HUB_OFFLINE=1` | Required — see [known problems](#problems). |
| `CUDA_VISIBLE_DEVICES=0` | Runs on GPU 0. Change to `1` to use the other GPU. |
| `pause` | Keeps the window open if the server stops with an error. |

## Permissions

`F:\Apps` gives users read and execute only. Two folders must also be writable, because the server writes lock and cache files there on every start:

| Folder | Users |
| --- | --- |
| `F:\Apps\itksnap-dls\models\.cache` | Modify |
| `F:\Apps\itksnap-dls\hf` | Modify |
| `venv`, `Python312`, `ITK-SNAP 4.4 DLS`, `start-server.bat` | Read & execute (admins only can change them) |

```powershell
icacls "F:\Apps\itksnap-dls\models\.cache" /grant "Users:(OI)(CI)M" /T
icacls "F:\Apps\itksnap-dls\hf" /grant "Users:(OI)(CI)M" /T
```

## Known problems and fixes {#problems}

| Symptom | Cause | Fix |
| --- | --- | --- |
| *Error creating session on DLS server: internal server error*; the server log shows `307 Temporary Redirect` | itksnap-dls 0.1.5 replaces huggingface_hub's HTTP client with a plain `httpx.Client`, which does not follow Hugging Face's redirects in huggingface_hub 2.x. It re-checks the model online on every session. | Model downloaded once with plain `huggingface_hub`; server runs with `HF_HUB_OFFLINE=1`. |
| Other users get `PermissionError: [WinError 5] … LICENSE.lock` | The server creates a lock file under `models\.cache` even offline; only the installing account could write there. | Grant Users *Modify* on `models\.cache` and `hf` (see [Permissions](#permissions)). |
| `No GPU available, using CPU` | A CPU-only PyTorch. The TITAN Xp (Pascal, sm_61) is not supported by PyTorch's CUDA 12.8 builds, and the driver supports CUDA 12.6. | Install PyTorch from the `cu126` index before itksnap-dls. |
| `CUDA out of memory` | TensorFlow jobs on this machine reserve almost all memory on both GPUs. | Coordinate GPU use; point the server at a free GPU with `CUDA_VISIBLE_DEVICES`. |
| ITK-SNAP on a user's own PC cannot reach `128.208.221.39:8911` | UW group policy ignores local firewall rules. | Users connect through an SSH tunnel to port 22. |
| *CUrl library error, server returned nothing* through the tunnel | `localhost` on the server resolves to IPv6 first; the server listens on IPv4 only. | Tunnel to `127.0.0.1:8911`, not `localhost:8911`. |
| The server stops when its owner signs out | The server runs inside that user's session. | Disconnect Remote Desktop instead of signing out. |

## Upgrading

```powershell
$py = "F:\Apps\itksnap-dls\venv\Scripts\python.exe"
& $py -m pip install --upgrade itksnap-dls
& $py -c "import torch; print(torch.__version__, torch.cuda.is_available())"
```

Run as administrator (the environment is read-only for users). Afterwards PyTorch must still report `+cu126` and `True`; if not, reinstall it from the `cu126` index. Keep `HF_HUB_OFFLINE=1` until itksnap-dls fixes the download problem; to switch to a newer model, download it first as in [Install & setup, step 4](./install#own-server).

## Updating ITK-SNAP

Download the new Windows installer from the [Releases page](https://github.com/VV1111/itksnap-custom/releases), copy it to `F:\Apps\itksnap-dls\installer\`, and install it silently over the existing one:

```powershell
Start-Process "F:\Apps\itksnap-dls\installer\<installer>.exe" -ArgumentList '/S','/D=F:\Apps\ITK-SNAP 4.4 DLS' -Wait
```
