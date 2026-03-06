import * as stateManager from './stateManager.js';
import * as UI from './ui.js';

export function startTerminal() {
    stateManager.setTerminal(true);
    UI.addLog("[SYSTEM]: Jacking into the Archive...", "var(--term-green)");
    setTimeout(() => {
        UI.addLog("TANDY: Your signature is anchored. Good. Listen to me.", "#b084e8");
        UI.addLog("TANDY: The Technate is purging this sector. If you don't escape, your vessel will be erased.", "#b084e8");
        UI.addLog("TANDY: Go north to Schrödinger's Closet. Survive the Faen projection. Defeat the Shadow Avatar and bring back its [Resonant Key]. It's the only way to open the front door.", "#b084e8");
        UI.addLog("TANDY: (Type 'exit' to jack out).", "#b084e8");
    }, 1000);
}

export function handleTerminalInput(val) {
    if (val.toLowerCase() === 'exit' || val.toLowerCase() === 'jack out') {
        stateManager.setTerminal(false);
        UI.addLog("[SYSTEM]: Connection severed.", "var(--term-amber)");
        return true; 
    }
    UI.addLog(`TANDY: There's no time for "${val}". Find that Resonant Key!`, "#b084e8");
    return true;
}
