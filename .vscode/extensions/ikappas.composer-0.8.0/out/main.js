/*---------------------------------------------------------------------------------------------
 * Copyright (C) Ioannis Kappas. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const extension_1 = require("./composer/extension");
function activate(context) {
    const composer = new extension_1.ComposerExtension();
    context.subscriptions.push(composer);
}
exports.activate = activate;
//# sourceMappingURL=main.js.map