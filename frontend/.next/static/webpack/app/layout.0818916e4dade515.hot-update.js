"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"4563a1a3a3eb\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/MDczYiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIjQ1NjNhMWEzYTNlYlwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/navigation/sidebar/sidebar-list-item.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/navigation/sidebar/sidebar-list-item.tsx ***!
  \*****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ListItem: function() { return /* binding */ ListItem; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _lib_state_managment_useGlobalStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/state-managment/useGlobalStore */ \"(app-pages-browser)/./src/lib/state-managment/useGlobalStore.ts\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ ListItem auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst ListItem = (param)=>{\n    let { config } = param;\n    _s();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.usePathname)();\n    const isSidebarOpen = (0,_lib_state_managment_useGlobalStore__WEBPACK_IMPORTED_MODULE_1__.useGlobalStore)((state)=>state.isSidebarOpen);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        href: config.pathname,\n        className: \"flex gap-2 p-2 pl-3 text-sm rounded whitespace-nowrap  \".concat(pathname === config.pathname ? \"bg-fuchsia-900\" : \"hover:bg-fuchsia-950\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"./assets/icons/navbar/\".concat(config.image),\n                width: 20,\n                height: 20,\n                alt: config.name\n            }, void 0, false, {\n                fileName: \"/Users/fabiangruber/Development/privat-projects/nano-beats/frontend/src/components/navigation/sidebar/sidebar-list-item.tsx\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"transition-all  ease-in-out\",\n                children: isSidebarOpen ? config.name : \"\"\n            }, void 0, false, {\n                fileName: \"/Users/fabiangruber/Development/privat-projects/nano-beats/frontend/src/components/navigation/sidebar/sidebar-list-item.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/fabiangruber/Development/privat-projects/nano-beats/frontend/src/components/navigation/sidebar/sidebar-list-item.tsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ListItem, \"YVGJbfje8XB+TjAMKbzR2XPEOXA=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.usePathname,\n        _lib_state_managment_useGlobalStore__WEBPACK_IMPORTED_MODULE_1__.useGlobalStore\n    ];\n});\n_c = ListItem;\nvar _c;\n$RefreshReg$(_c, \"ListItem\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24vc2lkZWJhci9zaWRlYmFyLWxpc3QtaXRlbS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDc0U7QUFDdkM7QUFDRjtBQUNpQjtBQU12QyxNQUFNSSxXQUFvQztRQUFDLEVBQUVDLE1BQU0sRUFBRTs7SUFDMUQsTUFBTUMsV0FBV0gsNERBQVdBO0lBQzVCLE1BQU1JLGdCQUFnQlAsbUZBQWNBLENBQUMsQ0FBQ1EsUUFBVUEsTUFBTUQsYUFBYTtJQUVuRSxxQkFDRSw4REFBQ0wsaURBQUlBO1FBQ0hPLE1BQU1KLE9BQU9DLFFBQVE7UUFDckJJLFdBQVcsMERBQW1JLE9BQXpFSixhQUFhRCxPQUFPQyxRQUFRLEdBQUcsbUJBQW1COzswQkFFdkgsOERBQUNMLGtEQUFLQTtnQkFDSlUsS0FBSyx5QkFBc0MsT0FBYk4sT0FBT08sS0FBSztnQkFDMUNDLE9BQU87Z0JBQ1BDLFFBQVE7Z0JBQ1JDLEtBQUtWLE9BQU9XLElBQUk7Ozs7OzswQkFFbEIsOERBQUNDO2dCQUFFUCxXQUFVOzBCQUErQkgsZ0JBQWdCRixPQUFPVyxJQUFJLEdBQUc7Ozs7Ozs7Ozs7OztBQUdoRixFQUFFO0dBbEJXWjs7UUFDTUQsd0RBQVdBO1FBQ05ILCtFQUFjQTs7O0tBRnpCSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9uYXZpZ2F0aW9uL3NpZGViYXIvc2lkZWJhci1saXN0LWl0ZW0udHN4PzdjYjUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsgdXNlR2xvYmFsU3RvcmUgfSBmcm9tICdAL2xpYi9zdGF0ZS1tYW5hZ21lbnQvdXNlR2xvYmFsU3RvcmUnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVBhdGhuYW1lIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuaW50ZXJmYWNlIExpc3RJdGVtUHJvcHMge1xuICBjb25maWc6IGFueTtcbn1cblxuZXhwb3J0IGNvbnN0IExpc3RJdGVtOiBSZWFjdC5GQzxMaXN0SXRlbVByb3BzPiA9ICh7IGNvbmZpZyB9KSA9PiB7XG4gIGNvbnN0IHBhdGhuYW1lID0gdXNlUGF0aG5hbWUoKTtcbiAgY29uc3QgaXNTaWRlYmFyT3BlbiA9IHVzZUdsb2JhbFN0b3JlKChzdGF0ZSkgPT4gc3RhdGUuaXNTaWRlYmFyT3Blbik7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlua1xuICAgICAgaHJlZj17Y29uZmlnLnBhdGhuYW1lfVxuICAgICAgY2xhc3NOYW1lPXtgZmxleCBnYXAtMiBwLTIgcGwtMyB0ZXh0LXNtIHJvdW5kZWQgd2hpdGVzcGFjZS1ub3dyYXAgICR7cGF0aG5hbWUgPT09IGNvbmZpZy5wYXRobmFtZSA/ICdiZy1mdWNoc2lhLTkwMCcgOiAnaG92ZXI6YmctZnVjaHNpYS05NTAnfWB9XG4gICAgPlxuICAgICAgPEltYWdlXG4gICAgICAgIHNyYz17YC4vYXNzZXRzL2ljb25zL25hdmJhci8ke2NvbmZpZy5pbWFnZX1gfVxuICAgICAgICB3aWR0aD17MjB9XG4gICAgICAgIGhlaWdodD17MjB9XG4gICAgICAgIGFsdD17Y29uZmlnLm5hbWV9XG4gICAgICAvPlxuICAgICAgPHAgY2xhc3NOYW1lPSd0cmFuc2l0aW9uLWFsbCAgZWFzZS1pbi1vdXQnPntpc1NpZGViYXJPcGVuID8gY29uZmlnLm5hbWUgOiAnJ308L3A+XG4gICAgPC9MaW5rPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJ1c2VHbG9iYWxTdG9yZSIsIkltYWdlIiwiTGluayIsInVzZVBhdGhuYW1lIiwiTGlzdEl0ZW0iLCJjb25maWciLCJwYXRobmFtZSIsImlzU2lkZWJhck9wZW4iLCJzdGF0ZSIsImhyZWYiLCJjbGFzc05hbWUiLCJzcmMiLCJpbWFnZSIsIndpZHRoIiwiaGVpZ2h0IiwiYWx0IiwibmFtZSIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/navigation/sidebar/sidebar-list-item.tsx\n"));

/***/ })

});