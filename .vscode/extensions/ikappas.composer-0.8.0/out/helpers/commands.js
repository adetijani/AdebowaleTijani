/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandNames = void 0;
const constants_1 = require("./constants");
class CommandNames {
}
exports.CommandNames = CommandNames;
CommandNames.CommandPrefix = constants_1.Constants.ExtensionName + '.';
CommandNames.About = CommandNames.CommandPrefix + 'About';
CommandNames.Archive = CommandNames.CommandPrefix + 'Archive';
CommandNames.ClearCache = CommandNames.CommandPrefix + 'ClearCache';
CommandNames.Depends = CommandNames.CommandPrefix + 'Depends';
CommandNames.Diagnose = CommandNames.CommandPrefix + 'Diagnose';
CommandNames.DumpAutoload = CommandNames.CommandPrefix + 'DumpAutoload';
CommandNames.Fund = CommandNames.CommandPrefix + 'Fund';
CommandNames.Init = CommandNames.CommandPrefix + 'Init';
CommandNames.Install = CommandNames.CommandPrefix + 'Install';
CommandNames.Licenses = CommandNames.CommandPrefix + 'Licenses';
CommandNames.Outdated = CommandNames.CommandPrefix + 'Outdated';
CommandNames.Prohibits = CommandNames.CommandPrefix + 'Prohibits';
CommandNames.Remove = CommandNames.CommandPrefix + 'Remove';
CommandNames.RemovePackage = CommandNames.CommandPrefix + 'RemovePackage';
CommandNames.Require = CommandNames.CommandPrefix + 'Require';
CommandNames.RunScript = CommandNames.CommandPrefix + 'RunScript';
CommandNames.SelfUpdate = CommandNames.CommandPrefix + 'SelfUpdate';
CommandNames.Show = CommandNames.CommandPrefix + 'Show';
CommandNames.Status = CommandNames.CommandPrefix + 'Status';
CommandNames.Suggests = CommandNames.CommandPrefix + 'Suggests';
CommandNames.Update = CommandNames.CommandPrefix + 'Update';
CommandNames.Validate = CommandNames.CommandPrefix + 'Validate';
CommandNames.Version = CommandNames.CommandPrefix + 'Version';
CommandNames.Why = CommandNames.CommandPrefix + 'Why';
CommandNames.WhyNot = CommandNames.CommandPrefix + 'WhyNot';
//# sourceMappingURL=commands.js.map