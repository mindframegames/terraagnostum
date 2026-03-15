TERRA AGNOSTUM: SENSORY IMPRINTS & MULTIMEDIA (v1.0)

Code Name: Holo-Manifestation

I. CORE PHILOSOPHY

In Terra Agnostum, the UI is divided between the CLI/Text Log and the Visual Projection screen (which normally displays the AI-generated lo-fi glitch art of the current room).

Sensory Imprints allow Architect players to hijack that Visual Projection screen when a user interacts with a specific object. It bridges the gap between old-school MUDs and modern multimedia experiences.

II. THE IMPRINT TYPES

When an Architect builds an object, they can attach one of the following Imprint formats:

The Generative Memory (AI Image): The Architect provides a prompt. Tandy uses Gemini 2.0 Flash Exp to generate a unique, glitch-art image that permanently attaches to the object.

The Audio Log (.mp3 / .wav): A link to an audio file. Perfect for "found footage" style storytelling, distress beacons, or atmospheric noise.

The Artifact (.glb / .gltf): A 3D model link (e.g., hosted on IPFS or Sketchfab) that renders in a lightweight Three.js canvas over the main visual area, allowing the player to click and drag to rotate the item.

The Echo (Video/GIF): A short looping video clip.

III. THE ARCHITECT FLOW

Creation: The Architect types > BUILD OBJECT "Strange Data-Pad".

Imbuing: The Architect types > IMBUE IMPRINT "Strange Data-Pad".

The UI Overlay: A sleek, minimal modal slides into the UI asking for the media parameters.

Type: [Dropdown]

Source/Prompt: [Text Field]

Caption (Optional): "Property of the Technate."

IV. THE PLAYER EXPERIENCE

A player enters the room and sees the "Strange Data-Pad" in the text description.

Interaction: The player types > EXAMINE Strange Data-Pad.

The Hijack:

The text log describes the physical feeling of picking it up (handled by Tandy).

Simultaneously, the main Visual Projection screen (which was showing the room) glitches out with a CRT static effect.

The visual screen is replaced by the object's attached Media (the 3D rotating model, the specific image, or the audio player).

Dismissal: Typing > DROP or walking away restores the room's default visual render.

V. ECONOMY & MODERATION (The Lucidity Cost)

Allowing User-Generated Media (UGM) is incredible for immersion, but dangerous for moderation and server costs. We use the Architect Layer to protect the render:

The Generation Tax: If an Architect uses the "Generative Memory" option, it costs a high amount of Lucidity (since it costs us real API credits to generate the image).

The Trust Tier: Linking external URLs (like a 3D model or video) is locked behind a specific "Architect Tier." A player must have a high lifetime Lucidity score to link outward, proving they are a trusted world-builder.

The "Glitch" System (Moderation): Any player can flag a piece of media by typing > REPORT [Object]. If an object receives enough reports, the system automatically "Glitches" the item, deleting its visual imprint and temporarily penalizing the creator's Lucidity until a human admin reviews it.