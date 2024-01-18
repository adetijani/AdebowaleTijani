/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strings = void 0;
class Strings {
}
exports.Strings = Strings;
Strings.WorkingDirectory = 'Working Directory: {0}';
Strings.ExecutingCommand = 'Executing: composer {0}';
Strings.InputPackageName = 'Input package name';
Strings.InputPackageNamePlaceHolder = 'namespace/name [version]';
Strings.ComposerArchiveInput = 'Optional. Input options, package name and/or version to archive.';
Strings.ComposerArchivePlaceHolder = '[options] [--] [<package>] [<version>]';
Strings.ComposerDependsInput = 'Input options and package name';
Strings.ComposerDependsPlaceHolder = '[options] [--] <package>';
Strings.ComposerDumpAutoloadInput = 'Optional. Input options to use.';
Strings.ComposerDumpAutoloadPlaceHolder = '[options]';
Strings.ComposerInitInput = 'Optional. Input options to use.';
Strings.ComposerInitPlaceHolder = '[options]';
Strings.ComposerShowInput = 'Optional. Input package name and version';
Strings.ComposerShowPlaceHolder = '[<package>] [<version>]';
Strings.ComposerSuggestsInput = 'Input options and the name(s) of the package(s) that you want to list suggestions from.';
Strings.ComposerSuggestsPlaceHolder = '[options] [--] [<packages>]';
Strings.ComposerProhibitsInput = 'Input options, package name and version';
Strings.ComposerProhibitsPlaceHolder = '[options] [--] <package> <version>';
Strings.ComposerRequireInput = 'Input options and the name(s) of the package(s) to add';
Strings.ComposerRequirePlaceHolder = '[options] [--] [<packages>] ...';
Strings.ComposerRemoveInput = 'Input options and the name(s) of the package(s) to remove';
Strings.ComposerRemovePlaceHolder = '[options] [--] [<packages>] ...';
Strings.ComposerRunScriptInput = '';
Strings.ComposerRunScriptPlaceHolder = '[options] [--] [<script>] [<args>] ...';
Strings.ComposerWhyInput = 'Input options and package name';
Strings.ComposerWhyPlaceHolder = '[options] [--] <package>';
Strings.ComposerWhyNotInput = 'Input options, package name and version';
Strings.ComposerWhyNotPlaceHolder = '[options] [--] <package> <version>';
Strings.CommandKilledSuccessfully = 'Command process killed successfully.';
Strings.CommandCompletedSuccessfully = 'Command completed successfully.';
Strings.CommandCompletedWithErrors = 'Command completed with errors.';
Strings.WorkspaceFolderPick = 'Select workspace folder to run composer command ...';
// Errors
Strings.ComposerExecutablePathRequired = 'Please set composer.executablePath in your user settings in order to to access composer features.';
Strings.ComposerNotFound = 'Composer could not be found in the system.';
Strings.ComposerContextRequired = 'Please open a workspace folder in order to access composer features.';
Strings.ComposerProjectRequired = 'Open a folder with a composer project in order to access composer features.';
Strings.ComposerCommandNotImplemented = 'The composer "{0}" command is not implemented';
const _formatRegexp = /{(\d+)}/g;
String.Empty = '';
String.Space = ' ';
String.format = (value, ...args) => {
    if (args.length === 0) {
        return value;
    }
    return value.replace(_formatRegexp, function (match, group) {
        const idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ?
            match :
            args[idx];
    });
};
//# sourceMappingURL=strings.js.map