"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/class.js */ "./src/modules/class.js");


const data = new _modules_class_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
data.retrieveFromLocal();
data.pushData();
data.displayOnUI();
const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('.checkbox');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      data.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = data.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  /* update data array when any item delete */
  data.data = updateList;
  localStorage.setItem('list', JSON.stringify(updateList));
  data.displayOnUI();
});
document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

/***/ }),

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Data)
/* harmony export */ });
class Data {
  constructor() {
    this.data = [];
  }
  setInLocal = () => {
    localStorage.setItem('list', JSON.stringify(this.data));
  };
  retrieveFromLocal = () => {
    const storedData = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
    this.data = storedData;
  };

  /* display on UI  */

  displayOnUI = () => {
    let items = '';
    this.data.forEach(toDoList => {
      items += ` <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr> `;
    });
    document.querySelector('.displayListCont').innerHTML = items;
    this.editListener();
    this.saveListener();
    this.deleteListener();
    this.checkBox();
  };

  /* generate Index for every toDoList */
  generateIndex = () => this.data.length;

  /* push data from the input field in the data array  */
  pushData = () => {
    const form = document.querySelector('.form');
    const {
      inputField
    } = form.elements;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const task = inputField.value;
      const index = this.generateIndex();
      const completed = false;
      /* create object for every toDoList */
      const info = {
        task,
        index,
        completed
      };
      this.data.push(info);
      /* set data in localStorage */
      this.setInLocal();
      form.reset();
      /* show update data on UI without reloading */
      this.displayOnUI();
    });
  };

  /* for the textarea  editable and show controllers(deleteBtn , saveBtn ) */
  editListener = () => {
    const textareas = document.querySelectorAll('textarea');
    const editBtns = document.querySelectorAll('.editBtn');
    const controllers = document.querySelectorAll('.controller');
    editBtns.forEach((editBtn, i) => {
      editBtn.addEventListener('click', () => {
        controllers[i].style.display = 'flex';
        editBtn.style.display = 'none';
        textareas[i].disabled = false;
      });
    });
  };

  /* for saving the textarea after editing */
  saveListener = () => {
    const textareas = document.querySelectorAll('textarea');
    const saveBtns = document.querySelectorAll('.saveBtn');
    saveBtns.forEach((saveBtn, i) => {
      saveBtn.addEventListener('click', () => {
        /* after editing reassign the selected textarea value/task in data array  */
        this.data[i].task = textareas[i].value;
        this.setInLocal();
        /* update UI and also disappear the controllers when call displayOnUI function */
        this.displayOnUI();
      });
    });
  };

  /* for deleting each item from data array */

  deleteListener = () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((deleteBtn, i) => {
      deleteBtn.addEventListener('click', () => {
        /* After applying the filter method  get a filtered array,
        in which no item remains that we want to delete. Then reassign the data array. */
        const filteredArr = this.data.filter(singleObj => singleObj.index !== i);
        this.data = filteredArr;
        /* after deleting update the index of the each object */
        this.data.forEach((singleObj, i) => {
          singleObj.index = i;
        });
        this.setInLocal();
        this.displayOnUI();
      });
    });
  };
  checkBox = () => {
    const checks = document.querySelectorAll('.checkbox');
    const inputs = document.querySelectorAll('textarea');
    checks.forEach((ck, i) => {
      const isCompleted = this.data[i].completed;
      if (isCompleted) {
        inputs[i].classList.add('completed');
        checks[i].setAttribute('checked', 'checked');
      }
      ck.addEventListener('change', () => {
        if (checks[i].checked) {
          inputs[i].classList.add('completed');
          this.data[i].completed = true;
          // updateCompletedStatus(i, true);
        } else {
          inputs[i].classList.remove('completed');
          this.data[i].completed = false;
          // updateCompletedStatus(i, false);
        }

        this.setInLocal();
      });
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

___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 90vw;\r\n  position: absolute;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.form,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clearCompleted:focus {\r\n  background-color: rgba(0, 255, 255, 0.153);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 66rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,QAAQ;EACR,QAAQ;EACR,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,6BAA6B;AAC/B;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,iBAAiB;EACjB,iBAAiB;EACjB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,YAAY;EACZ,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,WAAW;EACX,WAAW;EACX,uBAAuB;AACzB;;AAEA;;EAEE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE;IACE,oBAAoB;IACpB,UAAU;EACZ;;EAEA;IACE,yBAAyB;IACzB,WAAW;EACb;AACF","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(216, 219, 221, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 90vw;\r\n  position: absolute;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: white;\r\n  box-shadow: 1px 1px 30px grey;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.form,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 100%;\r\n  font-size: 1.2rem;\r\n  margin-left: 1rem;\r\n  background-color: white;\r\n  border: none;\r\n  resize: none;\r\n  padding: 1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clearCompleted:focus {\r\n  background-color: rgba(0, 255, 255, 0.153);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: white;\r\n}\r\n\r\n#inputField {\r\n  padding: 0.5rem;\r\n  width: 66rem;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 100%;\r\n  height: 1px;\r\n  background-color: black;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: red;\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBEYXRhIGZyb20gJy4vbW9kdWxlcy9jbGFzcy5qcyc7XG5cbmNvbnN0IGRhdGEgPSBuZXcgRGF0YSgpO1xuZGF0YS5yZXRyaWV2ZUZyb21Mb2NhbCgpO1xuZGF0YS5wdXNoRGF0YSgpO1xuZGF0YS5kaXNwbGF5T25VSSgpO1xuXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhckNvbXBsZXRlZCcpO1xuY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGNoZWNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xuICBjb25zdCB1cGRhdGVJdGVtID0gW107XG4gIGNoZWNrcy5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xuICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICBkYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaXRlbS5pbmRleCA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICB1cGRhdGVJdGVtLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgdXBkYXRlTGlzdCA9IGRhdGEuZGF0YS5maWx0ZXIoKGl0ZW0sIGkpID0+ICF1cGRhdGVJdGVtLmluY2x1ZGVzKGkpKTtcbiAgdXBkYXRlTGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGl0ZW0uaW5kZXggPSBpbmRleDtcbiAgfSk7XG4gIC8qIHVwZGF0ZSBkYXRhIGFycmF5IHdoZW4gYW55IGl0ZW0gZGVsZXRlICovXG4gIGRhdGEuZGF0YSA9IHVwZGF0ZUxpc3Q7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0JywgSlNPTi5zdHJpbmdpZnkodXBkYXRlTGlzdCkpO1xuICBkYXRhLmRpc3BsYXlPblVJKCk7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhLXJlZnJlc2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtcmVmcmVzaCcpLmNsYXNzTGlzdC5hZGQoJ3JlZnJlc2gnKTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG5cbiAgIHNldEluTG9jYWwgPSAoKSA9PiB7XG4gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0JywgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKSk7XG4gICB9O1xuXG4gcmV0cmlldmVGcm9tTG9jYWwgPSAoKSA9PiB7XG4gICBjb25zdCBzdG9yZWREYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3QnKSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3QnKSkgOiBbXTtcbiAgIHRoaXMuZGF0YSA9IHN0b3JlZERhdGE7XG4gfTtcblxuIC8qIGRpc3BsYXkgb24gVUkgICovXG5cbiBkaXNwbGF5T25VSSA9ICgpID0+IHtcbiAgIGxldCBpdGVtcyA9ICcnO1xuICAgdGhpcy5kYXRhLmZvckVhY2goKHRvRG9MaXN0KSA9PiB7XG4gICAgIGl0ZW1zICs9IGAgPGRpdiBjbGFzcz1cInRleHRhcmVhQ29udGFpbmVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hcIiBuYW1lPVwiY29tcGxldGVkXCIgLz5cbiAgICAgICAgICA8dGV4dGFyZWEgZGlzYWJsZWQ+JHt0b0RvTGlzdC50YXNrfTwvdGV4dGFyZWE+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbGxpcHNpcy12IGVkaXRCdG5cIiA+PC9pPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zYXZlIHNhdmVCdG5cIj48L2k+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10cmFzaCBkZWxldGVCdG5cIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgICA8aHI+IGA7XG4gICB9KTtcbiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5TGlzdENvbnQnKS5pbm5lckhUTUwgPSBpdGVtcztcbiAgIHRoaXMuZWRpdExpc3RlbmVyKCk7XG4gICB0aGlzLnNhdmVMaXN0ZW5lcigpO1xuICAgdGhpcy5kZWxldGVMaXN0ZW5lcigpO1xuICAgdGhpcy5jaGVja0JveCgpO1xuIH07XG5cbiAvKiBnZW5lcmF0ZSBJbmRleCBmb3IgZXZlcnkgdG9Eb0xpc3QgKi9cbiBnZW5lcmF0ZUluZGV4ID0gKCkgPT4gdGhpcy5kYXRhLmxlbmd0aDtcblxuIC8qIHB1c2ggZGF0YSBmcm9tIHRoZSBpbnB1dCBmaWVsZCBpbiB0aGUgZGF0YSBhcnJheSAgKi9cbiBwdXNoRGF0YSA9ICgpID0+IHtcbiAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuICAgY29uc3QgeyBpbnB1dEZpZWxkIH0gPSBmb3JtLmVsZW1lbnRzO1xuICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgIGNvbnN0IHRhc2sgPSBpbnB1dEZpZWxkLnZhbHVlO1xuICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2VuZXJhdGVJbmRleCgpO1xuICAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgLyogY3JlYXRlIG9iamVjdCBmb3IgZXZlcnkgdG9Eb0xpc3QgKi9cbiAgICAgY29uc3QgaW5mbyA9IHsgdGFzaywgaW5kZXgsIGNvbXBsZXRlZCB9O1xuICAgICB0aGlzLmRhdGEucHVzaChpbmZvKTtcbiAgICAgLyogc2V0IGRhdGEgaW4gbG9jYWxTdG9yYWdlICovXG4gICAgIHRoaXMuc2V0SW5Mb2NhbCgpO1xuICAgICBmb3JtLnJlc2V0KCk7XG4gICAgIC8qIHNob3cgdXBkYXRlIGRhdGEgb24gVUkgd2l0aG91dCByZWxvYWRpbmcgKi9cbiAgICAgdGhpcy5kaXNwbGF5T25VSSgpO1xuICAgfSk7XG4gfTtcblxuIC8qIGZvciB0aGUgdGV4dGFyZWEgIGVkaXRhYmxlIGFuZCBzaG93IGNvbnRyb2xsZXJzKGRlbGV0ZUJ0biAsIHNhdmVCdG4gKSAqL1xuIGVkaXRMaXN0ZW5lciA9ICgpID0+IHtcbiAgIGNvbnN0IHRleHRhcmVhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJyk7XG4gICBjb25zdCBlZGl0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0QnRuJyk7XG4gICBjb25zdCBjb250cm9sbGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250cm9sbGVyJyk7XG4gICBlZGl0QnRucy5mb3JFYWNoKChlZGl0QnRuLCBpKSA9PiB7XG4gICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgY29udHJvbGxlcnNbaV0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICBlZGl0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgdGV4dGFyZWFzW2ldLmRpc2FibGVkID0gZmFsc2U7XG4gICAgIH0pO1xuICAgfSk7XG4gfTtcblxuIC8qIGZvciBzYXZpbmcgdGhlIHRleHRhcmVhIGFmdGVyIGVkaXRpbmcgKi9cbiBzYXZlTGlzdGVuZXIgPSAoKSA9PiB7XG4gICBjb25zdCB0ZXh0YXJlYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZXh0YXJlYScpO1xuICAgY29uc3Qgc2F2ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2F2ZUJ0bicpO1xuICAgc2F2ZUJ0bnMuZm9yRWFjaCgoc2F2ZUJ0biwgaSkgPT4ge1xuICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgIC8qIGFmdGVyIGVkaXRpbmcgcmVhc3NpZ24gdGhlIHNlbGVjdGVkIHRleHRhcmVhIHZhbHVlL3Rhc2sgaW4gZGF0YSBhcnJheSAgKi9cbiAgICAgICB0aGlzLmRhdGFbaV0udGFzayA9IHRleHRhcmVhc1tpXS52YWx1ZTtcbiAgICAgICB0aGlzLnNldEluTG9jYWwoKTtcbiAgICAgICAvKiB1cGRhdGUgVUkgYW5kIGFsc28gZGlzYXBwZWFyIHRoZSBjb250cm9sbGVycyB3aGVuIGNhbGwgZGlzcGxheU9uVUkgZnVuY3Rpb24gKi9cbiAgICAgICB0aGlzLmRpc3BsYXlPblVJKCk7XG4gICAgIH0pO1xuICAgfSk7XG4gfTtcblxuIC8qIGZvciBkZWxldGluZyBlYWNoIGl0ZW0gZnJvbSBkYXRhIGFycmF5ICovXG5cbiBkZWxldGVMaXN0ZW5lciA9ICgpID0+IHtcbiAgIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlQnRuJyk7XG4gICBkZWxldGVCdG5zLmZvckVhY2goKGRlbGV0ZUJ0biwgaSkgPT4ge1xuICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgLyogQWZ0ZXIgYXBwbHlpbmcgdGhlIGZpbHRlciBtZXRob2QgIGdldCBhIGZpbHRlcmVkIGFycmF5LFxuICAgIGluIHdoaWNoIG5vIGl0ZW0gcmVtYWlucyB0aGF0IHdlIHdhbnQgdG8gZGVsZXRlLiBUaGVuIHJlYXNzaWduIHRoZSBkYXRhIGFycmF5LiAqL1xuICAgICAgIGNvbnN0IGZpbHRlcmVkQXJyID0gdGhpcy5kYXRhLmZpbHRlcigoc2luZ2xlT2JqKSA9PiBzaW5nbGVPYmouaW5kZXggIT09IGkpO1xuICAgICAgIHRoaXMuZGF0YSA9IGZpbHRlcmVkQXJyO1xuICAgICAgIC8qIGFmdGVyIGRlbGV0aW5nIHVwZGF0ZSB0aGUgaW5kZXggb2YgdGhlIGVhY2ggb2JqZWN0ICovXG4gICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHNpbmdsZU9iaiwgaSkgPT4ge1xuICAgICAgICAgc2luZ2xlT2JqLmluZGV4ID0gaTtcbiAgICAgICB9KTtcbiAgICAgICB0aGlzLnNldEluTG9jYWwoKTtcbiAgICAgICB0aGlzLmRpc3BsYXlPblVJKCk7XG4gICAgIH0pO1xuICAgfSk7XG4gfTtcblxuIGNoZWNrQm94ID0gKCkgPT4ge1xuICAgY29uc3QgY2hlY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94Jyk7XG4gICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZXh0YXJlYScpO1xuICAgY2hlY2tzLmZvckVhY2goKGNrLCBpKSA9PiB7XG4gICAgIGNvbnN0IGlzQ29tcGxldGVkID0gdGhpcy5kYXRhW2ldLmNvbXBsZXRlZDtcbiAgICAgaWYgKGlzQ29tcGxldGVkKSB7XG4gICAgICAgaW5wdXRzW2ldLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgIGNoZWNrc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICB9XG4gICAgIGNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICBpZiAoY2hlY2tzW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgIGlucHV0c1tpXS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgIHRoaXMuZGF0YVtpXS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgLy8gdXBkYXRlQ29tcGxldGVkU3RhdHVzKGksIHRydWUpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBpbnB1dHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XG4gICAgICAgICB0aGlzLmRhdGFbaV0uY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAvLyB1cGRhdGVDb21wbGV0ZWRTdGF0dXMoaSwgZmFsc2UpO1xuICAgICAgIH1cbiAgICAgICB0aGlzLnNldEluTG9jYWwoKTtcbiAgICAgfSk7XG4gICB9KTtcbiB9O1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxNiwgMjE5LCAyMjEsIDAuMTY3KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5TZWN0aW9uIHtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogNSU7XFxyXFxuICB0b3A6IDEwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMCAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5tYWluVGl0bGVDb250YWluZXIsXFxyXFxuLmZvcm0sXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4O1xcclxcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkOmZvY3VzIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjU1LCAyNTUsIDAuMTUzKTtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyQnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogNjZyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsUUFBUTtFQUNSLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2Qiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBOzs7RUFHRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixZQUFZO0VBQ1osWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWixZQUFZO0VBQ1osY0FBYztFQUNkLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLHVCQUF1QjtBQUN6Qjs7QUFFQTs7RUFFRSxlQUFlO0VBQ2YsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IsU0FBUztFQUNULGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixXQUFXO0FBQ2I7O0FBRUE7RUFDRSwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRTtJQUNFLG9CQUFvQjtJQUNwQixVQUFVO0VBQ1o7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIsV0FBVztFQUNiO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxNiwgMjE5LCAyMjEsIDAuMTY3KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5TZWN0aW9uIHtcXHJcXG4gIHdpZHRoOiA5MHZ3O1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogNSU7XFxyXFxuICB0b3A6IDEwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgcGFkZGluZzogMCAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5tYWluVGl0bGVDb250YWluZXIsXFxyXFxuLmZvcm0sXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZm9udC1zaXplOiAxLjJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzogMXB4O1xcclxcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmNsZWFyQ29tcGxldGVkOmZvY3VzIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjU1LCAyNTUsIDAuMTUzKTtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyQnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jaW5wdXRGaWVsZCB7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICB3aWR0aDogNjZyZW07XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJlZDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkRhdGEiLCJkYXRhIiwicmV0cmlldmVGcm9tTG9jYWwiLCJwdXNoRGF0YSIsImRpc3BsYXlPblVJIiwiY2xlYXJCdG4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tzIiwicXVlcnlTZWxlY3RvckFsbCIsInVwZGF0ZUl0ZW0iLCJmb3JFYWNoIiwiY2hlY2tib3giLCJpIiwiY2hlY2tlZCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJ1cGRhdGVMaXN0IiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uc3RydWN0b3IiLCJzZXRJbkxvY2FsIiwic3RvcmVkRGF0YSIsImdldEl0ZW0iLCJwYXJzZSIsIml0ZW1zIiwidG9Eb0xpc3QiLCJ0YXNrIiwiaW5uZXJIVE1MIiwiZWRpdExpc3RlbmVyIiwic2F2ZUxpc3RlbmVyIiwiZGVsZXRlTGlzdGVuZXIiLCJjaGVja0JveCIsImdlbmVyYXRlSW5kZXgiLCJsZW5ndGgiLCJmb3JtIiwiaW5wdXRGaWVsZCIsImVsZW1lbnRzIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJjb21wbGV0ZWQiLCJpbmZvIiwicmVzZXQiLCJ0ZXh0YXJlYXMiLCJlZGl0QnRucyIsImNvbnRyb2xsZXJzIiwiZWRpdEJ0biIsInN0eWxlIiwiZGlzcGxheSIsImRpc2FibGVkIiwic2F2ZUJ0bnMiLCJzYXZlQnRuIiwiZGVsZXRlQnRucyIsImRlbGV0ZUJ0biIsImZpbHRlcmVkQXJyIiwic2luZ2xlT2JqIiwiaW5wdXRzIiwiY2siLCJpc0NvbXBsZXRlZCIsInNldEF0dHJpYnV0ZSIsInJlbW92ZSJdLCJzb3VyY2VSb290IjoiIn0=


