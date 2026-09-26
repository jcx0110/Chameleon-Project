# Chameleon Paper Context

This file is the working reference for future development of this project website. The archived PDF is the authoritative source; this note is a compact project context, not a replacement for the paper.

## Canonical paper

- **Title:** Chameleon: Control-Indexed Prospective Memory for Visuomotor Manipulation
- **arXiv:** 2603.24576v2 (`cs.RO`, 5 June 2026)
- **Authors:** Xinying Guo*, Chenxi Jiang*, Hyun Bin Kim, Yuhang Han, Ying Sun, Yang Xiao, Jianfei Yang†
- **Affiliations:** MARS Lab, Nanyang Technological University; Institute for Infocomm Research, A*STAR; National University of Singapore
- **Affiliation links (site hero):** MARS Lab → https://marslab.tech/ · NTU → https://www.ntu.edu.sg/ · I²R → https://www.a-star.edu.sg/i2r · A*STAR → https://www.a-star.edu.sg/ · NUS → https://www.nus.edu.sg/. As of September 2026 I²R has been merged into the A*STAR Institute of Advanced Intelligence and Computing (A*STAR IAIC); the site keeps the paper's wording.
- **Notes:** *Equal contribution; †corresponding author
- **Correspondence:** Jianfei Yang (`jianfei.yang@ntu.edu.sg`)
- **Code:** https://github.com/gxyes/MARS_Chameleon
- **Archived PDF:** `assets/papers/2603.24576v2.pdf`
- **PDF SHA-256:** `ec754eed3f20df886deddd1632a4f74391aebefa417e6a42c70b7d1c0badc621`

## One-sentence summary

Chameleon is a roughly 60M-trainable-parameter causal visuomotor policy that addresses observation–action delay by preserving separable embodied event histories, retrieving the trace relevant to the current control decision, and turning that recall into a prospective, action-ready working state.

## Central problem and thesis

In long-horizon manipulation, information needed for a decision may be observed long before the action is executed. At decision time, the current scene can be visually ambiguous, so the correct action depends on history. The paper calls this temporal gap **observation–action delay**.

The paper argues that useful policy-facing memory requires three properties:

1. **Separability:** perceptually similar histories remain distinguishable.
2. **Addressability:** the policy retrieves the history trace relevant to the current decision, rather than merely the most recent or visually similar trace.
3. **Prospectiveness:** recalled evidence is consolidated into a state that is directly useful for future action.

## Method

At each timestep, Chameleon consumes RGB views, proprioception, and an optional language instruction, then predicts a short future action horizon. Its causal computation follows a **write–propagate–address–consolidate** loop:

- **Embodied event tokens:** patch-level visual tokens are combined with proprioception and language, preserving localized evidence instead of immediately pooling it.
- **Event binding:** self-attention binds visual, body, and task information before memory propagation.
- **Token-grounded trace propagation:** slow selective state-space layers preserve a bank of distinct episode-level traces.
- **Control index:** the current embodied/control state forms a query that addresses the trace relevant to the present decision.
- **Working-state consolidation:** recalled evidence and current control context update a fast policy-facing working state.
- **Control-JEPA:** during training, the causal working state predicts future control contexts at horizons `{1, 2, 4, 8, 16, 32}`. The EMA target branch is training-only, so inference remains causal.
- **Action policy:** a transformer rectified-flow head predicts continuous action chunks from the prospective working state.

Implementation details highlighted in the paper include a DP-style patch encoder, a frozen DistilBERT language encoder, selective state-space memory layers, and a transformer rectified-flow action head.

## Camo-Dataset

Camo-Dataset is a real-robot UR5 benchmark designed to isolate observation–action delay. It uses a Robotiq Hand-E gripper, wrist and third-person RGB cameras, and 120 teleoperated demonstrations per task.

The three tasks expose complementary hidden variables:

- **Clean a specified plate:** remember which visually similar plate was used or contaminated; diagnoses delayed event–object binding.
- **Play shell game:** track the object-containing cup through occlusion and swaps; diagnoses spatial tracking with distractor motion.
- **Add various seasonings:** remember completed subgoals in a repeated sequence; diagnoses sequential progress memory and prevention of repetition or omission.

Metrics separate manipulation from memory-dependent choice:

- **MSR:** target-agnostic manipulation success.
- **DSR:** history-correct decision conditioned on valid manipulation.
- **SR:** success requires both valid manipulation and the history-correct decision.

## Main results

- **Camo-Dataset:** Chameleon achieves `80.8%` average DSR and `71.3%` average SR, compared with the strongest matched baseline (Diffusion Policy) at `22.5%` DSR and `21.3%` SR.
- **MemoryBench:** `97.3% ± 4.5%` success with three task-specific policies.
- **LIBERO-10:** `87.1% ± 0.8%` success with a ten-task mixed policy.
- **MIKASA-Robo:** `75.1% ± 1.4%` with a five-task mixed policy and `95.6% ± 1.0%` with two task-specific policies.

Ablations support the three-part design. Removing the control index hurts addressability; replacing token-grounded memory with generic or similarity-based alternatives hurts history recovery; removing Control-JEPA lowers Camo-Dataset SR from `71.3%` to `52.8%`.

Mechanistic probes report that memory states preserve hidden variables better than current-frame tokens, control queries select causally relevant traces under counterfactual trace edits, and Control-JEPA makes future action information available earlier in the working state.

## Contributions

1. Formulates observation–action delay as a policy-facing memory bottleneck and identifies separability, addressability, and prospectiveness as the key requirements.
2. Introduces Chameleon, a control-indexed prospective-memory visuomotor policy.
3. Introduces Camo-Dataset, a diagnostic real-robot benchmark, and demonstrates strong results across real-robot tasks and public long-horizon memory benchmarks.

## Scope and future directions

The current work studies episode-level imitation policies. The paper identifies cross-embodiment, cross-sensor, cross-task, and cross-environment scaling as open directions, along with combining prospective memory with active perception so robots can reacquire evidence before it becomes action-critical.

## Terminology to preserve

Use the paper's canonical terms consistently in website copy and visuals:

- observation–action delay
- control-indexed prospective memory
- embodied event tokens
- token-grounded traces
- control index / control context
- prospective policy-facing working state
- Control-JEPA
- separability, addressability, prospectiveness
- Camo-Dataset

