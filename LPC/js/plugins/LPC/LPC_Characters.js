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

const LPC_NUM_FRAMES = 9;

Game_CharacterBase.prototype.pattern = function () {
    return this._pattern < LPC_NUM_FRAMES ? this._pattern : 0;
};

Game_CharacterBase.prototype.updatePattern = function () {
    if (!this.hasStepAnime() && this._stopCount > 0) {
        this.resetPattern();
    } else {
        this._pattern = (this._pattern + 1) % LPC_NUM_FRAMES;
    }
};

Game_CharacterBase.prototype.animationWait = function () {
    return 60 / LPC_NUM_FRAMES;
};

Game_CharacterBase.prototype.resetPattern = function () {
    this.setPattern(0);
};

Game_CharacterBase.prototype.straighten = function () {
    if (this.hasWalkAnime() || this.hasStepAnime()) {
        this._pattern = 0;
    }
    this._animationCount = 0;
};


Window_Base.prototype.drawCharacter = function (characterName, characterIndex, x, y) {
    const f = LPC_NUM_FRAMES;
    const bitmap = ImageManager.loadCharacter(characterName);
    const pw = 64;
    const ph = 64;
    const xo = 8;
    const yo = 8;
    const n = characterIndex;
    const sx = n * pw + xo;
    const sy = (Math.floor(n / 4) * 4) * ph + yo;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

Sprite_Character.prototype.characterBlockX = function () {
    return 0;
};

Sprite_Character.prototype.characterBlockY = function () {
    return 8;
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
    return 64;
};

Sprite_Character.prototype.patternHeight = function () {
    return 64;
};