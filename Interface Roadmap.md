TERRA AGNOSTUM // EVOLUTION ROADMAP
===================================

> > NODE: STRATEGIC PLANNINGDIRECTIVE: MODERNIZE THE RENDER

This document outlines the architectural and experiential roadmap for Terra Agnostum. The goal is to evolve beyond the limitations of legacy MUDs (Multi-User Dungeons) by bridging the gap between casual, mobile-first exploration and deep, desktop-based world weaving.

\[ CORE PHILOSOPHY: FRICTIONLESS INTENT \]
------------------------------------------

Traditional text games fail because players hate "guessing the verb." Terra Agnostum's greatest asset is **Tandy (the AI GM)**. Modern players—especially on mobile—want to express an _intent_ and see the world react intelligently. We must prioritize frictionless interaction over strict syntax.

\[ PHASE I: THE MOBILE-FIRST INTERFACE \]
-----------------------------------------

To make the game playable in short bursts (e.g., on a train or at a coffee shop), we must minimize mandatory typing for standard actions while keeping the command line available for complex weaving.

*   **\[ \] Contextual Smart Chips:** Parse room descriptions and entity lists so they become interactive.
    
    *   _Mechanic:_ Tapping a highlighted entity (e.g., Shadow Avatar) opens a contextual quick-action dial or menu (Attack, Examine, Talk). Tapping an exit (North) executes movement.
        
*   **\[ \] The "Materia" Drawer (Bottom Sheet):** Move the current right-hand sidebar (Inventory, Local Entities, Avatar Stats) into a swipe-up Bottom Sheet for mobile screens.
    
    *   _Mechanic:_ Tapping an item like Resonant Key in the drawer auto-fills the command line with use Resonant Key or executes it instantly.
        
*   **\[ \] Somatic Navigation (Swipe / Tap):** Implement minimalist touch controls for movement.
    
    *   _Mechanic:_ Swipe up to go North, swipe left to go West. Alternatively, a subtle, translucent D-pad overlay that triggers executeMovement().
        
*   **\[ \] UI Layout Restructure (Mobile):**
    
    *   **Top 40%:** Generative Visual Projection (anchors the modern feel).
        
    *   **Middle 50%:** Narrative Log (scrollable, interactive text).
        
    *   **Bottom 10%:** Sticky Command Bar containing Map Toggle, Drawer Toggle, and Text Input.
        

\[ PHASE II: THE DUAL-LAYERED RENDER \]
---------------------------------------

We must cater to two distinct types of players without alienating either. The UI and mechanics will dynamically support both playstyles.

### 1\. The Wanderer (Casual Consumption)

*   **Profile:** Mobile players looking for a quick adventure.
    
*   **Gameplay:** Navigating existing rooms, engaging in AI-mediated combat, and experiencing the story.
    
*   **Interaction:** Heavily relies on tap-to-act, smart chips, and short typed/dictated commands (shoot the guard). Keeps API token usage manageable and session times flexible.
    

### 2\. The Architect (Deep Creation)

*   **Profile:** Desktop players or dedicated creators.
    
*   **Gameplay:** Expanding the universe, defining new sectors, and creating NPCs.
    
*   **Interaction:** Uses the keyboard to execute complex structural commands (build north --auto, edit room). Writes long, descriptive prompts to shape the Astral Plane and establish public canon.
    

\[ PHASE III: THE ECONOMY OF MEANING (MONETIZATION) \]
------------------------------------------------------

Generative AI (visuals and narrative) incurs server costs. Monetization must align with API usage without paywalling the core storytelling experience. We monetize _creation_, not _consumption_.

*   **\[ \] The 'Amn' System (Premium Currency):**
    
    *   _Amn_ (Meaning/Willpower) is required to weave new reality.
        
    *   **Free Actions:** Exploring, reading, fighting, talking, basic inventory management.
        
    *   **Cost Actions (Burns Amn):** Forging a new visual Avatar portrait, generating a new map sector (build), or permanently pinning a visual projection to the public server (pin view).
        
    *   _Acquisition:_ Players regenerate a small amount of Amn daily, or can purchase Amn bundles to fund large-scale world-building.
        
*   **\[ \] The "Architect" Subscription:**
    
    *   A monthly premium tier.
        
    *   **Perks:** Expanded context windows for deeper AI memory, access to higher-resolution visual projections, and the authority to lock their personal pocket-dimensions into the "Public Canon" universe for all players to explore.
        

\[ PHASE IV: ADVANCED ARCHITECTURE \]
-------------------------------------

Future innovations to solidify Terra Agnostum as a next-generation text adventure.

*   **\[ \] Voice-to-Intent (Somatic Dictation):** Leverage native mobile microphones. Players can hold a button and speak: _"Tandy, I want to cast a psychic illusion of a Technate Enforcer to scare the Shadow."_ The engine transcribes and submits this directly to the AI GM.
    
*   **\[ \] Persistent Memory Vectors:** Integrate a vector database (like Pinecone) to allow Tandy to remember player actions from weeks ago, creating long-term narrative consequences for both Wanderers and Architects.
    
*   **\[ \] Multiplayer "Echoes":** Enhance the sync engine so players in the same room can see each other's custom Avatars and collaborate in real-time combat against generated entities.
    

_The total number of minds in the universe is one. Let us render it beautifully._