//=============================================================================
// VisuStella MZ - TiledMZ
// VisuMZ_5_TiledMZ.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_5_TiledMZ = true;

var VisuMZ = VisuMZ || {};
VisuMZ.TiledMZ = VisuMZ.TiledMZ || {};
VisuMZ.TiledMZ.version = 0.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 5] [Version 0.16] [TiledMZ]
 * @author VisuStella / Daniel "Kaliya" Deptula
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A warning: This plugin is for advanced users, or users who plan to learn
 * TileD. If you think learning a new mapping program may be too hard, or 
 * might be too tedious this plugin is not for you.
 *
 * Tired of RPG Maker MZ's Map Editor? Do you want to map the XP way but more?
 * Tired of Parallax Mapping? Want to do round corners? Want to create a map
 * with basically unlimited layers?
 * 
 * Well, now all those worries are gone! Instead, let's just use the awesome
 * map editor, TileD! Free, easy to use and very flexible Map Editor. Grab it
 * from here: http://www.mapeditor.org/
 * 
 * Features include all (but not limited to) the following:
 * 
 * - Any tile size maps!
 * - Any number of layers!
 * - Manual collision layers!
 * - ...More
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 5 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * TileD Mapping
 * 
 * - Maps can now be made via the mapping program TileD. This allows you the
 * user to create maps with any number of layers using any tile sized desired.
 * Please see the dedicated sections for more information.
 * ---
 *
 * ============================================================================
 * Setting up
 * ============================================================================
 * TileD Maps and Tilesets are stored in the YOUR_PROJECT_FOLDER/Maps folder. 
 * This folder does not exists by default, so you will need to create it.
 *
 * This plugin comes with a few Map and Tileset Templates. The Tileset Templates
 * contain tilesets with predefined Collision, Region, and Flag tiles. You may
 * use these tilesets or create your own for use within your maps.
 *
 * Maps and Tilesets from TileD are exported as JSON and put in here with the
 * format of MapXXX.json where XXX is the ID of the map, for map files.
 *
 * ============================================================================
 * Special Layers
 * ============================================================================
 *
 * This plugin uses special layers to specify certain properties.
 *
 * ---
 * Region Layer
 *
 * This is a layer with the property regionId. You can have any number of these
 * layers.
 *
 * If this layer has a number value (e.g: 2) that means no matter what tile you
 * draw on this layer those tiles will have that specified regionId.
 *
 * If this layer has the value of tile-base that means the individual tiles
 * will check for a property called regionId to specify that tiles region.
 * See the Special Tilesets section for more information.
 *
 * ---
 * Collision Layer 
 * 
 * This is a layer with the property collision. You can have any number of
 * these layers. They dictate where the player and other entites can move to.
 *
 * If this layer has a value of tile-base than the collision for this layer is
 * based on the tiles painted. See the special tilesets section for more info.
 *
 * Other valid values are as followed:
 *
 * full - Any area of this layer cannot be walked upon from any direction.
 * 
 * up-left - Any area of this layer can only be walked upon from the bottom or right.
 *
 * up-right - Any area of this layer can only be walked upon from the bottom or left.
 *
 * down-left - Any area of this layer can be walked upon from the top or right.
 *
 * down-right - Any area of this layer can only be walked upon from top or left.
 *
 * toLevel - specifies the tiles from this layer will transfer the player to the
 * specified level. If this value is "tile-base" it will utilize the tiles
 * that are painted on the layer to determine what map level to transfer the
 * player to.
 * 
 * ---
 * Reflection Layer
 * 
 * This is a special object layer with the property reflectionCast. Objects on
 * this layer will reflect the character sprites either above or below the
 * character's position on the Y axis based on the value. Negative values will
 * reflect the character that many tiles away above the character, and positive
 * values will reflect the character that many tiles away below the character.
 * Players must enter the objects bounds for reflection to occur.
 * 
 * ---
 * Mirror Layer
 * 
 * This is a special object layer similar to the Reflection Layer with a bit more
 * control. This is an object layer defined by having the property mirrorCast
 * this property doesn't need a value, it need only exists. Mirroring is controlled
 * by the objects on this layers properties. Objects on the layer with the property
 * mirror will utilize a string value of x,y coordinates. (e.g: mirror: 0,1)
 * These coordinates are the offset for where to cast the mirrored sprites image.
 * Mirrored sprites will also mirror the characters up and down directions,
 * so if the character is facing up the mirrored sprite will utilize the down
 * facing sprite and vice versa.
 *
 * ============================================================================
 * Additional Layer Properties
 * ============================================================================
 *
 * These properties provide additional layer functionality.
 * 
 * They are listed in the format LAYER TYPE - PROPERTY NAME - PROPERTY TYPE
 * To properly utilize this plugin, the property type has to be the specified type
 * below, otherwise the feature may not work correctly, and at worst case the
 * plugin will not function. When reporting issues, please make sure all your
 * properties are of the proper type, with valid values before making a bug
 * report.
 * 
 * ---
 * ALL - zIndex - int
 *
 * This property specifies the draw order of the layer. A higher value means it
 * is higher in the order. 
 *
 * ---
 * ALL - priority - int
 *
 * This property specifies the draw order for the layer when it shares a zIndex.
 *
 * ---
 * ALL - level - int
 *
 * This property specifies the level that this layer is on for multi-level maps.
 *
 * ---
 * ALL - hideOnLevel - int
 * 
 * This property specifies that this layer will be hidden if the player is on
 * the specified level. (e.g: if this has a value of 1, and the player is on
 * a spot with level set to 1, this layer is hidden). If a spot has multiple
 * levels assigned to it, it will fallback to the one with higher priority.
 * ---
 *
 * TILE - toLevel - string
 * 
 * This property specifies how the transition to different levels will work.
 * If the value is tile-base then when the player steps on a tile with the
 * property "level" then the player will be transfered to that level specified
 * by the tile. If the value is any integer (e.g: 2) then the player will be
 * transfered to that level when they step on any non-blank tile on this layer.
 * ---
 * 
 * ALL - blendMode - string
 * 
 * This property specifies the blend mode for this layer. By default all layers
 * will utilize the blend mode normal, which is to say nothing special will 
 * happen. Supported blend modes are ADD, NORMAL, MULTIPLY, SUBTRACT, and SCREEN
 * ---
 * 
 * ALL - hiddenInGame - boolean
 * 
 * If this property exists it determines whether the layer will be rendered in
 * the game. If the value is true, the layer will not be rendered. If false the
 * layer will be rendered.
 * ---
 * 
 * OBJECT - reflectionCast - int
 * 
 * This property is used on object layers to specify that, that layer will cause
 * a sprite reflection to ocurr when a character enters the reflection area.
 * If the value is a positive the reflection will ocurr below the character,
 * by that many tiles (e.g: value of 2 will show the reflection sprite 2 tiles
 * away below). Negative values will show the reflection above the character.
 * ---
 * 
 * OBJECT - mirrorCast - any value
 * 
 * This property just needs to exists with a valid value, all it does is specify
 * that the object layer is a mirroring layer. The mirroring properties are
 * controlled by the objects on that layer with the property mirror.
 *      
 *      mirror - string
 *      
 *      This property is a property that goes on the objects of an object layer
 * marked by having the property mirrorCast. The format is x,y (e.g: 0,-1) it
 * specifies which tile relative to the characters tile will get the mirrored
 * sprite shown.
 * ---
 * 
 * IMAGE - lockLocation - boolean
 * 
 * This property specifies whether the image displayed will be locked in place
 * or not. If the value is true, the image will be locked to the screen at the
 * given location and will move out of view as the player moves away from it. 
 * If the value is false the image will follow the player and always be in view.
 * ---
 * IMAGE - speedX - float
 * 
 * This property specifies the speed on the x axis which the image scrolls and
 * tiles.
 * ---
 * IMAGE - speedY - float
 * 
 * This property specifies the speed on the y axis which the image scrolls and
 * tiles.
 * ---
 * IMAGE - scrollX - float
 * 
 * This property specifies the x for the origin of the tiling on the image.
 * ---
 * IMAGE - scrollY - float
 * 
 * This property specifies the y for the origin of the tiling on the image.
 * --- 
 *  
 * 
 * 
 * ============================================================================
 * Special Tilesets
 * ============================================================================
 *
 * This plugin uses specialized tilesets with special properties attached to
 * their tiles to handle things such as collision, region id's, and tile flags.
 * below is an explanation of each of these tilesets and how to set them up.
 *
 * ---
 * Region Tileset
 *
 * This is a tileset where each tile has a custom property called regionId
 * the value of this property is a number specifiying this tiles region. 
 * Draw with this tileset on a layer with the property regionId with 
 * a value of tile-base for that position on the map to have that tiles region
 * id. You can only have 1 region per tile.
 * 
 * ---
 * Terrain Tileset
 * 
 * This is a tileset where each tile has a custom property called terrainTag
 * the value of this property is a number specifiying this tiles terrain. 
 * Draw with this tileset on a layer with the property terrainTag with 
 * a value of tile-base for that position on the map to have that tiles region
 * id. You can only have 1 terrain per "level" on any given XY even if it 
 * is on a different tiled layer.
 *
 * ---
 * Collision Tileset
 *
 * This is a tileset where each tile has a custom property defining their
 * collision value for use with tile-base collision layers.
 *
 * The tiles have a property the option to have the following properties.
 *
 * collision - Same as the property on layers.
 * 
 * toLevel - Specifies that when the player touches this tile they will be
 * "transfered" to the specified map level.
 *
 * arrowImpassable - This property specifies that the directions given in the
 * string cannot be passed through. It is formated as:
 *
 * direction1 & direction2 & direction3
 *
 * e.g: down & left & right
 * This example dictates that the only direction the player can move from this
 * tile is up.
 *
 * ---
 * Flag Tilesets
 *
 * This is a tileset that has tiles that specify the special RPG Maker flags.
 * These tiles have any of the following properties.
 *
 * ladder - This tile acts as a ladder.
 * damage - This tile is a damage tile
 * bush - This tile acts as a bush.
 * counter - This tile acts as a counter
 *
 * When using flags, please add the property, 'hiddenInGame'
 * to hide the tileset from appearing.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Daniel "Kaliya" Deptula
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 0.10:
 *  - Fixed an issue wherein due to some sprites not having Z or Priority, the
 * sorting system would cease to function.
 * 
 * Version 0.01:
 * - Beta Release!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ShowPictureAtZ
 * @text Show Picture At Z
 * @desc Shows the given picture at the given z-index.
 *
 * @arg PictureID
 * @text Picture ID
 * @type number
 * @desc Select the picture id to use.
 * @default 0
 *
 * @arg ZIndex
 * @text Z-Index
 * @type number
 * @desc Change the z-index of the picture.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ResetPicture
 * @text Reset Picture
 * @desc Resets a Picture back to original z.
 *
 * @arg PictureID
 * @text Picture ID
 * @type number
 * @desc Select the picture id to use.
 * @default 0
 * @ --------------------------------------------------------------------------
 * @command SetCurrentMapLevel
 * @text Set Map Level
 * @desc Sets the current level of the map.
 *
 * @arg Level
 * @text Level
 * @type number
 * @desc Select the level to change to.
 * @default 0
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param TiledMZ
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BushDepth
 * @text Bush Depth
 * @type number
 * @desc Depth of bushes.
 * @default 12
 *
 * @param PriorityTileLimit
 * @text Priority Tiles Limit
 * @type number
 * @desc Max number of priority tiles.
 * @default 256
 *
 * @param ShadowVisibilitySwitch
 * @text Shadow Visbility Switch
 * @type number
 * @default 1
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

//=============================================================================
// Setup Plugin Parameters
//=============================================================================

//=============================================================================
// Setup Plugin Parameters
//=============================================================================

var tier = tier || 5;
var pluginData = $plugins.filter(function (p) { return p.status && p.description.match(/\[TiledMZ\]/i) })[0];

VisuMZ.TiledMZ.Settings = VisuMZ.TiledMZ.Settings || {};
VisuMZ.TiledMZ.Settings.BushDepth = 12;
VisuMZ.TiledMZ.Settings.PriorityTileLimit = 256;
VisuMZ.TiledMZ.Settings.ShadowVisibilitySwitch = 1;

var pluginTier = 5;

(function setup(pluginData) {
    const name = pluginData.name;
    const desc = pluginData.description;
    if (desc.match(/\[Version[ ](\d*[.]\d*)\]/i)) {
        const managerVersion = Number(RegExp.$1);
            if (managerVersion !== VisuMZ.TiledMZ.version) {
                alert("%1\'s version does not match the version saved in the Plugin Manager, please reload the plugin in the Plugin Manager.".format(name));
                SceneManager.exit();
            }
    }
    if (pluginTier < tier) {
        alert("%1 is placed incorrectly in the plugin list. It is a tier %2 plugin that should be played over tier %3 plugins. Please reorder the plugin list from smallest tier number to largest.".format(name, pluginTier, tier));
        SceneManager.exit();
    } else {
        tier = Math.max(pluginTier, tier);
    }

    var params = pluginData.parameters;
    if (params) {
        VisuMZ.TiledMZ.Settings.BushDepth = parseInt(params["BushDepth"]);
        VisuMZ.TiledMZ.Settings.PriorityTileLimit = parseInt(params["PriorityTileLimit"]);
        VisuMZ.TiledMZ.Settings.ShadowVisibilitySwitch = parseInt(params["ShadowVisibilitySwitch"]);
    }
})(pluginData)


//-----------------------------------------------------------------------------
// Plugin Commands
//
// Register new plugin commands here.

PluginManager.registerCommand(pluginData.name, "ResetPicture", args => {
    if (!$gameMap._picturesWithZ) $gameMap._picturesWithZ = [];
    const pictureId = parseInt(args.PictureID);    
    const scene = SceneManager._scene;
    if (scene && scene instanceof Scene_Map) {
        const spriteset = scene._spriteset;
        const tilemap = (spriteset && spriteset._tilemap) ? spriteset._tilemap : null;

        if (tilemap != null) {
            const picture = tilemap.children.find(p => p._pictureId === pictureId);
            const container = spriteset._pictureContainer;
            if (container != null && picture != null) {
                tilemap.removeChild(picture);
                container.addChildAt(picture, pictureId - 1);
                $gameMap._picturesWithZ = $gameMap._picturesWithZ.filter(p => p.id !== pictureId);
            }
        }
    }
});
PluginManager.registerCommand(pluginData.name, "ShowPictureAtZ", args => {
    // Convert Arguments
    if (!$gameMap._picturesWithZ) $gameMap._picturesWithZ = [];
    const pictureId = parseInt(args.PictureID);
    const zIndex = parseInt(args.ZIndex);

    const scene = SceneManager._scene;
    if (scene && scene instanceof Scene_Map) {
        const spriteset = scene._spriteset;
        const tilemap = (spriteset && spriteset._tilemap) ? spriteset._tilemap : null;
        if (tilemap !== null) {
            const container = spriteset._pictureContainer;
            if (container) {
                let picture = container.children.find(p => p._pictureId === pictureId);
                if (picture) {
                    container.removeChild(picture);
                    picture.z = picture.zIndex = zIndex;
                    tilemap.addChild(picture);
                    $gameMap._picturesWithZ.push({ id: picture._pictureId, zIndex: picture.zIndex });
                } else {
                    picture = tilemap.children.find(p => p._pictureId === pictureId);
                    if (picture) {
                        tilemap.removeChild(picture);
                        picture.z = picture.zIndex = zIndex;
                        tilemap.addChild(picture);                        
                    }
                }
            }
        }
    }

});

PluginManager.registerCommand(pluginData.name, "SetCurrentMapLevel", args => {
    // Convert Arguments
    const level = parseInt(args.Level);

    const scene = SceneManager._scene;
    if (scene && scene instanceof Scene_Map) {
        $gameMap.currentMapLevel = level;
    }

});

VisuMZ.TiledMZ.propertyValue = function(properties, key) {
    if (!properties) {
        return null;
    }
    let property = properties.find(function(prop) {
        return prop.name.toLowerCase() ==  key.toLowerCase();
    });
    if (property) {
        if (typeof property.value === "string") property.value.trim();
        return property.value;
    } else {
        return null;
    }

};


VisuMZ.TiledMZ.getTextureId = function(tileId) {
    let textureId = 0;
    const tilesets = $gameMap.tiledData.tilesets;
    for (let i = 0; i < tilesets.length; ++i) {
        const tileset = tilesets[i];
        if (tileId < tileset.firstgid || tileId >= tileset.firstgid + tileset.tilecount) {
            textureId++;
            continue;
        }
        break;
    }
    return textureId;
};

VisuMZ.TiledMZ.trimExt = function (str) {
    return str.replace(/\.[^/.]+$/, "");
};

VisuMZ.TiledMZ.parseBoolean = function(val) {
    return val === true || (typeof val === "string" && val.toLowerCase() === "true");
}

VisuMZ.TiledMZ.layerFromId = function(id) {
    if (id === undefined) return null;
    for (const layer of $gameMap.tiledData.layers) {
        if (layer && layer.id === id) return layer;
    }
    return null;
}

VisuMZ.TiledMZ.strToBlendMode = function(str) {
    if (str === undefined) return PIXI.BLEND_MODES.NORMAL;
    switch (str.toLowerCase()) {
        case "normal":
            return PIXI.BLEND_MODES.NORMAL;
        case "add":
            return PIXI.BLEND_MODES.ADD;
        case "subtract":
            return PIXI.BLEND_MODES.SUBTRACT;
        case "multiply":
            return PIXI.BLEND_MODES.MULTIPLY;
        case "screen":
            return PIXI.BLEND_MODES.SCREEN;
        default:
            return PIXI.BLEND_MODES.NORMAL;
    }
    return PIXI.BLEND_MODES.NORMAL;
};

//=============================================================================
// DataManager
//=============================================================================

DataManager._tempTiledData = null;
DataManager._tiledLoaded = false;
DataManager._tilesetToLoad = 0;
DataManager._loadedMapId = -1;

VisuMZ.TiledMZ.DataManager_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function (mapId) {
    if (this._loadedMapId === mapId && this._tempTiledData !== undefined) 
    {
        this._tiledLoaded = true;
        return;
    }
    VisuMZ.TiledMZ.DataManager_loadMapData.call(this, mapId);
    this.loadTiledMapData(mapId);
};

DataManager.loadTiledMapData = function (mapId) {
    this._tiledLoaded = false;
    this._loadedMapId = mapId;
    const xhr = new XMLHttpRequest();
    const src = `${mapId}.json`;
    const url = `./maps/Map${src}`;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = () => this.onXhrMapDataLoad(xhr, name, src, url);
    xhr.onerror = () => this.onXhrError(name, src, url);
    xhr.send();
};

DataManager.onXhrMapDataLoad = function (xhr, name, src, url) {
    if (xhr.status < 400) {
        this.parseTiledData(JSON.parse(xhr.responseText));
        this.loadTilesetData();
        this._tiledLoaded = true;
    } else {
        this.onXhrError(name, src, url);
    }
};

DataManager.parseTiledData = function (tiledData) {
    if (tiledData.layers) {
        const layers = [];
        this.recursiveExtractLayers(tiledData, layers);
        tiledData.layers = layers;
        this._tempTiledData = tiledData;
    }
};

DataManager.recursiveExtractLayers = function (groupLayer, extracted) {
    const level = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, 'level')) || 0;
    const hideOnLevel = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, 'hideOnLevel')) || -1;
    const zIndex = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, 'zIndex')) || 0;
    const hiddenInGame = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, "hiddenInGame")) || false;
    const blendMode = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, 'blendMode')) || undefined;
    const reflectionCast = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, "reflectionCast")) || undefined;
    const regionId = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, "regionId")) || undefined;
    const collision = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, "collision")) || undefined;
    const toLevel = (VisuMZ.TiledMZ.propertyValue(groupLayer.properties, "toLevel")) || undefined;
    const layers = groupLayer.layers;
    for (let i = 0; i < layers.length; ++i) {
        const layer = layers[i];
        if (layer.type !== 'group') {
            const layerLevel = (VisuMZ.TiledMZ.propertyValue(layer.properties, 'level')) || undefined;
            const layerHideOnLevel = (VisuMZ.TiledMZ.propertyValue(layer.properties, 'hideOnLevel')) || undefined;
            const layerZIndex = (VisuMZ.TiledMZ.propertyValue(layer.properties, 'zIndex')) || undefined;
            const layerHiddenInGame = (VisuMZ.TiledMZ.propertyValue(layer.properties, "hiddenInGame")) || undefined;
            const layerBlendMode = (VisuMZ.TiledMZ.propertyValue(layer.properties, 'blendMode')) || undefined;
            const layerReflectionCast = (VisuMZ.TiledMZ.propertyValue(layer.properties, "reflectionCast")) || undefined;
            const layerRegionId = (VisuMZ.TiledMZ.propertyValue(layer.properties, "regionId")) || undefined;
            const layerCollision = (VisuMZ.TiledMZ.propertyValue(layer.properties, "collision")) || undefined;
            const layerToLevel = (VisuMZ.TiledMZ.propertyValue(layer.properties, "toLevel")) || undefined;
            layer.level = layerLevel || level;
            layer.hideOnLevel = layerHideOnLevel || hideOnLevel;
            layer.zIndex = layerZIndex || zIndex;
            layer.hiddenInGame = layerHiddenInGame || hiddenInGame;
            layer.blendMode = layerBlendMode ? VisuMZ.TiledMZ.strToBlendMode(layerBlendMode) : VisuMZ.TiledMZ.strToBlendMode(blendMode);
            layer.reflectionCast = layerReflectionCast || reflectionCast;
            layer.regionId = layerRegionId || regionId;
            layer.collision = layerCollision || collision;
            layer.toLevel = layerToLevel || toLevel;
            extracted.push(layer);
        } else {
            this.recursiveExtractLayers.call(this, layer, extracted);
        }
    }
};

DataManager.loadTilesetData = function () {
    const tilesets = this._tempTiledData.tilesets;
    for (let i = 0, len = tilesets.length; i < len; ++i) {
        const tileset = tilesets[i];
        if (!tileset.source) continue;
        this._tilesetToLoad++;
        const name = VisuMZ.TiledMZ.trimExt(tileset.source);
        const xhr = new XMLHttpRequest();
        const src = tileset.source;
        const url = `./maps/${src}`;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = () => this.onXhrTilesetLoad(tileset, xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    }
};

DataManager.onXhrTilesetLoad = function (tileset, xhr, name, src, url) {
    if (xhr.status < 400) {
        Object.assign(tileset, JSON.parse(xhr.responseText));
        this.getTilesetProperties(tileset);
    } else {
        this.onXhrError(name, src, url);
    }
    this._tilesetToLoad--;
};

DataManager.getTilesetProperties = function (tileset) {
    if (!tileset.tiles) return;
    tileset.tileProperties = {};
    const tiles = Object.values(tileset.tiles);
    for (let i = 0, lenI = tiles.length; i < lenI; ++i) {
        const tile = tiles[i];
        if (!tile.properties) continue;
        const properties = Object.values(tile.properties);
        const newProps = {};
        for (let p = 0, lenP = properties.length; p < lenP; ++p) {
            const prop = properties[p];
            newProps[prop.name] = prop.value;
        }
        tileset.tileProperties[tile.id] = newProps;
    }
};

VisuMZ.TiledMZ.DataManager_isMapLoaded = DataManager.isMapLoaded;
DataManager.isMapLoaded = function () {
    const tilesetLoaded = this._tilesetToLoad <= 0;
    return this._tiledLoaded && tilesetLoaded && VisuMZ.TiledMZ.DataManager_isMapLoaded.call(this);
};

//=============================================================================
// ImageManager
//=============================================================================

ImageManager.loadTiledTileset = function (path) {
    if (!path) {
        return this._emptyBitmap;
    }
    let paths = path.split("/");
    paths.shift();
    const filename = VisuMZ.TiledMZ.trimExt(paths.pop());
    const folder = paths.join('/') + '/';
    return this.loadBitmap(folder, filename);
};


ImageManager.loadTiledParallax = function(path) {
    if (!path) {
        return this._emptyBitmap;
    }
    let paths = path.split("/");
    paths.shift();
    const filename = VisuMZ.TiledMZ.trimExt(paths.pop());
    const folder = paths.join('/') + '/';
    return this.loadBitmap(folder, filename);
};

//=============================================================================
// Sprite_TiledObject
//=============================================================================

function Sprite_TiledObject() {
    this.initialize(...arguments);
}

Sprite_TiledObject.prototype = Object.create(Sprite.prototype);
Sprite_TiledObject.prototype.constructor = Sprite_TiledObject;

Sprite_TiledObject.prototype.initialize = function (data) {
    const bitmap = ImageManager.loadBitmap(data.imageFolder, data.imageName);
    bitmap.addLoadListener(this.setInitialAnimation.bind(this));
    Sprite.prototype.initialize.call(this, bitmap);
    this._setupCompleted = false;
    this.setup(data);
};

Sprite_TiledObject.prototype.setInitialAnimation = function() {
    if (!this._data) return;
    const rId = (this._data._tileData && this._data._tileData.animation) ? 
        this._data._tileData.animation[0].tileid : this._data._tileId;
    const w = this._data._tileWidth;
    const h = this._data._tileHeight;
    const tileCols = this.bitmap.width / w;
    const ux = rId % tileCols * w;
    const uy = Math.floor(rId / tileCols) * h;
    this.setFrame(ux, uy, w, h);
};

Sprite_TiledObject.prototype.setup = function (data) {
    this._data = data;
    this.origX = data.x + data.offset.x;
    this.origY = data.y + data.offset.y;
    this._tileWidth = $gameMap.tileWidth();
    this._tileHeight = $gameMap.tileHeight();
    this._mapWidth = $gameMap.width() * $gameMap.tileWidth();
    this._mapHeight = $gameMap.height() * $gameMap.tileHeight();
    this.rotation = data.rotation;
    this.blendMode = data.blendMode;
    this.z = data.z || 0;
    this.priority = data.priority || 0;
    this.opacity = data.opacity || 255;
    this.anchor.set(0, 1);
    this.rotationInit();
    this._setupCompleted = true;

};

Sprite_TiledObject.prototype.updateAnim = function() {
    if (!this._data || (this._data && !this._data._animData)) {
        this.setInitialAnimation();
        return;
    }
    const animData = this._data._animData;
    animData.duration -= 1;
    if (animData.duration <= 0) {
        animData.frame = (animData.frame + 1) % animData.maxFrame;
        animData.duration = animData.maxDuration;
        const rId = this._data._tileData.animation[animData.frame].tileid;
        const w = this._data._tileWidth;
        const h = this._data._tileHeight;
        const tileCols = this.bitmap.width / w;
        const ux = rId % tileCols * w;
        const uy = Math.floor(rId / tileCols) * h;
        this.setFrame(ux, uy, w, h);
    }
};

Sprite_TiledObject.prototype.rotationInit = function () {
    const data = this._data;
    let dx = 0;
    let dy = 0;
    const width = data.width;
    const height = data.height;
    const flipH = data.flipHorz ? 1 - this.anchor.x : this.anchor.x;
    const flipV = data.flipVert ? this.anchor.y : 1 - this.anchor.y;
    let x = 0;
    let y = 0;
    const rotation = data.rotation || 0;

    x = (Math.cos(rotation) * width * flipH) + (Math.sin(rotation) * height * flipV);
    y = (Math.sin(rotation) * width * flipH) - (Math.cos(rotation) * height * flipV);
    dx += x;
    dy += y;

    this.origX = Math.floor(this.origX + dx);
    this.origY = Math.floor(this.origY + dy);
    this.scale.x *= data.flipHorz ? -1 : 1;
    this.scale.y *= data.flipVert ? -1 : 1;
};

Sprite_TiledObject.prototype.screenX = function() {
    var value = this._data.x;
    var display = $gameMap._displayX;
    value -= display * this._tileWidth;
    if (value + this.width < 0 && $gameMap.isLoopHorizontal()) {
      value += this._mapWidth;
    }
    return Math.ceil(value);
  };
  
Sprite_TiledObject.prototype.screenY = function() {
    var value = this._data.y;
    var display = $gameMap._displayY;
    value -= display * this._tileHeight;
    if (value + this.height < 0 && $gameMap.isLoopVertical()) {
      value += this._mapHeight;
    }
    return Math.ceil(value);
  };

Sprite_TiledObject.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateAnim();
    this.x = this.origX - $gameMap.displayX() * $gameMap.tileWidth();
    this.y = this.origY - $gameMap.displayY() * $gameMap.tileHeight();
};

//=============================================================================
// TiledTileMap
//=============================================================================

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;

function TiledTilemap() {
    this.initialize(...arguments);
}

TiledTilemap.prototype = Object.create(Tilemap.prototype);
TiledTilemap.prototype.constructor = TiledTilemap;

TiledTilemap.prototype.initialize = function(tiledData) {
    this._tiledData = {};
    this._layers = [];
    this._priorityTiles = [];
    this._priorityTilesCount = 0;
    this._objectSprites = [];
    this._objectsCreated = false;
    this.tiledData = tiledData;
    $gameMap._setupTiled();
    Tilemap.prototype.initialize.call(this);
    this.setupTiledMap();
};

TiledTilemap.prototype.setupTiledMap = function() {
    this._setupSize();
    this._setupAnim();
};

TiledTilemap.prototype._setupSize = function() {
    const width = this._width;
    const height = this._height;
    this._tileWidth = this.tiledData.tilewidth;
    this._tileHeight = this.tiledData.tileheight;
    const tileCols = Math.ceil(width / this._tileWidth) + 1;
    const tileRows = Math.ceil(height / this._tileHeight) + 1;
    this._layerWidth = tileCols * this._tileWidth;
    this._layerHeight = tileRows * this._tileHeight;
    this._mapWidth = this.tiledData.width;
    this._mapHeight = this.tiledData.height;
};

TiledTilemap.prototype._setupAnim = function() {
    this._animationData = {};
    const tilesets = this.tiledData.tilesets;
    for (const tileset of tilesets) {
        if (!tileset.tiles) continue;
        for (const tile of tileset.tiles) {
            const tileId = tile.id;
            const animation = tile.animation;
            if (!animation) continue;
            const duration = animation[0].duration / 1000 * 60;
            const maxFrame = animation.length;
            this._animationData[tileId] = { frame: 0, maxFrame: maxFrame, duration: duration, maxDuration: duration };

        }
    }
};

TiledTilemap.prototype.isPaintableLayer = function(layerData) {
    if (layerData.type !== "tilelayer") return false;
        if (!!layerData.collision ||
            !!layerData.toLevel ||
            !!layerData.regionId ||
            layerData.hiddenInGame === true) {
                return false;
            }
    return true;
};

TiledTilemap.prototype.isPriorityTile = function(layer) {
    return (layer && layer.z === 3 && layer.priority > 0);
};

TiledTilemap.prototype.isReflectionLayer = function(layerData) {
    return layerData.type === "objectlayer" && !!layerData.properties &&
     VisuMZ.TiledMZ.propertyValue(layerData.properties,'reflectionCast') !== null;
};

TiledTilemap.prototype._createLayers = function() {
    let id = 0;
    this.refresh();
    const layers = this.tiledData.layers;
    for (const layerData of layers) {

        if (!this.isPaintableLayer(layerData)) {
            id++;
            continue;
        }

        if (this.isReflectionLayer(layerData)) {
            id++;
            continue;
        }
        const layer = new Tilemap.Layer();
        layer.layerData = layerData;
        layer.layerId = id;
        layer.spriteId = id;
        layer.priority = layerData.priority || 0;
        layer.z = layerData.zIndex || 0;
        layer.blendMode = layerData.blendMode;
        this._layers.push(layer);
        this.addChild(layer);
        id++;
    }

    for (let i = 0; i < VisuMZ.TiledMZ.Settings.PriorityTileLimit; i++) {
        let sprite = new Sprite();
        sprite.z = sprite.zIndex = 3;
        sprite.layerId = -1;
        sprite.hide();
        this.addChild(sprite);
        this._priorityTiles.push(sprite);
    }

    this._needsRepaint = true;
    this.createSpriteObjects();
};

TiledTilemap.prototype.createSpriteObjects = function() {
    const objects = $gameTemp._tiledObjects;
    for (const obj of objects) {
        this._objectSprites.push(new Sprite_TiledObject(obj));
    }
    if (this._objectSprites.length > 0) {
        this.addChild(...this._objectSprites);
    }
    this._objectsCreated = true;
};

TiledTilemap.prototype._addAllSpots = function(startX, startY) {
    this._priorityTilesCount = 0;
    for (const layer of this._layers) {
        layer.clear();
        if (layer.layerData.hideOnLevel != undefined &&
            layer.layerData.hideOnLevel === $gameMap.currentMapLevel ||
            !layer.layerData.visible) {
            layer.renderable = false;
            continue;
        }

        this._paintLayerTiles(layer, startX, startY);
    }
    while (this._priorityTilesCount < this._priorityTiles.length) {
        var sprite = this._priorityTiles[this._priorityTilesCount];
        sprite.hide();
        sprite.layerId = -1;
        this._priorityTilesCount++;
    }
};

TiledTilemap.prototype._paintLayerTiles = function(layer, startX, startY) {
    const marginedWidth = this.width + this._margin * 2;
    const marginedHeight = this.height + this._margin * 2;
    const tileCols = Math.ceil(marginedWidth / this._tileWidth) + 1;
    const tileRows = Math.ceil(marginedHeight / this._tileHeight) + 1;
    for (let y = 0; y < tileRows; y++) {
        for (let x = 0; x < tileCols; x++) {
            this._paintTile(layer, startX, startY, x, y);
        }
    }
};

TiledTilemap.prototype._paintTile = function(layer, startX, startY, x, y) {
    const mx = startX + x;
    const my = startY + y;
    
    if (this.horizontalWrap) {
        mx = mx.mod(this._mapWidth);
    }
    if (this.verticalWrap) {
        my = my.mod(this._mapHeight);
    }

    let tilePos = 0
    const layerData = layer.layerData;
    const tilesets = this.tiledData.tilesets;

    const width = this._mapWidth;
    const height = this._mapHeight;

    // Possible problem with offsets
    if (mx >= 0 && mx < width && my >= 0 && my < height) {
        tilePos = mx + my * this._mapWidth;
    } else {
        return;
    }

    
    let tileId = layerData.data[tilePos];

    if (!tileId) {
        return;
    }


    const fHorz = (tileId & FLIPPED_HORIZONTALLY_FLAG);
    const fVert = (tileId & FLIPPED_VERTICALLY_FLAG);
    const fDiag = (tileId & FLIPPED_DIAGONALLY_FLAG);

    let rotate = 0;
    if (fHorz && fDiag && fVert) {
        rotate = 14
    } else if (fHorz && fDiag) {
        rotate = 6;
    } else if (fHorz && fVert) {
        rotate = 4;
    } else if (fVert && fDiag) {
        rotate = 2
    } else if (fHorz) {
        rotate = 12;
    } else if (fVert) {
        rotate = 8
    } else if (fDiag) {
        rotate = 10
    }

    tileId &= ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);

    const textureId = VisuMZ.TiledMZ.getTextureId(tileId);
    const dx = x * this._tileWidth;
    const dy = y * this._tileHeight;
    const tileset = tilesets[textureId];
    const w = tileset.tilewidth;
    const h = tileset.tileheight;
    const tileCols = tileset.columns;
    const realId = this._getAnimationTileId(textureId, tileId - tileset.firstgid);
    const ux = realId %  tileCols * w;
    const uy = Math.floor(realId / tileCols) * h;

    if (this.isPriorityTile(layer)) {
        this._paintPriorityTile(layer, textureId, tileId, startX, startY, dx, dy);
        return;
    }

    layer.addRect(textureId, ux, uy, dx, dy, w, h, rotate);
};


TiledTilemap.prototype._paintPriorityTile = function(layer, textureId, tileId, startX, startY, dx, dy) {
    const tileset = this.tiledData.tilesets[textureId];
    const w = tileset.tilewidth;
    const h = tileset.tileheight;
    const tileCols = tileset.columns;
    const realId = this._getAnimationTileId(textureId, tileId - tileset.firstgid);
    const ux = realId %  tileCols * w;
    const uy = Math.floor(realId / tileCols) * h
    const sprite = this._priorityTiles[this._priorityTilesCount];
    const layerData = layer.layerData;
    const offsetX = layerData ? layerData.offsetx || 0 : 0;
    const offsetY = layerData ? layerData.offsety || 0 : 0;
    let ox = this.origin.x;
    let oy = this.origin.y;

    if (this._priorityTilesCount >= this._priorityTiles.length) {
        return;
    }

    sprite.layerId = layer.layerId;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1.0;
    sprite.origX = dx;
    sprite.origY = dy;
    sprite.x = sprite.origX + startX * this._tileWidth - ox + offsetX + w / 2;
    sprite.y = sprite.origY + startY * this._tileHeight - oy + offsetY + h;
    sprite.bitmap = this._bitmaps[textureId];
    sprite.setFrame(ux, uy, w, h);
    sprite.priority = layer.priority;
    sprite.z = sprite.zIndex = layer.z;
    sprite.show();

    this._priorityTilesCount += 1;
};

TiledTilemap.prototype._updateBitmaps = function() {
    if (this._needsBitmapsUpdate && this.isReady()) {
        for (let i = 0; i < this._layers.length; ++i) {
            const layer = this._layers[i];
            layer.setBitmaps(this._bitmaps);
        }
        this._needsBitmapsUpdate = false;
        this._needsRepaint = true;
    }
};

TiledTilemap.prototype.updateTransform = function() {
    const ox = Math.ceil(this.origin.x);
    const oy = Math.ceil(this.origin.y);
    const startX = Math.floor((ox - this._margin) / this._tileWidth);
    const startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._updateLayerPositions(startX, startY, ox, oy);
    if (this._needsRepaint ||
        this._lastAnimationFrame !== this.animationFrame ||
        this._lastStartX !== startX ||
        this._lastStartY !== startY) {
            this._lastAnimationFrame = this.animationFrame;
            this._lastStartX = startX;
            this._lastStartY = startY;
            this._addAllSpots(startX, startY);
            this._needsRepaint = false;
        }
        this._sortChildren();
    PIXI.Container.prototype.updateTransform.call(this);
};

TiledTilemap.prototype._updateLayerPositions = function (startX, startY, ox, oy) {
    for (const layer of this._layers) {
        layer.x = startX * this._tileWidth - ox;
        layer.y = startY * this._tileHeight - oy;
    }
    for (const sprite of this._priorityTiles) {
        const layerData = this.tiledData.layers[sprite.layerId];
        const offsetX = layerData ? layerData.offsetx || 0 : 0;
        const offsetY = layerData ? layerData.offsety || 0 : 0;
        sprite.x = sprite.origX + startX * this._tileWidth - ox + offsetX + sprite.width / 2;
        sprite.y = sprite.origY + startY * this._tileHeight - oy + offsetY + sprite.height;
      
    }
};

TiledTilemap.prototype.update = function() {
    Tilemap.prototype.update.call(this);
    this._updateAnimation();
};

TiledTilemap.prototype._updateAnimation = function() {
    let needsRefresh = false;
    for (const key in this._animationData) {
        this._animationData[key].duration -= 1;
        if (this._animationData[key].duration <= 0) {
            this._animationData[key].frame = (this._animationData[key].frame + 1) % this._animationData[key].maxFrame;
            this._animationData[key].duration = this._animationData[key].maxDuration;
            needsRefresh = true;
        }
    }
    if (needsRefresh) {
        this.refresh();
    }
};

TiledTilemap.prototype._getAnimationTileId = function(textureId, tileId) {
    const tiles = this.tiledData.tilesets[textureId].tiles;
    
    if (!tiles) {
        return tileId;
    }

    const tile = this._getTileData(tiles, tileId);
    if (!tile) {
        return tileId;
    }

    if (!tile.animation) {
        return tileId;
    }

    const animation = tile.animation;
    const frame = this._animationData[tileId].frame;
    if (!frame) {
        return tileId;
    }
    return animation[frame].tileid;
};

TiledTilemap.prototype._getTileData = function(tiles, tileId) {
    for (const tile of tiles) {
        if (tile && tile.id === tileId) return tile;
    }
    return null;
};

TiledTilemap.prototype._compareChildOrder = function(a, b) {
    var result = 0;
  
    if (!isNaN(a.z) && a.z != null &&
    !isNaN(b.z) && b.z != null && a.z !== b.z) {
        result = a.z - b.z;
    }
    else if (((a instanceof Tilemap.Layer) && !(b instanceof Tilemap.Layer)) || (!(a instanceof Tilemap.Layer) && (b instanceof Tilemap.Layer))) {
        result = a.spriteId - b.spriteId;
    }
    else if (!isNaN(a.priority) && a.priority != null &&
    !isNaN(b.priority) && b.priority != null  && a.priority !== b.priority) {
        result = a.priority - b.priority;
    }     
    else if (!isNaN(a.y) && a.y != null &&
    !isNaN(b.y) && b.y != null && a.y !== b.y) {        
        result =  a.y - b.y;
    } else if (!isNaN(a.x) && a.x != null &&
    !isNaN(b.x) && b.x !== undefined && b.x != null && a.x !== b.x) {
        result =  a.x - b.x;
    } else {
        result = a.spriteId - b.spriteId;
    }
    return result;
};


TiledTilemap.prototype.isTiledObjectsCreated = function() {
    if (!this._objectsCreated) return false;
    for (const obj of this._objectSprites) {
        if (!obj._setupCompleted) return false;
    }
    return true;
};

//=============================================================================
// Tilemap.Layer
//=============================================================================

Object.defineProperties(Tilemap.Layer.prototype, {
    blendMode: {
        set: function (val) {
            this._state.blendMode = val;
        },
        get: function () {
            return this._state.blendMode;
        }
    }
});

Tilemap.Layer.prototype.addRect = function(number, sx, sy, dx, dy, w, h, rotate) {
    if (rotate === undefined) { rotate = 0; }
    this._elements.push([number, sx, sy, dx, dy, w, h, rotate]);
};

Tilemap.Layer.prototype._updateVertexBuffer = function () {
    const numElements = this._elements.length;
    const required = numElements * Tilemap.Layer.VERTEX_STRIDE;
    if (this._vertexArray.length < required) {
        this._vertexArray = new Float32Array(required * 2);
    }
    const vertexArray = this._vertexArray;
    let index = 0;
    for (const item of this._elements) {
        const num = item[0];
        const tid = num >> 2;
        const sxOffset = 1024 * (num & 1);
        const syOffset = 1024 * ((num >> 1) & 1);
        const sx = item[1] + sxOffset;
        const sy = item[2] + syOffset;
        const dx = item[3];
        const dy = item[4];
        const w = item[5];
        const h = item[6];
        let rotate = item[7];
        const frameLeft = sx + 0.5;
        const frameTop = sy + 0.5;
        const frameRight = sx + w - 0.5;
        const frameBottom = sy + h - 0.5;

        let rotx0 = sx;
        let roty0 = sy;
        let rotx1 = sx + w;
        let roty1 = sy;
        let rotx2 = sx + w;
        let roty2 = sy + h;
        let rotx3 = sx;
        let roty3 = sy + h;
        if (rotate !== 0) {
            const groupD8 = PIXI.groupD8
            let w2 = w / 2;
            let h2 = h / 2;
            if (rotate % 4 !== 0) {
                w2 = h / 2;
                h2 = w / 2;
            }
            const cX = sx + w2;
            const cY = sy + h2;
            rotate = groupD8.add(rotate, groupD8.NW);
            rotx0 = cX + (w2 * groupD8.uX(rotate));
            roty0 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx1 = cX + (w2 * groupD8.uX(rotate));
            roty1 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx2 = cX + (w2 * groupD8.uX(rotate));
            roty2 = cY + (h2 * groupD8.uY(rotate));
            rotate = groupD8.add(rotate, 2);
            rotx3 = cX + (w2 * groupD8.uX(rotate));
            roty3 = cY + (h2 * groupD8.uY(rotate));
        }



        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx0;
        vertexArray[index++] = roty0;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy;

        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx1;
        vertexArray[index++] = roty1;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy;

        vertexArray[index++] = tid;
        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx2;
        vertexArray[index++] = roty2;
        vertexArray[index++] = dx + w;
        vertexArray[index++] = dy + h;
        vertexArray[index++] = tid;

        vertexArray[index++] = frameLeft;
        vertexArray[index++] = frameTop;
        vertexArray[index++] = frameRight;
        vertexArray[index++] = frameBottom;
        vertexArray[index++] = rotx3;
        vertexArray[index++] = roty3;
        vertexArray[index++] = dx;
        vertexArray[index++] = dy + h;
    }
    this._vertexBuffer.update(vertexArray);
};

//=============================================================================
// TiledImageInfo
//=============================================================================

function TiledImageInfo() {
    this.initialize(...arguments);
}

TiledImageInfo.prototype.initialize = function (data) {
    this._image = data.image;
    this._id = data.id;
    this.zIndex = data.zIndex;
    this.priority = data.priority;
    this.offsetX = data.offsetx || 0;
    this.offsetY = data.offsety || 0;
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.visible = (data.hiddenInGame !== undefined) ? !data.hiddenInGame : true;
    this.blendMode = data.blendMode;
    this._data = data;
    this._lockLocation = true;
    this.properties(data.properties);
};

TiledImageInfo.prototype.properties = function (properties) {
    const speedX = VisuMZ.TiledMZ.propertyValue(properties, 'speedX') || 0;
    if (speedX !== undefined)  this._speedX = parseFloat(speedX);
    const speedY = VisuMZ.TiledMZ.propertyValue(properties, 'speedY') || 0;
    if (speedY !== undefined) this._speedY = parseFloat(speedY);
    const scrollX = VisuMZ.TiledMZ.propertyValue(properties, 'scrollX') || 0;
    if (speedX !== undefined) this._scrollX = parseFloat(scrollX);
    const scrollY = VisuMZ.TiledMZ.propertyValue(properties, 'scrollY') || 0;
    if (scrollY !== undefined) this._scrollY = parseFloat(scrollY);
    const lockLocation = VisuMZ.TiledMZ.propertyValue(properties, "lockLocation");
    if (lockLocation !== undefined) this._lockLocation = lockLocation;
    const opacity = VisuMZ.TiledMZ.propertyValue(properties, "opacity");
    if (opacity !== undefined) this.opacity = parseInt(opacity) || 255;
};


//=============================================================================
// TiledTilingSprite
//=============================================================================

function TiledTilingSprite() {
    this.initialize(...arguments);
}

TiledTilingSprite.prototype = Object.create(TilingSprite.prototype);
TiledTilingSprite.prototype.constructor = TiledTilingSprite;

TiledTilingSprite.prototype.initialize = function (data) {
    const bitmap = ImageManager.loadTiledParallax(data._image);
    TilingSprite.prototype.initialize.call(this, bitmap);
    bitmap.addLoadListener(() => {
        this.width = bitmap.width;
        this.height = bitmap.height;
        this.pivot = new Point(data.offsetX, data.offsetY);
    });
    this.z = data.zIndex;
    this.priority = data.priority;
    this.origX = data.x + data.offsetX;
    this.origY = data.y + data.offsetY;
    this.origin = new Point(data._scrollX, data._scrollY);
    this.visible = data.visible;
    this.blendMode = data.blendMode;
    this.opacity = data.opacity;
    this.data = data;
};

TiledTilingSprite.prototype._onBitmapChange = function () {
    if (this._bitmap) {
        this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
    } else {
        this.texture.frame = new Rectangle();
    }
};

TiledTilingSprite.prototype._refresh = function () {
    const frame = this._frame.clone();
    if (frame.width === 0 && frame.height === 0 && this._bitmap) {
        frame.width = this._bitmap.width;
        frame.height = this._bitmap.height;
    }
    if (this.texture.baseTexture) {
        try {
            this.texture.frame = frame;
        } catch (e) {
            this.texture.frame = new Rectangle();
        }
    }
    this.texture._updateID++;
    this.tilingTexture = null;
};

TiledTilingSprite.prototype.update = function () {
    this.origin.x += this.data._speedX;
    this.origin.y += this.data._speedY;
    if (this.data._lockLocation) {
        this.x = this.origX - $gameMap.displayX() * $gameMap.tileWidth();
        this.y = this.origY - $gameMap.displayY() * $gameMap.tileHeight();
    }
};

//=============================================================================
// Game_TiledObject
//=============================================================================

function Game_TiledObject() {
    this.initialize(...arguments);
}

Game_TiledObject.prototype.initialize = function(data) {
    this._setup(data);
};

Game_TiledObject.prototype._setup = function (data) {
    this._data = data;
    this._id = data.id;

    let gid = data.gid;
    gid &= ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG);
    this._gid = gid ? gid : undefined;
    this._textureId = VisuMZ.TiledMZ.getTextureId(gid);

    const tileset = $gameMap.tiledData.tilesets[this._textureId];

    if (tileset) {
        this._tileWidth = tileset.tilewidth;
        this._tileHeight = tileset.tileheight;
        let paths = tileset.image.split("/");
        this._tileId = this._gid - tileset.firstgid;

        const tile = (tileset && tileset.tiles) ? tileset.tiles.find(t => t.id === this._tileId) : undefined;
        if (tile) {
            const anim = tile.animation;
            if (anim) {
                const duration = anim[0].duration / 1000 * 60;
                const maxFrame = anim.length;
                this._animData = { frame: 0, maxFrame: maxFrame, duration: duration, maxDuration: duration};
            }
            this._tileData = tile;
        }

        paths.shift();
        
        this.imageName = VisuMZ.TiledMZ.trimExt(paths.pop());
        this.imageFolder = paths.join('/') + '/';


    } else {
        this.imageName = "";
        this.imageFolder = "";
    }

    this.priority = this._priority();
    this.z = this._zIndex();

    this.visible = (data.visible === (undefined || null)) ? data.visible : true;
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.rotation = data.rotation ? (data.rotation * Math.PI / 180) : 0;

    this.flipHorz = !!(data.gid & FLIPPED_HORIZONTALLY_FLAG);
    this.flipVert = !!(data.gid & FLIPPED_VERTICALLY_FLAG);

    const layer = VisuMZ.TiledMZ.layerFromId(this._data.layerId);

    this.anchor = new PIXI.Point(0, 1);

    const blendMode = VisuMZ.TiledMZ.propertyValue(data.properties, "blendMode");
    this.blendMode = VisuMZ.TiledMZ.strToBlendMode(blendMode !== null ? blendMode : "Normal");

    const opacity = VisuMZ.TiledMZ.propertyValue(data.properties, "opacity");
    this.opacity = parseInt(opacity) !== NaN ? parseInt(opacity) : 255;

    if (layer) {
        const xOffset = layer.offsetx;
        const yOffset = layer.offsety;
        this.offset = new PIXI.Point(xOffset, yOffset);
    } else {
        this.offset = new PIXI.Point(0,0);
    }
    this.alpha = 1;
    this.tint = 0xffffff;
};

Game_TiledObject.prototype._priority = function() {
    if (!this._data)  {
        return 0; 
    }
    const layerId = this._data.layerId;
    const layer = VisuMZ.TiledMZ.layerFromId(layerId);
    if (!layer)  {
        return 0;
    }
    const priority = layer.priority;
    if (priority === undefined)  {
        return 0;
    }
    return parseInt(priority);
};

Game_TiledObject.prototype._zIndex = function() {
    if (!this._data)  {
        return 3; 
    }
    const layerId = this._data.layerId;
    const layer = VisuMZ.TiledMZ.layerFromId(layerId);
    if (!layer)  {
        return 3;
    }
    const zIndex = layer.zIndex;
    if (zIndex === undefined)  {
        return 3;
    }
    return parseInt(zIndex);
};

//=============================================================================
// Game_Map
//=============================================================================

Object.defineProperties(Game_Map.prototype, {
    "tiledData": {
        get: () => DataManager._tempTiledData
    }
});


VisuMZ.TiledMZ.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if (this.isTiled()) {
        this._collisionMap = {};
        this._flags = {};
        this._picturesWithZ = [];
        this._imageInfo = [];
        this._reflection = [];
        this._mirrors = [];
        $dataMap.width = this.tiledData.width;
        $dataMap.height = this.tiledData.height;

        if (this._mapId !== mapId)
        {
            this.currentMapLevel = 0;
        }
        this.currentMapLevel = this.currentMapLevel || 0;
        this._setupTiled();
    }
    VisuMZ.TiledMZ.Game_Map_setup.call(this, mapId);
};

Game_Map.prototype.isTiled = function() {
    return !!this.tiledData;
};


Game_Map.prototype._setupTiled = function() {
    this._initializeMapLevel(0);
    this._setupTiledObjects();
    this._setupTiledLayerData();
    this._setupTiledReflection();
    this._setupTiledMirrors();
};

Game_Map.prototype._initializeMapLevel = function(level) {
    const width = this.width();
    const height = this.height();
    const size = width * height;
    if (!!this._collisionMap[level]) {
        return;
    }
    const colliderMap = this._collisionMap[level] = [];
    for (let i = 0; i < size; i++) {
        colliderMap.push(this.makeColliderTile());
    }
};

Game_Map.prototype.makeColliderTile = function () {
    return {
        full: 0,
        arrow: 0,
        region: 0,
        level: 0,
        toLevel: -1
    };
};

Game_Map.prototype._setupImages = function(layer) {
    if (layer.type !== "imagelayer") return;
    if (!layer.image) return;
    const imageInfo = new TiledImageInfo(layer);
    this._imageInfo.push(imageInfo);
};

Game_Map.prototype._setupTiledObjects = function() {
    $gameTemp._tiledObjects = [];
};

Game_Map.prototype._setupTiledReflection = function() {
    for (const layer of this.tiledData.layers) {
        if (layer.type !== "objectgroup") {
            continue;
        }
        if (!layer.properties) {
            continue;
        }

        const reflectionCast = VisuMZ.TiledMZ.propertyValue(layer.properties, 'reflectionCast') || undefined;

        if (reflectionCast === undefined) {
            continue;
        }


        const layerZIndex = parseInt(layer.zIndex);
        const layerPriority = parseInt(layer.priority);
        const layerBlend = layer.blendMode || "Normal";

        if (layerZIndex === NaN) throw Error("ZIndex Property on layer %s is Not-A-Number.".format(layer.name));
        if (layerPriority === NaN) throw Error("Priority Property on layer %s is Not-A-Number.".format(layer.name));
        for (const obj of layer.objects) {
            let refZIndex = VisuMZ.TiledMZ.propertyValue(obj.properties, "zIndex");
            let refPriority = VisuMZ.TiledMZ.propertyValue(obj.properties, "priority");
            let refBlend = VisuMZ.TiledMZ.propertyValue(obj.properties, "blendMode");
            let refOpacity = VisuMZ.TiledMZ.propertyValue(obj.properties, "opacity");
            refZIndex = (refZIndex !== null) ? parseInt(refZIndex) : layerZIndex;
            refPriority = (refPriority !== null) ? parseInt(refPriority) : layerPriority;
            refBlend = (refBlend !== null) ? refBlend : layerBlend;
            refOpacity = (refOpacity !== null) ? parseInt(refOpacity) : 255;
            let rect = {
                x: obj.x,
                y: obj.y,
                width: obj.width,
                height: obj.height
            };
            this._reflection.push({ id: obj.id, rect: rect, reflectionCast: reflectionCast, zIndex: refZIndex, 
                priority: refPriority, blendMode: refBlend, opacity: refOpacity});
        }

    }
};

Game_Map.prototype._setupTiledMirrors = function() {
    for (const layer of this.tiledData.layers) {
        if (layer.type !== "objectgroup") {
            continue;
        }
        if (!layer.properties) {
            continue;
        }

        const mirrorCast = VisuMZ.TiledMZ.propertyValue(layer.properties, 'mirrorCast') || undefined;

        if (mirrorCast === undefined) {
            continue;
        }

        const layerZIndex = parseInt(layer.zIndex);
        const layerPriority = parseInt(layer.priority);
        const layerBlend = layer.blendMode || "Normal";

        if (layerZIndex === NaN) throw Error("ZIndex Property on layer %s is Not-A-Number.".format(layer.name));
        if (layerPriority === NaN) throw Error("Priority Property on layer %s is Not-A-Number.".format(layer.name));

        for (const obj of layer.objects) {
            const mirror = VisuMZ.TiledMZ.propertyValue(obj.properties, "mirror") || undefined;
            if (mirror === undefined) continue;
            const mirrorArray = mirror.split(',');
            if (mirrorArray.length < 2) {
                console.error("Mirror Property Format on Object is in the incorrect format. Format should be: x,y");
                continue;
            }

            let mirrorZIndex = VisuMZ.TiledMZ.propertyValue(obj.properties, "zIndex");
            let mirrorPriority = VisuMZ.TiledMZ.propertyValue(obj.properties, "priority");
            let mirrorBlend = VisuMZ.TiledMZ.propertyValue(obj.properties, "blendMode");
            let mirrorOpacity = VisuMZ.TiledMZ.propertyValue(obj.properties, "opacity");
            mirrorZIndex =  (mirrorZIndex !== null) ? parseInt(mirrorZIndex) : layerZIndex;
            mirrorPriority = (mirrorPriority !== null) ? parseInt(mirrorPriority) : layerPriority;
            mirrorBlend = (mirrorBlend !== null) ? mirrorBlend : layerBlend;
            mirrorOpacity = (mirrorOpacity !== null) ? mirrorOpacity : 255;
            let rect = {
                x: obj.x,
                y: obj.y,
                width: obj.width,
                height: obj.height
            };
            this._mirrors.push({ id: obj.id, rect: rect, mirrorX: parseInt(mirrorArray[0]), mirrorY: parseInt(mirrorArray[1]), zIndex: mirrorZIndex, 
                priority: mirrorPriority, blendMode: mirrorBlend, opacity: mirrorOpacity });
        }

    }
};


Game_Map.prototype.isOnReflection = function(character) {
    const mapX = character._realX * this.tileWidth();
    const mapY = character._realY * this.tileHeight();
    if (!this.isTiled()) return false;
    if (this._reflection.length === 0) return false;
    for (const reflection of this._reflection) {
        const rect = reflection.rect;
        const isInX = mapX >= rect.x && mapX < (rect.x + rect.width) - (this.tileWidth() * 0.8);
        const isInY = mapY >= rect.y && mapY < rect.y + rect.height;
        if (isInX && isInY) return true;
    }
    return false;
};

Game_Map.prototype.isInfrontOfMirror = function(character) {
    const mapX = character._realX * this.tileWidth();
    const mapY = (character._realY - 1) * this.tileHeight();
    if (!this.isTiled()) return false;
    if (this._mirrors.length === 0) return false;
    for (const mirror of this._mirrors) {
        const rect = mirror.rect;
        const isInX = mapX >= rect.x && mapX < (rect.x + rect.width) - (this.tileWidth() * 0.8);
        const isInY = mapY >= rect.y && mapY < rect.y + rect.height;
        if (isInX && isInY) return true;
    }
    return false;
};


Game_Map.prototype.getReflections = function(character) {
    const mapX = character._realX * this.tileWidth();
    const mapY = character._realY * this.tileHeight();
    let result = [];
    for (const reflection of this._reflection) {
        const rect = reflection.rect;
        const isInX = mapX >= rect.x && mapX < (rect.x + rect.width) - (this.tileWidth() * 0.8);
        const isInY = mapY >= rect.y && mapY < rect.y + rect.height;
        if (isInX && isInY) result.push(reflection);
    }
    return result;
};

Game_Map.prototype.getMirrors = function(character) {
    const mapX = character._realX * this.tileWidth();
    const mapY = (character._realY - 1)* this.tileHeight();
    let result = [];
    for (const mirror of this._mirrors) {
        const rect = mirror.rect;
        const isInX = mapX >= rect.x && mapX < (rect.x + rect.width) - (this.tileWidth() * 0.8);
        const isInY = mapY >= rect.y && mapY < rect.y + rect.height;
        if (isInX && isInY) result.push(mirror);
    }
    return result;
};

Game_Map.prototype.createTiledObjects = function(layer) {
    if (layer.type !== "objectgroup") return;
    for (const obj of layer.objects) {
        obj.layerId = layer.id;
        this.createTiledObject(obj);
    }
};

Game_Map.prototype.createTiledObject = function(obj) {
    if (obj && obj.gid === undefined) return;
    const tiledObj = new Game_TiledObject(obj);
    $gameTemp._tiledObjects.push(tiledObj);
};

Game_Map.prototype._setupTiledLayerData = function() {
    const layers = this.tiledData.layers;
    for (const layer of layers) {
        if (!layer) continue;
        const ignore = VisuMZ.TiledMZ.propertyValue(layer.properties, "ignore");
        if (ignore) continue;
        this._setupLayerProperties(layer);
        if (layer.data) {
            this._setupTileProperties(layer);
        }
        this.createTiledObjects(layer);
        this._setupImages(layer);

    }
};

Game_Map.prototype._setupLayerProperties = function(layer) {
    const props = layer.properties;
    
    const priority = VisuMZ.TiledMZ.propertyValue(props, "priority");
    if (priority != null) layer.priority = parseInt(priority) || 0;

    const zIndex = VisuMZ.TiledMZ.propertyValue(props, "zIndex");
    if (zIndex != null) layer.zIndex = parseInt(zIndex) || 0;

    const hideOnLevel = VisuMZ.TiledMZ.propertyValue(props, "hideOnLevel");
    if (hideOnLevel != null) layer.hideOnLevel = parseInt(hideOnLevel) || 0;

    const level = VisuMZ.TiledMZ.propertyValue(props, "level");
    if (level != null) layer.level = parseInt(level) || 0;

    const regionId = VisuMZ.TiledMZ.propertyValue(props, "regionId");
    if (regionId != null) layer.regionId = regionId;

    const collision =  VisuMZ.TiledMZ.propertyValue(props, "collision");
    if (collision != null) layer.collision = collision;

    const arrowImpassable =  VisuMZ.TiledMZ.propertyValue(props, "arrowImpassable");
    if (arrowImpassable != null) layer.arrowImpassable = arrowImpassable;

    const toLevel = VisuMZ.TiledMZ.propertyValue(props, "toLevel");
    if (toLevel != null) layer.toLevel = toLevel || -1;

    const hiddenInGame = VisuMZ.TiledMZ.propertyValue(props, "hiddenInGame");
    layer.hiddenInGame = hiddenInGame;
};

Game_Map.prototype._setupTileProperties = function(layer) {
    if (layer.type !== "tilelayer") return;
    const size = this.width() * this.height();
    this._initializeMapLevel(layer.level);
    for (let i = 0; i < size; i++) {
        this._setupTileFlags(layer, i);
        this._setupRegions(layer, i);
        this._setupCollision(layer, i);
        this._setupCollisionArrow(layer, i);
        this._setupMapLevel(layer, i);
    }
};

Game_Map.prototype._setupTileFlags = function(layer, index) {
    const tileProps = this._tileProperties(layer.data[index]);
    const flags = this._flags[layer.level] = this._flags[layer.level] || [];
    flags[index] = flags[index] || [];
    let bit = 0;
    const impassable = tileProps.arrowImpassable;
    if (impassable !== undefined) {
        bit = this._arrowBit(tileProps.arrowImpassable);
        flags[index].push(bit);
    }
    if (tileProps.ladder) flags[index].push(1 << 5);
    if (tileProps.bush) flags[index].push(1 << 6);
    if (tileProps.counter) flags[index].push(1 << 7);
    if (tileProps.damage) flags[index].push(1 << 8);
    if (tileProps.terrainTag) {
        flags[index].push(Number(tileProps.terrainTag) << 12);
    }
};

Game_Map.prototype._setupRegions = function(layer, index) {
    const collisionMap = this._collisionMap[layer.level];
    const regionId = layer.regionId;
    if (regionId) {
        const data = layer.data[index];
        const x = index;
        if (regionId === "tile-base") {
            const tileProps = this._tileProperties(data);
            if (!!tileProps.regionId) {
                collisionMap[x].region = parseInt(tileProps.regionId);
            }
        } else if (!!data) {
            collisionMap[x].region = parseInt(regionId);
        }
    }
};

Game_Map.prototype._setupCollision = function(layer, index) {
    const collisionMap = this._collisionMap[layer.level];
    const collision = layer.collision;
    if (collision) {
        const x = index;
        const data = layer.data[index];
        if (!!data) {
            let id = -1;
            switch (collision) {
                case "full":
                    id = x;
                    break;
                case "up-left":
                    id = x;
                    break;
                case "up-right":
                    id = x + 1;
                    break;
                case "down-left":
                    id = x + this.width;
                    break;
                case "down-right":
                    id = x + this.width + 1;
                    break;
                case "tile-base":
                    const tileProps = this._tileProperties(data);
                    if (tileProps.collision === "full") {
                        id = x;
                    }
                    break;
                default: return false;
            }
            const collider = collisionMap[id];
            if (collider) collider.full = 1;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._setupCollisionArrow = function(layer, index) {
    const collisionMap = this._collisionMap[layer.level];
    const collision = layer.collision;
    const arrow = layer.arrowImpassable;
    const data = layer.data[index];
    const x = index;
    let bit = 0;
    if (collision || arrow) {
        if (collision === "tile-base") {
            const tileProps = this._tileProperties(data);
            if (!!tileProps.arrowImpassable) {
                bit = this._arrowBit(tileProps.arrowImpassable);
                collisionMap[x].arrow = bit;
                return true;
            }
        } else if (!!data) {
            bit = this._arrowBit(arrow);
            collisionMap[x].arrow = bit;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._setupMapLevel = function(layer, index) {
    const collisionMap = this._collisionMap[layer.level];
    const toLevel = layer.toLevel;
    if (toLevel !== undefined) {
        const data = layer.data[index];
        const x = index;
        if (toLevel === "tile-base") {
            const tileProps = this._tileProperties(data);
            if (tileProps.toLevel !== undefined) {
                collisionMap[x].toLevel = parseInt(tileProps.toLevel);
                return true;
            }
        } else if (!!data) {
            collisionMap[index].toLevel = toLevel;
            return true;
        }
    }
    return false;
};

Game_Map.prototype._tileProperties = function(tileId) {
    const tilesets = this.tiledData.tilesets;
    const tilesetId = VisuMZ.TiledMZ.getTextureId(tileId);
    const tileset = tilesets[tilesetId];
    if (!tileId || !tileset) return {};
    const tilesetProps = tileset.tileProperties;
    if (!tilesetProps) return {};
    const id = tileId - tileset.firstgid;
    const tileProps = tileset.tileProperties[id];
    if (tileProps) return tileProps;
    return {};
};

Game_Map.prototype._arrowBit = function(impassable) {
    let bit = 0;
    const arrows = impassable.split("&").map((i) => i.trim().toLowerCase());
    for (let i = 0; i < arrows.length; i++) {
        const arrow = arrows[i];
        if (arrow === "left") {
            bit ^= 2;
        } else if (arrow === "down") {
            bit ^= 1;
        } else if (arrow === "right") {
            bit ^= 4;
        } else if (arrow === "up") {
            bit ^= 8;
        }
    }
    return bit;
};

VisuMZ.TiledMZ.Game_Map_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_checkPassage.call(this, x, y, bit);
    if (!this.checkPassageCollision(x, y, bit)) return false;
    return this.checkPassageFlags(x, y, bit);
};

Game_Map.prototype.checkPassageCollision = function(x, y, bit) {
    const collisionMap = this._collisionMap[this.currentMapLevel];
    if (collisionMap) {
        const index = x + this.width() * y;
        const flag = collisionMap[index] ? collisionMap[index].arrow : null;
        if (flag) {
            return this.isFlagPassable(flag, bit);
        }
        return collisionMap[index] ? collisionMap[index].full === 0 : true;
    }
    return true;
};

Game_Map.prototype.checkPassageFlags = function(x, y, bit) {
    const flags = this.layeredTiles(x, y);
    if (!flags) return false;
    let passable = true;
    for (let i = flags.length; i > 0; i--) {
        const flag = flags[i];
        passable = this.isFlagPassable(flag, bit);
        if (passable !== undefined && !passable) return passable;
    }
    return passable;
};

Game_Map.prototype.isFlagPassable = function(flag, bit) {
    if ((flag & 0x10) !== 0) return undefined;
    if ((flag & bit) === 0) return true;
    if ((flag & bit) === bit) return false;
};

VisuMZ.TiledMZ.Game_Map_tileWidth = Game_Map.prototype.tileWidth;
Game_Map.prototype.tileWidth = function() {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_tileWidth.call(this);
    return this.tiledData.tilewidth;
};

VisuMZ.TiledMZ.Game_Map_tileHeight = Game_Map.prototype.tileHeight;
Game_Map.prototype.tileHeight = function() {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_tileHeight.call(this);
    return this.tiledData.tileheight;
};

VisuMZ.TiledMZ.Game_Map_width = Game_Map.prototype.width;
Game_Map.prototype.width = function() {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_width.call(this);
    return this.tiledData.width;
};

VisuMZ.TiledMZ.Game_Map_height = Game_Map.prototype.height;
Game_Map.prototype.height = function() {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_height.call(this);
    return this.tiledData.height;
};

VisuMZ.TiledMZ.Game_Map_layeredTiles = Game_Map.prototype.layeredTiles;
Game_Map.prototype.layeredTiles = function(x, y) {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_layeredTiles.call(this, x, y);
    const index = x + this.width() * y;
    const tilesetFlags = this.tilesetFlags();
    return tilesetFlags.length > 0 ? tilesetFlags[index] : [];
};

VisuMZ.TiledMZ.Game_Map_checkLayeredTilesFlags = Game_Map.prototype.checkLayeredTilesFlags;
Game_Map.prototype.checkLayeredTilesFlags = function(x, y, bit) {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_checkLayeredTilesFlags.call(this, x, y, bit);
    return this.layeredTiles(x, y).some(tile => (tile & bit) !== 0);
};

VisuMZ.TiledMZ.Game_Map_tilesetFlags = Game_Map.prototype.tilesetFlags;
Game_Map.prototype.tilesetFlags = function() {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_tilesetFlags.call(this);
    const flags = this._flags[this.currentMapLevel];
    return flags ? flags : [];
};

VisuMZ.TiledMZ.Game_Map_terrainTag = Game_Map.prototype.terrainTag;
Game_Map.prototype.terrainTag = function(x, y) {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_terrainTag.call(this, x, y);
    if (this.isValid(x, y)) {
        const tiles = this.layeredTiles(x, y);
        if (tiles) {
            for (const flag of tiles) {
                const tag = flag >> 12;
                if (tag > 0) return tag;
            }
        }
    }
    return 0;
};

VisuMZ.TiledMZ.Game_Map_regionId = Game_Map.prototype.regionId;
Game_Map.prototype.regionId = function(x, y) {
    if (!this.isTiled()) return VisuMZ.TiledMZ.Game_Map_regionId.call(this, x, y);
    const collisionMap = this._collisionMap[this.currentMapLevel];
    const index = x + this.width() * y;
    return this.isValid(x, y) ? collisionMap[index].region : 0;
};

Game_Map.prototype.checkMapLevelChanging = function(x, y) {
    const collisionMap = this._collisionMap[this.currentMapLevel];
    if (collisionMap) {
        const index = x + this.width() * y;
        if (collisionMap[index].toLevel < 0)  {
            return false;
        }
        this.currentMapLevel = collisionMap[index].toLevel;
        return true; 
    }
};

Game_Map.prototype.tiledEventLocation = function(eventId) {
    const layers = this.tiledData.layers;
    for (const layer of layers) {
        if (layer.type === "objectgroup") {
            for (const obj of layer.objects) {
                const props = obj.properties;
                if (!props) continue;
                const eventProp = props.find(x => x.name.toLowerCase() === "eventid");
                if (!eventProp) continue;
                if (parseInt(eventProp.value) === eventId) {
                    const x = Math.floor(obj.x / this.tileWidth());
                    const y = Math.floor(obj.y / this.tileHeight());
                    return [x, y];
                }
            }
        }
    }
    return undefined;
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

VisuMZ.TiledMZ.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    VisuMZ.TiledMZ.Game_CharacterBase_initMembers.call(this);
    this.reflections = [];
    this.mirrors = [];
};


VisuMZ.TiledMZ.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
    VisuMZ.TiledMZ.Game_CharacterBase_update.call(this);
    this.updateReflection();
    this.updateMirrors();
};

Game_CharacterBase.prototype.updateReflection = function () {
    if (!$gameMap.isOnReflection(this)) {
        this.reflections = [];
        return;
    }
    this.reflections = $gameMap.getReflections(this);
};

Game_CharacterBase.prototype.updateMirrors = function () {
    if (!$gameMap.isInfrontOfMirror(this)) {
        this.mirrors = [];
        return;
    }
    this.mirrors = $gameMap.getMirrors(this);
};

VisuMZ.TiledMZ.Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
Game_CharacterBase.prototype.refreshBushDepth = function() {
    VisuMZ.TiledMZ.Game_CharacterBase_refreshBushDepth.call(this);
    if (this.isNormalPriority() && !this.isObjectCharacter() && this.isOnBush() &&
    !this.isJumping()) {
        if (!this.isMoving()) {
            this._bushDepth = VisuMZ.TiledMZ.Settings.BushDepth;
        }
    } else {
        this._bushDepth = 0;
    }
};

//=============================================================================
// Game_Player
//=============================================================================

VisuMZ.TiledMZ.Game_Player_checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    VisuMZ.TiledMZ.Game_Player_checkEventTriggerHere.call(this, triggers);
    $gameMap.checkMapLevelChanging(this.x, this.y);
};


//=============================================================================
// Game_Event
//=============================================================================

VisuMZ.TiledMZ.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    VisuMZ.TiledMZ.Game_Event_initialize.call(this, mapId, eventId);
    const location = $gameMap.tiledEventLocation(eventId);
    if (location !== undefined) {
        this.locate(location[0], location[1]);
        this.refresh();
    }
};

//=============================================================================
// Sprite_Character
//=============================================================================


VisuMZ.TiledMZ.Sprite_Character_initMmebers = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
    VisuMZ.TiledMZ.Sprite_Character_initMmebers.call(this);
    this.priority = 1;
};

//=============================================================================
// Sprite_CharacterReflection
//=============================================================================

function Sprite_CharacterReflection() {
    this.initialize(...arguments);
}

Sprite_CharacterReflection.prototype = Object.create(Sprite_Character.prototype);
Sprite_CharacterReflection.prototype.constructor = Sprite_CharacterReflection;

Sprite_CharacterReflection.prototype.initMembers = function() {
    Sprite_Character.prototype.initMembers.call(this);
    this.visible = false;
    this._data = null;
};

VisuMZ.TiledMZ.Sprite_CharacterReflection_characterPatternY = Sprite_CharacterReflection.prototype.characterPatternY;
Sprite_CharacterReflection.prototype.characterPatternY = function() {
    const reflection = this._data.reflectionCast;
    if (reflection !== undefined || this._character.isObjectCharacter()) return VisuMZ.TiledMZ.Sprite_CharacterReflection_characterPatternY.call(this);
    let direction = this._character.direction();
    switch (direction) {
        case 2:
            direction = 8;
            break;
        case 4:
            direction = 6;
            break;
        case 6:
            direction = 4;
            break;
        case 8:
            direction = 2;
            break;
    }
    return (direction - 2) / 2;
};

Sprite_CharacterReflection.prototype.setup = function(data) {
    if (!data) return;
    this._data = data;
    this.z = data.zIndex || this._character.screenZ();
    this.priority = data.priority || 0;
    this.scale.y = (typeof data.reflectionCast === "number" && data.reflectionCast > 0) ? -1 : 1;
    this.scale.x = (data.reflectionCast === undefined) ? -1 : 1;
    this.opacity = data.opacity;
    if (typeof data.blendMode === "string") {
        this.blendMode = VisuMZ.TiledMZ.strToBlendMode(data.blendMode);
    }
    else {
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
    }
};

Sprite_CharacterReflection.prototype.update = function() {
    Sprite_Character.prototype.update.call(this);
    this.opacity = this._data.opacity;
    this.scale.x = (this._data.reflectionCast === undefined) ? -1 : 1;
    if (typeof this._data.blendMode === "string") {
        this.blendMode = VisuMZ.TiledMZ.strToBlendMode(this._data.blendMode);
    }
    else {
        this.blendMode = PIXI.BLEND_MODES.NORMAL;
    }
};

Sprite_CharacterReflection.prototype.isValidReflection = function() {
    if (!this._data) return false;
    if (!this._data.rect) return false;
    const data = this._data;
    const mapX = this._character._realX * $gameMap.tileWidth();
    let mapY = (this._character._realY - 1) * $gameMap.tileHeight();
    if (data.reflectionCast !== undefined) mapY = this._character._realY * $gameMap.tileHeight();
    const rect = data.rect;
    const isInX = mapX >= rect.x && mapX < (rect.x + rect.width) - ($gameMap.tileWidth() * 0.8);
    const isInY = mapY >= rect.y && mapY < rect.y + rect.height;
    if (isInX && isInY) return true;
    return false;
};

Sprite_CharacterReflection.prototype.updatePosition = function () {
    const data = this._data;
    this.x = this._character.screenX();
    this.y = this._character.screenY();
    if (data.reflectionCast !== undefined) {
        this.y += $gameMap.tileHeight() * data.reflectionCast;
        if (data.reflectionCast > 0) {
            this.y -= $gameMap.tileHeight();
        }
    } else {
        this.x += data.mirrorX * $gameMap.tileWidth();
        this.y += data.mirrorY * $gameMap.tileHeight();
    }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

VisuMZ.TiledMZ.Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    VisuMZ.TiledMZ.Spriteset_Map_initialize.call(this);
    this.restorePicturesWithZ();
};

VisuMZ.TiledMZ.Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
    if (!$gameMap.isTiled()) return VisuMZ.TiledMZ.Spriteset_Map_createTilemap.call(this);
    if (Imported.VisuMZ_2_WeatherEffects) {
        this.createLowerWeatherLayer();
    }
    const map = new TiledTilemap($gameMap.tiledData);
    this._baseSprite.addChild(map);
    this._tilemap = map;
    this._effectsContainer = map;
    this._reflectionSprites = [];
    if (Imported.VisuMZ_2_WeatherEffects) {
        this.createUpperWeatherLayer();
    }
    
};

Spriteset_Map.prototype.restorePicturesWithZ = function() {
    const tilemap = this._tilemap;
    const container = this._pictureContainer;
    
    if ($gameMap._picturesWithZ && tilemap != null) {
        for (p of $gameMap._picturesWithZ) {            
            if (container) {
                let picture = container.children.find(x => x._pictureId === p.id);
                if (picture) {
                    container.removeChild(picture);
                    picture.z = picture.zIndex = p.zIndex;
                    tilemap.addChild(picture);                        
                } 
            }            
        }
    }
}

VisuMZ.TiledMZ.Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
Spriteset_Map.prototype.loadTileset = function() {
    if (!$gameMap.isTiled()) return VisuMZ.TiledMZ.Spriteset_Map_loadTileset.call(this);
    const bitmaps = [];
    for (const tileset of $gameMap.tiledData.tilesets) {
        bitmaps.push(ImageManager.loadTiledTileset(tileset.image));
    }
    this._tilemap.setBitmaps(bitmaps);
    this._tileset =$gameMap.tiledData.tilesets;
};

VisuMZ.TiledMZ.Spriteset_Map_updateTileset = Spriteset_Map.prototype.updateTileset;
Spriteset_Map.prototype.updateTileset = function () {
    if (!$gameMap.isTiled()) return VisuMZ.TiledMZ.Spriteset_Map_updateTileset.call(this);
    if (this._tileset !== $gameMap.tiledData.tilesets) {
        this.loadTileset();
    }
};

VisuMZ.TiledMZ.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    VisuMZ.TiledMZ.Spriteset_Map_createLowerLayer.call(this);
    this.createTiledImages();
};



    

Spriteset_Map.prototype.createTiledImages = function() {
    for (const info of $gameMap._imageInfo) {
        const sprite = new TiledTilingSprite(info);
        this._tilemap.addChild(sprite);
    }
};

Spriteset_Map.prototype.isTiledObjectsReady = function() {
    return $gameMap.isTiled() ? this._tilemap.isTiledObjectsCreated() : true;
};

VisuMZ.TiledMZ.Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    VisuMZ.TiledMZ.Spriteset_Map_update.call(this);
    for (const character of this._characterSprites) {
        if (!character._character.mirrors) character._character.mirrors = [];
        for (const mirror of character._character.mirrors) {
            if (this._reflectionSprites.find(refSprite => refSprite._data && refSprite._data.reflectionCast === undefined && refSprite._data.id === mirror.id
                && refSprite._character === character._character)) {
                continue;
            }
            const refSprite = new Sprite_CharacterReflection(character._character);
            refSprite.setup(mirror);
            this._reflectionSprites.push(refSprite);
            this._tilemap.addChild(refSprite);
        }
        if (!character._character.reflections) character._character.reflections = [];
        for (const reflection of character._character.reflections) {
            if (this._reflectionSprites.find(refSprite => refSprite._data && refSprite._data.reflectionCast !== undefined && refSprite._data.id === reflection.id
                && refSprite._character === character._character)) {
                continue;
            }
            const refSprite = new Sprite_CharacterReflection(character._character);
            refSprite.setup(reflection);
            this._reflectionSprites.push(refSprite);
            this._tilemap.addChild(refSprite);
        }
    }

    for (const sprite of this._reflectionSprites) {
        if (!sprite.isValidReflection()) {
            this._reflectionSprites.remove(sprite);
            this._tilemap.removeChild(sprite);
            delete sprite;
        }
    }

    for (const sprite of this._characterSprites) {
        if (sprite._character instanceof Game_Event && sprite._character._erased) {
            this._tilemap.removeChild(sprite);
            delete sprite;
        }
    }
    
};

// Compatibility Patch With VisuMZ
if (Imported.VisuMZ_1_EventsMoveCore) {
    // Update shadows so they are always on on Z-1 of the character sprite.
    VisuMZ.TiledMZ.Sprite_Character_updateShadow = Sprite_Character.prototype.updateShadow;
    Sprite_Character.prototype.updateShadow = function() {
        VisuMZ.TiledMZ.Sprite_Character_updateShadow.call(this);
        if (!this._shadowSprite) return;
        this._shadowSprite.z = this.z - 1;
        this._shadowSprite.priority = 9999;
    };

    Game_CharacterBase.prototype.isShadowVisible = function() {
        if (this.isTile()) return false;
        if (this._isObjectCharacter) return false;
        if (this._characterName === '') return false;
        if (this.constructor === Game_Vehicle) return false;
        if (this.isTransparent() && !$gameSwitches.value(VisuMZ.TiledMZ.Settings.ShadowVisibilitySwitch)) return false;
        return true;
    };
}

//=============================================================================
// Scene_Map
//=============================================================================

VisuMZ.TiledMZ.Scene_Map_isReady = Scene_Map.prototype.isReady;
Scene_Map.prototype.isReady = function() {
    return VisuMZ.TiledMZ.Scene_Map_isReady.call(this) && this._spriteset.isTiledObjectsReady();
};

//=============================================================================
// End of File
//=============================================================================