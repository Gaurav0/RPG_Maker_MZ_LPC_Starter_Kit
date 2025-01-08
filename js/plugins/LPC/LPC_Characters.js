//=============================================================================
//  LPC_Character.js
//=============================================================================
//  Version: 1.0.0
//  Date: 3 January 2025
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc use characters from Unlversal LPC Spritesheet Generator
 * @target MZ
 */

Graphics._switchStretchMode();

const charParams = {
    pw: 64,
    ph: 64,
    xo: 8,
    yo: 8,
    cx: 0,
    cy: 8,
    dxo: 0,
    dyo: 0,
    frames: 9,
    frame0: 0,
    step: 1,
    ay: 0.875
};

const doorParams = {
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
};

// javascript doesn't do modulus correctly for negative numbers
const mod = (n, m) => (n % m + m) % m;

Game_CharacterBase.prototype.isDoor = function() {
    return this._characterName.toLowerCase().includes('door');
};

Game_CharacterBase.prototype.numFrames = function() {
    return this.isDoor() ? doorParams.frames : charParams.frames;
};

Game_CharacterBase.prototype.frame0 = function() {
    return this.isDoor() ? (this.isOpen() ? 0 : doorParams.frame0) : charParams.frame0;
};

Game_CharacterBase.prototype.step = function() {
    return this.isDoor() ? (this.isOpen() ? 1 : doorParams.step) : charParams.step;
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
    return 60 / this.numFrames();
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
    this._isDoor = characterName.toLowerCase().includes('door');
    const o = this._isDoor ? doorParams : charParams;
    this._params = o;
    const { pw, ph, xo, yo } = o;
    const n = characterIndex;
    const sx = n * pw + xo;
    const sy = (Math.floor(n / 4) * 4) * ph + yo;
    const dx = x - (pw / 2);
    const dy = y - ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy);
};

Sprite_Character.prototype.isDoor = function() {
    return this._character.characterName().toLowerCase().includes('door');
};

Sprite_Character.prototype.characterBlockX = function () {
    return this.isDoor() ? doorParams.cx : charParams.cx;
};

Sprite_Character.prototype.characterBlockY = function () {
    return this.isDoor() ? doorParams.cy : charParams.cy;
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

Sprite_Character.prototype.patternWidth = function () {
    return this.isDoor() ? doorParams.pw : charParams.pw;
};

Sprite_Character.prototype.patternHeight = function () {
    return this.isDoor() ? doorParams.ph : charParams.ph;
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
    return this.isDoor() ? doorParams.dxo : charParams.dxo;
};

Sprite_Character.prototype.characterOffsetY = function() {
    return this.isDoor() ? doorParams.dyo : charParams.dyo;
};

Sprite_Character.prototype.anchorY = function() {
    return this.isDoor() ? doorParams.ay : charParams.ay;
}
