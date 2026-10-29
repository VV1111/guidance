# CVA Atlas

The lab's catalog of cerebrovascular imaging datasets: one card per dataset (anatomy, condition, modality, what the labels are, where the files sit on the server), shelves to group them, and a form to add your own. It runs on **aiserver3** and is reached through an SSH tunnel.

## Quick look

<StepVideo src="/videos/cva-atlas/quick-look.mp4" title="Sign in, find, shelve, add, undo — at 3× speed" loop />

| | Step | Where |
| --- | --- | --- |
| 1 | [Connect](#connect) | `connect` folder → launcher |
| 2 | [Sign in](#signin) | Atlas account, change the temporary password |
| 3 | [Find a dataset](#find) | **Datasets** · search and filters |
| 4 | [Put datasets on a shelf](#shelves) | tick cards → **Add to shelf** |
| 5 | [Add a dataset](#add) | **+ New dataset** · link or your own |
| 6 | [Undo](#undo) | **History & undo** |

## Where things are

| Item | Value |
| --- | --- |
| Address | `http://127.0.0.1:8765` — only after the tunnel is up |
| Server | `aiserver3` — `128.208.221.117` (university **VPN** off campus) |
| Launchers | `connect/Open-CVA-Atlas.cmd` (Windows) · `Open-CVA-Atlas.command` (macOS) — from `CVA-Atlas-Internal-Access.zip` |
| Accounts | your **aiserver3** login (opens the tunnel) **and** an **Atlas** account (opens the site). Two different passwords. |

## 1. Connect {#connect}

::: steps
1. Double-click the launcher for your system (macOS first time: Control-click → **Open**).
2. Type your **aiserver3** username and finish the server login as usual.
3. The browser opens `http://127.0.0.1:8765`. Keep the launcher window open; closing it ends the session.
:::

From any terminal instead:

```bash
ssh -N -L 8765:127.0.0.1:8765 YOUR_SERVER_USERNAME@128.208.221.117
```

Nothing prints after login — that is the tunnel working. Then open the address above.

## 2. Sign in {#signin}

::: steps
1. **Log in** with your **Atlas** username and the temporary password you were given.
2. First time only: choose a new password (10+ characters). The temporary one stops working.
:::

<StepVideo src="/videos/cva-atlas/sign-in.mp4" title="Log in → set your own password → the library opens" loop />

::: tip Forgot it later?
Ask the Atlas admin for a new temporary password. Your drafts, shelves and history stay — they are stored under your username, not your password.
:::

## 3. Find a dataset {#find}

**Datasets** is the library. Search matches name, purpose, tags and modality; the filters narrow by category, anatomy, condition, modality, what the labels delineate, how the source is obtained, and status.

<StepVideo src="/videos/cva-atlas/find.mp4" title="Filter by anatomy → search → open a card" loop />

![A dataset record](/images/cva-atlas/card.png)
*Click a card for the full record: previews, classification, counts, label values, licence, server path (members), gotchas, and the shelves it is on.*

Anatomy and condition filters include sub-regions: **Intracranial arteries** also returns Circle-of-Willis sets, **Intracranial hemorrhage** also returns sets labelled with a subtype.

## 4. Put datasets on a shelf {#shelves}

A shelf is a named group of datasets with a pinned note — a reading list for a project. It never changes the datasets on it.

::: steps
1. Tick the corner checkbox on the cards you want.
2. **Add to shelf** → an existing shelf, or **New shelf…** with a name, a one-line purpose and an optional private note.
3. Open **Bookshelf**: shelves on the left, the selected shelf's note on top, its datasets as covers.
:::

<StepVideo src="/videos/cva-atlas/organise.mp4" title="Tick two cards → Add to shelf → New shelf → Bookshelf" loop />

![The bookshelf](/images/cva-atlas/bookshelf.png)
*Bookmarks on the left: green = public, amber = team-private, blue = your draft, orange = published with unpublished changes. **My datasets** collects everything you created, automatically.*

A new shelf is a draft only you see. **Publish to team** shares it with every member. **Delete shelf** removes the grouping only — the datasets stay.

## 5. Add a dataset {#add}

**+ New dataset** first asks where it comes from.

![Public link or your own](/images/cva-atlas/new-origin.png)

### From a public link

::: steps
1. Paste the dataset page (Zenodo, OpenNeuro, GitHub, a challenge site…) and click **Fetch details**. Name, description, licence, citation and counts are filled when the site provides them.
2. Under **Looks like**, tick the classification chips that are right — each shows the sentence it came from. Nothing is applied by itself.
3. If the link matches an existing card, the report says so. Otherwise **Create private draft**.
:::

<StepVideo src="/videos/cva-atlas/add-link.mp4" title="Paste an OpenNeuro link → Fetch → tick suggestions" loop />

### Your own dataset

::: steps
1. **What it is** — name and one or two sentences on why it matters. Chips appear from your words; click to apply.
2. **What is inside** — anatomy, condition, modality, what the labels look like.
3. **Where it lives** — two switches: *a copy on this server* (path required) and *an outside source* (URL, licence). Both off = private institutional data.
:::

<StepVideo src="/videos/cva-atlas/add-own.mp4" title="Three steps, then the optional blocks under + More" loop />

Everything else — label values, counts, geometry, scanner hardware, gotchas, preview images — is behind the **+ More** buttons. Open only what you have.

::: warning Drafts, previews, privacy
Saving creates a **private draft**; the team sees it after **Publish to team** from the record panel. Never upload a preview with a name, MRN, date or face — crop and de-identify first. Raw data stays in the server folders; the atlas only records where it is.
:::

## 6. Undo {#undo}

**History & undo** lists your drafts, publishes, image uploads and deletions. Tick a row marked *undo available* → **Undo selected**. It is refused if someone edited the record since, so nobody's newer work is overwritten.

<StepVideo src="/videos/cva-atlas/undo.mp4" title="Discard a shelf draft → bring it back from History" loop />

Deleting a dataset or a shelf asks you to type its id first, says who is affected and what stays, and is reversible from History. A record you created is yours to delete; curated catalog records are admin-only.

::: details Roles
| Role | Sees | Can |
| --- | --- | --- |
| guest | public records | read |
| member | public + team-private records, server paths | add datasets, edit drafts, make shelves, publish to the team, delete own records |
| admin | everything | also publish publicly, delete anything, manage accounts |
:::

## Troubleshooting

| Problem | What to do |
| --- | --- |
| Launcher closes at once / `Address already in use` | Port 8765 on your computer is taken (often VS Code). `ssh -N -L 18765:127.0.0.1:8765 USER@128.208.221.117`, then open `http://127.0.0.1:18765`. |
| SSH times out | You are off campus — connect to the VPN first. |
| `Permission denied` from SSH | Wrong **server** login. Atlas credentials do not work here. |
| Browser says *connection refused* | The tunnel is not running — relaunch it and keep the window open. |
| *Invalid username or password* on the site | Wrong **Atlas** login, or the temporary password was already replaced. Ask the admin to reset it. |
| Password dialog keeps coming back | The first-login step was closed before finishing. Fill it in and press **Change password and continue**. |
| A card or path a colleague sees is missing | Your role is guest, or it is their private draft. Ask for the member role; drafts appear once published. |
