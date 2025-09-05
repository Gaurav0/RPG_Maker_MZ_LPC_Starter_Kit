//=============================================================================
//  SRPG_UseTroopId_MZ.js
//=============================================================================
//  Version: 1.0.0
//  Date: 6 September 2025
//  Released under MIT license
//  http://opensource.org/licenses/mit-license.php
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*:
 * @author Gaurav Munjal
 * @plugindesc use troop id for enemy characters in SRPG
 * @target MZ
 *
 * @param troopVariableId
 * @desc variable id which contains troop id to be used for enemy characters
 * @type variable
 * @default 0
 */
(() => {
    const pluginName = "SRPG_UseTroopId_MZ";
    const parameters = PluginManager.parameters(pluginName);

    const _troopVariableId = Number(parameters['troopVariableId'] || 0);

    const SRPG_UseTroopId_MZ_Game_System_prototype_setSrpgEnemys = Game_System.prototype.setSrpgEnemys;
    Game_System.prototype.setSrpgEnemys = function() {
        const troopId = $gameVariables.value(_troopVariableId);
        $gameTroop.originalSetup(troopId);
        const enemies = $gameTroop._originalEnemies;
        let index = 0;
        $gameMap.events().forEach(function(event) {
            if (event.isType() === 'enemy' && !event.isErased()) {
                const enemyId = event.event().meta.id ? Number(event.event().meta.id) : 1;
                if (enemyId === 0) {
                    if (index < enemies.length) {
                        event.event().meta.id = enemies[index].enemyId();
                    } else {
                        event.erase();
                    }
                    index++;
                }
            }
            if (event.isType() === 'enemy' && event.isErased()) {
                event._srpgEventType = 'object';
            }
        });
        SRPG_UseTroopId_MZ_Game_System_prototype_setSrpgEnemys.call(this);
    };

    Game_Troop.prototype.originalSetup = function(troopId) {
        this.clear();
        this._troopId = troopId;
        this._originalEnemies = [];
        for (const member of this.troop().members) {
            if ($dataEnemies[member.enemyId]) {
                const enemyId = member.enemyId;
                const enemy = new Game_Enemy(enemyId, 0, 0);
                if (member.hidden) {
                    enemy.hide();
                }
                this._originalEnemies.push(enemy);
            }
        }
    };
})();