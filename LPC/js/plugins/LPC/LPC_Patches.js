//=============================================================================
//  LPC_Patches.js
//=============================================================================
//  Version: 1.0.0
//  Date: 6 September 2025
//  Released under MIT license
//  http://opensource.org/licenses/mit-license.php
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc random patches to run before third party plugins
 * @target MZ
 */
const LPC_Patches_Sprite_Character_prototype_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
Sprite_Character.prototype.setCharacterBitmap = function() {
    // override to avoid setting bitmap again if already set from preloaded characters
    if (!this._preloaded || $gameSystem.isSRPGMode()) {
        LPC_Patches_Sprite_Character_prototype_setCharacterBitmap.call(this);
    }
};