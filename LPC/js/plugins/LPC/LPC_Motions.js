//=============================================================================
//  LPC_Motions.js
//=============================================================================
//  Version: 1.0.0
//  Date: 1 September 2025
//  Released under MIT license
//  http://opensource.org/licenses/mit-license.php
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc add battler motions from Unlversal LPC Spritesheet Generator
 * @target MZ
 */

// Battler Motions for characters
// This is largely based on battler motions for actors
// from rmmz_sprites.js
Sprite_Character.MOTIONS = {
    walk: { index: 0, loop: true, name: 'walk', frames: 9 },
    wait: { index: 1, loop: true, name: 'idle', frames: 2 },
    chant: { index: 2, loop: true },
    guard: { index: 3, loop: true, name: 'combat_idle', frames: 2 },
    damage: { index: 4, loop: false },
    evade: { index: 5, loop: false },
    thrust: { index: 6, loop: false, name: 'thrust', frames: 8 },
    swing: { index: 7, loop: false, name: 'slash', frames: 6 },
    missile: { index: 8, loop: false, name: 'shoot', frames: 13 },
    skill: { index: 9, loop: false },
    spell: { index: 10, loop: false, name: 'spellcast', frames: 7 },
    item: { index: 11, loop: false },
    escape: { index: 12, loop: true, name: 'run', mirror: true, frames: 8 },
    victory: { index: 13, loop: true, name: 'emote', frames: 3 },
    dying: { index: 14, loop: true },
    abnormal: { index: 15, loop: true },
    sleep: { index: 16, loop: true },
    dead: { index: 17, loop: true, name: 'hurt', frames: 7 }
};

const Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function() {
    Sprite_Character_initialize.apply(this, arguments);
    this._motion = null;
    this._motionType = null;
    this._motionBitmap = null;
    this._motionRefresh = false;
};

Sprite_Character.prototype.playMotion = function(motionType) {
    this.requestMotion(motionType);
    const motion = Sprite_Character.MOTIONS[motionType];
    if (motion.name) {
        this.startMotion(motionType);
    }
};

Sprite_Character.prototype.isMotionRequested = function() {
    return this._motionType !== null;
};

Sprite_Character.prototype.setupMotionBitmap = function(characterName, motionType) {
    const motion = Sprite_Character.MOTIONS[motionType];
    const motionName = motion.name;
    if (motionName) {
        this._originalCharacterName = this._characterName;
        this._originalBitmap = this._bitmap;
        const filename = characterName + '/../../standard/' + motionName;
        const bitmap = ImageManager.loadCharacter(filename);
        this._motionBitmap = bitmap;
        this._characterName = filename;
        this._bitmap = this._motionBitmap;
        this.setCharacterBitmap();
    }
};

Sprite_Character.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
};

Sprite_Character.prototype.startMotion = function(motionType) {
    const newMotion = Sprite_Character.MOTIONS[motionType];
    if (this._motion !== newMotion) {
        this._motion = newMotion;
        this.setupMotionBitmap(this._character.characterName(), motionType);
        this._motionCount = 0;
        this._pattern = 0;
        this._bitmap = this._motionBitmap;
        this.setCharacterBitmap();
    }
};

Sprite_Character.prototype.updateMotionCount = function() {
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
        if (++this._pattern === this._motion.frames) {
            this._pattern = 0;
            if (!this._motion.loop) {
                this.requestMotionRefresh();
            }
        }
        this._motionCount = 0;
    }
};

const LPC_Motions_Sprite_Character_prototype_characterPatternX = Sprite_Character.prototype.characterPatternX;
Sprite_Character.prototype.characterPatternX = function() {
    if (this._motion) {
        return this._pattern;
    }
    return LPC_Motions_Sprite_Character_prototype_characterPatternX.call(this);
};

Sprite_Character.prototype.motionSpeed = function() {
    return 30;
};

Sprite_Character.prototype.updateMotion = function() {
    if (this.isMotionRefreshRequested()) {
        this.refreshMotion();
        this.clearMotion();
        this._motionRefresh = false;
    } else {
        this.updateMotionCount();
    }
};

Sprite_Character.prototype.clearMotion = function() {
    this._motion = null;
    this._motionBitmap = null;
    this._characterName = this._originalCharacterName;
    this._bitmap = this._originalBitmap;
    this.setCharacterBitmap();
};

Sprite_Character.prototype.refreshMotion = function() {
    this._motionCount = 0;
    this._pattern = 0;
};

Sprite_Character.prototype.isMotionRefreshRequested = function() {
    return this._motionRefresh;
};

Sprite_Character.prototype.requestMotionRefresh = function() {
    this._motionRefresh = true;
};

const LPC_Motions_Sprite_Character_prototype_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
Sprite_Character.prototype.updateCharacterFrame = function() {
    if ($gameSystem.isSRPGMode() && this.isMotionRequested()) {
        this.updateMotion();
    }
    LPC_Motions_Sprite_Character_prototype_updateCharacterFrame.call(this);
};

const Game_BattlerBase_prototype_srpgShowResults = Game_BattlerBase.prototype.srpgShowResults;
Game_BattlerBase.prototype.srpgShowResults = function() {
    if (this.isActor() && !this.isEnemy() && this.currentAction()) {
        this.performAction(this.currentAction());
        const actor = $gameActors.actor(this.actorId());
        const char = actor.character();
        const spriteActor = char._sprite;
        spriteActor.playMotion(this.motionType());
    }
    Game_BattlerBase_prototype_srpgShowResults.call(this);
};

Spriteset_Map_prototype_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    Spriteset_Map_prototype_createCharacters.call(this);
    for (let i = 0; i < this._characterSprites.length; i++) {
        const sprite = this._characterSprites[i];
        if (!sprite._character._sprite) {
            Object.defineProperty(sprite._character, '_sprite', {
                value: sprite,
                enumerable: false
            });
        } else {
            sprite._character._sprite = sprite;
        }
    }
};

Spriteset_Map_prototype_addCharacter = Spriteset_Map.prototype.addCharacter;
Spriteset_Map.prototype.addCharacter = function(event) {
    Spriteset_Map_prototype_addCharacter.call(this, event);
    for (let i = 0; i < this._characterSprites.length; i++) {
        const sprite = this._characterSprites[i];
        if (!sprite._character._sprite) {
            Object.defineProperty(sprite._character, '_sprite', {
                value: sprite,
                enumerable: false
            });
        }
    }
};

Game_Character.prototype.actor = function() {
    if (this._actor) {
        return this._actor;
    }
    const unit = $gameSystem.EventToUnit(this._eventId);
    if (unit) {
        if (unit[0] === 'actor') {
            Object.defineProperty(this, '_actor', {
                value: unit[1],
                enumerable: false
            });
            return unit[1];
        }
    }
    return null;
};

Game_Actor.prototype.character = function() {
    if (this._character) {
        return this._character;
    }
    const events = $gameMap.events();
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (event && event.actor && event.actor() === this) {
            Object.defineProperty(this, '_character', {
                value: event,
                enumerable: false
            });
            return event;
        }
    }
    return null;
};
