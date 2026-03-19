# Terra Agnostum — Design Documentation Index

> *Master reference for all design documents. Updated 2026-03-19.*

---

## How This Is Organized

| Folder | Purpose |
|--------|---------|
| `docs/` | **Active design specs** — the current source of truth for each system |
| `design/` | **Original drafts & archives** — early thinking, some superseded by `docs/` |
| `lore/` | **Narrative source material** — fiction, world-building prose |
| `plans/` | **Implementation roadmaps** — versioned technical rollout plans |

---

## 📗 Active Design Specs (`docs/`)

These are the **current, canonical** design documents for each system:

| Document | Domain | Status |
|----------|--------|--------|
| [RPG Mechanics v2 — Sub-Stats](docs/RPG%20Mechanics%20v2%20-%20Sub-Stats.md) | Stats & Character Building | ✅ Active |
| [AMN Economy & Reputation System](docs/AMN%20Economy%20%26%20Reputation%20System.md) | Economy, Tiers, Deeds, Badges, NPC Legacy | ✅ Active |

---

## 📙 Original Design Drafts (`design/`)

These are the **foundational design documents** that shaped v1 of the game. Some have been superseded by newer `docs/` specs; others remain the only reference for their topic.

### Core Mechanics
| Document | Status | Notes |
|----------|--------|-------|
| [RPG Mechanics v1](design/RPG%20Mechanics%20v1.md) | ⚠️ Superseded | Replaced by `docs/RPG Mechanics v2 - Sub-Stats.md`. Retains historical value for Semantic Tags / Ability Chips / LUCIDITY concepts not yet in v2. |
| [Combat (Battle of Wills)](design/Combat.md) | 📌 Current | Only spec for combat mechanics, turn structure, death states. Still canonical. |
| [Advanced State & PvP Combat](design/Advanced%20State%20and%20PvP%20Combat.md) | 📌 Current | PvP double-blind arbiter, NPC heartbeat, disconnect handling. Future roadmap. |

### Economy & Progression
| Document | Status | Notes |
|----------|--------|-------|
| [Player Tiers](design/Player%20Tiers.md) | ⚠️ Superseded | Replaced by `docs/AMN Economy & Reputation System.md`. Retains historical Aethal/Lucidity concepts. |
| [Playable & Payable Roadmap](design/Playable%20and%20Payable%20Roadmap.md) | ⚠️ Absorbed | Key ideas now live in AMN Economy doc. |

### World Architecture
| Document | Status | Notes |
|----------|--------|-------|
| [Spawn Architecture](design/Spawn%20Architecture.md) | 📌 Current | Deterministic instancing, apartment tutorial flow "Resonant Path". Core reference. |
| [World Architecture & Quest Roadmap](design/World%20Architecture%20and%20Quest%20Roadmap.md) | 📌 Current | Cosmology, cross-plane quests (Max's Cafe), multiplayer phases. |
| [Strata Spawn](design/Strata%20Spawn.md) | 📝 Note | Brief note on Faen spawn point ideas. |

### AI & Engine
| Document | Status | Notes |
|----------|--------|-------|
| [AIGM Super Powers Architecture](design/AIGM%20Super%20Powers%20Architecture.md) | 📌 Current | Akashic Record (lore generation), AI Co-Developer (ticket system), Fict manifestation. |
| [Agentic Players](design/Agentic%20Players.md) | 📌 Current | Chaos Monkey QA, cron-driven NPCs, offline Echo bots. Future roadmap. |

### Media & Content
| Document | Status | Notes |
|----------|--------|-------|
| [Media Attachments (Holo-Manifestation)](design/Media%20Attachments.md) | 📌 Current | Sensory Imprints: AI images, audio logs, 3D artifacts, video echoes. |
| [Origins & Originality](design/Origins%20and%20Originality.md) | 📝 Note | Brief note on player-driven discovery and auto-build aspirations. |

### Stubs
| Document | Status | Notes |
|----------|--------|-------|
| [Quest System](design/Quest%20System.md) | 🔴 Stub | Contains only "## TBD". Quest design now partially covered in AMN Economy doc and implemented in codebase (Phase 8-9). |

---

## 📕 Narrative Source Material (`lore/`)

| Document | Description |
|----------|-------------|
| [Psychotasy I](lore/Psychotasy_I.md) | Core philosophical fiction / world-building prose |

---

## 📘 Implementation Plans (`plans/`)

| Document | Description |
|----------|-------------|
| [Reality Consensus v0.2.1](plans/reality_consensus_v0_2_1.md) | Technical rollout plan for consensus reality mechanics |

---

## 📐 Root-Level Docs

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Project overview and quickstart |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [Interface Roadmap.md](Interface%20Roadmap.md) | UI/UX evolution plan |
| [LICENSE.md](LICENSE.md) | License |

---

## Legend

| Icon | Meaning |
|------|---------|
| ✅ | Active, canonical spec |
| 📌 | Current — still the only reference for this topic |
| ⚠️ | Superseded by a newer doc |
| 📝 | Rough note / fragment |
| 🔴 | Stub / empty |
