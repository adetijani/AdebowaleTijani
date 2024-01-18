/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposerExtension = void 0;
const cp = require("child_process");
const run_in_terminal_1 = require("run-in-terminal");
const commands_1 = require("../helpers/commands");
const context_1 = require("./context");
const settings_1 = require("./settings");
const constants_1 = require("../helpers/constants");
const vscode_1 = require("vscode");
const strings_1 = require("../helpers/strings");
const errors_1 = require("../helpers/errors");
class ComposerExtension extends vscode_1.Disposable {
    constructor() {
        super(() => {
            this.disposables.map((d) => { d.dispose(); });
            this.outputChannel?.dispose();
            this.terminal?.dispose();
        });
        this.terminal = null;
        this.contexts = new Map();
        this.runningProcesses = new Map();
        this.disposables = [];
        this.outputChannel = vscode_1.window.createOutputChannel(constants_1.Constants.OutputChannelName);
        this.initializeExtension();
        // Add an event listener for settings changes, upon which re-initialize the extension
        vscode_1.workspace.onDidChangeConfiguration(() => {
            this.reinitialize();
        });
        // Add an event listener for workspace changes, upon which re-initialize the extension
        vscode_1.workspace.onDidChangeWorkspaceFolders(() => {
            this.reinitialize();
        });
        // Add an event listener for terminal close, upon which to release our terminal
        vscode_1.window.onDidCloseTerminal((closedTerminal) => {
            if (this.terminal === closedTerminal) {
                this.terminal = null;
            }
        });
    }
    // Reinitialize the extension when coming back online
    reinitialize() {
        this.disposables.map((d) => { d.dispose(); });
        this.initializeExtension();
    }
    initializeExtension() {
        this.contexts.clear();
        const globalSettings = new settings_1.ComposerSettings();
        if (globalSettings.enabled && vscode_1.workspace.workspaceFolders) {
            // Process each workspace folder
            for (const folder of vscode_1.workspace.workspaceFolders) {
                const context = new context_1.ComposerContext(folder);
                this.contexts.set(folder.uri, context);
            }
        }
        this.registerCommands();
    }
    /**
     * Initialize Command handlers.
     */
    registerCommands() {
        this.registerCommand(commands_1.CommandNames.About, this.runCommandAbout);
        this.registerCommand(commands_1.CommandNames.Archive, this.runCommandArchive);
        // this.registerCommand(CommandNames.Browse, this.runCommandBrowse);
        this.registerCommand(commands_1.CommandNames.ClearCache, this.runCommandClearCache);
        // this.registerCommand(CommandNames.Config, this.runCommandConfig);
        // this.registerCommand(CommandNames.CreateProject, this.runCommandCreateProject);
        this.registerCommand(commands_1.CommandNames.Depends, this.runCommandDepends);
        this.registerCommand(commands_1.CommandNames.Diagnose, this.runCommandDiagnose);
        this.registerCommand(commands_1.CommandNames.DumpAutoload, this.runCommandDumpAutoload);
        this.registerCommand(commands_1.CommandNames.Fund, this.runCommandFund);
        // this.registerCommand(CommandNames.Help, this.runCommandHelp);
        // this.registerCommand(CommandNames.Home, this.runCommandHome);
        this.registerCommand(commands_1.CommandNames.Init, this.runCommandInit);
        this.registerCommand(commands_1.CommandNames.Install, this.runCommandInstall);
        this.registerCommand(commands_1.CommandNames.Licenses, this.runCommandLicenses);
        this.registerCommand(commands_1.CommandNames.Outdated, this.runCommandOutdated);
        this.registerCommand(commands_1.CommandNames.Prohibits, this.runCommandProhibits);
        this.registerCommand(commands_1.CommandNames.Remove, this.runCommandRemove);
        this.registerCommand(commands_1.CommandNames.Require, this.runCommandRequire);
        this.registerCommand(commands_1.CommandNames.RunScript, this.runCommandRunScript);
        // this.registerCommand(CommandNames.Search, this.runCommandSearch);
        this.registerCommand(commands_1.CommandNames.SelfUpdate, this.runCommandSelfUpdate);
        this.registerCommand(commands_1.CommandNames.Show, this.runCommandShow);
        this.registerCommand(commands_1.CommandNames.Status, this.runCommandStatus);
        this.registerCommand(commands_1.CommandNames.Suggests, this.runCommandSuggests);
        this.registerCommand(commands_1.CommandNames.Update, this.runCommandUpdate);
        this.registerCommand(commands_1.CommandNames.Validate, this.runCommandValidate);
        this.registerCommand(commands_1.CommandNames.Version, this.runCommandVersion);
        this.registerCommand(commands_1.CommandNames.Why, this.runCommandWhy);
        this.registerCommand(commands_1.CommandNames.WhyNot, this.runCommandWhyNot);
    }
    /**
     * Short information about Composer.
     */
    runCommandAbout(context) {
        this.runCommand(['about'], context, false);
    }
    /**
     * Create an archive of this composer package.
     */
    runCommandArchive(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerArchiveInput, placeHolder: strings_1.Strings.ComposerArchivePlaceHolder })
            .then(pkg => {
            if (typeof (pkg) !== 'undefined') {
                const args = (pkg !== String.Empty)
                    ? pkg.split(String.Space)
                    : [];
                this.runCommand(['archive', ...args], context);
            }
        });
    }
    /**
     * Opens the package's repository URL or homepage in your browser.
     */
    runCommandBrowse(_context) {
        // TODO: implement "browse".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'browse')
        });
    }
    /**
     * Clears composer's internal package cache.
     */
    runCommandClearCache(context) {
        this.runCommand(['clear-cache'], context, false);
    }
    /**
     * Set config options.
     */
    runCommandConfig(_context) {
        // TODO: implement "config".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'config')
        });
    }
    /**
     * Create new project from a package into given directory.
     */
    runCommandCreateProject(_context) {
        // TODO: implement "create-project".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'create-project')
        });
    }
    /**
     * Shows which packages cause the given package to be installed.
     */
    runCommandDepends(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerDependsInput, placeHolder: strings_1.Strings.ComposerDependsPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['depends', ...args], context);
            }
        });
    }
    /**
     * Diagnoses the system to identify common errors.
     */
    runCommandDiagnose(context) {
        this.runCommand(['diagnose'], context, false);
    }
    /**
     * Dumps the autoloader.
     */
    runCommandDumpAutoload(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerDumpAutoloadInput, placeHolder: strings_1.Strings.ComposerDumpAutoloadPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined') {
                const args = (options !== String.Empty)
                    ? options.split(String.Space)
                    : [];
                this.runCommand(['dump-autoload', ...args], context);
            }
        });
    }
    /**
     * Discover how to help fund the maintenance of your dependencies.
     */
    runCommandFund(context) {
        this.runCommand(['fund'], context);
    }
    /**
     * Displays help for a command.
     */
    runCommandHelp(_context) {
        // TODO: implement "help".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'help')
        });
    }
    /**
     * Opens the package's repository URL or homepage in your browser.
     */
    runCommandHome(_context) {
        // TODO: implement "home".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'home')
        });
    }
    /**
     * Creates a basic composer.json file in current directory.
     */
    runCommandInit(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerInitInput, placeHolder: strings_1.Strings.ComposerInitPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['init', ...args], context, false);
            }
        });
    }
    /**
     * Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json.
     */
    runCommandInstall(context) {
        this.runCommand(['install'], context);
    }
    /**
     * Shows information about licenses of dependencies.
     */
    runCommandLicenses(context) {
        this.runCommand(['licenses'], context);
    }
    /**
     * Shows a list of installed packages that have updates available, including their current and latest versions.
     */
    runCommandOutdated(context) {
        this.runCommand(['outdated'], context);
    }
    /**
     * Shows which packages prevent the given package from being installed
     */
    runCommandProhibits(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerProhibitsInput, placeHolder: strings_1.Strings.ComposerProhibitsPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['prohibits', ...args], context);
            }
        });
    }
    /**
     * Removes a package from the require or require-dev.
     */
    runCommandRemove(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerRemoveInput, placeHolder: strings_1.Strings.ComposerRemovePlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['remove', ...args], context);
            }
        });
    }
    /**
     * Adds required packages to your composer.json and installs them.
     */
    runCommandRequire(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerRequireInput, placeHolder: strings_1.Strings.ComposerRequirePlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['require', ...args], context);
            }
        });
    }
    /**
     * Run the scripts defined in composer.json.
     */
    runCommandRunScript(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerRunScriptInput, placeHolder: strings_1.Strings.ComposerRunScriptPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['run-script', ...args], context);
            }
        });
    }
    /**
     * Search for packages.
     */
    runCommandSearch(_context) {
        // TODO: Implement "search".
        throw new errors_1.ComposerError({
            message: String.format(strings_1.Strings.ComposerCommandNotImplemented, 'search')
        });
    }
    /**
     * Updates composer.phar to the latest version.
     */
    runCommandSelfUpdate(context) {
        this.runCommand(['self-update'], context, false);
    }
    /**
     * Show information about packages.
     */
    runCommandShow(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerShowInput, placeHolder: strings_1.Strings.ComposerShowPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined') {
                const args = (options !== String.Empty)
                    ? options.split(String.Space)
                    : [];
                this.runCommand(['show', ...args], context);
            }
        });
    }
    /**
     * Show a list of locally modified packages.
     */
    runCommandStatus(context) {
        this.runCommand(['status'], context);
    }
    /**
     * Show package suggestions.
     */
    runCommandSuggests(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerSuggestsInput, placeHolder: strings_1.Strings.ComposerSuggestsPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined') {
                const args = (options !== String.Empty)
                    ? options.split(String.Space)
                    : [];
                this.runCommand(['suggests', ...args], context);
            }
        });
    }
    /**
     * Updates your dependencies to the latest version according to composer.json, and updates the composer.lock file.
     */
    runCommandUpdate(context) {
        this.runCommand(['update'], context);
    }
    /**
     * Validates a composer.json and composer.lock
     */
    runCommandValidate(context) {
        this.runCommand(['validate'], context);
    }
    /**
     * Shows the composer version.
     */
    runCommandVersion(context) {
        this.runCommand(['--version'], context, false);
    }
    /**
     * Shows which packages cause the given package to be installed.
     */
    runCommandWhy(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerWhyInput, placeHolder: strings_1.Strings.ComposerWhyPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['why', ...args], context);
            }
        });
    }
    /**
     * Shows which packages prevent the given package from being installed.
     */
    runCommandWhyNot(context) {
        vscode_1.window.showInputBox({ prompt: strings_1.Strings.ComposerWhyNotInput, placeHolder: strings_1.Strings.ComposerWhyNotPlaceHolder })
            .then(options => {
            if (typeof (options) !== 'undefined' && options !== String.Empty) {
                const args = options.split(String.Space);
                this.runCommand(['why-not', ...args], context);
            }
        });
    }
    /**
     * Registers a command that can be invoked via a keyboard shortcut,
     * a menu item, an action, or directly.
     *
     * Registering a command with an existing command identifier twice
     * will cause an error.
     *
     * @param command A unique identifier for the command.
     * @param callback A command handler function.
     * @param thisArg The `this` context used when invoking the handler function.
     */
    registerCommand(command, callback, thisArg) {
        const contextCallback = this.ensureComposerContext(this.safeExecute(callback));
        this.disposables.push(vscode_1.commands.registerCommand(command, contextCallback, thisArg));
    }
    runCommand(args, context, ensureComposerProject = true) {
        // Ensure that composer executable path is set.
        if (!context.settings.executablePath) {
            throw new errors_1.ComposerError({
                message: strings_1.Strings.ComposerExecutablePathRequired
            });
        }
        // Ensure the command is run against a composer project
        if (ensureComposerProject && !context.isComposerProject()) {
            vscode_1.window.showInformationMessage(strings_1.Strings.ComposerProjectRequired);
            return;
        }
        // Opt-In the command is run quiet mode
        if (context.settings.runQuiet) {
            args.push('--quiet');
        }
        // Opt-In the command ignores platform requirements
        if (context.settings.ignorePlatformReqs && args[0] && ['dump-autoload', 'install', 'outdated', 'remove', 'require', 'show', 'update',].indexOf(args[0]) > -1) {
            args.push('--ignore-platform-reqs');
        }
        vscode_1.workspace.saveAll().then(() => {
            // Opt-In the command is run in a terminal
            if (context.settings.runInTerminal) {
                if (typeof vscode_1.window.createTerminal === 'function') {
                    this.runCommandInIntegratedTerminal(args, context);
                }
                else {
                    this.runCommandInTerminal(args, context);
                }
            }
            else {
                this.outputChannel.clear();
                this.runCommandInOutputWindow(args, context);
            }
        });
    }
    runCommandInOutputWindow(args, context) {
        const commandArgs = Array.from(args);
        // Disable progress on specific commands
        if (commandArgs[0] && ['install', 'update'].indexOf(commandArgs[0]) > -1) {
            commandArgs.unshift('--no-progress');
        }
        // Disable ansi output
        commandArgs.unshift('--no-ansi');
        const commandString = [context.settings.executablePath, ...commandArgs].join(' ');
        const commandProcess = cp.exec(commandString, { cwd: context.workingPath, env: process.env });
        this.runningProcesses.set(commandProcess.pid, { process: commandProcess, command: commandString });
        commandProcess.stderr.on('data', (data) => {
            this.outputChannel.append(data);
        });
        commandProcess.stdout.on('data', (data) => {
            this.outputChannel.append(data);
        });
        commandProcess.on('exit', (code, signal) => {
            this.runningProcesses.delete(commandProcess.pid);
            this.outputChannel.appendLine('');
            let statusMessage;
            if (signal === 'SIGTERM') {
                statusMessage = strings_1.Strings.CommandKilledSuccessfully;
            }
            else {
                statusMessage = code == 0
                    ? strings_1.Strings.CommandCompletedSuccessfully
                    : strings_1.Strings.CommandCompletedWithErrors;
            }
            this.outputChannel.appendLine(statusMessage);
            this.outputChannel.appendLine('');
        });
        this.outputChannel.show();
        this.outputChannel.appendLine(String.format(strings_1.Strings.WorkingDirectory, context.workingPath));
        this.outputChannel.appendLine(String.format(strings_1.Strings.ExecutingCommand, commandArgs.join(' ')));
        this.outputChannel.appendLine('');
    }
    runCommandInTerminal(args, context) {
        (0, run_in_terminal_1.runInTerminal)(context.settings.executablePath, args, { cwd: context.workingPath, env: process.env });
    }
    runCommandInIntegratedTerminal(args, context) {
        if (!this.terminal) {
            this.terminal = vscode_1.window.createTerminal(constants_1.Constants.TerminalName);
        }
        this.terminal.show();
        const commandArgs = Array.from(args);
        commandArgs.unshift(context.settings.executablePath);
        // Ensure the command is run on the working path
        if (context.workingPath) {
            commandArgs.push('--working-dir', context.workingPath);
        }
        this.terminal.sendText(commandArgs.join(' '));
    }
    /**
     * Ensure that the callback will have a composer context.
     * @param callback A composer command handler.
     */
    ensureComposerContext(callback) {
        return (context, ...args) => {
            switch (this.contexts.size) {
                case 0:
                    vscode_1.window.showInformationMessage(strings_1.Strings.ComposerContextRequired);
                    break;
                case 1:
                    context = this.contexts.values().next().value;
                    args.unshift(context);
                    return callback.apply(this, args);
                default:
                    vscode_1.window.showWorkspaceFolderPick({ placeHolder: strings_1.Strings.WorkspaceFolderPick }).then((folder) => {
                        const context = this.contexts.get(folder.uri);
                        if (context) {
                            args.unshift(context);
                            return callback.apply(this, args);
                        }
                    });
            }
        };
    }
    /**
     * Safely execute a composer command handler.
     * @param callback A composer command handler.
     */
    safeExecute(callback) {
        return (context, ...args) => {
            try {
                args.unshift(context);
                return callback.apply(this, args);
            }
            catch (error) {
                vscode_1.window.showErrorMessage(error.message);
            }
        };
    }
}
exports.ComposerExtension = ComposerExtension;
//# sourceMappingURL=extension.js.map