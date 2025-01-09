/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlecommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ExitToDesktop
 * @plugindesc Manage the menu command window
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Description: Use this plugin to easily manage the command window in the
 * menu scene. It allows you to re-arrange commands or use JavaScript to 
 * add custom commands which are capable of calling custom plugin scenes or
 * functions.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin will overwrite the default title window if keep originals is
 * off. It is best to place this below any other plugins that add commands to
 * the title window if this option is used.
 *
 * The command symbol should be unique and not blank for every command. This
 * symbol is how the plugin knows internally which JS code to run.
 *
 * Some Command Symbols can have special meanings, mainly when they represent
 * the original commands.
 * The following symbols represent the original commands (case sensitive):
 * newGame - Will handle like the original new game command
 * continue - Will handle like the original continue command
 * options - Will handle like the original options command
 * 
 * It is important that you do not use these strings as the Command Symbol
 * property unless you mean to refer to the original commands.
 * --------------------------Latest Version------------------------------------
 * Hi all, in this latest version a few options were added to modify the title
 * command window itself which are standard among other [CGMZ] plugins. These
 * include an option to set the windowskin, window padding, opacity, and tone.
 *
 * Version 1.2.1
 * - Added options to change windowskin, padding, opacity, and tone
 * - Documentation Update
 *
 * @param Visible Commands
 * @type number
 * @min 0
 * @default 3
 * @desc This is the number of commands that will be visible in the window without scrolling
 *
 * @param Window Width
 * @type number
 * @min -1
 * @default 30
 * @desc Percentage of the screen to use for title command window width. Set to -1 for default width.
 *
 * @param Alignment
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc The alignment of the command text in the window
 *
 * @param Icon Alignment
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc The alignment of the command icons in the window
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Custom windowskin to use, leave blank for default
 *
 * @param Window Padding
 * @type number
 * @min -1
 * @default -1
 * @desc Window padding. -1 = default padding
 *
 * @param Window Back Opacity
 * @type number
 * @min -1
 * @desc Window back opacity. -1 = default
 * @default -1
 *
 * @param Window Tone
 * @type struct<Tone>
 * @desc Window tone. -256 for Red = default tone
 * @default {"Red":"-256","Blue":"0","Green":"0"}
 *
 * @param Keep Original Commands
 * @type boolean
 * @default true
 * @desc Determine whether to show the original commands in their original order.
 *
 * @param Commands
 * @type struct<Handler>[]
 * @desc Command Name and associated js commands
 * @default []
*/
/*~struct~Handler:
 * @param Command Name
 * @desc Name of the command to display in the command window.
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc An icon to show for the command, if 0 will not show any icon
 *
 * @param Command Symbol
 * @desc This symbol is used internally to recognize the command. Special meaning for original commands (see documentation).
 *
 * @param JS Command
 * @type multiline_string
 * @desc JavaScript to run when command is selected.
 *
 * @param Background Image
 * @type file
 * @dir img
 * @desc A background image to use for the command. Blank = default black rectangle
 *
 * @param Background Image X
 * @type number
 * @default 0
 * @min 0
 * @desc The x coordinate to start the background image from the source image (upper left corner)
 *
 * @param Background Image Y
 * @type number
 * @default 0
 * @min 0
 * @desc The y coordinate to start the background image from the source image (upper left corner)
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of Red in the tone. -256 = custom tone will be ignored
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Blue in the tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Green in the tone.
 * @default 0
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlecommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ExitToDesktop
 * @plugindesc 标题选项拓展系统（为标题画面增加新的选项和美化）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】V 1.2.1
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 本插件可以轻松管理标题画面选项。
 * 可以使用JS语言命令来制作新的自定义选项。
 * 用于制作类似“鸣谢”、“制作名单”、“图鉴”等需要其他插件辅助的新选项。
 * 可以设置选项文字颜色，增加图标等。
 *
 * 【搭配插件】
 * CGMZ Core:核心插件，运行作者插件的必须插件!!!
 * CGMZ Changelog:版本记录插件，制作一个版本更新记录的界面。
 * CGMZ Credits:制作名单插件，制作一个游戏插件、素材等资源来源和资源作者等信息的界面。
 * CGMZ Exit To Desktop:退出游戏插件，制作一个选项，用于结束和退出游戏。
 * 注：本插件在插件列表中必须置于上述插件之下。
 * -----------------------------------------------------------------------------
 * 【使用说明】
 * 一、本插件支持关闭原标题选项的功能。
 *     如果你使用了其他添加标题画面选项的插件。
 *     请把本插件在插件列表里置于其他插件下方。
 * 二、每个自定义选项的命令字符或JS命令只能选择使用其中一种，且不能取空值。
 * 三、以下命令字符具有特殊含义，是用于默认指令的，请勿用于其他用途。字符区分大小写。
 *     如：newGame - 开始新游戏，continue - 继续游戏， options - 打开游戏设置。
 *
 * 举例：继续游戏的选项设置
 *     1、选项名称：继续游戏 （游戏标题画面显示的描述）
 *     2、命令字符：continue
 *     3、JS命令：（留空）
 * 文本命令则是：{"Command Name":"继续游戏","Command Symbol":"continue","JS Command":"\"\""}
 *
 * 举例2：自定义制作名单选项的设置（举例使用了作者的CGMZ Credits插件和JS脚本命令）
 *     1、选项名称：制作名单
 *     2、命令字符：（留空）
 *     3、JS命令：SceneManager.push(CGMZ_Scene_Credits);
 *
 * 四、通过设置，可以支持标题选项添加图标\I[n]或使用颜色\C[n]等文本指令。
 * 
 * ---------------------------------------------------------------------------
 *【版本更新历史】
 * Hi all, in this latest version a few options were added to modify the title
 * command window itself which are standard among other [CGMZ] plugins. These
 * include an option to set the windowskin, window padding, opacity, and tone.
 *
 * Version 1.2.1
 * - Added options to change windowskin, padding, opacity, and tone
 * - Documentation Update
 * 
 * @param Visible Commands
 * @text 显示选项数
 * @type number
 * @min 0
 * @default 3
 * @desc 标题画面里显示的选项数，实际选项多于显示数会以滚动形式显示。显示选项数过多会超出画面和覆盖标题，须设置分辨率。
 *
 * @param Window Width
 * @type number
 * @min -1
 * @default 30
 * @desc Percentage of the screen to use for title command window width. Set to -1 for default width.
 *
 * @param Alignment
 * @text 选项中文字位置
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc 设置选项框中文字的位置。Left-靠左，Center-居中，Right-靠右。
 *
 * @param Icon Alignment
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc The alignment of the command icons in the window
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Custom windowskin to use, leave blank for default
 *
 * @param Window Padding
 * @type number
 * @min -1
 * @default -1
 * @desc Window padding. -1 = default padding
 *
 * @param Window Back Opacity
 * @type number
 * @min -1
 * @desc Window back opacity. -1 = default
 * @default -1
 *
 * @param Window Tone
 * @type struct<Tone>
 * @desc Window tone. -256 for Red = default tone
 * @default {"Red":"-256","Blue":"0","Green":"0"}
 *
 * @param Keep Original Commands
 * @text 保留默认选项
 * @type boolean
 * @default true
 * @desc 是否保留游戏默认的选项。如：重新开始、继续游戏和游戏设置。Ture-保留，False-不保留。
 *
 * @param Commands
 * @text 自定义标题选项
 * @type struct<Handler>[]
 * @desc 设置你想要的标题画面选项。
 * @default []
*/
/*~struct~Handler:zh-CN
 * @param Command Name
 * @text 选项名字（显示）
 * @desc 在标题画面显示的选项名字。支持使用文本指令。如 \I[n]图标、\C[n]颜色等。
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc An icon to show for the command, if 0 will not show any icon
 *
 * @param Command Symbol
 * @text 命令字符
 * @desc 系统默认选项的指令，如：newGame、continue、options等。
 *
 * @param JS Command
 * @text JS命令
 * @type multiline_string
 * @desc 设置自定义选项用的JS命令，取决于你所使用的插件的脚本指令。
 *
 * @param Background Image
 * @type file
 * @dir img
 * @desc A background image to use for the command. Blank = default black rectangle
 *
 * @param Background Image X
 * @type number
 * @default 0
 * @min 0
 * @desc The x coordinate to start the background image from the source image (upper left corner)
 *
 * @param Background Image Y
 * @type number
 * @default 0
 * @min 0
 * @desc The y coordinate to start the background image from the source image (upper left corner)
*/
/*~struct~Tone:zh-CN
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of Red in the tone. -256 = custom tone will be ignored
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Blue in the tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Green in the tone.
 * @default 0
*/
/*:es 
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/titlecommandwindow/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ExitToDesktop
 * @plugindesc Administrar la ventana de comandos del menú
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.2.1
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.8.1
 * ----------------------------------------------------------------------------
 * Descripción: Usa este plugin para administrar fácilmente la ventana de 
 * comandos en la escena del menú. Te permite reorganizar los comandos o usar 
 * JavaScript para agregar comandos personalizados que sean capaces de llamar 
 * escenas de plugin personalizados o funciones.
 * ----------------------------------------------------------------------------
 * Documentación:
 * Este plugin sobrescribirá la ventana de título predeterminada si conservar
 * originales está desactivado. Es mejor colocar esto debajo de cualquier otro
 * complemento que agregue comandos a la ventana de título si se utiliza esta
 * opción.
 *
 * El símbolo de comando debe ser único y no estar en blanco para cada comando.
 * Este símbolo es cómo el plugin sabe internamente qué código JS ejecutar.
 *
 * Algunos Símbolos de Comando pueden tener significados especiales, 
 * principalmente cuando representan los comandos originales.
 * Los siguientes símbolos representan los comandos originales (se distingue
 * entre mayúsculas y minúsculas):
 * newGame - Manejará como el nuevo comando original del juego
 * continue - Manejará como el comando de continuación original
 * options - Manejará como el comando de opciones original
 * 
 * Es importante que no utilicee estas cadenas como la propiedad de símbolo
 * de comando a menos que desee hacer referencia a los comandos originales.
 * --------------------------Latest Version------------------------------------
 * Hi all, in this latest version a few options were added to modify the title
 * command window itself which are standard among other [CGMZ] plugins. These
 * include an option to set the windowskin, window padding, opacity, and tone.
 *
 * Version 1.2.1
 * - Added options to change windowskin, padding, opacity, and tone
 * - Documentation Update
 *
 * @param Visible Commands
 * @text Comandos visibles
 * @type number
 * @min 0
 * @default 3
 * @desc Este es el número de comandos que serán visibles en la ventana sin necesidad de desplazarse.
 *
 * @param Window Width
 * @type number
 * @min -1
 * @default 30
 * @desc Percentage of the screen to use for title command window width. Set to -1 for default width.
 *
 * @param Alignment
 * @text Alineación
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 * @desc La alineación del texto del comando en la ventana.
 *
 * @param Icon Alignment
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc The alignment of the command icons in the window
 *
 * @param Windowskin
 * @type file
 * @dir img/
 * @desc Custom windowskin to use, leave blank for default
 *
 * @param Window Padding
 * @type number
 * @min -1
 * @default -1
 * @desc Window padding. -1 = default padding
 *
 * @param Window Back Opacity
 * @type number
 * @min -1
 * @desc Window back opacity. -1 = default
 * @default -1
 *
 * @param Window Tone
 * @type struct<Tone>
 * @desc Window tone. -256 for Red = default tone
 * @default {"Red":"-256","Blue":"0","Green":"0"}
 *
 * @param Keep Original Commands
 * @text Mantener comandos originales
 * @type boolean
 * @default true
 * @desc Determine si desea mostrar los comandos originales en su orden original.
 *
 * @param Commands
 * @text Comandos 
 * @type struct<Handler>[]
 * @desc Nombre del comando y comandos js asociados.
 * @default []
*/
/*~struct~Handler:es
 * @param Command Name
 * @text Nombre de comando
 * @desc Nombre del comando que se mostrará en la ventana de comandos.
 *
 * @param Icon
 * @type icon
 * @default 0
 * @desc An icon to show for the command, if 0 will not show any icon
 *
 * @param Command Symbol
 * @text Símbolo de comando
 * @desc Este símbolo se usa internamente para reconocer el comando. Significado especial para comandos originales (ver documentación).
 *
 * @param JS Command
 * @text Comando JS
 * @type multiline_string
 * @desc JavaScript para ejecutar cuando se selecciona el comando.
 *
 * @param Background Image
 * @type file
 * @dir img
 * @desc A background image to use for the command. Blank = default black rectangle
 *
 * @param Background Image X
 * @type number
 * @default 0
 * @min 0
 * @desc The x coordinate to start the background image from the source image (upper left corner)
 *
 * @param Background Image Y
 * @type number
 * @default 0
 * @min 0
 * @desc The y coordinate to start the background image from the source image (upper left corner)
*/
/*~struct~Tone:es
 * @param Red
 * @type number
 * @min -256
 * @max 255
 * @desc Amount of Red in the tone. -256 = custom tone will be ignored
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Blue in the tone.
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of Green in the tone.
 * @default 0
*/
Imported.CGMZ_Title_CommandWindow = true;
CGMZ.Versions["Title Command Window"] = "1.2.1";
CGMZ.Title_CommandWindow = {};
CGMZ.Title_CommandWindow.parameters = PluginManager.parameters('CGMZ_TitleCommandWindow');
CGMZ.Title_CommandWindow.Alignment = CGMZ.Title_CommandWindow.parameters["Alignment"];
CGMZ.Title_CommandWindow.IconAlignment = CGMZ.Title_CommandWindow.parameters["Icon Alignment"];
CGMZ.Title_CommandWindow.Windowskin = CGMZ.Title_CommandWindow.parameters["Windowskin"];
CGMZ.Title_CommandWindow.VisibleCommands = Number(CGMZ.Title_CommandWindow.parameters["Visible Commands"]);
CGMZ.Title_CommandWindow.WindowWidth = Number(CGMZ.Title_CommandWindow.parameters["Window Width"]);
CGMZ.Title_CommandWindow.WindowPadding = Number(CGMZ.Title_CommandWindow.parameters["Window Padding"]);
CGMZ.Title_CommandWindow.WindowBackOpacity = Number(CGMZ.Title_CommandWindow.parameters["Window Back Opacity"]);
CGMZ.Title_CommandWindow.KeepOriginals = (CGMZ.Title_CommandWindow.parameters["Keep Original Commands"] === "true");
CGMZ.Title_CommandWindow.WindowTone = CGMZ_Utils.parseToneJSON(CGMZ.Title_CommandWindow.parameters["Window Tone"], "[CGMZ] Title Command Window");
CGMZ.Title_CommandWindow.CommandsArray = CGMZ_Utils.parseJSON(CGMZ.Title_CommandWindow.parameters["Commands"], [], "[CGMZ] Title Command Window", "Your Commands parameter was set up incorrectly and could not be read.");
CGMZ.Title_CommandWindow.Commands = [];
for(const cmdJSON of CGMZ.Title_CommandWindow.CommandsArray) {
	const command = CGMZ_Utils.parseJSON(cmdJSON, null, "[CGMZ] Title Command Window", "One of your title commands was set up incorrectly and could not be read.");
	if(!command) continue;
	const cmd = {};
	cmd.icon = Number(command.Icon);
	cmd.backgroundImage = command["Background Image"];
	cmd.backImgX = Number(command["Background Image X"]);
	cmd.backImgY = Number(command["Background Image Y"]);
	cmd.symbol = command["Command Symbol"] || Math.random().toString(36);
	cmd.name = command["Command Name"];
	cmd.js = command["JS Command"];
	CGMZ.Title_CommandWindow.Commands.push(cmd);
}
//=============================================================================
// Scene Title
//-----------------------------------------------------------------------------
// Handling for command window entries
//=============================================================================
//-----------------------------------------------------------------------------
// Handling for custom Commands added through the plugin
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_TitleCommand_commandCustom = function() {
	for(const cmd of CGMZ.Title_CommandWindow.Commands) {
		if(this._commandWindow.currentSymbol() === cmd.symbol) {
			try {
				const hookFunc = new Function(cmd.js);
				hookFunc.call(this);
			}
			catch (e) {
				const origin = "[CGMZ] Title Command Window";
				const suggestion = "Check your JavaScript command";
				CGMZ_Utils.reportError(e.message, origin, suggestion);
			}
			break;
		}
	}
};
//-----------------------------------------------------------------------------
// Alias. Add additional commands.
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	alias_CGMZ_TitleCommandWindow_createCommandWindow.call(this);
	for(const cmd of CGMZ.Title_CommandWindow.Commands) {
		if(this.CGMZ_TitleCommandWindow_isCustomCommand(cmd.symbol)) {
			this._commandWindow.setHandler(cmd.symbol, this.CGMZ_TitleCommand_commandCustom.bind(this));
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if command is a custom command in need of custom handler
//-----------------------------------------------------------------------------
Scene_Title.prototype.CGMZ_TitleCommandWindow_isCustomCommand = function(symbol) {
	return (symbol !== 'options' && symbol !== 'continue' && symbol !== 'newGame');
};
//-----------------------------------------------------------------------------
// Change the main command width if not set to use default
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_mainCommandWidth = Scene_Title.prototype.mainCommandWidth;
Scene_Title.prototype.mainCommandWidth = function() {
	if(CGMZ.Title_CommandWindow.WindowWidth < 0) return alias_CGMZ_TitleCommandWindow_mainCommandWidth.call(this);
	return Graphics.boxWidth * (CGMZ.Title_CommandWindow.WindowWidth / 100.0);
};
//-----------------------------------------------------------------------------
// Alias. Change the rectangle height based on number of visible commands
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_commandWindowRect = Scene_Title.prototype.commandWindowRect;
Scene_Title.prototype.commandWindowRect = function() {
	const rect = alias_CGMZ_TitleCommandWindow_commandWindowRect.call(this);
	rect.height = this.calcWindowHeight(CGMZ.Title_CommandWindow.VisibleCommands, true);
	return rect;
};
//=============================================================================
// Window TitleCommand
//-----------------------------------------------------------------------------
// Change commands in the command window
//=============================================================================
//-----------------------------------------------------------------------------
// Create cgmz window options object
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.CGMZ_createWindowOptions = function() {
	Window_Command.prototype.CGMZ_createWindowOptions.call(this);
	if(CGMZ.Title_CommandWindow.Windowskin) this.cgmzOpts.windowskin = CGMZ.Title_CommandWindow.Windowskin;
	if(CGMZ.Title_CommandWindow.WindowPadding >= 0) this.cgmzOpts.padding = CGMZ.Title_CommandWindow.WindowPadding;
	if(CGMZ.Title_CommandWindow.WindowBackOpacity >= 0) this.cgmzOpts.backOpacity = CGMZ.Title_CommandWindow.WindowBackOpacity;
	if(CGMZ.Title_CommandWindow.WindowTone?.Red >= -255) this.cgmzOpts.tone = [CGMZ.Title_CommandWindow.WindowTone.Red, CGMZ.Title_CommandWindow.WindowTone.Green, CGMZ.Title_CommandWindow.WindowTone.Blue];
};
//-----------------------------------------------------------------------------
// Alias. Add original commands in original order if user wishes
//-----------------------------------------------------------------------------
const alias_CGMZ_TitleCommandWindow_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
	if(CGMZ.Title_CommandWindow.KeepOriginals) {
		alias_CGMZ_TitleCommandWindow_makeCommandList.call(this);
	}
	for(const cmd of CGMZ.Title_CommandWindow.Commands) {
		this.addCommand(cmd.name, cmd.symbol, this.CGMZ_TitleCommandWindow_isCommandEnabled(cmd), {icon: cmd.icon, img: cmd.backgroundImage, imgX: cmd.backImgX, imgY: cmd.backImgY});
	}
};
//-----------------------------------------------------------------------------
// Check if command should be enabled
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.CGMZ_TitleCommandWindow_isCommandEnabled = function(command) {
	if(command.symbol === "continue") {
		return this.isContinueEnabled();
	}
	return true;
};
//-----------------------------------------------------------------------------
// Change alignment of command text
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.itemTextAlign = function() {
	return CGMZ.Title_CommandWindow.Alignment;
};
//-----------------------------------------------------------------------------
// Get the command icon
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.CGMZ_icon = function(index) {
	return this._list[index].ext?.icon;
};
//-----------------------------------------------------------------------------
// Allow use of text codes in command
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const align = this.itemTextAlign();
	const icon = this.CGMZ_icon(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	if(icon) {
		const iconX = (CGMZ.Title_CommandWindow.IconAlignment === 'left') ? rect.x : rect.x + rect.width - ImageManager.iconWidth;
		this.drawIcon(icon, iconX, rect.y + 2);
		rect.x += (ImageManager.iconWidth + 2) * (CGMZ.Title_CommandWindow.IconAlignment === 'left');
		rect.width -= ImageManager.iconWidth + 2;
	}
	this.CGMZ_drawTextLine(this.commandName(index), rect.x, rect.y, rect.width, align);
};
//-----------------------------------------------------------------------------
// Get selectable cgmz options
//-----------------------------------------------------------------------------
Window_TitleCommand.prototype.CGMZ_getSelectableCGMZOptions = function(index) {
	const ext = this._list[index].ext;
	if(ext && ext.img) {
		const bg = {
			img: ext.img,
			imgX: ext.imgX,
			imgY: ext.imgY
		}
		return {bg: bg};
	}
	return Window_Command.prototype.CGMZ_getSelectableCGMZOptions.call(this, index);
};