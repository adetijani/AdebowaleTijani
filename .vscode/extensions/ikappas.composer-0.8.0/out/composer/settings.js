/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComposerSettings = exports.SettingNames = void 0;
const vscode_1 = require("vscode");
const constants_1 = require("../helpers/constants");
class SettingNames {
}
exports.SettingNames = SettingNames;
SettingNames.SettingsPrefix = constants_1.Constants.ExtensionName + '.';
SettingNames.Enabled = SettingNames.SettingsPrefix + 'enabled';
SettingNames.ExecutablePath = SettingNames.SettingsPrefix + 'executablePath';
SettingNames.IgnorePlatformReqs = SettingNames.SettingsPrefix + 'ignorePlatformReqs';
SettingNames.RunInTerminal = SettingNames.SettingsPrefix + 'runInTerminal';
SettingNames.RunQuiet = SettingNames.SettingsPrefix + 'runQuiet';
SettingNames.WorkingPath = SettingNames.SettingsPrefix + 'workingPath';
class ComposerSettings {
    constructor(scope) {
        this.config = vscode_1.workspace.getConfiguration('', scope);
    }
    get enabled() {
        return this.config.get(SettingNames.Enabled, true);
    }
    get executablePath() {
        return this.config.get(SettingNames.ExecutablePath, undefined);
    }
    get ignorePlatformReqs() {
        return this.config.get(SettingNames.IgnorePlatformReqs, false);
    }
    get runInTerminal() {
        return this.config.get(SettingNames.RunInTerminal, true);
    }
    get runQuiet() {
        return this.config.get(SettingNames.RunQuiet, false);
    }
    get workingPath() {
        return this.config.get(SettingNames.WorkingPath, undefined);
    }
}
exports.ComposerSettings = ComposerSettings;
//# sourceMappingURL=settings.js.map