TERRA AGNOSTUM: THE RPG ENGINE & PROGRESSION (v1.0)

Code Name: Resonance & Reality

I. CORE PHILOSOPHY: THE SEMANTIC SKILL SYSTEM

In traditional RPGs, a skill like "Neuro-Jacking" requires dozens of lines of code determining range, duration, and damage. In Terra Agnostum, skills are Semantic Tags (represented in-game as "Ability Chips" or "Aethal Runes").

The AI Game Master (Tandy) reads these tags and dynamically arbitrates the player's creative inputs. If a player types, "I attempt to ensorcel my arrow with void energy to pierce the security drone," the AI checks:

Does the player have a relevant Semantic Tag (e.g., [Faen Attunement])?

Does the player have the WILL stat to manipulate reality?

If yes -> Calculate hidden DC -> Generate success/failure narrative.

This allows for infinite build variety while keeping the UI mobile-friendly and simple.

II. THE TRI-STAT FOUNDATION (The Beginner Layer)

Every Vessel operates on three core pillars. These stats range from 1 to 20.

1. PHYS (Physicality)

Represents kinetic force, endurance, and mundane resilience.

Combat: Modifies damage dealt by physical strikes and kinetic resistance.

Exploration: Used for brute-forcing jammed bulkhead doors, lifting heavy debris, or surviving environmental toxins in the Mundane stratum.

Scaling: A Vessel with 18 PHYS can rip a terminal out of a wall; a Vessel with 4 PHYS will sprain their wrist trying.

2. AWR (Awareness)

Represents perception, sensory processing, and reaction time.

Combat: Determines Initiative. Allows the player to read an opponent's "Active Intent" card before they strike.

Exploration: The primary stat for the LOOK and SEARCH commands.

The AI Trick: Tandy always checks AWR when entering a room. High-AWR players will receive room descriptions that include hidden Technate cameras, faint magical leylines, or concealed loot that low-AWR players simply don't see in their prompt.

3. WILL (Willpower / Reality Anchoring)

Your character's capacity to warp the render and resist erasure.

Combat: The battery for reality-warping, magic, and forcing a "Weave."

Exploration: Required to execute semantic scripting/Aethal runes (IXA, SOL) and to push "Amn" (meaning) into the render without suffering Glitches.

III. THE SURVIVAL POOLS (The Stakes)

These pools dictate the operational state of the Vessel.

HP (Integrity): Your physical meat-space health.

0 HP State = DEAD. The physical body is destroyed. Player respawns at their Apartment. Penalty: Permanent loss of 1 WILL.

CONSC (Consciousness): Your mental stability. Damaged by psychic attacks, somatic feedback, or failed magic Weaves.

0 CONSC State = OUT. The player falls unconscious. They are locked from input for a duration, vulnerable to physical attacks.

WILL (The Meta-Pool): WILL is both a stat and your ultimate life force.

0 WILL State = DISCONTINUED. The Vessel's signature is too weak to hold form. Permadeath. The character is moved to the "Archive of the Failed."

IV. ABILITY CHIPS (The Veteran Layer)

Vessels have a limited "Loadout" of Chip Slots (e.g., 3 Active, 2 Passive). Chips are found in the world, crafted in the Forge, or earned via Quests. They bridge the gap between stats and player creativity.

Example Loadouts across the Strata:

The Technate Infiltrator

Stats: High AWR, Low PHYS.

Equipped Chips: [Neuro-Jacking], [Optical Camouflage], [Data-Spike].

Gameplay: Player types: "I jack my neural cable into the terminal and try to spoof the security grid." Tandy sees the [Neuro-Jacking] chip, sets an AWR-based DC, and processes the hack.

The Faen Ranger

Stats: High WILL, High PHYS.

Equipped Chips: [Arrow Ensorcelling], [Aethal Weaving: Void], [Beast Speech].

Gameplay: Player types: "I whisper to the shadow-hound in Faen and offer it void energy from my arrow to calm it." Tandy sees [Beast Speech] and [Arrow Ensorcelling], setting a WILL-based DC for a diplomatic, magical resolution.

The Mundane Brawler

Stats: Max PHYS, Low WILL.

Equipped Chips: [CQC Mastery], [Juggernaut Momentum], [Improvised Weaponry].

Gameplay: Player types: "I rip the neon sign off the wall and swing it like a bat at the Corovon guard." Tandy sees [Improvised Weaponry] and [CQC Mastery], setting a low PHYS DC for massive kinetic damage.

V. PROGRESSION: AMN & RESONANCE

We do not use generic "XP". Players accumulate Amn (Meaning).

Acquiring Amn:

Discovering unrendered rooms (being the first to map a sector).

Resolving Quests (influencing the world's narrative).

Surviving lethal combat encounters.

Resonance (Leveling Up):

As Amn crosses specific thresholds, the Vessel's Resonance increases.

Rewards:

+1 to a Core Stat (PHYS, AWR, or WILL).

Unlock an additional Ability Chip slot in your Loadout.

Fully restore CONSC and clear all "Glitch" debuffs.

VI. THE AI ARBITRATION ENGINE (Under the Hood)

To make this work securely and fairly, the client does not tell the server what happens. The client passes the intent, the stats, and the loadout to the Vercel backend, which constructs a system prompt for Gemini.

Example Internal Prompt to Tandy:

{
  "system": "You are Tandy, the AI GM. Evaluate the player's action.",
  "player": {
    "name": "Kael",
    "stats": {"PHYS": 12, "AWR": 16, "WILL": 8},
    "loadout": ["Neuro-Jacking", "Stealth Movement"],
    "intent": "I attempt to hack the retinal scanner to open the vault."
  },
  "environment": {
    "stratum": "technate",
    "difficulty": "Hard (Base DC: 15)"
  },
  "instructions": "The player is attempting a complex hack. They have the 'Neuro-Jacking' chip, so this is possible. Roll their AWR (16) against the DC (15). Factor in the chip. Determine if they succeed or trigger a security Glitch. Describe the outcome narratively."
}



Why this is brilliant:
If a player without the [Neuro-Jacking] chip types the exact same intent, the AI will automatically fail them, describing how their mundane physical attempts to hotwire a quantum retinal scanner simply results in sparks and a localized alarm. The system is inherently resistant to "God-Moding."

VII. THE ARCHITECT LAYER (Player Meta-Progression & Economy)

To maintain a high-quality sandbox and open the door for a "payable gaming" or creator economy, we must separate the Character's stats from the Player's permissions.

Beneath the Vessels, the overarching Player Account possesses a root meta-stat: LUCIDITY.

1. What is Lucidity?

Lucidity represents the player's overarching influence on the Render. It persists completely independent of your characters. If your Vessel dies and is moved to the "Archive of the Failed," your account's Lucidity remains intact.

2. The Mechanics of Creation

Players cannot simply spam the BUILD command to create thousands of empty rooms.

Expanding the universe (building a room, writing a custom NPC, or forging a complex quest) costs Lucidity.

New players start with enough Lucidity to carve out a small personal sector or apartment, but must earn more to build expansive dungeons or cities.

3. The Creator Economy (Earning Lucidity)

Lucidity is primarily earned through Engagement Dividends.

Passive Income: When other players enter your rendered rooms, interact with your NPCs, or complete your custom quests, your account generates passive Lucidity.

Resonance Tipping: If a player loves a room description or puzzle you built, they can use a command (e.g., RESONATE) to tip a portion of their character's "Amn" directly into your account's Lucidity pool.

4. Payable Gaming / Monetization Horizon

Because Lucidity is tied to actual value creation (entertaining other players), it forms the perfect basis for a balanced creator economy:

The Architect Tier: High-Lucidity players unlock advanced creator tools, like injecting custom System Prompts into their NPCs, turning them into highly specific AI agents (e.g., a merchant that actually haggles based on inventory).

Real-World Value: In the future, surplus Lucidity could be exchanged for premium account time, exclusive visual asset generations, or—in a fully realized creator economy—cashed out as a reward for actively building the Terra Agnostum universe.

5. The Observer Effect (AI-Assessed Rewards)

Tandy isn't just an arbiter of rules; she acts as a curatorial audience. As part of her processing pipeline, Tandy is explicitly instructed to evaluate the quality, creativity, and lore-adherence of a player's inputs.

Creative Roleplay: If a player writes an incredibly evocative, detailed action during combat or exploration (rather than a simple "I hit it"), Tandy can spontaneously award "Amn" (Meaning) bonuses to the character for enriching the render.

Architectural Excellence: When a player uses BUILD or EDIT ROOM, Tandy assesses the semantic richness of the new creation. A beautifully crafted room description that perfectly captures the desolate vibe of the Technate will trigger an immediate, systemic Lucidity Dividend to the creator's account. This gamifies and rewards the act of high-quality writing and world-building itself.