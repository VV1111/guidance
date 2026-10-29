# AI edit modes

In the custom ITK-SNAP build, the **AI edit mode** buttons decide what an AI correction is allowed to erase. This page shows what **Add**, **Refine** and **Replace** keep and erase when you correct an nnInteractive result inside a 3D ROI. For setup and daily use, see the [user guide](./).

## Which mode to use {#choose}

The letters are explained in [Terms](#terms).

| Goal | Mode | Cost |
| --- | --- | --- |
| Keep the first AI result <b style="color:#3b7ddd">B</b> complete and only add to it | **Add** | Over-segmentation has to be erased by hand |
| Keep the <b style="color:#7d8893">existing</b> voxels, but let the AI correct its own result | **Refine** (default) | In the same round, <b style="color:#3b7ddd">B</b> can shrink |
| Let the AI redraw the artery | **Replace** (original ITK-SNAP) | <b style="color:#7d8893">Existing</b> voxels can be erased too |

## Terms {#terms}

Everything here is about the artery label (the active label), inside the 3D ROI.

| | Term | Meaning |
| --- | --- | --- |
| <span style="display:inline-block;padding:0 7px;border:2px dashed #3b7ddd;border-radius:3px;color:#3b7ddd;font-weight:700">A</span> | **Outline A** | Your first polygon. It is only a hint for the AI. |
| <span style="display:inline-block;padding:0 9px;border-radius:3px;background:#3b7ddd;color:#fff;font-weight:700">B</span> | **Result B** | The AI's answer to outline A. You accepted it. |
| <span style="display:inline-block;padding:0 7px;border:2px dashed #e07b1f;border-radius:3px;color:#e07b1f;font-weight:700">C</span> | **Outline C** | A later correction polygon. It may or may not overlap B. |
| <span style="display:inline-block;padding:0 9px;border-radius:3px;background:#e07b1f;color:#fff;font-weight:700">D</span> | **Result D** | The AI's answer after outline C. It may be smaller than B or differ from it. |
| <span style="display:inline-block;padding:0 9px;border-radius:3px;background:#7d8893;color:#fff;font-weight:700">existing</span> | **Existing voxels** | Artery voxels that were there before outline A: drawn by hand, loaded from a file, or left by an earlier round. |
| | **Round** | A sequence of AI steps on the same label — see [rule 3](#rounds). |

<div style="overflow-x:auto;margin:16px 0">
<svg viewBox="0 0 760 146" role="img" aria-label="Outlines A and C cover a short piece of the artery; results B and D cover a long stretch" style="display:block;width:100%;min-width:560px;height:auto;font-family:inherit;font-size:13px">
  <rect x="166.6" y="6" width="536.8" height="120" rx="4" fill="#2f8f6b" fill-opacity="0.07" stroke="#2f8f6b" stroke-width="1.5" stroke-dasharray="6 4"/>
  <text x="172.6" y="140" fill="#2f8f6b" font-size="12">3D ROI</text>
  <text x="740" y="140" text-anchor="end" fill="currentColor" fill-opacity="0.65" font-size="12">along the artery →</text>
  <text x="0" y="49" font-weight="700" fill="currentColor">First step</text>
  <line x1="166.6" x2="703.4" y1="44" y2="44" stroke="currentColor" stroke-opacity="0.2" stroke-width="2"/>
  <rect x="191" y="36" width="48.8" height="16" rx="2" fill="#7d8893"/>
  <text x="215.4" y="68" text-anchor="middle" fill="#7d8893" font-size="12" font-weight="700">existing</text>
  <rect x="264.2" y="36" width="244" height="16" rx="2" fill="#3b7ddd"/>
  <text x="516.2" y="49" font-weight="700" fill="#3b7ddd">B</text>
  <rect x="347.6" y="30" width="52.8" height="28" rx="3" fill="none" stroke="#3b7ddd" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="374" y="26" text-anchor="middle" font-weight="700" fill="#3b7ddd">A</text>
  <text x="0" y="109" font-weight="700" fill="currentColor">Correction</text>
  <line x1="166.6" x2="703.4" y1="104" y2="104" stroke="currentColor" stroke-opacity="0.2" stroke-width="2"/>
  <rect x="325.2" y="96" width="305" height="16" rx="2" fill="#e07b1f"/>
  <text x="638.2" y="109" font-weight="700" fill="#e07b1f">D</text>
  <rect x="530.6" y="90" width="40.6" height="28" rx="3" fill="none" stroke="#e07b1f" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="550.9" y="86" text-anchor="middle" font-weight="700" fill="#e07b1f">C</text>
</svg>
</div>

*The artery inside the ROI, drawn as a straight line. Dashed boxes are outlines (hints); solid bars are voxels in the segmentation. Each outline covers a short piece, but each AI result covers a long stretch.*

## How it works

### 1. Outlines are not saved

When you click **accept**, ITK-SNAP removes the outline and sends it to the AI as a hint. Only <b style="color:#3b7ddd">B</b> and <b style="color:#e07b1f">D</b> are written into the segmentation.

### 2. Each AI answer covers the whole artery

<b style="color:#e07b1f">D</b> is a fresh estimate of the whole artery, not just of the part near <b style="color:#e07b1f">C</b>. It can differ from <b style="color:#3b7ddd">B</b> anywhere.

When <b style="color:#e07b1f">D</b> is written, every artery voxel outside <b style="color:#e07b1f">D</b> — anywhere in the 3D image — is either kept or erased, depending on the mode. Erased voxels become empty (label 0).

### 3. Hints add up within a round {#rounds}

Within a round, the AI combines all your hints. A new round starts only when you:

- use the AI on a different label than the last time you used it, or
- open another image.

Painting the ROI by hand, waiting, or pressing `Ctrl+Z` do **not** start a new round.

At the start of every round, Refine records the artery voxels present at that moment and protects them until the round ends.

## Case 1 — B and D in the same round (usual) {#case1}

You accept <b style="color:#3b7ddd">B</b>, then draw <b style="color:#e07b1f">C</b>, without using the AI on another label in between. The AI combines <b style="color:#3b7ddd">A</b> and <b style="color:#e07b1f">C</b> to produce <b style="color:#e07b1f">D</b>. <b style="color:#3b7ddd">B</b> was made in this round, so Refine does not protect it.

| Mode | Artery after D | Parts of <b style="color:#3b7ddd">B</b> outside D | <b style="color:#7d8893">Existing</b> voxels outside D |
| --- | --- | --- | --- |
| Replace | <b style="color:#e07b1f">D</b> | erased | erased |
| Refine | <b style="color:#e07b1f">D</b> ∪ <b style="color:#7d8893">existing</b> | erased | kept |
| Add | <b style="color:#3b7ddd">B</b> ∪ <b style="color:#e07b1f">D</b> ∪ <b style="color:#7d8893">existing</b> | kept | kept |

::: warning
In case 1, only **Add** keeps <b style="color:#3b7ddd">B</b> complete.
:::

## Case 2 — B and D in different rounds {#case2}

After accepting <b style="color:#3b7ddd">B</b>, you used the AI on another label (for example on the ROI) or opened another image, then drew <b style="color:#e07b1f">C</b> on the artery. The AI no longer knows <b style="color:#3b7ddd">A</b>, so <b style="color:#e07b1f">D</b> comes from <b style="color:#e07b1f">C</b> alone. <b style="color:#3b7ddd">B</b> now counts as <b style="color:#7d8893">existing</b>, so Refine protects it.

| Mode | Artery after D | Parts of <b style="color:#3b7ddd">B</b> outside D | <b style="color:#7d8893">Existing</b> voxels outside D |
| --- | --- | --- | --- |
| Replace | <b style="color:#e07b1f">D</b> | erased (the original ITK-SNAP problem) | erased |
| Refine | <b style="color:#3b7ddd">B</b> ∪ <b style="color:#e07b1f">D</b> ∪ <b style="color:#7d8893">existing</b> | kept | kept |
| Add | <b style="color:#3b7ddd">B</b> ∪ <b style="color:#e07b1f">D</b> ∪ <b style="color:#7d8893">existing</b> | kept | kept |

Refine and Add give the same result here. They differ at the **next** correction in this round: if another outline or a right-click exclusion makes the AI's answer smaller than <b style="color:#e07b1f">D</b>, Refine removes the surplus of <b style="color:#e07b1f">D</b>, while Add keeps it. <b style="color:#3b7ddd">B</b> stays in both.

## Special cases {#special}

| Situation | What happens |
| --- | --- |
| <b style="color:#e07b1f">D</b> lies entirely inside <b style="color:#3b7ddd">B</b> (the AI shrank its answer) | Case 1: Replace and Refine shrink the artery to <b style="color:#e07b1f">D</b>; Add keeps <b style="color:#3b7ddd">B</b>. Case 2: Refine and Add keep <b style="color:#3b7ddd">B</b>. |
| You painted the artery by hand between <b style="color:#3b7ddd">B</b> and <b style="color:#e07b1f">C</b> | Those voxels are not <b style="color:#7d8893">existing</b> — they were added mid-round. Replace and Refine erase any of them outside <b style="color:#e07b1f">D</b>; Add keeps them. Touch up by hand after the AI steps. |
| You pressed `Ctrl+Z` after an AI step | The segmentation goes back, but the AI still remembers the undone outline and uses it for the next answer in the round. The undone area can come back. |
| Right-click exclusion (paintbrush AI mode) | A hint that makes the AI's answer smaller. Visible in Replace and Refine; no visible effect in Add. |
| Artery drawn or loaded before <b style="color:#3b7ddd">A</b> | These are <b style="color:#7d8893">existing</b> voxels: Refine and Add keep them; Replace erases those outside the AI's answer. |
| ROI and other labels | Edit modes only control the artery label. Whether <b style="color:#e07b1f">D</b> may paint over ROI voxels is set by **Paint over**. Erased artery voxels become empty, not ROI, so the ROI can get holes — check it after a correction. |

---

*Behaviour as implemented in `DeepLearningSegmentationModel` of the custom ITK-SNAP build. The diagram reduces the 3D artery to a line and only illustrates the terms.*
