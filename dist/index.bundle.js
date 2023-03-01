"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/subClass.js */ "./src/modules/subClass.js");


const dataCollection = new _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
dataCollection.load();
dataCollection.displayToDoList();
const getInputValue = id => {
  const inputField = document.querySelector(id);
  const inputValue = inputField.value;
  inputField.value = '';
  return inputValue;
};
const enterBtn = document.querySelector('.enterBtn');
enterBtn.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = getInputValue('#inputField');
  dataCollection.setDataInLocal(inputValue);
  dataCollection.displayToDoList();
});
const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      updateItem.push(i);
    }
  });
  const updateList = dataCollection.data.filter((item, i) => !updateItem.includes(i));
  dataCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  dataCollection.displayToDoList();
});
document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

/***/ }),

/***/ "./src/modules/mainClass.js":
/*!**********************************!*\
  !*** ./src/modules/mainClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
class Main {
  constructor(task, index, completed) {
    this.task = task;
    this.index = index;
    this.completed = completed;
  }
}

/***/ }),

/***/ "./src/modules/subClass.js":
/*!*********************************!*\
  !*** ./src/modules/subClass.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataCollection)
/* harmony export */ });
/* harmony import */ var _mainClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainClass.js */ "./src/modules/mainClass.js");

class DataCollection {
  constructor() {
    this.data = [];
  }
  getNextIndex = () => {
    let maxIndex = 0;
    this.data.forEach(toDoList => {
      if (toDoList.index > maxIndex) {
        maxIndex = toDoList.index;
      }
    });
    return maxIndex + 1;
  };
  setDataInLocal = inputValue => {
    const completed = false;
    const index = this.getNextIndex();
    const task = inputValue;
    const info = new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](task, index, completed);
    this.data.push(info);
    this.save();
  };
  displayToDoList = () => {
    let items = '';
    this.data.forEach(toDoList => {
      items += `
       <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr>
      `;
    });
    document.querySelector('.displayListCont').innerHTML = items;
    this.DeleteListeners();
    this.EditListeners();
    this.SaveListeners();
    this.checkBox();
  };
  updateCompletedStatus = (index, completed) => {
    this.data[index].completed = completed;
    localStorage.setItem(`item-${index}-completed`, completed);
    this.save();
  };
  checkBox = () => {
    const checks = document.querySelectorAll('input[type=checkbox]');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    checks.forEach((ck, i) => {
      const isCompleted = this.data[i].completed;
      if (isCompleted) {
        inputs[i].classList.add('completed');
        checks[i].setAttribute('checked', 'checked');
      }
      ck.addEventListener('change', () => {
        if (checks[i].checked) {
          inputs[i].classList.add('completed');
          this.updateCompletedStatus(i, true);
        } else {
          inputs[i].classList.remove('completed');
          this.updateCompletedStatus(i, false);
        }
      });
    });
  };
  EditListeners = () => {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.controller');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    editBtn.forEach((eb, i) => {
      eb.addEventListener('click', () => {
        updateController[i].style.display = 'flex';
        editBtn[i].style.display = 'none';
        inputs[i].disabled = false;
      });
    });
  };

  /* update item when edit */
  updateItem = (task, i) => {
    this.data[i].task = task;
    this.save();
    this.displayToDoList();
  };
  SaveListeners = () => {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    saveBtn.forEach((sb, i) => {
      sb.addEventListener('click', () => {
        this.updateItem(inputs[i].value, i);
      });
    });
  };
  deleteItem = i => {
    this.data = this.data.filter((item, index) => index !== i);
    this.data.forEach((item, index) => {
      item.index = index + 1;
    });
    this.save();
    this.displayToDoList();
  };
  DeleteListeners = () => {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.deleteItem(i);
      });
    });
  };
  save = () => {
    localStorage.setItem('toDoList', JSON.stringify(this.data));
  };
  load = () => {
    const getDataFromLocal = JSON.parse(localStorage.getItem('toDoList')) || [];
    getDataFromLocal.forEach(toDoList => {
      this.data.push(new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](toDoList.task, toDoList.index, toDoList.completed));
    });
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 90vw;\r\n  position: absolute;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 66rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,QAAQ;EACR,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;AAC/B;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,YAAY;EACZ,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,WAAW;EACX,uBAAuB;AACzB;;AAEA;;EAEE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE;IACE,oBAAoB;IACpB,UAAU;EACZ;;EAEA;IACE,yBAAyB;IACzB,WAAW;EACb;AACF","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 90vw;\r\n  position: absolute;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 66rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvbWFpbkNsYXNzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9zdWJDbGFzcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IERhdGFDb2xsZWN0aW9uIGZyb20gJy4vbW9kdWxlcy9zdWJDbGFzcy5qcyc7XG5cbmNvbnN0IGRhdGFDb2xsZWN0aW9uID0gbmV3IERhdGFDb2xsZWN0aW9uKCk7XG5kYXRhQ29sbGVjdGlvbi5sb2FkKCk7XG5kYXRhQ29sbGVjdGlvbi5kaXNwbGF5VG9Eb0xpc3QoKTtcblxuY29uc3QgZ2V0SW5wdXRWYWx1ZSA9IChpZCkgPT4ge1xuICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xuICBpbnB1dEZpZWxkLnZhbHVlID0gJyc7XG4gIHJldHVybiBpbnB1dFZhbHVlO1xufTtcblxuY29uc3QgZW50ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW50ZXJCdG4nKTtcbmVudGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBnZXRJbnB1dFZhbHVlKCcjaW5wdXRGaWVsZCcpO1xuICBkYXRhQ29sbGVjdGlvbi5zZXREYXRhSW5Mb2NhbChpbnB1dFZhbHVlKTtcbiAgZGF0YUNvbGxlY3Rpb24uZGlzcGxheVRvRG9MaXN0KCk7XG59KTtcblxuY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xlYXJDb21wbGV0ZWQnKTtcbmNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBjaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xuICBjb25zdCB1cGRhdGVJdGVtID0gW107XG4gIGNoZWNrcy5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xuICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICB1cGRhdGVJdGVtLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgdXBkYXRlTGlzdCA9IGRhdGFDb2xsZWN0aW9uLmRhdGEuZmlsdGVyKChpdGVtLCBpKSA9PiAhdXBkYXRlSXRlbS5pbmNsdWRlcyhpKSk7XG4gIGRhdGFDb2xsZWN0aW9uLmRhdGEgPSB1cGRhdGVMaXN0O1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9Eb0xpc3QnLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVMaXN0KSk7XG4gIGRhdGFDb2xsZWN0aW9uLmRpc3BsYXlUb0RvTGlzdCgpO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYS1yZWZyZXNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXJlZnJlc2gnKS5jbGFzc0xpc3QuYWRkKCdyZWZyZXNoJyk7XG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xuICBjb25zdHJ1Y3Rvcih0YXNrLCBpbmRleCwgY29tcGxldGVkKSB7XG4gICAgdGhpcy50YXNrID0gdGFzaztcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gIH1cbn0iLCJpbXBvcnQgTWFpbiBmcm9tICcuL21haW5DbGFzcy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFDb2xsZWN0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW107XG4gIH1cblxuICBnZXROZXh0SW5kZXggPSAoKSA9PiB7XG4gICAgbGV0IG1heEluZGV4ID0gMDtcbiAgICB0aGlzLmRhdGEuZm9yRWFjaCgodG9Eb0xpc3QpID0+IHtcbiAgICAgIGlmICh0b0RvTGlzdC5pbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgIG1heEluZGV4ID0gdG9Eb0xpc3QuaW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heEluZGV4ICsgMTtcbiAgfVxuXG4gICAgIHNldERhdGFJbkxvY2FsID0gKGlucHV0VmFsdWUpID0+IHtcbiAgICAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KCk7XG4gICAgICAgY29uc3QgdGFzayA9IGlucHV0VmFsdWU7XG4gICAgICAgY29uc3QgaW5mbyA9IG5ldyBNYWluKHRhc2ssIGluZGV4LCBjb21wbGV0ZWQpO1xuICAgICAgIHRoaXMuZGF0YS5wdXNoKGluZm8pO1xuICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICB9O1xuXG4gICAgICAgZGlzcGxheVRvRG9MaXN0ID0gKCkgPT4ge1xuICAgICAgICAgbGV0IGl0ZW1zID0gJyc7XG4gICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodG9Eb0xpc3QpID0+IHtcbiAgICAgICAgICAgaXRlbXMgKz0gYFxuICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYUNvbnRhaW5lclwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrYm94XCIgbmFtZT1cImNvbXBsZXRlZFwiIC8+XG4gICAgICAgICAgPHRleHRhcmVhIGRpc2FibGVkPiR7dG9Eb0xpc3QudGFza308L3RleHRhcmVhPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZWxsaXBzaXMtdiBlZGl0QnRuXCIgPjwvaT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbGxlclwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2F2ZSBzYXZlQnRuXCI+PC9pPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdHJhc2ggZGVsZXRlQnRuXCI+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICAgPGhyPlxuICAgICAgYDtcbiAgICAgICAgIH0pO1xuICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3BsYXlMaXN0Q29udCcpLmlubmVySFRNTCA9IGl0ZW1zO1xuICAgICAgICAgdGhpcy5EZWxldGVMaXN0ZW5lcnMoKTtcbiAgICAgICAgIHRoaXMuRWRpdExpc3RlbmVycygpO1xuICAgICAgICAgdGhpcy5TYXZlTGlzdGVuZXJzKCk7XG4gICAgICAgICB0aGlzLmNoZWNrQm94KCk7XG4gICAgICAgfTtcblxuIHVwZGF0ZUNvbXBsZXRlZFN0YXR1cyA9IChpbmRleCwgY29tcGxldGVkKSA9PiB7XG4gICB0aGlzLmRhdGFbaW5kZXhdLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGBpdGVtLSR7aW5kZXh9LWNvbXBsZXRlZGAsIGNvbXBsZXRlZCk7XG4gICB0aGlzLnNhdmUoKTtcbiB9XG5cbmNoZWNrQm94ID0gKCkgPT4ge1xuICBjb25zdCBjaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xuICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dGFyZWFDb250YWluZXIgdGV4dGFyZWEnKTtcbiAgY2hlY2tzLmZvckVhY2goKGNrLCBpKSA9PiB7XG4gICAgY29uc3QgaXNDb21wbGV0ZWQgPSB0aGlzLmRhdGFbaV0uY29tcGxldGVkO1xuICAgIGlmIChpc0NvbXBsZXRlZCkge1xuICAgICAgaW5wdXRzW2ldLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgY2hlY2tzW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgfVxuICAgIGNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGlmIChjaGVja3NbaV0uY2hlY2tlZCkge1xuICAgICAgICBpbnB1dHNbaV0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGVkU3RhdHVzKGksIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRlZFN0YXR1cyhpLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4gRWRpdExpc3RlbmVycz0oKSA9PiB7XG4gICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXRCdG4nKTtcbiAgIGNvbnN0IHVwZGF0ZUNvbnRyb2xsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udHJvbGxlcicpO1xuICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhQ29udGFpbmVyIHRleHRhcmVhJyk7XG4gICBlZGl0QnRuLmZvckVhY2goKGViLCBpKSA9PiB7XG4gICAgIGViLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgIHVwZGF0ZUNvbnRyb2xsZXJbaV0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICBlZGl0QnRuW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgaW5wdXRzW2ldLmRpc2FibGVkID0gZmFsc2U7XG4gICAgIH0pO1xuICAgfSk7XG4gfVxuXG4gLyogdXBkYXRlIGl0ZW0gd2hlbiBlZGl0ICovXG4gIHVwZGF0ZUl0ZW0gPSAodGFzaywgaSkgPT4ge1xuICAgIHRoaXMuZGF0YVtpXS50YXNrID0gdGFzaztcbiAgICB0aGlzLnNhdmUoKTtcbiAgICB0aGlzLmRpc3BsYXlUb0RvTGlzdCgpO1xuICB9XG5cbiBTYXZlTGlzdGVuZXJzPSgpID0+IHtcbiAgIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2F2ZUJ0bicpO1xuICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHRhcmVhQ29udGFpbmVyIHRleHRhcmVhJyk7XG4gICBzYXZlQnRuLmZvckVhY2goKHNiLCBpKSA9PiB7XG4gICAgIHNiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgIHRoaXMudXBkYXRlSXRlbShpbnB1dHNbaV0udmFsdWUsIGkpO1xuICAgICB9KTtcbiAgIH0pO1xuIH1cblxuICAgICBkZWxldGVJdGVtID0gKGkpID0+IHtcbiAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKChpdGVtLCBpbmRleCkgPT4gaW5kZXggIT09IGkpO1xuICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICB9KTtcbiAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICB0aGlzLmRpc3BsYXlUb0RvTGlzdCgpO1xuICAgICB9XG5cbiAgICAgRGVsZXRlTGlzdGVuZXJzPSAoKSA9PiB7XG4gICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRlbGV0ZUJ0bicpO1xuICAgICAgIGRlbGV0ZUJ0bi5mb3JFYWNoKChidG4sIGkpID0+IHtcbiAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdGhpcy5kZWxldGVJdGVtKGkpOyB9KTtcbiAgICAgICB9KTtcbiAgICAgfVxuXG4gc2F2ZSA9ICgpID0+IHtcbiAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xuIH1cblxuIGxvYWQgPSAoKSA9PiB7XG4gICBjb25zdCBnZXREYXRhRnJvbUxvY2FsID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9Eb0xpc3QnKSkgfHwgW107XG4gICBnZXREYXRhRnJvbUxvY2FsLmZvckVhY2goKHRvRG9MaXN0KSA9PiB7XG4gICAgIHRoaXMuZGF0YS5wdXNoKG5ldyBNYWluKHRvRG9MaXN0LnRhc2ssIHRvRG9MaXN0LmluZGV4LCB0b0RvTGlzdC5jb21wbGV0ZWQpKTtcbiAgIH0pO1xuIH1cbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTYsIDIxOSwgMjIxLCAwLjE2Nyk7XFxyXFxufVxcclxcblxcclxcbi5tYWluU2VjdGlvbiB7XFxyXFxuICB3aWR0aDogOTB2dztcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGxlZnQ6IDUlO1xcclxcbiAgdG9wOiAxMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gIGJveC1zaGFkb3c6IDFweCAxcHggMzBweCBncmV5O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkZGluZyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDAgMS41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblRpdGxlQ29udGFpbmVyLFxcclxcbi5pbnB1dERpdixcXHJcXG4udGV4dGFyZWFDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxudGV4dGFyZWEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICByZXNpemU6IG5vbmU7XFxyXFxuICBwYWRkaW5nOiAxcHg7XFxyXFxuICBwYWRkaW5nLXRvcDogMjBweDtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJDb21wbGV0ZWQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZW50ZXJCdG4ge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbiNpbnB1dEZpZWxkIHtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIHdpZHRoOiA2NnJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuaHIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDFweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbn1cXHJcXG5cXHJcXG4uZmEsXFxyXFxuLmNoZWNrYm94IHtcXHJcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xsZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcXHJcXG4gIGdhcDogMTVweDtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbXBsZXRlZCB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcXHJcXG4gIGNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVmcmVzaCB7XFxyXFxuICBhbmltYXRpb246IHJvdGF0ZSAwLjFzIGVhc2Utb3V0O1xcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHJvdGF0ZSB7XFxyXFxuICAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcclxcbiAgICBjb2xvcjogcmVkO1xcclxcbiAgfVxcclxcblxcclxcbiAgMTAwJSB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIGNvbG9yOiBhcXVhO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixRQUFRO0VBQ1IsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFlBQVk7RUFDWixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLFlBQVk7RUFDWixjQUFjO0VBQ2QsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLGVBQWU7RUFDZixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtFQUMzQixTQUFTO0VBQ1Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsNkJBQTZCO0VBQzdCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixXQUFXO0VBQ2I7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjE2LCAyMTksIDIyMSwgMC4xNjcpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblNlY3Rpb24ge1xcclxcbiAgd2lkdGg6IDkwdnc7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBsZWZ0OiA1JTtcXHJcXG4gIHRvcDogMTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxuICBib3gtc2hhZG93OiAxcHggMXB4IDMwcHggZ3JleTtcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5UaXRsZUNvbnRhaW5lcixcXHJcXG4uaW5wdXREaXYsXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4O1xcclxcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyQnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogNjZyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkRhdGFDb2xsZWN0aW9uIiwiZGF0YUNvbGxlY3Rpb24iLCJsb2FkIiwiZGlzcGxheVRvRG9MaXN0IiwiZ2V0SW5wdXRWYWx1ZSIsImlkIiwiaW5wdXRGaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0VmFsdWUiLCJ2YWx1ZSIsImVudGVyQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXREYXRhSW5Mb2NhbCIsImNsZWFyQnRuIiwiY2hlY2tzIiwicXVlcnlTZWxlY3RvckFsbCIsInVwZGF0ZUl0ZW0iLCJmb3JFYWNoIiwiY2hlY2tib3giLCJpIiwiY2hlY2tlZCIsInB1c2giLCJ1cGRhdGVMaXN0IiwiZGF0YSIsImZpbHRlciIsIml0ZW0iLCJpbmNsdWRlcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJNYWluIiwiY29uc3RydWN0b3IiLCJ0YXNrIiwiaW5kZXgiLCJjb21wbGV0ZWQiLCJnZXROZXh0SW5kZXgiLCJtYXhJbmRleCIsInRvRG9MaXN0IiwiaW5mbyIsInNhdmUiLCJpdGVtcyIsImlubmVySFRNTCIsIkRlbGV0ZUxpc3RlbmVycyIsIkVkaXRMaXN0ZW5lcnMiLCJTYXZlTGlzdGVuZXJzIiwiY2hlY2tCb3giLCJ1cGRhdGVDb21wbGV0ZWRTdGF0dXMiLCJpbnB1dHMiLCJjayIsImlzQ29tcGxldGVkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlIiwiZWRpdEJ0biIsInVwZGF0ZUNvbnRyb2xsZXIiLCJlYiIsInN0eWxlIiwiZGlzcGxheSIsImRpc2FibGVkIiwic2F2ZUJ0biIsInNiIiwiZGVsZXRlSXRlbSIsImRlbGV0ZUJ0biIsImJ0biIsImdldERhdGFGcm9tTG9jYWwiLCJwYXJzZSIsImdldEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9