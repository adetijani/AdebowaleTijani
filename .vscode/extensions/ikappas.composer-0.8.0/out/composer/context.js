/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposerContext = void 0;
const fs = require("fs");
const path = require("path");
const vscode_1 = require("vscode");
const settings_1 = require("./settings");
class ComposerContext {
    /**
     * Class Constructor.
     * @param folder The target workspace folder.
     */
    constructor(folder) {
        this._onDidChangeSettings = new vscode_1.EventEmitter();
        this.folder = folder;
    }
    /**
     * Get the workspace folder associated with this context.
     */
    get folder() {
        return this._folder;
    }
    /**
     * Set the workspace folder associated with this context.
     */
    set folder(folder) {
        this._folder = folder;
    }
    /**
     * Get the composer settings associated with this context.
     */
    get settings() {
        if (!this._settings) {
            this.settings = new settings_1.ComposerSettings(this.folder.uri);
        }
        return this._settings;
    }
    /**
     * Set the composer settings associated with this context.
     * @access private
     */
    set settings(settings) {
        this._settings = settings;
        this._onDidChangeSettings.fire({ settings: settings });
    }
    /**
     * An event that is emitted when a composer settings object is set.
     */
    get onDidChangeSettings() {
        return this._onDidChangeSettings.event;
    }
    /**
     * Get the composer working path.
     */
    get workingPath() {
        let workingPath = this.folder.uri.fsPath;
        // Process settings.
        const settingsPath = this.settings.workingPath;
        if (settingsPath !== null && settingsPath !== undefined) {
            if (path.isAbsolute(settingsPath)) {
                workingPath = settingsPath;
            }
            else {
                workingPath = path.join(workingPath, settingsPath);
            }
        }
        return workingPath;
    }
    /**
     * Get the composer.json path.
     */
    get composerJsonPath() {
        try {
            const composerJsonPath = fs.realpathSync(path.join(this.workingPath, 'composer.json'));
            fs.accessSync(composerJsonPath);
            return composerJsonPath;
        }
        catch {
            return null;
        }
    }
    /**
     * Determine whether we have a composer project.
     */
    isComposerProject() {
        try {
            return this.composerJsonPath !== null;
        }
        catch {
            return false;
        }
    }
}
exports.ComposerContext = ComposerContext;
//# sourceMappingURL=context.js.map