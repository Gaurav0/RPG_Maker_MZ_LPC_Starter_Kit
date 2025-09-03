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

const LPC_Characters_Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
Game_CharacterBase.prototype.setImage = function() {
    LPC_Characters_Game_CharacterBase_setImage.apply(this, arguments);
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

const LPC_Characters_Sprite_Character_characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function () {
    return LPC_directionMap[LPC_Characters_Sprite_Character_characterPatternY.call(this)];
}

const LPC_Characters_Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function () {
    if (this.paramType() === 'null') {
        return LPC_Characters_Sprite_Character_patternWidth.call(this);
    }
    return params[this.paramType()].pw;
};

const LPC_Characters_Sprite_Character_patternHeight = Sprite_Character.prototype.patternHeight;
Sprite_Character.prototype.patternHeight = function () {
    if (this.paramType() === 'null') {
        return LPC_Characters_Sprite_Character_patternHeight.call(this);
    }
    return params[this.paramType()].ph;
};

const LPC_Characters_Sprite_Character_prototype_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
Sprite_Character.prototype.updateCharacterFrame = function() {
    if ($gameSystem.isSRPGMode() && !this.isLPCMotionRequested()) {
        LPC_Characters_Sprite_Character_prototype_updateCharacterFrame.call(this);
    } else {
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
    }
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
