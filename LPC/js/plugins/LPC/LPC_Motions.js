//=============================================================================
//  LPC_Motions.js
//=============================================================================
//  Version: 1.0.0
//  Date: 1 September 2025
//  Derivative of code from RPG Maker MZ
//  Released under its terms of use,
//  but otherwise free to use, modify and distribute under MIT License
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
Sprite_Character.LPC_MOTIONS = {
    walk: { index: 0, loop: true, name: 'walk', frames: 9 },
    wait: { index: 1, loop: true, name: 'idle', frames: 2 },
    chant: { index: 2, loop: true },
    guard: { index: 3, loop: true, name: 'combat_idle', frames: 2 },
    damage: { index: 4, loop: false },
    evade: { index: 5, loop: false },
    thrust: { index: 6, loop: false, name: 'thrust', frames: 8 },
    swing: { index: 7, loop: false, name: 'custom/slash_128', frames: 6 },
    missile: { index: 8, loop: false, name: 'shoot', frames: 13 },
    skill: { index: 9, loop: false },
    spell: { index: 10, loop: false, name: 'spellcast', frames: 7 },
    item: { index: 11, loop: false },
    escape: { index: 12, loop: true, name: 'run', mirror: true, frames: 8 },
    victory: { index: 13, loop: true, name: 'emote', frames: 3 },
    dying: { index: 14, loop: true },
    abnormal: { index: 15, loop: true },
    sleep: { index: 16, loop: true },
    dead: { index: 17, loop: true, name: 'hurt', frames: 7 },
    enemyWalk: { index: 18, loop: true, name: 'walk', frames: 5 },
    enemyAttack: { index: 19, loop: false, name: 'attack', frames: 5 }
};

const LPC_Motions_Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function() {
    LPC_Motions_Sprite_Character_initialize.apply(this, arguments);
    this._lpcMotion = null;
    this._lpcMotionType = null;
    this._lpcMotionBitmap = null;
    this._lpcMotionRefresh = false;
};

Sprite_Character.prototype.playLPCMotion = function(motionType) {
    this.requestLPCMotion(motionType);
    const motion = Sprite_Character.LPC_MOTIONS[motionType];
    if (motion.name) {
        this.startLPCMotion(motionType);
    }
};

Sprite_Character.prototype.isLPCMotionRequested = function() {
    return this._lpcMotionType !== null;
};

function generateLPCMotionFilename(characterName, motionName) {
    let filename;
    const lastSlashIndex = characterName.lastIndexOf('/');
    if (motionName.includes('/')) {
        const secondLastSlashIndex = characterName.lastIndexOf('/', lastSlashIndex - 1);
        filename = characterName.substring(0, secondLastSlashIndex) + '/' + motionName;
    } else {
        filename = characterName.substring(0, lastSlashIndex) + '/' + motionName;
    }
    return filename;
}

Sprite_Character.prototype.setupLPCMotionBitmap = function(characterName, motionType) {
    const motion = Sprite_Character.LPC_MOTIONS[motionType];
    const motionName = motion.name;
    if (motionName) {
        this._originalCharacterName = this._character._characterName;
        this._originalBitmap = this._bitmap;
        let filename = generateLPCMotionFilename(characterName, motionName); 
        const bitmap = ImageManager.loadCharacter(filename);
        this._lpcMotionBitmap = bitmap;
        this._character._characterName = filename;
        this._bitmap = this._lpcMotionBitmap;
    }
};

Sprite_Character.prototype.requestLPCMotion = function(motionType) {
    this._lpcMotionType = motionType;
};

Sprite_Character.prototype.startLPCMotion = function(motionType) {
    const newMotion = Sprite_Character.LPC_MOTIONS[motionType];
    if (this._lpcMotion !== newMotion) {
        this._lpcMotion = newMotion;
        this.setupLPCMotionBitmap(this._character.characterName(), motionType);
        this._lpcMotionCount = 0;
        this._pattern = 0;
        this._character.setPriorityType(2);
    }
};

Sprite_Character.prototype.updateLPCMotionCount = function() {
    if (this._lpcMotion && ++this._lpcMotionCount >= this.lpcMotionSpeed()) {
        if (++this._pattern === this._lpcMotion.frames) {
            this._pattern = 0;
            if (!this._lpcMotion.loop) {
                this.requestLPCMotionRefresh();
            }
        }
        this._lpcMotionCount = 0;
    }
};

const LPC_Motions_Sprite_Character_prototype_characterPatternX = Sprite_Character.prototype.characterPatternX;
Sprite_Character.prototype.characterPatternX = function() {
    if (this._lpcMotion) {
        return this._pattern;
    }
    return LPC_Motions_Sprite_Character_prototype_characterPatternX.call(this);
};

Sprite_Character.prototype.lpcMotionSpeed = function() {
    return 12;
};

Sprite_Character.prototype.updateLPCMotion = function() {
    if (this.isLPCMotionRefreshRequested()) {
        this.refreshLPCMotion();
        this.clearLPCMotion();
        this._lpcMotionRefresh = false;
    } else {
        this.updateLPCMotionCount();
    }
};

Sprite_Character.prototype.clearLPCMotion = function() {
    this._character.setPriorityType(1);
    this._lpcMotion = null;
    this._lpcMotionType = null;
    this._lpcMotionBitmap = null;
    this._character._characterName = this._originalCharacterName;
    this._bitmap = this._originalBitmap;
    this._character.refresh();
};

Sprite_Character.prototype.refreshLPCMotion = function() {
    this._lpcMotionCount = 0;
    this._pattern = 0;
};

Sprite_Character.prototype.isLPCMotionRefreshRequested = function() {
    return this._lpcMotionRefresh;
};

Sprite_Character.prototype.requestLPCMotionRefresh = function() {
    this._lpcMotionRefresh = true;
};

const LPC_Motions_Sprite_Character_prototype_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
Sprite_Character.prototype.updateCharacterFrame = function() {
    if ($gameSystem.isSRPGMode() && this.isLPCMotionRequested()) {
        this.updateLPCMotion();
    }
    LPC_Motions_Sprite_Character_prototype_updateCharacterFrame.call(this);
};

const LPC_Motions_Scene_Map_prototype_srpgInvokeMapSkill = Scene_Map.prototype.srpgInvokeMapSkill;
Scene_Map.prototype.srpgInvokeMapSkill = function(data) {
    const user = data.user;

    if (data.phase === 'animation' && user && user.currentAction()) {
        user.performAction(user.currentAction());
        let gameActor, gameEnemy, char, sprite;
        if (user.isActor()) {
            gameActor = $gameActors.actor(user.actorId());
            char = gameActor.character();
            sprite = char.findSprite();
            sprite.playLPCMotion(user.motionType());
        } else if (user.isEnemy()) {
            gameEnemy = $gameMap.event(user._eventId);
            char = gameEnemy.unit();
            sprite = gameEnemy.findSprite();
            sprite.playLPCMotion("enemyAttack");
        }
        if (sprite._lpcMotion) {
            user.currentAction().item().meta.animationDelay =
                sprite.lpcMotionSpeed() * sprite._lpcMotion.frames;
        }
    }

    LPC_Motions_Scene_Map_prototype_srpgInvokeMapSkill.call(this, data);
};

SceneManager.getSceneMap = function() {
    if (this._scene instanceof Scene_Map) {
        return this._scene;
    }
    for (let i = this._stack.length - 1; i >= 0; i--) {
        const scene = this._stack[i];
        if (scene instanceof Scene_Map) {
            return scene;
        }
    }
    return null;
};

Game_Character.prototype.findSprite = function() {
    const sceneMap = SceneManager.getSceneMap();
    if (sceneMap) {
        const spriteset = sceneMap._spriteset;
        if (spriteset) {
            let sprite = spriteset._characterSprites.find(sprite => 
                sprite._character._eventId === this._eventId);
            if (sprite) {
                return sprite;
            }
            sprite = spriteset._characterSprites.find(sprite => {
                const name = sprite._character._characterName;
                const index = sprite._character._characterIndex;
                return name === this._characterName && index === this._characterIndex;
            });
            return sprite ?? null;
        }
    }
    return null;
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

Game_Event.prototype.unit = function() {
    if (this._unit) {
        return this._unit;
    }
    const unit = $gameSystem.EventToUnit(this._eventId);
    if (unit) {
        Object.defineProperty(this, '_unit', {
            value: unit[1],
            enumerable: false
        });
        return unit[1];
    }
    return null;
};

