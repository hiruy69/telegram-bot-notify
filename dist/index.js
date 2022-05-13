/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 927:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 788:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__nccwpck_require__.r(__webpack_exports__);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(927);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(788);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);



async function run() {
  try {
    const repository = process.env.GITHUB_REPOSITORY
    const workflow = process.env.GITHUB_WORKFLOW
    const runId = process.env.GITHUB_RUN_ID
    const runNumber = process.env.GITHUB_RUN_NUMBER
    const commit = process.env.GITHUB_SHA
    let ref = process.env.GITHUB_REF

    const jobStatus = process.env.INPUT_JOB_STATUS

    const botToken = process.env.INPUT_BOT_TOKEN
    const chatId = process.env.INPUT_CHAT_ID

    let statusMessage = 'Undefined ❎'

    switch (jobStatus) {
      case 'success':
        statusMessage = 'Success ✅'
        break
      case 'failure':
        statusMessage = 'Failure 🚫'
        break
      case 'cancelled':
        statusMessage = 'Cancelled ❌'
        break
    }

    let tag

    if (ref?.startsWith('refs/tags/')) {
      tag = ref.replace('refs/tags/', '')
      ref = `\nTag: ${tag}`
    } else if (ref?.startsWith('refs/heads/')) {
      ref = `\nBranch: ${ref.replace('refs/heads/', '')}`
    } else {
      ref = ''
    }

    const checkURL = `https://github.com/${repository}/commit/${commit}/checks`

    await axios__WEBPACK_IMPORTED_MODULE_1___default().get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      params: {
        chat_id: chatId,
        text: `*GitHub Actions Workflow*\nStatus: ${statusMessage}\nRepository: https://github.com/${repository}` +
          `${ref}\nWorkflow: ${workflow} - ${runId} (${runNumber})\nChecks: ${checkURL}`,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      },
    })

    if (jobStatus !== 'success' || !tag) {
      return
    }

  } catch (error) {
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(error)
  }
}

run()
})();

module.exports = __webpack_exports__;
/******/ })()
;