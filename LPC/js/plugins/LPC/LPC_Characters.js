//=============================================================================
//  LPC_Character.js
//=============================================================================
//  Version: 1.0.0
//  Date: 3 January 2025
//  Released under MIT license
//  http://opensource.org/licenses/mit-license.php
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc use characters from Unlversal LPC Spritesheet Generator
 * @target MZ
 */

FSInitStart = SceneManager.initialize;
SceneManager.initialize = function() {
    FSInitStart.call(this);
    Graphics._requestFullScreen();
    if (!Graphics._stretchEnabled) {
        Graphics._switchStretchMode();
    }
};

const params = {
    "chars": {
        pw: 64,
        ph: 64,
        xo: 8,
        yo: 8,
        cx: 0,
        cy: 0,
        dxo: 0,
        dyo: 0,
        frames: 9,
        frame0: 0,
        step: 1,
        ay: 0.875
    },
    "doors": {
        pw: 64,
        ph: 128,
        xo: 22,
        yo: 28,
        cx: 0,
        cy: 0,
        dxo: 16,
        dyo: 12,
        frames: 4,
        frame0: 3,
        step: -1,
        ay: 0.625
    },
    "enemies": {
        pw: 64,
        ph: 64,
        xo: 0,
        yo: 0,
        cx: 0,
        cy: 0,
        dxo: 0,
        dyo: 0,
        frames: 5,
        frame0: 0,
        step: 1,
        ay: 0.667
    },
    "null": {}
}

// javascript doesn't do modulus correctly for negative numbers
const mod = (n, m) => (n % m + m) % m;

const paramType = function(characterName) {
    if (!characterName || !characterName.includes('/')) {
        return 'null';
    }
    return characterName.toLowerCase().split('/')[0];
};

Game_CharacterBase.prototype.paramType = function() {
    return paramType(this._characterName);
};

Game_CharacterBase.prototype.isDoor = function() {
    return this.paramType() === 'doors';
}

Game_CharacterBase.prototype.numFrames = function() {
    if (this.paramType() === 'null') {
        return 4;
    }
    return params[this.paramType()].frames;
};

Game_CharacterBase.prototype.frame0 = function() {
    const frame0 = params[this.paramType()].frame0;
    return this.isDoor() ? (this.isOpen() ? 0 : frame0) : frame0;
};

Game_CharacterBase.prototype.step = function() {
    const step = params[this.paramType()].step;
    return this.isDoor() ? (this.isOpen() ? 1 : step) : step;
};

const Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function() {
    Game_CharacterBase_setImage.apply(this, arguments);
    this.resetPattern();
};

Game_Event.prototype.isOriginalPattern = function() {
    return this.pattern() === this.frame0();
};

Game_CharacterBase.prototype.pattern = function () {
    return this._pattern >= 0 && this._pattern < this.numFrames() ? this._pattern : this.frame0();
};

Game_CharacterBase.prototype.updatePattern = function () {
    if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else {
        this._pattern = mod((this._pattern + this.step()), this.numFrames());
    }
};

Game_CharacterBase.prototype.animationWait = function () {
    return 30 / this.numFrames();
};

Game_Event.prototype.resetPattern = function () {
    this.setPattern(this.frame0());
};

Game_Event.prototype.isOpen = function() {
    return this._open;
}

Game_Event.prototype.setOpen = function(open) {
    this._open = open;
}

Game_CharacterBase.prototype.straighten = function () {
    if (this.hasWalkAnime() || this.hasStepAnime()) {
        this._pattern = this.frame0();
    }
    this._animationCount = 0;
};

Window_Base.prototype.drawCharacter = function (characterName, characterIndex, x, y) {
    const bitmap = ImageManager.loadCharacter(characterName);
    const o = params[paramType(characterName)];
    this._params = o;
    const { pw, ph, xo, yo } = o;
    const n = characterIndex;
    const sx = n * pw + xo;
    const sy = (Math.floor(n / 4) * 4) * ph + yo;
    const dx = x - (pw / 2);
    const dy = y - ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy);
};

Sprite_Character.prototype.paramType = function() {
    return paramType(this._character.characterName());
};

Sprite_Character.prototype.isDoor = function() {
    return this.paramType() === "doors";
};

Sprite_Character.prototype.characterBlockX = function () {
    return params[this.paramType()].cx;
};

Sprite_Character.prototype.characterBlockY = function () {
    return params[this.paramType()].cy;
};

const LPC_directionMap = {
    0: 2,
    1: 1,
    2: 3,
    3: 0
};

const Sprite_Character_characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function () {
    return LPC_directionMap[Sprite_Character_characterPatternY.call(this)];
}

const Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function () {
    if (this.paramType() === 'null') {
        return Sprite_Character_patternWidth.call(this);
    }
    return params[this.paramType()].pw;
};

const Sprite_Character_patternHeight = Sprite_Character.prototype.patternHeight;
Sprite_Character.prototype.patternHeight = function () {
    if (this.paramType() === 'null') {
        return Sprite_Character_patternHeight.call(this);
    }
    return params[this.paramType()].ph;
};

Sprite_Character.prototype.updateCharacterFrame = function() {
    const pw = this.patternWidth();
    const ph = this.patternHeight();
    const sx = (this.characterBlockX() + this.characterPatternX()) * pw + this.characterOffsetX();
    const sy = (this.characterBlockY() + this.characterPatternY()) * ph + this.characterOffsetY();
    this.updateHalfBodySprites();
    if (this._bushDepth > 0) {
        const d = this._bushDepth;
        this._upperBody.setFrame(sx, sy, pw, ph - d);
        this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
        this.setFrame(sx, sy, 0, ph);
    } else {
        this.setFrame(sx, sy, pw, ph);
    }
    this.anchor.y = this.anchorY();
};

Sprite_Character.prototype.characterOffsetX = function() {
    return params[this.paramType()].dxo;
};

Sprite_Character.prototype.characterOffsetY = function() {
    return params[this.paramType()].dyo;
};

Sprite_Character.prototype.anchorY = function() {
    return params[this.paramType()].ay;
}

// Disable Effekseeker Animations
Game_Temp.prototype.requestAnimation = function() {};

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
    this.setupMotionBitmap(this._character.characterName(), motionType);
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
        const filename = characterName + '../../standard/' + motionName;
        const bitmap = ImageManager.loadCharacter(filename);
        this._motionBitmap = bitmap;
    }
};

Sprite_Character.prototype.requestMotion = function(motionType) {
    this._motionType = motionType;
};

Sprite_Character.prototype.startMotion = function(motionType) {
    const newMotion = Sprite_Character.MOTIONS[motionType];
    if (this._motion !== newMotion) {
        this._motion = newMotion;
        this._motionCount = 0;
        this._pattern = 0;
    }
};

Sprite_Character.prototype.updateMotionCount = function() {
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
        if (this._motion.loop) {
            this._pattern = (this._pattern + 1) % this._motion.frames;
        } else if (this._pattern < 2) {
            this._pattern++;
        } else {
            this.refreshMotion();
        }
        this._motionCount = 0;
    }
};

Sprite_Character.prototype.motionSpeed = function() {
    return 12;
};

Sprite_Character.prototype.updateMotion = function() {
    if (this.isMotionRefreshRequested()) {
        this.refreshMotion();
        this.clearMotion();
    } else {
        this.updateMotionCount();
    }
};

Sprite_Character.prototype.clearMotion = function() {
    this._motion = null;
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Game_BattlerBase_prototype_srpgShowResults = Game_BattlerBase.prototype.srpgShowResults;
Game_BattlerBase.prototype.srpgShowResults = function() {
    if (this.isActor() && this.currentAction()) {
        this.performAction(this.currentAction());
        const actorId = this.actor().id;
        const actor = $gameActors.actor(actorId);
        const spriteActor = new Sprite_Character(actor);
        spriteActor._actor = actor;
        spriteActor.playMotion(this.motionType());
        if (spriteActor._motion) {
            this.currentAction().item().meta.animationDelay =
                spriteActor.motionSpeed() * spriteActor._motion.frames;
        }
    }
    Game_BattlerBase_prototype_srpgShowResults.call(this);
};
