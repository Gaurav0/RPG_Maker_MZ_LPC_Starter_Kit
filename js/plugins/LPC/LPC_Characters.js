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

Game_CharacterBase.prototype.isChar = function() {
    return this.paramType() === 'chars';
}

Game_CharacterBase.prototype.isLPCEnemy = function() {
    return this.paramType() === 'enemies';
}

Game_CharacterBase.prototype.animationName = function() {
    return this.characterName().split('/').pop().toLowerCase();
};

Game_CharacterBase.prototype.numFrames = function() {
    if (this.paramType() === 'null') {
        return 4;
    }
    if (this.isChar()) {
        switch (this.animationName()) {
            case 'walk':
                return 9;
            case 'climb':
                return 6;
        }
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
    if ($gameSystem.isSRPGMode() && this.isOnLadder() && this.isChar()) {
        return 120 / this.numFrames();
    }
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

let preloadedLPCCharacters = {};

Game_Character.prototype.preloadImages = function() {
    let filenames = ['walk', 'climb'];
    for (const name of filenames) {
        const filename = generateLPCAnimationFilename(this._characterName, name);
        if (!preloadedLPCCharacters[filename]) {
            preloadedLPCCharacters[filename] = ImageManager.loadCharacter(filename);
        }
    }
};

const LPC_Characters_ImageManager_clear = ImageManager.clear;
ImageManager.clear = function() {
    LPC_Characters_ImageManager_clear.call(this);
    preloadedLPCCharacters = {};
};

LPC_Characters_Sprite_Character_prototype_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
    let bitmap;
    this._preloaded = false;
    const char = this._character;
    if ($gameSystem.isSRPGMode()) {
        return LPC_Characters_Sprite_Character_prototype_setCharacterBitmap.call(this);
    }
    if (bitmap = preloadedLPCCharacters[this._characterName]) {
        console.log("Using preloaded bitmap for " + this._characterName, char);
        if (bitmap.isReady()) {
            this._bitmap = bitmap;
        } else {
            this.bitmap = bitmap;
        }
        this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
        this._preloaded = true;
    }
    LPC_Characters_Sprite_Character_prototype_setCharacterBitmap.call(this);
};

Game_Player.prototype.preloadImages = Game_Character.prototype.preloadImages;
Game_Follower.prototype.preloadImages = Game_Character.prototype.preloadImages;

const LPC_Characters_Game_Player_prototype_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
    if (!$gameSystem.isSRPGMode() && preloadedLPCCharacters[this.characterName()]) {
        return;
    }
    LPC_Characters_Game_Player_prototype_refresh.call(this);
};

LPC_Characters_Spriteset_Map_prototype_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    LPC_Characters_Spriteset_Map_prototype_createCharacters.call(this);
    $gamePlayer.preloadImages();
    $gamePlayer.followers().visibleFollowers().forEach(follower => follower.preloadImages());
};

function generateLPCAnimationFilename(characterName, animationName) {
    if (!characterName || !characterName.includes('/')) {
        return characterName;
    }

    let filename;
    const lastSlashIndex = characterName.lastIndexOf('/');
    if (animationName.includes('/')) {
        const secondLastSlashIndex = characterName.lastIndexOf('/', lastSlashIndex - 1);
        filename = characterName.substring(0, secondLastSlashIndex) + '/' + animationName;
    } else {
        filename = characterName.substring(0, lastSlashIndex) + '/' + animationName;
    }
    return filename;
}

const LPC_Characters_Game_CharacterBase_characterName = Game_CharacterBase.prototype.characterName;
Game_CharacterBase.prototype.characterName = function() {
    if (!$gameSystem.isSRPGMode() && this.isChar() && this.isOnLadder()) {
        return generateLPCAnimationFilename(this._characterName, 'climb');
    }
    return LPC_Characters_Game_CharacterBase_characterName.call(this);
};

const LPC_Characters_Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
Game_CharacterBase.prototype.realMoveSpeed = function() {
    if (!$gameSystem.isSRPGMode() && this.isOnLadder() && this.isChar()) {
        return LPC_Characters_Game_CharacterBase_realMoveSpeed.call(this) - 2;
    }
    return LPC_Characters_Game_CharacterBase_realMoveSpeed.call(this);
};

Game_Player.prototype.isOnLadder = Game_CharacterBase.prototype.isOnLadder;
Game_Player.prototype.realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
Game_Player.prototype.animationWait = Game_CharacterBase.prototype.animationWait;

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
    return paramType(this._character._characterName);
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
    0: 2, // down
    1: 1, // left
    2: 3, // right
    3: 0  // up
};

const LPC_Characters_Sprite_Character_characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function () {
    return LPC_directionMap[LPC_Characters_Sprite_Character_characterPatternY.call(this)];
}

function calcLPCCustomPatternWidthOrHeight(characterName) {
    let cname = characterName;
    cname = cname.substring(cname.lastIndexOf('/') + 1);
    if (cname.includes('_')) {
        const lastUnderscoreIndex = cname.lastIndexOf('_');
        const value = cname.substring(lastUnderscoreIndex + 1);
        return value;
    }
    return null;
}

const LPC_Characters_Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
Sprite_Character.prototype.patternWidth = function () {
    if (this.paramType() === 'null') {
        return LPC_Characters_Sprite_Character_patternWidth.call(this);
    }
    return calcLPCCustomPatternWidthOrHeight(this._character.characterName()) ?? params[this.paramType()].pw;
};

const LPC_Characters_Sprite_Character_patternHeight = Sprite_Character.prototype.patternHeight;
Sprite_Character.prototype.patternHeight = function () {
    if (this.paramType() === 'null') {
        return LPC_Characters_Sprite_Character_patternHeight.call(this);
    }
    return calcLPCCustomPatternWidthOrHeight(this._character.characterName()) ?? params[this.paramType()].ph;
};

const LPC_Characters_Sprite_Character_prototype_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
Sprite_Character.prototype.updateCharacterFrame = function() {
    LPC_Characters_Sprite_Character_prototype_updateCharacterFrame.call(this);
    const char = this._character;
    if (char.isChar() || char.isLPCEnemy() || char.isDoor()) {
        this._frame.x += this.characterOffsetX();
        this._frame.y += this.characterOffsetY();
        this.anchor.y = this.anchorY();
        this._refresh();
    }
};

function calcLPCCustomPatternCharOffset(characterName, axis, dir) {
    let cname = characterName;
    cname = cname.substring(cname.lastIndexOf('/') + 1);
    if (cname.includes('_')) {
        const lastUnderscoreIndex = cname.lastIndexOf('_');
        let value = cname.substring(lastUnderscoreIndex + 1);
        value >>= 4; // divides by 16
        value *= 3;
        return axis === 'x' ? 0 : dir === 8 ? -(value >> 1) : -value;
    }
    return null;
}

Sprite_Character.prototype.characterOffsetX = function() {
    return this._character.isChar() ?
        (calcLPCCustomPatternCharOffset(this._character.characterName(), 'x', this._character.direction()) ??
            params[this.paramType()].dxo) :
        params[this.paramType()].dxo;
};

Sprite_Character.prototype.characterOffsetY = function() {
    return this._character.isChar() ?
        (calcLPCCustomPatternCharOffset(this._character.characterName(), 'y', this._character.direction()) ??
            params[this.paramType()].dyo) :
        params[this.paramType()].dyo;
};

Sprite_Character.prototype.anchorY = function() {
    return params[this.paramType()].ay;
}

const LPC_Characters_Scene_Map_prototype_srpgInvokeEnemyMove = Scene_Map.prototype.srpgInvokeEnemyMove;
Scene_Map.prototype.srpgInvokeEnemyMove = function() {
    const event = $gameTemp.activeEvent();
    event.setWalkAnime(true);
    LPC_Characters_Scene_Map_prototype_srpgInvokeEnemyMove.call(this);
};

// Disable Effekseeker Animations
Game_Temp.prototype.requestAnimation = function() {};
