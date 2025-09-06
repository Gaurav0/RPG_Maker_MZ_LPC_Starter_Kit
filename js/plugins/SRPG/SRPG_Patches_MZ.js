//=============================================================================
//  SRPG_Patches_MZ.js
//=============================================================================
//  Version: 1.0.0
//  Date: 6 September 2025
//  Released under MIT license
//  http://opensource.org/licenses/mit-license.php
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc random patches for SRPG to work with LPC
 * @target MZ
 *
 */
(() => {
    Game_Temp.prototype.setMoveTable = function(x, y, move, route) {
        if (!this._MoveTable) {
            this._MoveTable = [];
        }
        if (!this._MoveTable[x]) {
            this._MoveTable[x] = [];
        }
        this._MoveTable[x][y] = [move, route];
    };

    
    Game_Temp.prototype.RangeTable = function(x, y) {
        if (!this._RangeTable) {
            this._RangeTable = [];
        }
        if (!this._RangeTable[x]) {
            this._RangeTable[x] = [];
        }
        if (!this._RangeTable[x][y]) {
            this._RangeTable[x][y]  = [];
        }
        return this._RangeTable[x][y];
    };

    Game_Temp.prototype.setRangeTable = function(x, y, move, route) {
        if (!this._RangeTable) {
            this._RangeTable = [];
        }
        if (!this._RangeTable[x]) {
            this._RangeTable[x] = [];
        }
        this._RangeTable[x][y] = [move, route];
    };

	Game_Temp.prototype.RangeMoveTable = function(x, y) {
        if (!this._RangeMoveTable) {
            this._RangeMoveTable = [];
        }
        if (!this._RangeMoveTable[x]) {
            this._RangeMoveTable[x] = [];
        }
        if (!this._RangeMoveTable[x][y]) {
            this._RangeMoveTable[x][y]  = [];
        }
        return this._RangeMoveTable[x][y];
    };

    const Game_Map_prototype_checkMapLevelChanging = Game_Map.prototype.checkMapLevelChanging;
    Game_Map.prototype.checkMapLevelChanging = function(x, y) {
        if(!this.isValid(x, y)) {
            return false;
        }
        return Game_Map_prototype_checkMapLevelChanging.call(this, x, y);
    };
})();