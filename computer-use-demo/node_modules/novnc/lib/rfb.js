"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _int = require("./util/int.js");
var Log = _interopRequireWildcard(require("./util/logging.js"));
var _strings = require("./util/strings.js");
var _browser = require("./util/browser.js");
var _element = require("./util/element.js");
var _events = require("./util/events.js");
var _eventtarget = _interopRequireDefault(require("./util/eventtarget.js"));
var _display = _interopRequireDefault(require("./display.js"));
var _inflator = _interopRequireDefault(require("./inflator.js"));
var _deflator = _interopRequireDefault(require("./deflator.js"));
var _keyboard = _interopRequireDefault(require("./input/keyboard.js"));
var _gesturehandler = _interopRequireDefault(require("./input/gesturehandler.js"));
var _cursor = _interopRequireDefault(require("./util/cursor.js"));
var _websock = _interopRequireDefault(require("./websock.js"));
var _des = _interopRequireDefault(require("./des.js"));
var _keysym = _interopRequireDefault(require("./input/keysym.js"));
var _xtscancodes = _interopRequireDefault(require("./input/xtscancodes.js"));
var _encodings = require("./encodings.js");
var _mousebuttonmapper = require("./mousebuttonmapper.js");
var _raw = _interopRequireDefault(require("./decoders/raw.js"));
var _copyrect = _interopRequireDefault(require("./decoders/copyrect.js"));
var _rre = _interopRequireDefault(require("./decoders/rre.js"));
var _hextile = _interopRequireDefault(require("./decoders/hextile.js"));
var _tight = _interopRequireDefault(require("./decoders/tight.js"));
var _tightpng = _interopRequireDefault(require("./decoders/tightpng.js"));
var _udp = _interopRequireDefault(require("./decoders/udp.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
// How many seconds to wait for a disconnect to finish
var DISCONNECT_TIMEOUT = 3;
var DEFAULT_BACKGROUND = 'rgb(40, 40, 40)';
var _videoQuality = 2;
var _enableWebP = false;
var _enableQOI = false;

// Minimum wait (ms) between two mouse moves
var MOUSE_MOVE_DELAY = 17;

// Wheel thresholds
var WHEEL_LINE_HEIGHT = 19; // Pixels for one line step (on Windows)

// Gesture thresholds
var GESTURE_ZOOMSENS = 75;
var GESTURE_SCRLSENS = 50;
var DOUBLE_TAP_TIMEOUT = 1000;
var DOUBLE_TAP_THRESHOLD = 50;

// Extended clipboard pseudo-encoding formats
var extendedClipboardFormatText = 1;
/*eslint-disable no-unused-vars */
var extendedClipboardFormatRtf = 1 << 1;
var extendedClipboardFormatHtml = 1 << 2;
var extendedClipboardFormatDib = 1 << 3;
var extendedClipboardFormatFiles = 1 << 4;
/*eslint-enable */

// Extended clipboard pseudo-encoding actions
var extendedClipboardActionCaps = 1 << 24;
var extendedClipboardActionRequest = 1 << 25;
var extendedClipboardActionPeek = 1 << 26;
var extendedClipboardActionNotify = 1 << 27;
var extendedClipboardActionProvide = 1 << 28;
var RFB = /*#__PURE__*/function (_EventTargetMixin) {
  _inherits(RFB, _EventTargetMixin);
  var _super = _createSuper(RFB);
  function RFB(target, touchInput, urlOrChannel, options) {
    var _this;
    _classCallCheck(this, RFB);
    if (!target) {
      throw new Error("Must specify target");
    }
    if (!urlOrChannel) {
      throw new Error("Must specify URL, WebSocket or RTCDataChannel");
    }
    _this = _super.call(this);
    _this._target = target;
    if (typeof urlOrChannel === "string") {
      _this._url = urlOrChannel;
    } else {
      _this._url = null;
      _this._rawChannel = urlOrChannel;
    }

    // Connection details
    options = options || {};
    _this._rfbCredentials = options.credentials || {};
    _this._shared = 'shared' in options ? !!options.shared : true;
    _this._repeaterID = options.repeaterID || '';
    _this._wsProtocols = options.wsProtocols || ['binary'];

    // Internal state
    _this._rfbConnectionState = '';
    _this._rfbInitState = '';
    _this._rfbAuthScheme = -1;
    _this._rfbCleanDisconnect = true;

    // Server capabilities
    _this._rfbVersion = 0;
    _this._rfbMaxVersion = 3.8;
    _this._rfbTightVNC = false;
    _this._rfbVeNCryptState = 0;
    _this._rfbXvpVer = 0;
    _this._fbWidth = 0;
    _this._fbHeight = 0;
    _this._fbName = "";
    _this._capabilities = {
      power: false
    };
    _this._supportsFence = false;
    _this._supportsContinuousUpdates = false;
    _this._enabledContinuousUpdates = false;
    _this._supportsSetDesktopSize = false;
    _this._screenID = 0;
    _this._screenFlags = 0;
    _this._qemuExtKeyEventSupported = false;

    // kasm defaults
    _this._jpegVideoQuality = 5;
    _this._webpVideoQuality = 5;
    _this._treatLossless = 7;
    _this._preferBandwidth = true;
    _this._dynamicQualityMin = 3;
    _this._dynamicQualityMax = 9;
    _this._videoArea = 65;
    _this._videoTime = 5;
    _this._videoOutTime = 3;
    _this._videoScaling = 2;
    _this._frameRate = 30;
    _this._maxVideoResolutionX = 960;
    _this._maxVideoResolutionY = 540;
    _this._clipboardBinary = true;
    _this._useUdp = true;
    _this._enableQOI = false;
    _this.TransitConnectionStates = {
      Tcp: Symbol("tcp"),
      Udp: Symbol("udp"),
      Upgrading: Symbol("upgrading"),
      Downgrading: Symbol("downgrading"),
      Failure: Symbol("failure")
    };
    _this._transitConnectionState = _this.TransitConnectionStates.Tcp;
    _this._lastTransition = null;
    _this._udpConnectFailures = 0; //Failures in upgrading connection to udp
    _this._udpTransitFailures = 0; //Failures in transit after successful upgrade

    _this._trackFrameStats = false;
    _this._clipboardText = null;
    _this._clipboardServerCapabilitiesActions = {};
    _this._clipboardServerCapabilitiesFormats = {};

    // Internal objects
    _this._sock = null; // Websock object
    _this._display = null; // Display object
    _this._flushing = false; // Display flushing state
    _this._keyboard = null; // Keyboard input handler object
    _this._gestures = null; // Gesture input handler object

    // Timers
    _this._disconnTimer = null; // disconnection timer
    _this._resizeTimeout = null; // resize rate limiting
    _this._mouseMoveTimer = null;

    // Decoder states
    _this._decoders = {};
    _this._FBU = {
      rects: 0,
      // current rect number
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      encoding: null,
      frame_id: 0,
      rect_total: 0 //Total rects in frame
    };

    // Mouse state
    _this._mousePos = {};
    _this._mouseButtonMask = 0;
    _this._mouseLastMoveTime = 0;
    _this._pointerLock = false;
    _this._pointerLockPos = {
      x: 0,
      y: 0
    };
    _this._pointerRelativeEnabled = false;
    _this._mouseLastPinchAndZoomTime = 0;
    _this._viewportDragging = false;
    _this._viewportDragPos = {};
    _this._viewportHasMoved = false;
    _this._accumulatedWheelDeltaX = 0;
    _this._accumulatedWheelDeltaY = 0;
    _this.mouseButtonMapper = null;

    // Gesture state
    _this._gestureLastTapTime = null;
    _this._gestureFirstDoubleTapEv = null;
    _this._gestureLastMagnitudeX = 0;
    _this._gestureLastMagnitudeY = 0;

    // Bound event handlers
    _this._eventHandlers = {
      updateHiddenKeyboard: _this._updateHiddenKeyboard.bind(_assertThisInitialized(_this)),
      focusCanvas: _this._focusCanvas.bind(_assertThisInitialized(_this)),
      windowResize: _this._windowResize.bind(_assertThisInitialized(_this)),
      handleMouse: _this._handleMouse.bind(_assertThisInitialized(_this)),
      handlePointerLockChange: _this._handlePointerLockChange.bind(_assertThisInitialized(_this)),
      handlePointerLockError: _this._handlePointerLockError.bind(_assertThisInitialized(_this)),
      handleWheel: _this._handleWheel.bind(_assertThisInitialized(_this)),
      handleGesture: _this._handleGesture.bind(_assertThisInitialized(_this))
    };

    // main setup
    Log.Debug(">> RFB.constructor");

    // Create DOM elements
    _this._screen = document.createElement('div');
    _this._screen.style.display = 'flex';
    _this._screen.style.width = '100%';
    _this._screen.style.height = '100%';
    _this._screen.style.overflow = 'auto';
    _this._screen.style.background = DEFAULT_BACKGROUND;
    _this._canvas = document.createElement('canvas');
    _this._canvas.style.margin = 'auto';
    // Some browsers add an outline on focus
    _this._canvas.style.outline = 'none';
    _this._canvas.width = 0;
    _this._canvas.height = 0;
    _this._canvas.tabIndex = -1;
    _this._canvas.overflow = 'hidden';
    _this._screen.appendChild(_this._canvas);

    // Cursor
    _this._cursor = new _cursor["default"]();

    // XXX: TightVNC 2.8.11 sends no cursor at all until Windows changes
    // it. Result: no cursor at all until a window border or an edit field
    // is hit blindly. But there are also VNC servers that draw the cursor
    // in the framebuffer and don't send the empty local cursor. There is
    // no way to satisfy both sides.
    //
    // The spec is unclear on this "initial cursor" issue. Many other
    // viewers (TigerVNC, RealVNC, Remmina) display an arrow as the
    // initial cursor instead.
    _this._cursorImage = RFB.cursors.none;

    // NB: nothing that needs explicit teardown should be done
    // before this point, since this can throw an exception
    try {
      _this._display = new _display["default"](_this._canvas);
    } catch (exc) {
      Log.Error("Display exception: " + exc);
      throw exc;
    }
    _this._display.onflush = _this._onFlush.bind(_assertThisInitialized(_this));

    // populate decoder array with objects
    _this._decoders[_encodings.encodings.encodingRaw] = new _raw["default"]();
    _this._decoders[_encodings.encodings.encodingCopyRect] = new _copyrect["default"]();
    _this._decoders[_encodings.encodings.encodingRRE] = new _rre["default"]();
    _this._decoders[_encodings.encodings.encodingHextile] = new _hextile["default"]();
    _this._decoders[_encodings.encodings.encodingTight] = new _tight["default"](_this._display);
    _this._decoders[_encodings.encodings.encodingTightPNG] = new _tightpng["default"]();
    _this._decoders[_encodings.encodings.encodingUDP] = new _udp["default"]();
    _this._keyboard = new _keyboard["default"](_this._canvas, touchInput);
    _this._keyboard.onkeyevent = _this._handleKeyEvent.bind(_assertThisInitialized(_this));
    _this._gestures = new _gesturehandler["default"]();
    _this._sock = new _websock["default"]();
    _this._sock.on('message', function () {
      _this._handleMessage();
    });
    _this._sock.on('open', function () {
      if (_this._rfbConnectionState === 'connecting' && _this._rfbInitState === '') {
        _this._rfbInitState = 'ProtocolVersion';
        Log.Debug("Starting VNC handshake");
      } else {
        _this._fail("Unexpected server connection while " + _this._rfbConnectionState);
      }
    });
    _this._sock.on('close', function (e) {
      Log.Debug("WebSocket on-close event");
      var msg = "";
      if (e.code) {
        msg = "(code: " + e.code;
        if (e.reason) {
          msg += ", reason: " + e.reason;
        }
        msg += ")";
      }
      switch (_this._rfbConnectionState) {
        case 'connecting':
          _this._fail("Connection closed " + msg);
          break;
        case 'connected':
          // Handle disconnects that were initiated server-side
          _this._updateConnectionState('disconnecting');
          _this._updateConnectionState('disconnected');
          break;
        case 'disconnecting':
          // Normal disconnection path
          _this._updateConnectionState('disconnected');
          break;
        case 'disconnected':
          _this._fail("Unexpected server disconnect " + "when already disconnected " + msg);
          break;
        default:
          _this._fail("Unexpected server disconnect before connecting " + msg);
          break;
      }
      _this._sock.off('close');
      // Delete reference to raw channel to allow cleanup.
      _this._rawChannel = null;
    });
    _this._sock.on('error', function (e) {
      return Log.Warn("WebSocket on-error event");
    });

    // Slight delay of the actual connection so that the caller has
    // time to set up callbacks
    setTimeout(_this._updateConnectionState.bind(_assertThisInitialized(_this), 'connecting'));
    Log.Debug("<< RFB.constructor");

    // ===== PROPERTIES =====

    _this.dragViewport = false;
    _this.focusOnClick = true;
    _this.lastActiveAt = Date.now();
    _this._viewOnly = false;
    _this._clipViewport = false;
    _this._scaleViewport = false;
    _this._resizeSession = false;
    _this._showDotCursor = false;
    if (options.showDotCursor !== undefined) {
      Log.Warn("Specifying showDotCursor as a RFB constructor argument is deprecated");
      _this._showDotCursor = options.showDotCursor;
    }
    _this._qualityLevel = 6;
    _this._compressionLevel = 2;
    _this._clipHash = 0;
    return _this;
  }

  // ===== PROPERTIES =====
  _createClass(RFB, [{
    key: "pointerLock",
    get: function get() {
      return this._pointerLock;
    },
    set: function set(value) {
      if (!this._pointerLock) {
        if (this._canvas.requestPointerLock) {
          this._canvas.requestPointerLock();
          this._pointerLockChanging = true;
        } else if (this._canvas.mozRequestPointerLock) {
          this._canvas.mozRequestPointerLock();
          this._pointerLockChanging = true;
        }
      } else {
        if (window.document.exitPointerLock) {
          window.document.exitPointerLock();
          this._pointerLockChanging = true;
        } else if (window.document.mozExitPointerLock) {
          window.document.mozExitPointerLock();
          this._pointerLockChanging = true;
        }
      }
    }
  }, {
    key: "pointerRelative",
    get: function get() {
      return this._pointerRelativeEnabled;
    },
    set: function set(value) {
      this._pointerRelativeEnabled = value;
      if (value) {
        var max_w = this._display.scale === 1 ? this._fbWidth : this._fbWidth * this._display.scale;
        var max_h = this._display.scale === 1 ? this._fbHeight : this._fbHeight * this._display.scale;
        this._pointerLockPos.x = Math.floor(max_w / 2);
        this._pointerLockPos.y = Math.floor(max_h / 2);

        // reset the cursor position to center
        this._mousePos = {
          x: this._pointerLockPos.x,
          y: this._pointerLockPos.y
        };
        this._cursor.move(this._pointerLockPos.x, this._pointerLockPos.y);
      }
    }
  }, {
    key: "keyboard",
    get: function get() {
      return this._keyboard;
    }
  }, {
    key: "clipboardBinary",
    get: function get() {
      return this._clipboardMode;
    },
    set: function set(val) {
      this._clipboardMode = val;
    }
  }, {
    key: "videoQuality",
    get: function get() {
      return this._videoQuality;
    },
    set: function set(quality) {
      //if changing to or from a video quality mode that uses a fixed resolution server side
      if (this._videoQuality <= 1 || quality <= 1) {
        this._pendingApplyResolutionChange = true;
      }
      this._videoQuality = quality;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "preferBandwidth",
    get: function get() {
      return this._preferBandwidth;
    },
    set: function set(val) {
      this._preferBandwidth = val;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "viewOnly",
    get: function get() {
      return this._viewOnly;
    },
    set: function set(viewOnly) {
      this._viewOnly = viewOnly;
      if (this._rfbConnectionState === "connecting" || this._rfbConnectionState === "connected") {
        if (viewOnly) {
          this._keyboard.ungrab();
        } else {
          this._keyboard.grab();
        }
      }
    }
  }, {
    key: "capabilities",
    get: function get() {
      return this._capabilities;
    }
  }, {
    key: "touchButton",
    get: function get() {
      return 0;
    },
    set: function set(button) {
      Log.Warn("Using old API!");
    }
  }, {
    key: "clipViewport",
    get: function get() {
      return this._clipViewport;
    },
    set: function set(viewport) {
      this._clipViewport = viewport;
      this._updateClip();
    }
  }, {
    key: "scaleViewport",
    get: function get() {
      return this._scaleViewport;
    },
    set: function set(scale) {
      this._scaleViewport = scale;
      // Scaling trumps clipping, so we may need to adjust
      // clipping when enabling or disabling scaling
      if (scale && this._clipViewport) {
        this._updateClip();
      }
      this._updateScale();
      if (!scale && this._clipViewport) {
        this._updateClip();
      }
    }
  }, {
    key: "resizeSession",
    get: function get() {
      return this._resizeSession;
    },
    set: function set(resize) {
      this._resizeSession = resize;
      if (resize) {
        this._requestRemoteResize();
        this.scaleViewport = true;
      }
    }
  }, {
    key: "showDotCursor",
    get: function get() {
      return this._showDotCursor;
    },
    set: function set(show) {
      this._showDotCursor = show;
      this._refreshCursor();
    }
  }, {
    key: "background",
    get: function get() {
      return this._screen.style.background;
    },
    set: function set(cssValue) {
      this._screen.style.background = cssValue;
    }
  }, {
    key: "enableWebP",
    get: function get() {
      return this._enableWebP;
    },
    set: function set(enabled) {
      if (this._enableWebP === enabled) {
        return;
      }
      this._enableWebP = enabled;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "enableQOI",
    get: function get() {
      return this._enableQOI;
    },
    set: function set(enabled) {
      if (this._enableQOI === enabled) {
        return;
      }
      if (enabled) {
        if (!this._decoders[_encodings.encodings.encodingTight].enableQOI()) {
          //enabling qoi failed
          return;
        }
      }
      this._enableQOI = enabled;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "antiAliasing",
    get: function get() {
      return this._display.antiAliasing;
    },
    set: function set(value) {
      this._display.antiAliasing = value;
    }
  }, {
    key: "jpegVideoQuality",
    get: function get() {
      return this._jpegVideoQuality;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._jpegVideoQuality === qualityLevel) {
        return;
      }
      this._jpegVideoQuality = qualityLevel;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "webpVideoQuality",
    get: function get() {
      return this._webpVideoQuality;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._webpVideoQuality === qualityLevel) {
        return;
      }
      this._webpVideoQuality = qualityLevel;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "treatLossless",
    get: function get() {
      return this._treatLossless;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._treatLossless === qualityLevel) {
        return;
      }
      this._treatLossless = qualityLevel;
    }
  }, {
    key: "dynamicQualityMin",
    get: function get() {
      return this._dynamicQualityMin;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._dynamicQualityMin === qualityLevel) {
        return;
      }
      this._dynamicQualityMin = qualityLevel;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "dynamicQualityMax",
    get: function get() {
      return this._dynamicQualityMax;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._dynamicQualityMax === qualityLevel) {
        return;
      }
      this._dynamicQualityMax = qualityLevel;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "videoArea",
    get: function get() {
      return this._videoArea;
    },
    set: function set(area) {
      if (!Number.isInteger(area) || area < 0 || area > 100) {
        Log.Error("video area must be an integer between 0 and 100");
        return;
      }
      if (this._videoArea === area) {
        return;
      }
      this._videoArea = area;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "videoTime",
    get: function get() {
      return this._videoTime;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 0 || value > 100) {
        Log.Error("video time must be an integer between 0 and 100");
        return;
      }
      if (this._videoTime === value) {
        return;
      }
      this._videoTime = value;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "videoOutTime",
    get: function get() {
      return this._videoOutTime;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 0 || value > 100) {
        Log.Error("video out time must be an integer between 0 and 100");
        return;
      }
      if (this._videoOutTime === value) {
        return;
      }
      this._videoOutTime = value;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "videoScaling",
    get: function get() {
      return this._videoScaling;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 0 || value > 2) {
        Log.Error("video scaling must be an integer between 0 and 2");
        return;
      }
      if (this._videoScaling === value) {
        return;
      }
      this._videoScaling = value;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "frameRate",
    get: function get() {
      return this._frameRate;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 1 || value > 120) {
        Log.Error("frame rate must be an integer between 1 and 120");
        return;
      }
      if (this._frameRate === value) {
        return;
      }
      this._frameRate = value;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "maxVideoResolutionX",
    get: function get() {
      return this._maxVideoResolutionX;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 100) {
        Log.Error("max video resolution must be an integer greater than 100");
        return;
      }
      if (this._maxVideoResolutionX === value) {
        return;
      }
      this._maxVideoResolutionX = value;
      this._pendingApplyVideoRes = true;
    }
  }, {
    key: "maxVideoResolutionY",
    get: function get() {
      return this._maxVideoResolutionY;
    },
    set: function set(value) {
      if (!Number.isInteger(value) || value < 100) {
        Log.Error("max video resolution must be an integer greater than 100");
        return;
      }
      if (this._maxVideoResolutionY === value) {
        return;
      }
      this._maxVideoResolutionY = value;
      this._pendingApplyVideoRes = true;
    }
  }, {
    key: "qualityLevel",
    get: function get() {
      return this._qualityLevel;
    },
    set: function set(qualityLevel) {
      if (!Number.isInteger(qualityLevel) || qualityLevel < 0 || qualityLevel > 9) {
        Log.Error("qualityLevel must be an integer between 0 and 9");
        return;
      }
      if (this._qualityLevel === qualityLevel) {
        return;
      }
      this._qualityLevel = qualityLevel;
      this._pendingApplyEncodingChanges = true;
    }
  }, {
    key: "compressionLevel",
    get: function get() {
      return this._compressionLevel;
    },
    set: function set(compressionLevel) {
      if (!Number.isInteger(compressionLevel) || compressionLevel < 0 || compressionLevel > 9) {
        Log.Error("compressionLevel must be an integer between 0 and 9");
        return;
      }
      if (this._compressionLevel === compressionLevel) {
        return;
      }
      this._compressionLevel = compressionLevel;
      if (this._rfbConnectionState === 'connected') {
        this._sendEncodings();
      }
    }
  }, {
    key: "statsFps",
    get: function get() {
      return this._display.fps;
    }
  }, {
    key: "enableWebRTC",
    get: function get() {
      return this._useUdp;
    },
    set: function set(value) {
      this._useUdp = value;
      if (!value) {
        if (this._rfbConnectionState === 'connected' && this._transitConnectionState !== this.TransitConnectionStates.Tcp) {
          this._sendUdpDowngrade();
        }
      } else {
        if (this._rfbConnectionState === 'connected' && this._transitConnectionState !== this.TransitConnectionStates.Udp) {
          this._sendUdpUpgrade();
        }
      }
    }

    // ===== PUBLIC METHODS =====

    /*
    This function must be called after changing any properties that effect rendering quality
    */
  }, {
    key: "updateConnectionSettings",
    value: function updateConnectionSettings() {
      if (this._rfbConnectionState === 'connected') {
        if (this._pendingApplyVideoRes) {
          RFB.messages.setMaxVideoResolution(this._sock, this._maxVideoResolutionX, this._maxVideoResolutionY);
        }
        if (this._pendingApplyResolutionChange) {
          this._requestRemoteResize();
        }
        if (this._pendingApplyEncodingChanges) {
          this._sendEncodings();
        }
        this._pendingApplyVideoRes = false;
        this._pendingApplyEncodingChanges = false;
        this._pendingApplyResolutionChange = false;
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._updateConnectionState('disconnecting');
      this._sock.off('error');
      this._sock.off('message');
      this._sock.off('open');
    }
  }, {
    key: "sendCredentials",
    value: function sendCredentials(creds) {
      this._rfbCredentials = creds;
      setTimeout(this._initMsg.bind(this), 0);
    }
  }, {
    key: "sendCtrlAltDel",
    value: function sendCtrlAltDel() {
      if (this._rfbConnectionState !== 'connected' || this._viewOnly) {
        return;
      }
      Log.Info("Sending Ctrl-Alt-Del");
      this.sendKey(_keysym["default"].XK_Control_L, "ControlLeft", true);
      this.sendKey(_keysym["default"].XK_Alt_L, "AltLeft", true);
      this.sendKey(_keysym["default"].XK_Delete, "Delete", true);
      this.sendKey(_keysym["default"].XK_Delete, "Delete", false);
      this.sendKey(_keysym["default"].XK_Alt_L, "AltLeft", false);
      this.sendKey(_keysym["default"].XK_Control_L, "ControlLeft", false);
    }
  }, {
    key: "machineShutdown",
    value: function machineShutdown() {
      this._xvpOp(1, 2);
    }
  }, {
    key: "machineReboot",
    value: function machineReboot() {
      this._xvpOp(1, 3);
    }
  }, {
    key: "machineReset",
    value: function machineReset() {
      this._xvpOp(1, 4);
    }

    // Send a key press. If 'down' is not specified then send a down key
    // followed by an up key.
  }, {
    key: "sendKey",
    value: function sendKey(keysym, code, down) {
      if (this._rfbConnectionState !== 'connected' || this._viewOnly) {
        return;
      }
      if (code !== null) {
        this._setLastActive();
      }
      if (down === undefined) {
        this.sendKey(keysym, code, true);
        this.sendKey(keysym, code, false);
        return;
      }
      var scancode = _xtscancodes["default"][code];
      if (this._qemuExtKeyEventSupported && scancode) {
        // 0 is NoSymbol
        keysym = keysym || 0;
        Log.Info("Sending key (" + (down ? "down" : "up") + "): keysym " + keysym + ", scancode " + scancode);
        RFB.messages.QEMUExtendedKeyEvent(this._sock, keysym, down, scancode);
      } else {
        if (!keysym) {
          return;
        }
        Log.Info("Sending keysym (" + (down ? "down" : "up") + "): " + keysym);
        RFB.messages.keyEvent(this._sock, keysym, down ? 1 : 0);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this._keyboard.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this._keyboard.blur();
    }
  }, {
    key: "checkLocalClipboard",
    value: function checkLocalClipboard() {
      var _this2 = this;
      if (this.clipboardUp && this.clipboardSeamless) {
        if (this.clipboardBinary) {
          navigator.clipboard.read().then(function (data) {
            _this2.clipboardPasteDataFrom(data);
          }, function (err) {
            Log.Debug("No data in clipboard: " + err);
          });
        } else {
          if (navigator.clipboard && navigator.clipboard.readText) {
            navigator.clipboard.readText().then(function (text) {
              this.clipboardPasteFrom(text);
            }.bind(this))["catch"](function () {
              return Log.Debug("Failed to read system clipboard");
            });
          }
        }
      }
    }
  }, {
    key: "clipboardPasteFrom",
    value: function clipboardPasteFrom(text) {
      if (this._rfbConnectionState !== 'connected' || this._viewOnly) {
        return;
      }
      if (!(typeof text === 'string' && text.length > 0)) {
        return;
      }
      var data = new TextEncoder().encode(text);
      var h = (0, _int.hashUInt8Array)(data);
      // avoid resending the same data if larger than 64k
      if (h === this._clipHash) {
        Log.Debug('No clipboard changes');
        return;
      } else {
        this._clipHash = h;
      }
      var dataset = [];
      var mimes = ['text/plain'];
      dataset.push(data);
      RFB.messages.sendBinaryClipboard(this._sock, dataset, mimes);
    }
  }, {
    key: "clipboardPasteDataFrom",
    value: function () {
      var _clipboardPasteDataFrom = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(clipdata) {
        var dataset, mimes, h, i, ti, mime, blob, buff, data, _i, _i2;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._rfbConnectionState !== 'connected' || this._viewOnly)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                dataset = [];
                mimes = [];
                h = 0;
                i = 0;
              case 6:
                if (!(i < clipdata.length)) {
                  _context.next = 43;
                  break;
                }
                ti = 0;
              case 8:
                if (!(ti < clipdata[i].types.length)) {
                  _context.next = 40;
                  break;
                }
                mime = clipdata[i].types[ti];
                _context.t0 = mime;
                _context.next = _context.t0 === 'image/png' ? 13 : _context.t0 === 'text/plain' ? 13 : _context.t0 === 'text/html' ? 13 : 36;
                break;
              case 13:
                _context.next = 15;
                return clipdata[i].getType(mime);
              case 15:
                blob = _context.sent;
                if (blob) {
                  _context.next = 18;
                  break;
                }
                return _context.abrupt("continue", 37);
              case 18:
                _context.next = 20;
                return blob.arrayBuffer();
              case 20:
                buff = _context.sent;
                data = new Uint8Array(buff);
                if (h) {
                  _context.next = 30;
                  break;
                }
                h = (0, _int.hashUInt8Array)(data);
                // avoid resending the same data if larger than 64k
                if (!(h === this._clipHash)) {
                  _context.next = 29;
                  break;
                }
                Log.Debug('No clipboard changes');
                return _context.abrupt("return");
              case 29:
                this._clipHash = h;
              case 30:
                if (!mimes.includes(mime)) {
                  _context.next = 32;
                  break;
                }
                return _context.abrupt("continue", 37);
              case 32:
                mimes.push(mime);
                dataset.push(data);
                Log.Debug('Sending mime type: ' + mime);
                return _context.abrupt("break", 37);
              case 36:
                Log.Info('skipping clip send mime type: ' + mime);
              case 37:
                ti++;
                _context.next = 8;
                break;
              case 40:
                i++;
                _context.next = 6;
                break;
              case 43:
                //if png is present and  text/plain is not, remove other variations of images to save bandwidth
                //if png is present with text/plain, then remove png. Word will put in a png of copied text
                if (mimes.includes('image/png') && !mimes.includes('text/plain')) {
                  _i = mimes.indexOf('image/png');
                  mimes = mimes.slice(_i, _i + 1);
                  dataset = dataset.slice(_i, _i + 1);
                } else if (mimes.includes('image/png') && mimes.includes('text/plain')) {
                  _i2 = mimes.indexOf('image/png');
                  mimes.splice(_i2, 1);
                  dataset.splice(_i2, 1);
                }
                if (dataset.length > 0) {
                  RFB.messages.sendBinaryClipboard(this._sock, dataset, mimes);
                }
              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function clipboardPasteDataFrom(_x) {
        return _clipboardPasteDataFrom.apply(this, arguments);
      }
      return clipboardPasteDataFrom;
    }()
  }, {
    key: "requestBottleneckStats",
    value: function requestBottleneckStats() {
      RFB.messages.requestStats(this._sock);
    }

    // ===== PRIVATE METHODS =====
  }, {
    key: "_setLastActive",
    value: function _setLastActive() {
      this.lastActiveAt = Date.now();
    }
  }, {
    key: "_changeTransitConnectionState",
    value: function _changeTransitConnectionState(value) {
      Log.Info("Transit state change from " + this._transitConnectionState.toString() + ' to ' + value.toString());
      this._transitConnectionState = value;
    }
  }, {
    key: "_connect",
    value: function _connect() {
      Log.Debug(">> RFB.connect");
      if (this._url) {
        try {
          Log.Info("connecting to ".concat(this._url));
          this._sock.open(this._url, this._wsProtocols);
          this._setLastActive();
        } catch (e) {
          if (e.name === 'SyntaxError') {
            this._fail("Invalid host or port (" + e + ")");
          } else {
            this._fail("Error when opening socket (" + e + ")");
          }
        }
      } else {
        try {
          Log.Info("attaching ".concat(this._rawChannel, " to Websock"));
          this._sock.attach(this._rawChannel);
        } catch (e) {
          this._fail("Error attaching channel (" + e + ")");
        }
      }

      // Make our elements part of the page
      this._target.appendChild(this._screen);
      this._gestures.attach(this._canvas);
      this._cursor.attach(this._canvas);
      this._refreshCursor();

      // Monitor size changes of the screen
      // FIXME: Use ResizeObserver, or hidden overflow
      window.addEventListener('resize', this._eventHandlers.windowResize);

      // Always grab focus on some kind of click event
      this._canvas.addEventListener("mousedown", this._eventHandlers.focusCanvas);
      this._canvas.addEventListener("touchstart", this._eventHandlers.focusCanvas);

      // In order for the keyboard to not occlude the input being edited
      // we move the hidden input we use for triggering the keyboard to the last click
      // position which should trigger a page being moved down enough
      // to show the input. On Android the whole website gets resized so we don't
      // have to do anything.
      if ((0, _browser.isIOS)()) {
        this._canvas.addEventListener("touchend", this._eventHandlers.updateHiddenKeyboard);
      }

      // Mouse events
      this._canvas.addEventListener('mousedown', this._eventHandlers.handleMouse);
      this._canvas.addEventListener('mouseup', this._eventHandlers.handleMouse);
      this._canvas.addEventListener('mousemove', this._eventHandlers.handleMouse);
      // Prevent middle-click pasting (see handler for why we bind to document)
      this._canvas.addEventListener('click', this._eventHandlers.handleMouse);
      // preventDefault() on mousedown doesn't stop this event for some
      // reason so we have to explicitly block it
      this._canvas.addEventListener('contextmenu', this._eventHandlers.handleMouse);

      // Pointer Lock listeners need to be installed in document instead of the canvas.
      if (document.onpointerlockchange !== undefined) {
        document.addEventListener('pointerlockchange', this._eventHandlers.handlePointerLockChange, false);
        document.addEventListener('pointerlockerror', this._eventHandlers.handlePointerLockError, false);
      } else if (document.onmozpointerlockchange !== undefined) {
        document.addEventListener('mozpointerlockchange', this._eventHandlers.handlePointerLockChange, false);
        document.addEventListener('mozpointerlockerror', this._eventHandlers.handlePointerLockError, false);
      }

      // Wheel events
      this._canvas.addEventListener("wheel", this._eventHandlers.handleWheel);

      // Gesture events
      this._canvas.addEventListener("gesturestart", this._eventHandlers.handleGesture);
      this._canvas.addEventListener("gesturemove", this._eventHandlers.handleGesture);
      this._canvas.addEventListener("gestureend", this._eventHandlers.handleGesture);

      // WebRTC UDP datachannel inits
      {
        this._udpBuffer = new Map();
        this._udpPeer = new RTCPeerConnection({
          iceServers: [{
            urls: ["stun:stun.l.google.com:19302"]
          }]
        });
        var peer = this._udpPeer;
        peer.onicecandidate = function (e) {
          if (e.candidate) Log.Debug("received ice candidate", e.candidate);else Log.Debug("all candidates received");
        };
        peer.ondatachannel = function (e) {
          Log.Debug("peer connection on data channel", e);
        };
        this._udpChannel = peer.createDataChannel("webudp", {
          ordered: false,
          maxRetransmits: 0
        });
        this._udpChannel.binaryType = "arraybuffer";
        this._udpChannel.onerror = function (e) {
          Log.Error("data channel error " + e.message);
          this._udpTransitFailures += 1;
          this._sendUdpDowngrade();
        };
        var sock = this._sock;
        var udpBuffer = this._udpBuffer;
        var me = this;
        this._udpChannel.onmessage = function (e) {
          //Log.Info("got udp msg", e.data);
          var u8 = new Uint8Array(e.data);
          // Got an UDP packet. Do we need reassembly?
          var id = parseInt(u8[0] + (u8[1] << 8) + (u8[2] << 16) + (u8[3] << 24), 10);
          var i = parseInt(u8[4] + (u8[5] << 8) + (u8[6] << 16) + (u8[7] << 24), 10);
          var pieces = parseInt(u8[8] + (u8[9] << 8) + (u8[10] << 16) + (u8[11] << 24), 10);
          var hash = parseInt(u8[12] + (u8[13] << 8) + (u8[14] << 16) + (u8[15] << 24), 10);
          // TODO: check the hash. It's the low 32 bits of XXH64, seed 0
          var frame_id = parseInt(u8[16] + (u8[17] << 8) + (u8[18] << 16) + (u8[19] << 24), 10);
          if (me._transitConnectionState !== me.TransitConnectionStates.Udp) {
            me._display.clear();
            me._changeTransitConnectionState(me.TransitConnectionStates.Udp);
          }
          if (pieces == 1) {
            // Handle it immediately
            me._handleUdpRect(u8.slice(20), frame_id);
          } else {
            // Use buffer
            var now = Date.now();
            if (udpBuffer.has(id)) {
              var item = udpBuffer.get(id);
              item.recieved_pieces += 1;
              item.data[i] = u8.slice(20);
              item.total_bytes += item.data[i].length;
              if (item.total_pieces == item.recieved_pieces) {
                // Message is complete, combile data into a single array
                var finaldata = new Uint8Array(item.total_bytes);
                var z = 0;
                for (var x = 0; x < item.data.length; x++) {
                  finaldata.set(item.data[x], z);
                  z += item.data[x].length;
                }
                udpBuffer["delete"](id);
                me._handleUdpRect(finaldata, frame_id);
              }
            } else {
              var _item = {
                total_pieces: pieces,
                // number of pieces expected
                arrival: now,
                //time first piece was recieved
                recieved_pieces: 1,
                // current number of pieces in data
                total_bytes: 0,
                // total size of all data pieces combined
                data: new Array(pieces)
              };
              _item.data[i] = u8.slice(20);
              _item.total_bytes = _item.data[i].length;
              udpBuffer.set(id, _item);
            }
          }
        };
      }
      if (this._useUdp) {
        setTimeout(function () {
          this._sendUdpUpgrade();
        }.bind(this), 3000);
      }
      Log.Debug("<< RFB.connect");
    }
  }, {
    key: "_disconnect",
    value: function _disconnect() {
      Log.Debug(">> RFB.disconnect");
      this._cursor.detach();
      this._canvas.removeEventListener("gesturestart", this._eventHandlers.handleGesture);
      this._canvas.removeEventListener("gesturemove", this._eventHandlers.handleGesture);
      this._canvas.removeEventListener("gestureend", this._eventHandlers.handleGesture);
      this._canvas.removeEventListener("wheel", this._eventHandlers.handleWheel);
      this._canvas.removeEventListener('mousedown', this._eventHandlers.handleMouse);
      this._canvas.removeEventListener('mouseup', this._eventHandlers.handleMouse);
      this._canvas.removeEventListener('mousemove', this._eventHandlers.handleMouse);
      this._canvas.removeEventListener('click', this._eventHandlers.handleMouse);
      this._canvas.removeEventListener('contextmenu', this._eventHandlers.handleMouse);
      if (document.onpointerlockchange !== undefined) {
        document.removeEventListener('pointerlockchange', this._eventHandlers.handlePointerLockChange);
        document.removeEventListener('pointerlockerror', this._eventHandlers.handlePointerLockError);
      } else if (document.onmozpointerlockchange !== undefined) {
        document.removeEventListener('mozpointerlockchange', this._eventHandlers.handlePointerLockChange);
        document.removeEventListener('mozpointerlockerror', this._eventHandlers.handlePointerLockError);
      }
      this._canvas.removeEventListener("mousedown", this._eventHandlers.focusCanvas);
      this._canvas.removeEventListener("touchstart", this._eventHandlers.focusCanvas);
      window.removeEventListener('resize', this._eventHandlers.windowResize);
      this._keyboard.ungrab();
      this._gestures.detach();
      this._sock.close();
      try {
        this._target.removeChild(this._screen);
      } catch (e) {
        if (e.name === 'NotFoundError') {
          // Some cases where the initial connection fails
          // can disconnect before the _screen is created
        } else {
          throw e;
        }
      }
      this._display.dispose();
      clearTimeout(this._resizeTimeout);
      clearTimeout(this._mouseMoveTimer);
      Log.Debug("<< RFB.disconnect");
    }
  }, {
    key: "_updateHiddenKeyboard",
    value: function _updateHiddenKeyboard(event) {
      // On iOS 15 the navigation bar is at the bottom so we need to account for it
      var y = Math.max(0, event.pageY - 50);
      document.querySelector("#noVNC_keyboardinput").style.top = "".concat(y, "px");
    }
  }, {
    key: "_focusCanvas",
    value: function _focusCanvas(event) {
      // Hack:
      // On most mobile phones it's possible to play audio
      // only if it's triggered by user action. It's also
      // impossible to listen for touch events on child frames (on mobile phones)
      // so we catch those events here but forward the audio unlocking to the parent window
      window.parent.postMessage({
        action: "enable_audio",
        value: null
      }, "*");

      // Re-enable pointerLock if relative cursor is enabled
      // pointerLock must come from user initiated event
      if (!this._pointerLock && this._pointerRelativeEnabled) {
        this.pointerLock = true;
      }
      if (!this.focusOnClick) {
        return;
      }
      this.focus();
    }
  }, {
    key: "_setDesktopName",
    value: function _setDesktopName(name) {
      this._fbName = name;
      this.dispatchEvent(new CustomEvent("desktopname", {
        detail: {
          name: this._fbName
        }
      }));
    }
  }, {
    key: "_windowResize",
    value: function _windowResize(event) {
      var _this3 = this;
      // If the window resized then our screen element might have
      // as well. Update the viewport dimensions.
      window.requestAnimationFrame(function () {
        _this3._updateClip();
        _this3._updateScale();
      });
      if (this._resizeSession) {
        // Request changing the resolution of the remote display to
        // the size of the local browser viewport.

        // In order to not send multiple requests before the browser-resize
        // is finished we wait 0.5 seconds before sending the request.
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(this._requestRemoteResize.bind(this), 500);
      }
    }

    // Update state of clipping in Display object, and make sure the
    // configured viewport matches the current screen size
  }, {
    key: "_updateClip",
    value: function _updateClip() {
      var curClip = this._display.clipViewport;
      var newClip = this._clipViewport;
      if (this._scaleViewport) {
        // Disable viewport clipping if we are scaling
        newClip = false;
      }
      if (curClip !== newClip) {
        this._display.clipViewport = newClip;
      }
      if (newClip) {
        // When clipping is enabled, the screen is limited to
        // the size of the container.
        var size = this._screenSize();
        this._display.viewportChangeSize(size.w, size.h);
        this._fixScrollbars();
      }
    }
  }, {
    key: "_updateScale",
    value: function _updateScale() {
      if (!this._scaleViewport) {
        this._display.scale = 1.0;
      } else {
        var size = this._screenSize(false);
        this._display.autoscale(size.w, size.h, size.scale);
      }
      this._fixScrollbars();
    }

    // Requests a change of remote desktop size. This message is an extension
    // and may only be sent if we have received an ExtendedDesktopSize message
  }, {
    key: "_requestRemoteResize",
    value: function _requestRemoteResize() {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = null;
      if (!this._resizeSession || this._viewOnly || !this._supportsSetDesktopSize) {
        return;
      }
      var size = this._screenSize();
      RFB.messages.setDesktopSize(this._sock, Math.floor(size.w), Math.floor(size.h), this._screenID, this._screenFlags);
      Log.Debug('Requested new desktop size: ' + size.w + 'x' + size.h);
    }

    // Gets the the size of the available screen
  }, {
    key: "_screenSize",
    value: function _screenSize(limited) {
      if (limited === undefined) {
        limited = true;
      }
      var x = this._screen.offsetWidth;
      var y = this._screen.offsetHeight;
      var scale = 0; // 0=auto
      try {
        if (x > 1280 && limited && this.videoQuality == 1) {
          var ratio = y / x;
          Log.Debug(ratio);
          x = 1280;
          y = x * ratio;
        } else if (limited && this.videoQuality == 0) {
          x = 1280;
          y = 720;
        } else if (this._display.antiAliasing === 0 && window.devicePixelRatio > 1 && x < 1000 && x > 0) {
          // small device with high resolution, browser is essentially zooming greater than 200%
          Log.Info('Device Pixel ratio: ' + window.devicePixelRatio + ' Reported Resolution: ' + x + 'x' + y);
          var targetDevicePixelRatio = 1.5;
          if (window.devicePixelRatio > 2) {
            targetDevicePixelRatio = 2;
          }
          var scaledWidth = x * window.devicePixelRatio * (1 / targetDevicePixelRatio);
          var scaleRatio = scaledWidth / x;
          x = x * scaleRatio;
          y = y * scaleRatio;
          scale = 1 / scaleRatio;
          Log.Info('Small device with hDPI screen detected, auto scaling at ' + scaleRatio + ' to ' + x + 'x' + y);
        }
      } catch (err) {
        Log.Debug(err);
      }
      return {
        w: x,
        h: y,
        scale: scale
      };
    }
  }, {
    key: "_fixScrollbars",
    value: function _fixScrollbars() {
      // This is a hack because Chrome screws up the calculation
      // for when scrollbars are needed. So to fix it we temporarily
      // toggle them off and on.
      var orig = this._screen.style.overflow;
      this._screen.style.overflow = 'hidden';
      // Force Chrome to recalculate the layout by asking for
      // an element's dimensions
      this._screen.getBoundingClientRect();
      this._screen.style.overflow = orig;
    }

    /*
     * Connection states:
     *   connecting
     *   connected
     *   disconnecting
     *   disconnected - permanent state
     */
  }, {
    key: "_updateConnectionState",
    value: function _updateConnectionState(state) {
      var _this4 = this;
      var oldstate = this._rfbConnectionState;
      if (state === oldstate) {
        Log.Debug("Already in state '" + state + "', ignoring");
        return;
      }

      // The 'disconnected' state is permanent for each RFB object
      if (oldstate === 'disconnected') {
        Log.Error("Tried changing state of a disconnected RFB object");
        return;
      }

      // Ensure proper transitions before doing anything
      switch (state) {
        case 'connected':
          if (oldstate !== 'connecting') {
            Log.Error("Bad transition to connected state, " + "previous connection state: " + oldstate);
            return;
          }
          break;
        case 'disconnected':
          if (oldstate !== 'disconnecting') {
            Log.Error("Bad transition to disconnected state, " + "previous connection state: " + oldstate);
            return;
          }
          break;
        case 'connecting':
          if (oldstate !== '') {
            Log.Error("Bad transition to connecting state, " + "previous connection state: " + oldstate);
            return;
          }
          break;
        case 'disconnecting':
          if (oldstate !== 'connected' && oldstate !== 'connecting') {
            Log.Error("Bad transition to disconnecting state, " + "previous connection state: " + oldstate);
            return;
          }
          break;
        default:
          Log.Error("Unknown connection state: " + state);
          return;
      }

      // State change actions

      this._rfbConnectionState = state;
      Log.Debug("New state '" + state + "', was '" + oldstate + "'.");
      if (this._disconnTimer && state !== 'disconnecting') {
        Log.Debug("Clearing disconnect timer");
        clearTimeout(this._disconnTimer);
        this._disconnTimer = null;

        // make sure we don't get a double event
        this._sock.off('close');
      }
      switch (state) {
        case 'connecting':
          this._connect();
          break;
        case 'connected':
          this.dispatchEvent(new CustomEvent("connect", {
            detail: {}
          }));
          break;
        case 'disconnecting':
          this._disconnect();
          this._disconnTimer = setTimeout(function () {
            Log.Error("Disconnection timed out.");
            _this4._updateConnectionState('disconnected');
          }, DISCONNECT_TIMEOUT * 1000);
          break;
        case 'disconnected':
          this.dispatchEvent(new CustomEvent("disconnect", {
            detail: {
              clean: this._rfbCleanDisconnect
            }
          }));
          break;
      }
    }

    /* Print errors and disconnect
     *
     * The parameter 'details' is used for information that
     * should be logged but not sent to the user interface.
     */
  }, {
    key: "_fail",
    value: function _fail(details) {
      switch (this._rfbConnectionState) {
        case 'disconnecting':
          Log.Error("Failed when disconnecting: " + details);
          break;
        case 'connected':
          Log.Error("Failed while connected: " + details);
          break;
        case 'connecting':
          Log.Error("Failed when connecting: " + details);
          break;
        default:
          Log.Error("RFB failure: " + details);
          break;
      }
      this._rfbCleanDisconnect = false; //This is sent to the UI

      // Transition to disconnected without waiting for socket to close
      this._updateConnectionState('disconnecting');
      this._updateConnectionState('disconnected');
      return false;
    }
  }, {
    key: "_setCapability",
    value: function _setCapability(cap, val) {
      this._capabilities[cap] = val;
      this.dispatchEvent(new CustomEvent("capabilities", {
        detail: {
          capabilities: this._capabilities
        }
      }));
    }
  }, {
    key: "_handleMessage",
    value: function _handleMessage() {
      if (this._sock.rQlen === 0) {
        Log.Warn("handleMessage called on an empty receive queue");
        return;
      }
      switch (this._rfbConnectionState) {
        case 'disconnected':
          Log.Error("Got data while disconnected");
          break;
        case 'connected':
          while (true) {
            if (this._flushing) {
              break;
            }
            if (!this._normalMsg()) {
              break;
            }
            if (this._sock.rQlen === 0) {
              break;
            }
          }
          break;
        default:
          this._initMsg();
          break;
      }
    }
  }, {
    key: "_handleKeyEvent",
    value: function _handleKeyEvent(keysym, code, down) {
      this.sendKey(keysym, code, down);
    }
  }, {
    key: "_handleMouse",
    value: function _handleMouse(ev) {
      /*
       * We don't check connection status or viewOnly here as the
       * mouse events might be used to control the viewport
       */

      if (ev.type === 'click') {
        /*
         * Note: This is only needed for the 'click' event as it fails
         *       to fire properly for the target element so we have
         *       to listen on the document element instead.
         */
        if (ev.target !== this._canvas) {
          return;
        }
      }

      // FIXME: if we're in view-only and not dragging,
      //        should we stop events?
      ev.stopPropagation();
      ev.preventDefault();
      if (ev.type === 'click' || ev.type === 'contextmenu') {
        return;
      }
      var pos;
      if (this._pointerLock && !this._pointerRelativeEnabled) {
        var max_w = this._display.scale === 1 ? this._fbWidth : this._fbWidth * this._display.scale;
        var max_h = this._display.scale === 1 ? this._fbHeight : this._fbHeight * this._display.scale;
        pos = {
          x: this._mousePos.x + ev.movementX,
          y: this._mousePos.y + ev.movementY
        };
        if (pos.x < 0) {
          pos.x = 0;
        } else if (pos.x > max_w) {
          pos.x = max_w;
        }
        if (pos.y < 0) {
          pos.y = 0;
        } else if (pos.y > max_h) {
          pos.y = max_h;
        }
        this._cursor.move(pos.x, pos.y);
      } else if (this._pointerLock && this._pointerRelativeEnabled) {
        pos = {
          x: this._mousePos.x + ev.movementX,
          y: this._mousePos.y + ev.movementY
        };
      } else {
        pos = (0, _element.clientToElement)(ev.clientX, ev.clientY, this._canvas);
      }
      this._setLastActive();
      var mappedButton = this.mouseButtonMapper.get(ev.button);
      switch (ev.type) {
        case 'mousedown':
          (0, _events.setCapture)(this._canvas);

          // Translate CMD+Click into CTRL+click on MacOs
          if ((0, _browser.isMac)() && ev.metaKey && (this._keyboard._keyDownList["MetaLeft"] || this._keyboard._keyDownList["MetaRight"])) {
            this._keyboard._sendKeyEvent(this._keyboard._keyDownList["MetaLeft"], "MetaLeft", false);
            this._keyboard._sendKeyEvent(this._keyboard._keyDownList["MetaRight"], "MetaRight", false);
            this._keyboard._sendKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", true);
          }
          this.checkLocalClipboard();
          this._handleMouseButton(pos.x, pos.y, true, (0, _mousebuttonmapper.xvncButtonToMask)(mappedButton));
          break;
        case 'mouseup':
          this._handleMouseButton(pos.x, pos.y, false, (0, _mousebuttonmapper.xvncButtonToMask)(mappedButton));
          break;
        case 'mousemove':
          this._handleMouseMove(pos.x, pos.y);
          break;
      }
    }
  }, {
    key: "_handleMouseButton",
    value: function _handleMouseButton(x, y, down, bmask) {
      if (this.dragViewport) {
        if (down && !this._viewportDragging) {
          this._viewportDragging = true;
          this._viewportDragPos = {
            'x': x,
            'y': y
          };
          this._viewportHasMoved = false;

          // Skip sending mouse events
          return;
        } else {
          this._viewportDragging = false;

          // If we actually performed a drag then we are done
          // here and should not send any mouse events
          if (this._viewportHasMoved) {
            return;
          }

          // Otherwise we treat this as a mouse click event.
          // Send the button down event here, as the button up
          // event is sent at the end of this function.
          this._sendMouse(x, y, bmask);
        }
      }

      // Flush waiting move event first
      if (this._mouseMoveTimer !== null) {
        clearTimeout(this._mouseMoveTimer);
        this._mouseMoveTimer = null;
        this._sendMouse(x, y, this._mouseButtonMask);
      }
      if (down) {
        this._mouseButtonMask |= bmask;
      } else {
        this._mouseButtonMask &= ~bmask;
      }
      this._sendMouse(x, y, this._mouseButtonMask);
    }
  }, {
    key: "_handleMouseMove",
    value: function _handleMouseMove(x, y) {
      var _this5 = this;
      if (this._viewportDragging) {
        var deltaX = this._viewportDragPos.x - x;
        var deltaY = this._viewportDragPos.y - y;
        if (this._viewportHasMoved || Math.abs(deltaX) > _browser.dragThreshold || Math.abs(deltaY) > _browser.dragThreshold) {
          this._viewportHasMoved = true;
          this._viewportDragPos = {
            'x': x,
            'y': y
          };
          this._display.viewportChangePos(deltaX, deltaY);
        }

        // Skip sending mouse events
        return;
      }
      this._mousePos = {
        'x': x,
        'y': y
      };

      // Limit many mouse move events to one every MOUSE_MOVE_DELAY ms
      if (this._mouseMoveTimer == null) {
        var timeSinceLastMove = Date.now() - this._mouseLastMoveTime;
        if (timeSinceLastMove > MOUSE_MOVE_DELAY) {
          this._sendMouse(x, y, this._mouseButtonMask);
          this._mouseLastMoveTime = Date.now();
        } else {
          // Too soon since the latest move, wait the remaining time
          this._mouseMoveTimer = setTimeout(function () {
            _this5._handleDelayedMouseMove();
          }, MOUSE_MOVE_DELAY - timeSinceLastMove);
        }
      }
    }
  }, {
    key: "_handleDelayedMouseMove",
    value: function _handleDelayedMouseMove() {
      this._mouseMoveTimer = null;
      this._sendMouse(this._mousePos.x, this._mousePos.y, this._mouseButtonMask);
      this._mouseLastMoveTime = Date.now();
    }
  }, {
    key: "_handlePointerLockChange",
    value: function _handlePointerLockChange(env) {
      if (document.pointerLockElement === this._canvas || document.mozPointerLockElement === this._canvas) {
        this._pointerLock = true;
        this._cursor.setEmulateCursor(true);
      } else {
        this._pointerLock = false;
        this._cursor.setEmulateCursor(false);
      }
      this.dispatchEvent(new CustomEvent("inputlock", {
        detail: {
          pointer: this._pointerLock
        }
      }));
    }
  }, {
    key: "_handlePointerLockError",
    value: function _handlePointerLockError() {
      this._pointerLockChanging = false;
      this.dispatchEvent(new CustomEvent("inputlockerror", {
        detail: {
          pointer: this._pointerLock
        }
      }));
    }
  }, {
    key: "_sendMouse",
    value: function _sendMouse(x, y, mask) {
      if (this._rfbConnectionState !== 'connected') {
        return;
      }
      if (this._viewOnly) {
        return;
      } // View only, skip mouse events

      if (this._pointerLock && this._pointerRelativeEnabled) {
        // Use releative cursor position
        var rel_16_x = (0, _int.toSignedRelative16bit)(x - this._pointerLockPos.x);
        var rel_16_y = (0, _int.toSignedRelative16bit)(y - this._pointerLockPos.y);

        //console.log("new_pos x" + x + ", y" + y);
        //console.log("lock x " + this._pointerLockPos.x + ", y " + this._pointerLockPos.y);
        //console.log("rel x " + rel_16_x + ", y " + rel_16_y);

        RFB.messages.pointerEvent(this._sock, rel_16_x, rel_16_y, mask);

        // reset the cursor position to center
        this._mousePos = {
          x: this._pointerLockPos.x,
          y: this._pointerLockPos.y
        };
        this._cursor.move(this._pointerLockPos.x, this._pointerLockPos.y);
      } else {
        RFB.messages.pointerEvent(this._sock, this._display.absX(x), this._display.absY(y), mask);
      }
    }
  }, {
    key: "_sendScroll",
    value: function _sendScroll(x, y, dX, dY) {
      if (this._rfbConnectionState !== 'connected') {
        return;
      }
      if (this._viewOnly) {
        return;
      } // View only, skip mouse events

      RFB.messages.pointerEvent(this._sock, this._display.absX(x), this._display.absY(y), 0, dX, dY);
    }
  }, {
    key: "_handleWheel",
    value: function _handleWheel(ev) {
      var _this6 = this;
      if (this._rfbConnectionState !== 'connected') {
        return;
      }
      if (this._viewOnly) {
        return;
      } // View only, skip mouse events

      ev.stopPropagation();
      ev.preventDefault();

      // On MacOs we need to translate zooming CMD+wheel to CTRL+wheel
      if ((0, _browser.isMac)() && (this._keyboard._keyDownList["MetaLeft"] || this._keyboard._keyDownList["MetaRight"])) {
        this._keyboard._sendKeyEvent(this._keyboard._keyDownList["MetaLeft"], "MetaLeft", false);
        this._keyboard._sendKeyEvent(this._keyboard._keyDownList["MetaRight"], "MetaRight", false);
        this._keyboard._sendKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", true);
      }

      // In a pinch and zoom gesture we're sending only a wheel event so we need
      // to make sure a CTRL press event is sent alongside it if we want to trigger zooming.
      // Moreover, we don't have a way to know that the gesture has stopped so we
      // need to check manually every now and then and "unpress" the CTRL key when it ends.
      if (ev.ctrlKey && !this._keyboard._keyDownList["ControlLeft"]) {
        this._keyboard._sendKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", true);
        this._watchForPinchAndZoom = this._watchForPinchAndZoom || setInterval(function () {
          var timeSinceLastPinchAndZoom = +new Date() - _this6._mouseLastPinchAndZoomTime;
          if (timeSinceLastPinchAndZoom > 250) {
            clearInterval(_this6._watchForPinchAndZoom);
            _this6._keyboard._sendKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", false);
            _this6._watchForPinchAndZoom = null;
            _this6._mouseLastPinchAndZoomTime = 0;
          }
        }, 10);
      }
      if (this._watchForPinchAndZoom) {
        this._mouseLastPinchAndZoomTime = +new Date();
      }

      // Pixel units unless it's non-zero.
      // Note that if deltamode is line or page won't matter since we aren't
      // sending the mouse wheel delta to the server anyway.
      // The difference between pixel and line can be important however since
      // we have a threshold that can be smaller than the line height.
      var dX = ev.deltaX;
      var dY = ev.deltaY;
      if (ev.deltaMode !== 0) {
        dX *= WHEEL_LINE_HEIGHT;
        dY *= WHEEL_LINE_HEIGHT;
      }
      var pointer = (0, _element.clientToElement)(ev.clientX, ev.clientY, this._canvas);
      this._sendScroll(pointer.x, pointer.y, dX, dY);
    }
  }, {
    key: "_fakeMouseMove",
    value: function _fakeMouseMove(ev, elementX, elementY) {
      this._handleMouseMove(elementX, elementY);
      this._cursor.move(ev.detail.clientX, ev.detail.clientY);
    }
  }, {
    key: "_handleTapEvent",
    value: function _handleTapEvent(ev, bmask) {
      var pos = (0, _element.clientToElement)(ev.detail.clientX, ev.detail.clientY, this._canvas);

      // If the user quickly taps multiple times we assume they meant to
      // hit the same spot, so slightly adjust coordinates

      if (this._gestureLastTapTime !== null && Date.now() - this._gestureLastTapTime < DOUBLE_TAP_TIMEOUT && this._gestureFirstDoubleTapEv.detail.type === ev.detail.type) {
        var dx = this._gestureFirstDoubleTapEv.detail.clientX - ev.detail.clientX;
        var dy = this._gestureFirstDoubleTapEv.detail.clientY - ev.detail.clientY;
        var distance = Math.hypot(dx, dy);
        if (distance < DOUBLE_TAP_THRESHOLD) {
          pos = (0, _element.clientToElement)(this._gestureFirstDoubleTapEv.detail.clientX, this._gestureFirstDoubleTapEv.detail.clientY, this._canvas);
        } else {
          this._gestureFirstDoubleTapEv = ev;
        }
      } else {
        this._gestureFirstDoubleTapEv = ev;
      }
      this._gestureLastTapTime = Date.now();
      this._fakeMouseMove(this._gestureFirstDoubleTapEv, pos.x, pos.y);
      this._handleMouseButton(pos.x, pos.y, true, bmask);
      this._handleMouseButton(pos.x, pos.y, false, bmask);
    }
  }, {
    key: "_handleGesture",
    value: function _handleGesture(ev) {
      var magnitude;
      var pos = (0, _element.clientToElement)(ev.detail.clientX, ev.detail.clientY, this._canvas);
      switch (ev.type) {
        case 'gesturestart':
          switch (ev.detail.type) {
            case 'onetap':
              this._handleTapEvent(ev, 0x1);
              break;
            case 'twotap':
              this._handleTapEvent(ev, 0x4);
              break;
            case 'threetap':
              this._handleTapEvent(ev, 0x2);
              break;
            case 'drag':
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, true, 0x1);
              break;
            case 'longpress':
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, true, 0x4);
              break;
            case 'twodrag':
              this._gestureLastMagnitudeX = ev.detail.magnitudeX;
              this._gestureLastMagnitudeY = ev.detail.magnitudeY;
              this._fakeMouseMove(ev, pos.x, pos.y);
              break;
            case 'pinch':
              this._gestureLastMagnitudeX = Math.hypot(ev.detail.magnitudeX, ev.detail.magnitudeY);
              this._fakeMouseMove(ev, pos.x, pos.y);
              break;
          }
          break;
        case 'gesturemove':
          switch (ev.detail.type) {
            case 'onetap':
            case 'twotap':
            case 'threetap':
              break;
            case 'drag':
            case 'longpress':
              this._fakeMouseMove(ev, pos.x, pos.y);
              break;
            case 'twodrag':
              // Always scroll in the same position.
              // We don't know if the mouse was moved so we need to move it
              // every update.
              this._fakeMouseMove(ev, pos.x, pos.y);
              while (ev.detail.magnitudeY - this._gestureLastMagnitudeY > GESTURE_SCRLSENS) {
                this._handleMouseButton(pos.x, pos.y, true, 0x8);
                this._handleMouseButton(pos.x, pos.y, false, 0x8);
                this._gestureLastMagnitudeY += GESTURE_SCRLSENS;
              }
              while (ev.detail.magnitudeY - this._gestureLastMagnitudeY < -GESTURE_SCRLSENS) {
                this._handleMouseButton(pos.x, pos.y, true, 0x10);
                this._handleMouseButton(pos.x, pos.y, false, 0x10);
                this._gestureLastMagnitudeY -= GESTURE_SCRLSENS;
              }
              while (ev.detail.magnitudeX - this._gestureLastMagnitudeX > GESTURE_SCRLSENS) {
                this._handleMouseButton(pos.x, pos.y, true, 0x20);
                this._handleMouseButton(pos.x, pos.y, false, 0x20);
                this._gestureLastMagnitudeX += GESTURE_SCRLSENS;
              }
              while (ev.detail.magnitudeX - this._gestureLastMagnitudeX < -GESTURE_SCRLSENS) {
                this._handleMouseButton(pos.x, pos.y, true, 0x40);
                this._handleMouseButton(pos.x, pos.y, false, 0x40);
                this._gestureLastMagnitudeX -= GESTURE_SCRLSENS;
              }
              break;
            case 'pinch':
              // Always scroll in the same position.
              // We don't know if the mouse was moved so we need to move it
              // every update.
              this._fakeMouseMove(ev, pos.x, pos.y);
              magnitude = Math.hypot(ev.detail.magnitudeX, ev.detail.magnitudeY);
              if (Math.abs(magnitude - this._gestureLastMagnitudeX) > GESTURE_ZOOMSENS) {
                this._handleKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", true);
                while (magnitude - this._gestureLastMagnitudeX > GESTURE_ZOOMSENS) {
                  this._handleMouseButton(pos.x, pos.y, true, 0x8);
                  this._handleMouseButton(pos.x, pos.y, false, 0x8);
                  this._gestureLastMagnitudeX += GESTURE_ZOOMSENS;
                }
                while (magnitude - this._gestureLastMagnitudeX < -GESTURE_ZOOMSENS) {
                  this._handleMouseButton(pos.x, pos.y, true, 0x10);
                  this._handleMouseButton(pos.x, pos.y, false, 0x10);
                  this._gestureLastMagnitudeX -= GESTURE_ZOOMSENS;
                }
              }
              this._handleKeyEvent(_keysym["default"].XK_Control_L, "ControlLeft", false);
              break;
          }
          break;
        case 'gestureend':
          switch (ev.detail.type) {
            case 'onetap':
            case 'twotap':
            case 'threetap':
            case 'pinch':
            case 'twodrag':
              break;
            case 'drag':
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, false, 0x1);
              break;
            case 'longpress':
              this._fakeMouseMove(ev, pos.x, pos.y);
              this._handleMouseButton(pos.x, pos.y, false, 0x4);
              break;
          }
          break;
      }
    }

    // Message Handlers
  }, {
    key: "_negotiateProtocolVersion",
    value: function _negotiateProtocolVersion() {
      if (this._sock.rQwait("version", 12)) {
        return false;
      }
      var sversion = this._sock.rQshiftStr(12).substr(4, 7);
      Log.Info("Server ProtocolVersion: " + sversion);
      var isRepeater = 0;
      switch (sversion) {
        case "000.000":
          // UltraVNC repeater
          isRepeater = 1;
          break;
        case "003.003":
        case "003.006": // UltraVNC
        case "003.889":
          // Apple Remote Desktop
          this._rfbVersion = 3.3;
          break;
        case "003.007":
          this._rfbVersion = 3.7;
          break;
        case "003.008":
        case "004.000": // Intel AMT KVM
        case "004.001": // RealVNC 4.6
        case "005.000":
          // RealVNC 5.3
          this._rfbVersion = 3.8;
          break;
        default:
          return this._fail("Invalid server version " + sversion);
      }
      if (isRepeater) {
        var repeaterID = "ID:" + this._repeaterID;
        while (repeaterID.length < 250) {
          repeaterID += "\0";
        }
        this._sock.sendString(repeaterID);
        return true;
      }
      if (this._rfbVersion > this._rfbMaxVersion) {
        this._rfbVersion = this._rfbMaxVersion;
      }
      var cversion = "00" + parseInt(this._rfbVersion, 10) + ".00" + this._rfbVersion * 10 % 10;
      this._sock.sendString("RFB " + cversion + "\n");
      Log.Debug('Sent ProtocolVersion: ' + cversion);
      this._rfbInitState = 'Security';
    }
  }, {
    key: "_negotiateSecurity",
    value: function _negotiateSecurity() {
      if (this._rfbVersion >= 3.7) {
        // Server sends supported list, client decides
        var numTypes = this._sock.rQshift8();
        if (this._sock.rQwait("security type", numTypes, 1)) {
          return false;
        }
        if (numTypes === 0) {
          this._rfbInitState = "SecurityReason";
          this._securityContext = "no security types";
          this._securityStatus = 1;
          return this._initMsg();
        }
        var types = this._sock.rQshiftBytes(numTypes);
        Log.Debug("Server security types: " + types);

        // Look for each auth in preferred order
        if (types.includes(1)) {
          this._rfbAuthScheme = 1; // None
        } else if (types.includes(22)) {
          this._rfbAuthScheme = 22; // XVP
        } else if (types.includes(16)) {
          this._rfbAuthScheme = 16; // Tight
        } else if (types.includes(2)) {
          this._rfbAuthScheme = 2; // VNC Auth
        } else if (types.includes(19)) {
          this._rfbAuthScheme = 19; // VeNCrypt Auth
        } else {
          return this._fail("Unsupported security types (types: " + types + ")");
        }
        this._sock.send([this._rfbAuthScheme]);
      } else {
        // Server decides
        if (this._sock.rQwait("security scheme", 4)) {
          return false;
        }
        this._rfbAuthScheme = this._sock.rQshift32();
        if (this._rfbAuthScheme == 0) {
          this._rfbInitState = "SecurityReason";
          this._securityContext = "authentication scheme";
          this._securityStatus = 1;
          return this._initMsg();
        }
      }
      this._rfbInitState = 'Authentication';
      Log.Debug('Authenticating using scheme: ' + this._rfbAuthScheme);
      return this._initMsg(); // jump to authentication
    }
  }, {
    key: "_handleSecurityReason",
    value: function _handleSecurityReason() {
      if (this._sock.rQwait("reason length", 4)) {
        return false;
      }
      var strlen = this._sock.rQshift32();
      var reason = "";
      if (strlen > 0) {
        if (this._sock.rQwait("reason", strlen, 4)) {
          return false;
        }
        reason = this._sock.rQshiftStr(strlen);
      }
      if (reason !== "") {
        this.dispatchEvent(new CustomEvent("securityfailure", {
          detail: {
            status: this._securityStatus,
            reason: reason
          }
        }));
        return this._fail("Security negotiation failed on " + this._securityContext + " (reason: " + reason + ")");
      } else {
        this.dispatchEvent(new CustomEvent("securityfailure", {
          detail: {
            status: this._securityStatus
          }
        }));
        return this._fail("Security negotiation failed on " + this._securityContext);
      }
    }

    // authentication
  }, {
    key: "_negotiateXvpAuth",
    value: function _negotiateXvpAuth() {
      if (this._rfbCredentials.username === undefined || this._rfbCredentials.password === undefined || this._rfbCredentials.target === undefined) {
        this.dispatchEvent(new CustomEvent("credentialsrequired", {
          detail: {
            types: ["username", "password", "target"]
          }
        }));
        return false;
      }
      var xvpAuthStr = String.fromCharCode(this._rfbCredentials.username.length) + String.fromCharCode(this._rfbCredentials.target.length) + this._rfbCredentials.username + this._rfbCredentials.target;
      this._sock.sendString(xvpAuthStr);
      this._rfbAuthScheme = 2;
      return this._negotiateAuthentication();
    }

    // VeNCrypt authentication, currently only supports version 0.2 and only Plain subtype
  }, {
    key: "_negotiateVeNCryptAuth",
    value: function _negotiateVeNCryptAuth() {
      // waiting for VeNCrypt version
      if (this._rfbVeNCryptState == 0) {
        if (this._sock.rQwait("vencrypt version", 2)) {
          return false;
        }
        var major = this._sock.rQshift8();
        var minor = this._sock.rQshift8();
        if (!(major == 0 && minor == 2)) {
          return this._fail("Unsupported VeNCrypt version " + major + "." + minor);
        }
        this._sock.send([0, 2]);
        this._rfbVeNCryptState = 1;
      }

      // waiting for ACK
      if (this._rfbVeNCryptState == 1) {
        if (this._sock.rQwait("vencrypt ack", 1)) {
          return false;
        }
        var res = this._sock.rQshift8();
        if (res != 0) {
          return this._fail("VeNCrypt failure " + res);
        }
        this._rfbVeNCryptState = 2;
      }
      // must fall through here (i.e. no "else if"), beacause we may have already received
      // the subtypes length and won't be called again

      if (this._rfbVeNCryptState == 2) {
        // waiting for subtypes length
        if (this._sock.rQwait("vencrypt subtypes length", 1)) {
          return false;
        }
        var subtypesLength = this._sock.rQshift8();
        if (subtypesLength < 1) {
          return this._fail("VeNCrypt subtypes empty");
        }
        this._rfbVeNCryptSubtypesLength = subtypesLength;
        this._rfbVeNCryptState = 3;
      }

      // waiting for subtypes list
      if (this._rfbVeNCryptState == 3) {
        if (this._sock.rQwait("vencrypt subtypes", 4 * this._rfbVeNCryptSubtypesLength)) {
          return false;
        }
        var subtypes = [];
        for (var i = 0; i < this._rfbVeNCryptSubtypesLength; i++) {
          subtypes.push(this._sock.rQshift32());
        }

        // 256 = Plain subtype
        if (subtypes.indexOf(256) != -1) {
          // 0x100 = 256
          this._sock.send([0, 0, 1, 0]);
          this._rfbVeNCryptState = 4;
        } else {
          return this._fail("VeNCrypt Plain subtype not offered by server");
        }
      }

      // negotiated Plain subtype, server waits for password
      if (this._rfbVeNCryptState == 4) {
        if (this._rfbCredentials.username === undefined || this._rfbCredentials.password === undefined) {
          this.dispatchEvent(new CustomEvent("credentialsrequired", {
            detail: {
              types: ["username", "password"]
            }
          }));
          return false;
        }
        var user = (0, _strings.encodeUTF8)(this._rfbCredentials.username);
        var pass = (0, _strings.encodeUTF8)(this._rfbCredentials.password);
        this._sock.send([user.length >> 24 & 0xFF, user.length >> 16 & 0xFF, user.length >> 8 & 0xFF, user.length & 0xFF]);
        this._sock.send([pass.length >> 24 & 0xFF, pass.length >> 16 & 0xFF, pass.length >> 8 & 0xFF, pass.length & 0xFF]);
        this._sock.sendString(user);
        this._sock.sendString(pass);
        this._rfbInitState = "SecurityResult";
        return true;
      }
    }
  }, {
    key: "_negotiateStdVNCAuth",
    value: function _negotiateStdVNCAuth() {
      if (this._sock.rQwait("auth challenge", 16)) {
        return false;
      }

      // KasmVNC uses basic Auth, clear the VNC password, which is not used
      this._rfbCredentials.password = "";

      // TODO(directxman12): make genDES not require an Array
      var challenge = Array.prototype.slice.call(this._sock.rQshiftBytes(16));
      var response = RFB.genDES(this._rfbCredentials.password, challenge);
      this._sock.send(response);
      this._rfbInitState = "SecurityResult";
      return true;
    }
  }, {
    key: "_negotiateTightUnixAuth",
    value: function _negotiateTightUnixAuth() {
      if (this._rfbCredentials.username === undefined || this._rfbCredentials.password === undefined) {
        this.dispatchEvent(new CustomEvent("credentialsrequired", {
          detail: {
            types: ["username", "password"]
          }
        }));
        return false;
      }
      this._sock.send([0, 0, 0, this._rfbCredentials.username.length]);
      this._sock.send([0, 0, 0, this._rfbCredentials.password.length]);
      this._sock.sendString(this._rfbCredentials.username);
      this._sock.sendString(this._rfbCredentials.password);
      this._rfbInitState = "SecurityResult";
      return true;
    }
  }, {
    key: "_negotiateTightTunnels",
    value: function _negotiateTightTunnels(numTunnels) {
      var clientSupportedTunnelTypes = {
        0: {
          vendor: 'TGHT',
          signature: 'NOTUNNEL'
        }
      };
      var serverSupportedTunnelTypes = {};
      // receive tunnel capabilities
      for (var i = 0; i < numTunnels; i++) {
        var capCode = this._sock.rQshift32();
        var capVendor = this._sock.rQshiftStr(4);
        var capSignature = this._sock.rQshiftStr(8);
        serverSupportedTunnelTypes[capCode] = {
          vendor: capVendor,
          signature: capSignature
        };
      }
      Log.Debug("Server Tight tunnel types: " + serverSupportedTunnelTypes);

      // Siemens touch panels have a VNC server that supports NOTUNNEL,
      // but forgets to advertise it. Try to detect such servers by
      // looking for their custom tunnel type.
      if (serverSupportedTunnelTypes[1] && serverSupportedTunnelTypes[1].vendor === "SICR" && serverSupportedTunnelTypes[1].signature === "SCHANNEL") {
        Log.Debug("Detected Siemens server. Assuming NOTUNNEL support.");
        serverSupportedTunnelTypes[0] = {
          vendor: 'TGHT',
          signature: 'NOTUNNEL'
        };
      }

      // choose the notunnel type
      if (serverSupportedTunnelTypes[0]) {
        if (serverSupportedTunnelTypes[0].vendor != clientSupportedTunnelTypes[0].vendor || serverSupportedTunnelTypes[0].signature != clientSupportedTunnelTypes[0].signature) {
          return this._fail("Client's tunnel type had the incorrect " + "vendor or signature");
        }
        Log.Debug("Selected tunnel type: " + clientSupportedTunnelTypes[0]);
        this._sock.send([0, 0, 0, 0]); // use NOTUNNEL
        return false; // wait until we receive the sub auth count to continue
      } else {
        return this._fail("Server wanted tunnels, but doesn't support " + "the notunnel type");
      }
    }
  }, {
    key: "_negotiateTightAuth",
    value: function _negotiateTightAuth() {
      if (!this._rfbTightVNC) {
        // first pass, do the tunnel negotiation
        if (this._sock.rQwait("num tunnels", 4)) {
          return false;
        }
        var numTunnels = this._sock.rQshift32();
        if (numTunnels > 0 && this._sock.rQwait("tunnel capabilities", 16 * numTunnels, 4)) {
          return false;
        }
        this._rfbTightVNC = true;
        if (numTunnels > 0) {
          this._negotiateTightTunnels(numTunnels);
          return false; // wait until we receive the sub auth to continue
        }
      }

      // second pass, do the sub-auth negotiation
      if (this._sock.rQwait("sub auth count", 4)) {
        return false;
      }
      var subAuthCount = this._sock.rQshift32();
      if (subAuthCount === 0) {
        // empty sub-auth list received means 'no auth' subtype selected
        this._rfbInitState = 'SecurityResult';
        return true;
      }
      if (this._sock.rQwait("sub auth capabilities", 16 * subAuthCount, 4)) {
        return false;
      }
      var clientSupportedTypes = {
        'STDVNOAUTH__': 1,
        'STDVVNCAUTH_': 2,
        'TGHTULGNAUTH': 129
      };
      var serverSupportedTypes = [];
      for (var i = 0; i < subAuthCount; i++) {
        this._sock.rQshift32(); // capNum
        var capabilities = this._sock.rQshiftStr(12);
        serverSupportedTypes.push(capabilities);
      }
      Log.Debug("Server Tight authentication types: " + serverSupportedTypes);
      for (var authType in clientSupportedTypes) {
        if (serverSupportedTypes.indexOf(authType) != -1) {
          this._sock.send([0, 0, 0, clientSupportedTypes[authType]]);
          Log.Debug("Selected authentication type: " + authType);
          switch (authType) {
            case 'STDVNOAUTH__':
              // no auth
              this._rfbInitState = 'SecurityResult';
              return true;
            case 'STDVVNCAUTH_':
              // VNC auth
              this._rfbAuthScheme = 2;
              return this._initMsg();
            case 'TGHTULGNAUTH':
              // UNIX auth
              this._rfbAuthScheme = 129;
              return this._initMsg();
            default:
              return this._fail("Unsupported tiny auth scheme " + "(scheme: " + authType + ")");
          }
        }
      }
      return this._fail("No supported sub-auth types!");
    }
  }, {
    key: "_negotiateAuthentication",
    value: function _negotiateAuthentication() {
      switch (this._rfbAuthScheme) {
        case 1:
          // no auth
          if (this._rfbVersion >= 3.8) {
            this._rfbInitState = 'SecurityResult';
            return true;
          }
          this._rfbInitState = 'ClientInitialisation';
          return this._initMsg();
        case 22:
          // XVP auth
          return this._negotiateXvpAuth();
        case 2:
          // VNC authentication
          return this._negotiateStdVNCAuth();
        case 16:
          // TightVNC Security Type
          return this._negotiateTightAuth();
        case 19:
          // VeNCrypt Security Type
          return this._negotiateVeNCryptAuth();
        case 129:
          // TightVNC UNIX Security Type
          return this._negotiateTightUnixAuth();
        default:
          return this._fail("Unsupported auth scheme (scheme: " + this._rfbAuthScheme + ")");
      }
    }
  }, {
    key: "_handleSecurityResult",
    value: function _handleSecurityResult() {
      if (this._sock.rQwait('VNC auth response ', 4)) {
        return false;
      }
      var status = this._sock.rQshift32();
      if (status === 0) {
        // OK
        this._rfbInitState = 'ClientInitialisation';
        Log.Debug('Authentication OK');
        return this._initMsg();
      } else {
        if (this._rfbVersion >= 3.8) {
          this._rfbInitState = "SecurityReason";
          this._securityContext = "security result";
          this._securityStatus = status;
          return this._initMsg();
        } else {
          this.dispatchEvent(new CustomEvent("securityfailure", {
            detail: {
              status: status
            }
          }));
          return this._fail("Security handshake failed");
        }
      }
    }
  }, {
    key: "_negotiateServerInit",
    value: function _negotiateServerInit() {
      if (this._sock.rQwait("server initialization", 24)) {
        return false;
      }

      /* Screen size */
      var width = this._sock.rQshift16();
      var height = this._sock.rQshift16();

      /* PIXEL_FORMAT */
      var bpp = this._sock.rQshift8();
      var depth = this._sock.rQshift8();
      var bigEndian = this._sock.rQshift8();
      var trueColor = this._sock.rQshift8();
      var redMax = this._sock.rQshift16();
      var greenMax = this._sock.rQshift16();
      var blueMax = this._sock.rQshift16();
      var redShift = this._sock.rQshift8();
      var greenShift = this._sock.rQshift8();
      var blueShift = this._sock.rQshift8();
      this._sock.rQskipBytes(3); // padding

      // NB(directxman12): we don't want to call any callbacks or print messages until
      //                   *after* we're past the point where we could backtrack

      /* Connection name/title */
      var nameLength = this._sock.rQshift32();
      if (this._sock.rQwait('server init name', nameLength, 24)) {
        return false;
      }
      var name = this._sock.rQshiftStr(nameLength);
      name = (0, _strings.decodeUTF8)(name, true);
      if (this._rfbTightVNC) {
        if (this._sock.rQwait('TightVNC extended server init header', 8, 24 + nameLength)) {
          return false;
        }
        // In TightVNC mode, ServerInit message is extended
        var numServerMessages = this._sock.rQshift16();
        var numClientMessages = this._sock.rQshift16();
        var numEncodings = this._sock.rQshift16();
        this._sock.rQskipBytes(2); // padding

        var totalMessagesLength = (numServerMessages + numClientMessages + numEncodings) * 16;
        if (this._sock.rQwait('TightVNC extended server init header', totalMessagesLength, 32 + nameLength)) {
          return false;
        }

        // we don't actually do anything with the capability information that TIGHT sends,
        // so we just skip the all of this.

        // TIGHT server message capabilities
        this._sock.rQskipBytes(16 * numServerMessages);

        // TIGHT client message capabilities
        this._sock.rQskipBytes(16 * numClientMessages);

        // TIGHT encoding capabilities
        this._sock.rQskipBytes(16 * numEncodings);
      }

      // NB(directxman12): these are down here so that we don't run them multiple times
      //                   if we backtrack
      Log.Info("Screen: " + width + "x" + height + ", bpp: " + bpp + ", depth: " + depth + ", bigEndian: " + bigEndian + ", trueColor: " + trueColor + ", redMax: " + redMax + ", greenMax: " + greenMax + ", blueMax: " + blueMax + ", redShift: " + redShift + ", greenShift: " + greenShift + ", blueShift: " + blueShift);

      // we're past the point where we could backtrack, so it's safe to call this
      this._setDesktopName(name);
      this._resize(width, height);
      if (!this._viewOnly) {
        this._keyboard.grab();
      }
      this._fbDepth = 24;
      if (this._fbName === "Intel(r) AMT KVM") {
        Log.Warn("Intel AMT KVM only supports 8/16 bit depths. Using low color mode.");
        this._fbDepth = 8;
      }
      RFB.messages.pixelFormat(this._sock, this._fbDepth, true);
      this._sendEncodings();
      RFB.messages.fbUpdateRequest(this._sock, false, 0, 0, this._fbWidth, this._fbHeight);
      this._updateConnectionState('connected');
      return true;
    }
  }, {
    key: "_hasWebp",
    value: function _hasWebp() {
      /*
      return new Promise(res => {
          const webP = new Image();
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
          webP.onload = webP.onerror = function () {
              res(webP.height === 2);
          };
      })
      */
      if (!this.enableWebP) return false;
      // It's not possible to check for webp synchronously, and hacking promises
      // into everything would be too time-consuming. So test for FF and Chrome.
      var uagent = navigator.userAgent.toLowerCase();
      var match = uagent.match(/firefox\/([0-9]+)\./);
      if (match && parseInt(match[1]) >= 65) return true;
      match = uagent.match(/chrome\/([0-9]+)\./);
      if (match && parseInt(match[1]) >= 23) return true;
      return false;
    }
  }, {
    key: "_sendEncodings",
    value: function _sendEncodings() {
      var encs = [];

      // In preference order
      encs.push(_encodings.encodings.encodingCopyRect);
      // Only supported with full depth support
      if (this._fbDepth == 24) {
        encs.push(_encodings.encodings.encodingTight);
        encs.push(_encodings.encodings.encodingTightPNG);
        encs.push(_encodings.encodings.encodingHextile);
        encs.push(_encodings.encodings.encodingRRE);
      }
      encs.push(_encodings.encodings.encodingRaw);

      // Psuedo-encoding settings
      encs.push(_encodings.encodings.pseudoEncodingQualityLevel0 + this._qualityLevel);
      encs.push(_encodings.encodings.pseudoEncodingCompressLevel0 + this._compressionLevel);
      encs.push(_encodings.encodings.pseudoEncodingDesktopSize);
      encs.push(_encodings.encodings.pseudoEncodingLastRect);
      encs.push(_encodings.encodings.pseudoEncodingQEMUExtendedKeyEvent);
      encs.push(_encodings.encodings.pseudoEncodingExtendedDesktopSize);
      encs.push(_encodings.encodings.pseudoEncodingXvp);
      encs.push(_encodings.encodings.pseudoEncodingFence);
      encs.push(_encodings.encodings.pseudoEncodingContinuousUpdates);
      encs.push(_encodings.encodings.pseudoEncodingDesktopName);
      encs.push(_encodings.encodings.pseudoEncodingExtendedClipboard);
      if (this._hasWebp()) encs.push(_encodings.encodings.pseudoEncodingWEBP);
      if (this._enableQOI) encs.push(_encodings.encodings.pseudoEncodingQOI);

      // kasm settings; the server may be configured to ignore these
      encs.push(_encodings.encodings.pseudoEncodingJpegVideoQualityLevel0 + this.jpegVideoQuality);
      encs.push(_encodings.encodings.pseudoEncodingWebpVideoQualityLevel0 + this.webpVideoQuality);
      encs.push(_encodings.encodings.pseudoEncodingTreatLosslessLevel0 + this.treatLossless);
      encs.push(_encodings.encodings.pseudoEncodingDynamicQualityMinLevel0 + this.dynamicQualityMin);
      encs.push(_encodings.encodings.pseudoEncodingDynamicQualityMaxLevel0 + this.dynamicQualityMax);
      encs.push(_encodings.encodings.pseudoEncodingVideoAreaLevel1 + this.videoArea - 1);
      encs.push(_encodings.encodings.pseudoEncodingVideoTimeLevel0 + this.videoTime);
      encs.push(_encodings.encodings.pseudoEncodingVideoOutTimeLevel1 + this.videoOutTime - 1);
      encs.push(_encodings.encodings.pseudoEncodingVideoScalingLevel0 + this.videoScaling);
      encs.push(_encodings.encodings.pseudoEncodingFrameRateLevel10 + this.frameRate - 10);
      encs.push(_encodings.encodings.pseudoEncodingMaxVideoResolution);

      // preferBandwidth choses preset settings. Since we expose all the settings, lets not pass this
      if (this.preferBandwidth)
        // must be last - server processes in reverse order
        encs.push(_encodings.encodings.pseudoEncodingPreferBandwidth);
      if (this._fbDepth == 24) {
        encs.push(_encodings.encodings.pseudoEncodingVMwareCursor);
        encs.push(_encodings.encodings.pseudoEncodingCursor);
      }
      encs.push(_encodings.encodings.pseudoEncodingVMwareCursorPosition);
      RFB.messages.clientEncodings(this._sock, encs);
    }

    /* RFB protocol initialization states:
     *   ProtocolVersion
     *   Security
     *   Authentication
     *   SecurityResult
     *   ClientInitialization - not triggered by server message
     *   ServerInitialization
     */
  }, {
    key: "_initMsg",
    value: function _initMsg() {
      switch (this._rfbInitState) {
        case 'ProtocolVersion':
          return this._negotiateProtocolVersion();
        case 'Security':
          return this._negotiateSecurity();
        case 'Authentication':
          return this._negotiateAuthentication();
        case 'SecurityResult':
          return this._handleSecurityResult();
        case 'SecurityReason':
          return this._handleSecurityReason();
        case 'ClientInitialisation':
          this._sock.send([this._shared ? 1 : 0]); // ClientInitialisation
          this._rfbInitState = 'ServerInitialisation';
          return true;
        case 'ServerInitialisation':
          return this._negotiateServerInit();
        default:
          return this._fail("Unknown init state (state: " + this._rfbInitState + ")");
      }
    }
  }, {
    key: "_handleSetColourMapMsg",
    value: function _handleSetColourMapMsg() {
      Log.Debug("SetColorMapEntries");
      return this._fail("Unexpected SetColorMapEntries message");
    }
  }, {
    key: "_handleServerCutText",
    value: function _handleServerCutText() {
      Log.Debug("ServerCutText");
      if (this._sock.rQwait("ServerCutText header", 7, 1)) {
        return false;
      }
      this._sock.rQskipBytes(3); // Padding

      var length = this._sock.rQshift32();
      length = (0, _int.toSigned32bit)(length);
      if (this._sock.rQwait("ServerCutText content", Math.abs(length), 8)) {
        return false;
      }
      if (length >= 0) {
        //Standard msg
        var text = this._sock.rQshiftStr(length);
        if (this._viewOnly) {
          return true;
        }
        this.dispatchEvent(new CustomEvent("clipboard", {
          detail: {
            text: text
          }
        }));
        this._clipHash = 0;
      } else {
        //Extended msg.
        length = Math.abs(length);
        var flags = this._sock.rQshift32();
        var formats = flags & 0x0000FFFF;
        var actions = flags & 0xFF000000;
        var isCaps = !!(actions & extendedClipboardActionCaps);
        if (isCaps) {
          this._clipboardServerCapabilitiesFormats = {};
          this._clipboardServerCapabilitiesActions = {};

          // Update our server capabilities for Formats
          for (var i = 0; i <= 15; i++) {
            var index = 1 << i;

            // Check if format flag is set.
            if (formats & index) {
              this._clipboardServerCapabilitiesFormats[index] = true;
              // We don't send unsolicited clipboard, so we
              // ignore the size
              this._sock.rQshift32();
            }
          }

          // Update our server capabilities for Actions
          for (var _i3 = 24; _i3 <= 31; _i3++) {
            var _index = 1 << _i3;
            this._clipboardServerCapabilitiesActions[_index] = !!(actions & _index);
          }

          /*  Caps handling done, send caps with the clients
              capabilities set as a response */
          var clientActions = [extendedClipboardActionCaps, extendedClipboardActionRequest, extendedClipboardActionPeek, extendedClipboardActionNotify, extendedClipboardActionProvide];
          RFB.messages.extendedClipboardCaps(this._sock, clientActions, {
            extendedClipboardFormatText: 0
          });
        } else if (actions === extendedClipboardActionRequest) {
          if (this._viewOnly) {
            return true;
          }

          // Check if server has told us it can handle Provide and there is clipboard data to send.
          if (this._clipboardText != null && this._clipboardServerCapabilitiesActions[extendedClipboardActionProvide]) {
            if (formats & extendedClipboardFormatText) {
              RFB.messages.extendedClipboardProvide(this._sock, [extendedClipboardFormatText], [this._clipboardText]);
            }
          }
        } else if (actions === extendedClipboardActionPeek) {
          if (this._viewOnly) {
            return true;
          }
          if (this._clipboardServerCapabilitiesActions[extendedClipboardActionNotify]) {
            if (this._clipboardText != null) {
              RFB.messages.extendedClipboardNotify(this._sock, [extendedClipboardFormatText]);
            } else {
              RFB.messages.extendedClipboardNotify(this._sock, []);
            }
          }
        } else if (actions === extendedClipboardActionNotify) {
          if (this._viewOnly) {
            return true;
          }
          if (this._clipboardServerCapabilitiesActions[extendedClipboardActionRequest]) {
            if (formats & extendedClipboardFormatText) {
              RFB.messages.extendedClipboardRequest(this._sock, [extendedClipboardFormatText]);
            }
          }
        } else if (actions === extendedClipboardActionProvide) {
          if (this._viewOnly) {
            return true;
          }
          if (!(formats & extendedClipboardFormatText)) {
            return true;
          }
          // Ignore what we had in our clipboard client side.
          this._clipboardText = null;

          // FIXME: Should probably verify that this data was actually requested
          var zlibStream = this._sock.rQshiftBytes(length - 4);
          var streamInflator = new _inflator["default"]();
          var textData = null;
          streamInflator.setInput(zlibStream);
          for (var _i4 = 0; _i4 <= 15; _i4++) {
            var format = 1 << _i4;
            if (formats & format) {
              var size = 0x00;
              var sizeArray = streamInflator.inflate(4);
              size |= sizeArray[0] << 24;
              size |= sizeArray[1] << 16;
              size |= sizeArray[2] << 8;
              size |= sizeArray[3];
              var chunk = streamInflator.inflate(size);
              if (format === extendedClipboardFormatText) {
                textData = chunk;
              }
            }
          }
          streamInflator.setInput(null);
          if (textData !== null) {
            var tmpText = "";
            for (var _i5 = 0; _i5 < textData.length; _i5++) {
              tmpText += String.fromCharCode(textData[_i5]);
            }
            textData = tmpText;
            textData = (0, _strings.decodeUTF8)(textData);
            if (textData.length > 0 && "\0" === textData.charAt(textData.length - 1)) {
              textData = textData.slice(0, -1);
            }
            textData = textData.replace("\r\n", "\n");
            this.dispatchEvent(new CustomEvent("clipboard", {
              detail: {
                text: textData
              }
            }));
          }
        } else {
          return this._fail("Unexpected action in extended clipboard message: " + actions);
        }
      }
      return true;
    }
  }, {
    key: "_handleBinaryClipboard",
    value: function _handleBinaryClipboard() {
      Log.Debug("HandleBinaryClipboard");
      if (this._sock.rQwait("Binary Clipboard header", 2, 1)) {
        return false;
      }
      var num = this._sock.rQshift8(); // how many different mime types
      var mimes = [];
      var clipItemData = {};
      var buffByteLen = 2;
      var textdata = '';
      Log.Info(num + ' Clipboard items recieved.');
      Log.Debug('Started clipbooard processing with Client sockjs buffer size ' + this._sock.rQlen);
      for (var i = 0; i < num; i++) {
        if (this._sock.rQwait("Binary Clipboard op id", 4, buffByteLen)) {
          return false;
        }
        buffByteLen += 4;
        var clipid = this._sock.rQshift32();
        if (this._sock.rQwait("Binary Clipboard mimelen", 1, buffByteLen)) {
          return false;
        }
        buffByteLen++;
        var mimelen = this._sock.rQshift8();
        if (this._sock.rQwait("Binary Clipboard mime", Math.abs(mimelen), buffByteLen)) {
          return false;
        }
        buffByteLen += mimelen;
        var mime = this._sock.rQshiftStr(mimelen);
        if (this._sock.rQwait("Binary Clipboard data len", 4, buffByteLen)) {
          return false;
        }
        buffByteLen += 4;
        var len = this._sock.rQshift32();
        if (this._sock.rQwait("Binary Clipboard data", Math.abs(len), buffByteLen)) {
          return false;
        }
        var data = this._sock.rQshiftBytes(len);
        buffByteLen += len;
        switch (mime) {
          case "image/png":
          case "text/html":
          case "text/plain":
            mimes.push(mime);
            if (mime == "text/plain") {
              textdata = new TextDecoder().decode(data);
              if (textdata.length > 0 && "\0" === textdata.charAt(textdata.length - 1)) {
                textdata = textdata.slice(0, -1);
              }
              Log.Debug("Plain text clipboard recieved and placed in text element, size: " + textdata.length);
              this.dispatchEvent(new CustomEvent("clipboard", {
                detail: {
                  text: textdata
                }
              }));
            }
            Log.Info("Processed binary clipboard (ID: " + clipid + ")  of MIME " + mime + " of length " + len);
            if (!this.clipboardBinary) {
              continue;
            }
            clipItemData[mime] = new Blob([data], {
              type: mime
            });
            break;
          default:
            Log.Debug('Mime type skipped: ' + mime);
            break;
        }
      }
      Log.Debug('Finished processing binary clipboard with client sockjs buffer size ' + this._sock.rQlen);
      if (Object.keys(clipItemData).length > 0) {
        if (this.clipboardBinary) {
          this._clipHash = 0;
          navigator.clipboard.write([new ClipboardItem(clipItemData)]).then(function () {}, function (err) {
            Log.Error("Error writing to client clipboard: " + err);
            // Lets try writeText
            if (textdata.length > 0) {
              navigator.clipboard.writeText(textdata).then(function () {}, function (err2) {
                Log.Error("Error writing text to client clipboard: " + err2);
              });
            }
          });
        }
      }
      return true;
    }
  }, {
    key: "_handle_server_stats_msg",
    value: function _handle_server_stats_msg() {
      this._sock.rQskipBytes(3); // Padding
      var length = this._sock.rQshift32();
      if (this._sock.rQwait("KASM bottleneck stats", length, 8)) {
        return false;
      }
      var text = this._sock.rQshiftStr(length);
      Log.Debug("Received KASM bottleneck stats:");
      Log.Debug(text);
      this.dispatchEvent(new CustomEvent("bottleneck_stats", {
        detail: {
          text: text
        }
      }));
      return true;
    }
  }, {
    key: "_handleServerFenceMsg",
    value: function _handleServerFenceMsg() {
      if (this._sock.rQwait("ServerFence header", 8, 1)) {
        return false;
      }
      this._sock.rQskipBytes(3); // Padding
      var flags = this._sock.rQshift32();
      var length = this._sock.rQshift8();
      if (this._sock.rQwait("ServerFence payload", length, 9)) {
        return false;
      }
      if (length > 64) {
        Log.Warn("Bad payload length (" + length + ") in fence response");
        length = 64;
      }
      var payload = this._sock.rQshiftStr(length);
      this._supportsFence = true;

      /*
       * Fence flags
       *
       *  (1<<0)  - BlockBefore
       *  (1<<1)  - BlockAfter
       *  (1<<2)  - SyncNext
       *  (1<<31) - Request
       */

      if (!(flags & 1 << 31)) {
        return this._fail("Unexpected fence response");
      }

      // Filter out unsupported flags
      // FIXME: support syncNext
      flags &= 1 << 0 | 1 << 1;

      // BlockBefore and BlockAfter are automatically handled by
      // the fact that we process each incoming message
      // synchronuosly.
      RFB.messages.clientFence(this._sock, flags, payload);
      return true;
    }
  }, {
    key: "_handleXvpMsg",
    value: function _handleXvpMsg() {
      if (this._sock.rQwait("XVP version and message", 3, 1)) {
        return false;
      }
      this._sock.rQskipBytes(1); // Padding
      var xvpVer = this._sock.rQshift8();
      var xvpMsg = this._sock.rQshift8();
      switch (xvpMsg) {
        case 0:
          // XVP_FAIL
          Log.Error("XVP Operation Failed");
          break;
        case 1:
          // XVP_INIT
          this._rfbXvpVer = xvpVer;
          Log.Info("XVP extensions enabled (version " + this._rfbXvpVer + ")");
          this._setCapability("power", true);
          break;
        default:
          this._fail("Illegal server XVP message (msg: " + xvpMsg + ")");
          break;
      }
      return true;
    }
  }, {
    key: "_normalMsg",
    value: function _normalMsg() {
      var msgType;
      if (this._FBU.rects > 0) {
        msgType = 0;
      } else {
        msgType = this._sock.rQshift8();
      }
      var first, ret;
      switch (msgType) {
        case 0:
          // FramebufferUpdate
          this._display.renderMs = 0;
          ret = this._framebufferUpdate();
          if (ret && !this._enabledContinuousUpdates) {
            RFB.messages.fbUpdateRequest(this._sock, true, 0, 0, this._fbWidth, this._fbHeight);
          }
          if (this._trackFrameStats) {
            RFB.messages.sendFrameStats(this._sock, this._display.fps, this._display.renderMs);
            this._trackFrameStats = false;
          }
          return ret;
        case 1:
          // SetColorMapEntries
          return this._handleSetColourMapMsg();
        case 2:
          // Bell
          Log.Debug("Bell");
          this.dispatchEvent(new CustomEvent("bell", {
            detail: {}
          }));
          return true;
        case 3:
          // ServerCutText
          return this._handleServerCutText();
        case 150:
          // EndOfContinuousUpdates
          first = !this._supportsContinuousUpdates;
          this._supportsContinuousUpdates = true;
          this._enabledContinuousUpdates = false;
          if (first) {
            this._enabledContinuousUpdates = true;
            this._updateContinuousUpdates();
            Log.Info("Enabling continuous updates.");
          } else {
            // FIXME: We need to send a framebufferupdaterequest here
            // if we add support for turning off continuous updates
          }
          return true;
        case 178:
          // KASM bottleneck stats
          return this._handle_server_stats_msg();
        case 179:
          // KASM requesting frame stats
          this._trackFrameStats = true;
          return true;
        case 180:
          // KASM binary clipboard
          return this._handleBinaryClipboard();
        case 181:
          // KASM UDP upgrade
          return this._handleUdpUpgrade();
        case 248:
          // ServerFence
          return this._handleServerFenceMsg();
        case 250:
          // XVP
          return this._handleXvpMsg();
        default:
          this._fail("Unexpected server message (type " + msgType + ")");
          Log.Debug("sock.rQslice(0, 30): " + this._sock.rQslice(0, 30));
          return true;
      }
    }
  }, {
    key: "_onFlush",
    value: function _onFlush() {
      this._flushing = false;
      // Resume processing
      if (this._sock.rQlen > 0) {
        this._handleMessage();
      }
    }
  }, {
    key: "_handleUdpRect",
    value: function _handleUdpRect(data, frame_id) {
      var frame = {
        x: (data[0] << 8) + data[1],
        y: (data[2] << 8) + data[3],
        width: (data[4] << 8) + data[5],
        height: (data[6] << 8) + data[7],
        encoding: parseInt((data[8] << 24) + (data[9] << 16) + (data[10] << 8) + data[11], 10)
      };
      switch (frame.encoding) {
        case _encodings.encodings.pseudoEncodingLastRect:
          this._display.flip(frame_id, frame.x + 1); //Last Rect message, first 16 bytes contain rect count
          if (this._display.pending()) this._display.flush(false);
          break;
        case _encodings.encodings.encodingTight:
          var decoder = this._decoders[_encodings.encodings.encodingUDP];
          try {
            decoder.decodeRect(frame.x, frame.y, frame.width, frame.height, data, this._display, this._fbDepth, frame_id);
          } catch (err) {
            this._fail("Error decoding rect: " + err);
            return false;
          }
          break;
        default:
          Log.Error("Invalid rect encoding via UDP: " + frame.encoding);
          return false;
      }
      return true;
    }
  }, {
    key: "_sendUdpUpgrade",
    value: function _sendUdpUpgrade() {
      if (this._transitConnectionState == this.TransitConnectionStates.Upgrading) {
        return;
      }
      this._changeTransitConnectionState(this.TransitConnectionStates.Upgrading);
      var peer = this._udpPeer;
      var sock = this._sock;
      peer.createOffer().then(function (offer) {
        return peer.setLocalDescription(offer);
      }).then(function () {
        var buff = sock._sQ;
        var offset = sock._sQlen;
        var str = Uint8Array.from(Array.from(peer.localDescription.sdp).map(function (letter) {
          return letter.charCodeAt(0);
        }));
        buff[offset] = 181; // msg-type
        buff[offset + 1] = str.length >> 8; // u16 len
        buff[offset + 2] = str.length;
        buff.set(str, offset + 3);
        sock._sQlen += 3 + str.length;
        sock.flush();
      })["catch"](function (reason) {
        Log.Error("Failed to create offer " + reason);
        this._changeTransitConnectionState(this.TransitConnectionStates.Tcp);
        this._udpConnectFailures++;
      });
    }
  }, {
    key: "_sendUdpDowngrade",
    value: function _sendUdpDowngrade() {
      this._changeTransitConnectionState(this.TransitConnectionStates.Downgrading);
      var buff = this._sock._sQ;
      var offset = this._sock._sQlen;
      buff[offset] = 181; // msg-type
      buff[offset + 1] = 0; // u16 len
      buff[offset + 2] = 0;
      this._sock._sQlen += 3;
      this._sock.flush();
    }
  }, {
    key: "_handleUdpUpgrade",
    value: function _handleUdpUpgrade() {
      if (this._sock.rQwait("UdpUgrade header", 2, 1)) {
        return false;
      }
      var len = this._sock.rQshift16();
      if (this._sock.rQwait("UdpUpgrade payload", len, 3)) {
        return false;
      }
      var payload = this._sock.rQshiftStr(len);
      var peer = this._udpPeer;
      var response = JSON.parse(payload);
      Log.Debug("UDP Upgrade recieved from server: " + payload);
      peer.setRemoteDescription(new RTCSessionDescription(response.answer)).then(function () {
        var candidate = new RTCIceCandidate(response.candidate);
        peer.addIceCandidate(candidate).then(function () {
          Log.Debug("success in addicecandidate");
        }.bind(this))["catch"](function (err) {
          Log.Error("Failure in addIceCandidate", err);
          this._changeTransitConnectionState(this.TransitConnectionStates.Failure);
          this._udpConnectFailures++;
        }.bind(this));
      }.bind(this))["catch"](function (e) {
        Log.Error("Failure in setRemoteDescription", e);
        this._changeTransitConnectionState(this.TransitConnectionStates.Failure);
        this._udpConnectFailures++;
      }.bind(this));
    }
  }, {
    key: "_framebufferUpdate",
    value: function _framebufferUpdate() {
      if (this._FBU.rects === 0) {
        if (this._sock.rQwait("FBU header", 3, 1)) {
          return false;
        }
        this._sock.rQskipBytes(1); // Padding
        this._FBU.rects = this._sock.rQshift16();
        this._FBU.frame_id++;
        this._FBU.rect_total = 0;

        // Make sure the previous frame is fully rendered first
        // to avoid building up an excessive queue
        if (this._display.pending()) {
          this._flushing = true;
          this._display.flush();
          return false;
        }
      }
      while (this._FBU.rects > 0) {
        if (this._FBU.encoding === null) {
          if (this._sock.rQwait("rect header", 12)) {
            return false;
          }
          /* New FramebufferUpdate */

          var hdr = this._sock.rQshiftBytes(12);
          this._FBU.x = (hdr[0] << 8) + hdr[1];
          this._FBU.y = (hdr[2] << 8) + hdr[3];
          this._FBU.width = (hdr[4] << 8) + hdr[5];
          this._FBU.height = (hdr[6] << 8) + hdr[7];
          this._FBU.encoding = parseInt((hdr[8] << 24) + (hdr[9] << 16) + (hdr[10] << 8) + hdr[11], 10);
        }
        if (!this._handleRect()) {
          return false;
        }
        this._FBU.rects--;
        this._FBU.encoding = null;
      }
      if (this._FBU.rect_total > 1) {
        this._display.flip(this._FBU.frame_id, this._FBU.rect_total);
      }
      return true; // We finished this FBU
    }
  }, {
    key: "_handleRect",
    value: function _handleRect() {
      switch (this._FBU.encoding) {
        case _encodings.encodings.pseudoEncodingLastRect:
          this._FBU.rect_total++; //only track rendered rects and last rect
          this._FBU.rects = 1; // Will be decreased when we return
          return true;
        case _encodings.encodings.pseudoEncodingVMwareCursor:
          return this._handleVMwareCursor();
        case _encodings.encodings.pseudoEncodingVMwareCursorPosition:
          return this._handleVMwareCursorPosition();
        case _encodings.encodings.pseudoEncodingCursor:
          return this._handleCursor();
        case _encodings.encodings.pseudoEncodingQEMUExtendedKeyEvent:
          this._qemuExtKeyEventSupported = true;
          return true;
        case _encodings.encodings.pseudoEncodingDesktopName:
          return this._handleDesktopName();
        case _encodings.encodings.pseudoEncodingDesktopSize:
          this._resize(this._FBU.width, this._FBU.height);
          return true;
        case _encodings.encodings.pseudoEncodingExtendedDesktopSize:
          return this._handleExtendedDesktopSize();
        default:
          if (this._handleDataRect()) {
            this._FBU.rect_total++; //only track rendered rects and last rect
            return true;
          }
          return false;
      }
    }
  }, {
    key: "_handleVMwareCursor",
    value: function _handleVMwareCursor() {
      var hotx = this._FBU.x; // hotspot-x
      var hoty = this._FBU.y; // hotspot-y
      var w = this._FBU.width;
      var h = this._FBU.height;
      if (this._sock.rQwait("VMware cursor encoding", 1)) {
        return false;
      }
      var cursorType = this._sock.rQshift8();
      this._sock.rQshift8(); //Padding

      var rgba;
      var bytesPerPixel = 4;

      //Classic cursor
      if (cursorType == 0) {
        //Used to filter away unimportant bits.
        //OR is used for correct conversion in js.
        var PIXEL_MASK = 0xffffff00 | 0;
        rgba = new Array(w * h * bytesPerPixel);
        if (this._sock.rQwait("VMware cursor classic encoding", w * h * bytesPerPixel * 2, 2)) {
          return false;
        }
        var andMask = new Array(w * h);
        for (var pixel = 0; pixel < w * h; pixel++) {
          andMask[pixel] = this._sock.rQshift32();
        }
        var xorMask = new Array(w * h);
        for (var _pixel = 0; _pixel < w * h; _pixel++) {
          xorMask[_pixel] = this._sock.rQshift32();
        }
        for (var _pixel2 = 0; _pixel2 < w * h; _pixel2++) {
          if (andMask[_pixel2] == 0) {
            //Fully opaque pixel
            var bgr = xorMask[_pixel2];
            var r = bgr >> 8 & 0xff;
            var g = bgr >> 16 & 0xff;
            var b = bgr >> 24 & 0xff;
            rgba[_pixel2 * bytesPerPixel] = r; //r
            rgba[_pixel2 * bytesPerPixel + 1] = g; //g
            rgba[_pixel2 * bytesPerPixel + 2] = b; //b
            rgba[_pixel2 * bytesPerPixel + 3] = 0xff; //a
          } else if ((andMask[_pixel2] & PIXEL_MASK) == PIXEL_MASK) {
            //Only screen value matters, no mouse colouring
            if (xorMask[_pixel2] == 0) {
              //Transparent pixel
              rgba[_pixel2 * bytesPerPixel] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 1] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 2] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 3] = 0x00;
            } else if ((xorMask[_pixel2] & PIXEL_MASK) == PIXEL_MASK) {
              //Inverted pixel, not supported in browsers.
              //Fully opaque instead.
              rgba[_pixel2 * bytesPerPixel] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 1] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 2] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 3] = 0xff;
            } else {
              //Unhandled xorMask
              rgba[_pixel2 * bytesPerPixel] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 1] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 2] = 0x00;
              rgba[_pixel2 * bytesPerPixel + 3] = 0xff;
            }
          } else {
            //Unhandled andMask
            rgba[_pixel2 * bytesPerPixel] = 0x00;
            rgba[_pixel2 * bytesPerPixel + 1] = 0x00;
            rgba[_pixel2 * bytesPerPixel + 2] = 0x00;
            rgba[_pixel2 * bytesPerPixel + 3] = 0xff;
          }
        }

        //Alpha cursor.
      } else if (cursorType == 1) {
        if (this._sock.rQwait("VMware cursor alpha encoding", w * h * 4, 2)) {
          return false;
        }
        rgba = new Array(w * h * bytesPerPixel);
        for (var _pixel3 = 0; _pixel3 < w * h; _pixel3++) {
          var data = this._sock.rQshift32();
          rgba[_pixel3 * 4] = data >> 24 & 0xff; //r
          rgba[_pixel3 * 4 + 1] = data >> 16 & 0xff; //g
          rgba[_pixel3 * 4 + 2] = data >> 8 & 0xff; //b
          rgba[_pixel3 * 4 + 3] = data & 0xff; //a
        }
      } else {
        Log.Warn("The given cursor type is not supported: " + cursorType + " given.");
        return false;
      }
      this._updateCursor(rgba, hotx, hoty, w, h);
      return true;
    }
  }, {
    key: "_handleVMwareCursorPosition",
    value: function _handleVMwareCursorPosition() {
      var x = this._FBU.x;
      var y = this._FBU.y;
      if (this._pointerLock) {
        // Only attempt to match the server's pointer position if we are in
        // pointer lock mode.
        this._mousePos = {
          x: x,
          y: y
        };
      }
      return true;
    }
  }, {
    key: "_handleCursor",
    value: function _handleCursor() {
      var hotx = this._FBU.x; // hotspot-x
      var hoty = this._FBU.y; // hotspot-y
      var w = this._FBU.width;
      var h = this._FBU.height;
      var pixelslength = w * h * 4;
      var masklength = Math.ceil(w / 8) * h;
      var bytes = pixelslength + masklength;
      if (this._sock.rQwait("cursor encoding", bytes)) {
        return false;
      }

      // Decode from BGRX pixels + bit mask to RGBA
      var pixels = this._sock.rQshiftBytes(pixelslength);
      var mask = this._sock.rQshiftBytes(masklength);
      var rgba = new Uint8Array(w * h * 4);
      var pixIdx = 0;
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var maskIdx = y * Math.ceil(w / 8) + Math.floor(x / 8);
          var alpha = mask[maskIdx] << x % 8 & 0x80 ? 255 : 0;
          rgba[pixIdx] = pixels[pixIdx + 2];
          rgba[pixIdx + 1] = pixels[pixIdx + 1];
          rgba[pixIdx + 2] = pixels[pixIdx];
          rgba[pixIdx + 3] = alpha;
          pixIdx += 4;
        }
      }
      this._updateCursor(rgba, hotx, hoty, w, h);
      return true;
    }
  }, {
    key: "_handleDesktopName",
    value: function _handleDesktopName() {
      if (this._sock.rQwait("DesktopName", 4)) {
        return false;
      }
      var length = this._sock.rQshift32();
      if (this._sock.rQwait("DesktopName", length, 4)) {
        return false;
      }
      var name = this._sock.rQshiftStr(length);
      name = (0, _strings.decodeUTF8)(name, true);
      this._setDesktopName(name);
      return true;
    }
  }, {
    key: "_handleExtendedDesktopSize",
    value: function _handleExtendedDesktopSize() {
      if (this._sock.rQwait("ExtendedDesktopSize", 4)) {
        return false;
      }
      var numberOfScreens = this._sock.rQpeek8();
      var bytes = 4 + numberOfScreens * 16;
      if (this._sock.rQwait("ExtendedDesktopSize", bytes)) {
        return false;
      }
      var firstUpdate = !this._supportsSetDesktopSize;
      this._supportsSetDesktopSize = true;

      // Normally we only apply the current resize mode after a
      // window resize event. However there is no such trigger on the
      // initial connect. And we don't know if the server supports
      // resizing until we've gotten here.
      if (firstUpdate) {
        this._requestRemoteResize();
        RFB.messages.setMaxVideoResolution(this._sock, this._maxVideoResolutionX, this._maxVideoResolutionY);
      }
      this._sock.rQskipBytes(1); // number-of-screens
      this._sock.rQskipBytes(3); // padding

      for (var i = 0; i < numberOfScreens; i += 1) {
        // Save the id and flags of the first screen
        if (i === 0) {
          this._screenID = this._sock.rQshiftBytes(4); // id
          this._sock.rQskipBytes(2); // x-position
          this._sock.rQskipBytes(2); // y-position
          this._sock.rQskipBytes(2); // width
          this._sock.rQskipBytes(2); // height
          this._screenFlags = this._sock.rQshiftBytes(4); // flags
        } else {
          this._sock.rQskipBytes(16);
        }
      }

      /*
       * The x-position indicates the reason for the change:
       *
       *  0 - server resized on its own
       *  1 - this client requested the resize
       *  2 - another client requested the resize
       */

      // We need to handle errors when we requested the resize.
      if (this._FBU.x === 1 && this._FBU.y !== 0) {
        var msg = "";
        // The y-position indicates the status code from the server
        switch (this._FBU.y) {
          case 1:
            msg = "Resize is administratively prohibited";
            break;
          case 2:
            msg = "Out of resources";
            break;
          case 3:
            msg = "Invalid screen layout";
            break;
          default:
            msg = "Unknown reason";
            break;
        }
        Log.Warn("Server did not accept the resize request: " + msg);
      } else {
        this._resize(this._FBU.width, this._FBU.height);
      }
      return true;
    }
  }, {
    key: "_handleDataRect",
    value: function _handleDataRect() {
      var decoder = this._decoders[this._FBU.encoding];
      if (!decoder) {
        this._fail("Unsupported encoding (encoding: " + this._FBU.encoding + ")");
        return false;
      }
      try {
        if (this._transitConnectionState == this.TransitConnectionStates.Udp || this._transitConnectionState == this.TransitConnectionStates.Failure) {
          if (this._transitConnectionState == this.TransitConnectionStates.Udp) {
            Log.Warn("Implicit UDP Transit Failure, TCP rects recieved while in UDP mode.");
            this._udpTransitFailures++;
          }
          this._changeTransitConnectionState(this.TransitConnectionStates.Tcp);
          this._display.clear();
          if (this._useUdp) {
            if (this._udpConnectFailures < 3 && this._udpTransitFailures < 3) {
              setTimeout(function () {
                Log.Warn("Attempting to connect via UDP again after failure.");
                this.enableWebRTC = true;
              }.bind(this), 3000);
            } else {
              Log.Warn("UDP connection failures exceeded limit, remaining on TCP transit.");
            }
          }
        } else if (this._transitConnectionState == this.TransitConnectionStates.Downgrading) {
          this._display.clear();
          this._changeTransitConnectionState(this.TransitConnectionStates.Tcp);
        }
        return decoder.decodeRect(this._FBU.x, this._FBU.y, this._FBU.width, this._FBU.height, this._sock, this._display, this._fbDepth, this._FBU.frame_id);
      } catch (err) {
        this._fail("Error decoding rect: " + err);
        return false;
      }
    }
  }, {
    key: "_updateContinuousUpdates",
    value: function _updateContinuousUpdates() {
      if (!this._enabledContinuousUpdates) {
        return;
      }
      RFB.messages.enableContinuousUpdates(this._sock, true, 0, 0, this._fbWidth, this._fbHeight);
    }
  }, {
    key: "_resize",
    value: function _resize(width, height) {
      this._fbWidth = width;
      this._fbHeight = height;
      this._display.resize(this._fbWidth, this._fbHeight);

      // Adjust the visible viewport based on the new dimensions
      this._updateClip();
      this._updateScale();
      this._updateContinuousUpdates();
    }
  }, {
    key: "_xvpOp",
    value: function _xvpOp(ver, op) {
      if (this._rfbXvpVer < ver) {
        return;
      }
      Log.Info("Sending XVP operation " + op + " (version " + ver + ")");
      RFB.messages.xvpOp(this._sock, ver, op);
    }
  }, {
    key: "_updateCursor",
    value: function _updateCursor(rgba, hotx, hoty, w, h) {
      this._cursorImage = {
        rgbaPixels: rgba,
        hotx: hotx,
        hoty: hoty,
        w: w,
        h: h
      };
      this._refreshCursor();
    }
  }, {
    key: "_shouldShowDotCursor",
    value: function _shouldShowDotCursor() {
      // Called when this._cursorImage is updated
      if (!this._showDotCursor) {
        // User does not want to see the dot, so...
        return false;
      }

      // The dot should not be shown if the cursor is already visible,
      // i.e. contains at least one not-fully-transparent pixel.
      // So iterate through all alpha bytes in rgba and stop at the
      // first non-zero.
      for (var i = 3; i < this._cursorImage.rgbaPixels.length; i += 4) {
        if (this._cursorImage.rgbaPixels[i]) {
          return false;
        }
      }

      // At this point, we know that the cursor is fully transparent, and
      // the user wants to see the dot instead of this.
      return true;
    }
  }, {
    key: "_refreshCursor",
    value: function _refreshCursor() {
      if (this._rfbConnectionState !== "connecting" && this._rfbConnectionState !== "connected") {
        return;
      }
      var image = this._shouldShowDotCursor() ? RFB.cursors.dot : this._cursorImage;
      this._cursor.change(image.rgbaPixels, image.hotx, image.hoty, image.w, image.h);
    }
  }], [{
    key: "genDES",
    value: function genDES(password, challenge) {
      var passwordChars = password.split('').map(function (c) {
        return c.charCodeAt(0);
      });
      return new _des["default"](passwordChars).encrypt(challenge);
    }
  }]);
  return RFB;
}(_eventtarget["default"]); // Class Methods
exports["default"] = RFB;
RFB.messages = {
  keyEvent: function keyEvent(sock, keysym, down) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 4; // msg-type
    buff[offset + 1] = down;
    buff[offset + 2] = 0;
    buff[offset + 3] = 0;
    buff[offset + 4] = keysym >> 24;
    buff[offset + 5] = keysym >> 16;
    buff[offset + 6] = keysym >> 8;
    buff[offset + 7] = keysym;
    sock._sQlen += 8;
    sock.flush();
  },
  QEMUExtendedKeyEvent: function QEMUExtendedKeyEvent(sock, keysym, down, keycode) {
    function getRFBkeycode(xtScanCode) {
      var upperByte = keycode >> 8;
      var lowerByte = keycode & 0x00ff;
      if (upperByte === 0xe0 && lowerByte < 0x7f) {
        return lowerByte | 0x80;
      }
      return xtScanCode;
    }
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 255; // msg-type
    buff[offset + 1] = 0; // sub msg-type

    buff[offset + 2] = down >> 8;
    buff[offset + 3] = down;
    buff[offset + 4] = keysym >> 24;
    buff[offset + 5] = keysym >> 16;
    buff[offset + 6] = keysym >> 8;
    buff[offset + 7] = keysym;
    var RFBkeycode = getRFBkeycode(keycode);
    buff[offset + 8] = RFBkeycode >> 24;
    buff[offset + 9] = RFBkeycode >> 16;
    buff[offset + 10] = RFBkeycode >> 8;
    buff[offset + 11] = RFBkeycode;
    sock._sQlen += 12;
    sock.flush();
  },
  pointerEvent: function pointerEvent(sock, x, y, mask) {
    var dX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var dY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 5; // msg-type

    buff[offset + 1] = mask >> 8;
    buff[offset + 2] = mask;
    buff[offset + 3] = x >> 8;
    buff[offset + 4] = x;
    buff[offset + 5] = y >> 8;
    buff[offset + 6] = y;
    buff[offset + 7] = dX >> 8;
    buff[offset + 8] = dX;
    buff[offset + 9] = dY >> 8;
    buff[offset + 10] = dY;
    sock._sQlen += 11;
    sock.flush();
  },
  // Used to build Notify and Request data.
  _buildExtendedClipboardFlags: function _buildExtendedClipboardFlags(actions, formats) {
    var data = new Uint8Array(4);
    var formatFlag = 0x00000000;
    var actionFlag = 0x00000000;
    for (var i = 0; i < actions.length; i++) {
      actionFlag |= actions[i];
    }
    for (var _i6 = 0; _i6 < formats.length; _i6++) {
      formatFlag |= formats[_i6];
    }
    data[0] = actionFlag >> 24; // Actions
    data[1] = 0x00; // Reserved
    data[2] = 0x00; // Reserved
    data[3] = formatFlag; // Formats

    return data;
  },
  extendedClipboardProvide: function extendedClipboardProvide(sock, formats, inData) {
    // Deflate incomming data and their sizes
    var deflator = new _deflator["default"]();
    var dataToDeflate = [];
    for (var i = 0; i < formats.length; i++) {
      // We only support the format Text at this time
      if (formats[i] != extendedClipboardFormatText) {
        throw new Error("Unsupported extended clipboard format for Provide message.");
      }

      // Change lone \r or \n into \r\n as defined in rfbproto
      inData[i] = inData[i].replace(/\r\n|\r|\n/gm, "\r\n");

      // Check if it already has \0
      var text = (0, _strings.encodeUTF8)(inData[i] + "\0");
      dataToDeflate.push(text.length >> 24 & 0xFF, text.length >> 16 & 0xFF, text.length >> 8 & 0xFF, text.length & 0xFF);
      for (var j = 0; j < text.length; j++) {
        dataToDeflate.push(text.charCodeAt(j));
      }
    }
    var deflatedData = deflator.deflate(new Uint8Array(dataToDeflate));

    // Build data  to send
    var data = new Uint8Array(4 + deflatedData.length);
    data.set(RFB.messages._buildExtendedClipboardFlags([extendedClipboardActionProvide], formats));
    data.set(deflatedData, 4);
    RFB.messages.clientCutText(sock, data, true);
  },
  extendedClipboardNotify: function extendedClipboardNotify(sock, formats) {
    var flags = RFB.messages._buildExtendedClipboardFlags([extendedClipboardActionNotify], formats);
    RFB.messages.clientCutText(sock, flags, true);
  },
  extendedClipboardRequest: function extendedClipboardRequest(sock, formats) {
    var flags = RFB.messages._buildExtendedClipboardFlags([extendedClipboardActionRequest], formats);
    RFB.messages.clientCutText(sock, flags, true);
  },
  extendedClipboardCaps: function extendedClipboardCaps(sock, actions, formats) {
    var formatKeys = Object.keys(formats);
    var data = new Uint8Array(4 + 4 * formatKeys.length);
    formatKeys.map(function (x) {
      return parseInt(x);
    });
    formatKeys.sort(function (a, b) {
      return a - b;
    });
    data.set(RFB.messages._buildExtendedClipboardFlags(actions, []));
    var loopOffset = 4;
    for (var i = 0; i < formatKeys.length; i++) {
      data[loopOffset] = formats[formatKeys[i]] >> 24;
      data[loopOffset + 1] = formats[formatKeys[i]] >> 16;
      data[loopOffset + 2] = formats[formatKeys[i]] >> 8;
      data[loopOffset + 3] = formats[formatKeys[i]] >> 0;
      loopOffset += 4;
      data[3] |= 1 << formatKeys[i]; // Update our format flags
    }

    RFB.messages.clientCutText(sock, data, true);
  },
  clientCutText: function clientCutText(sock, data) {
    var extended = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 6; // msg-type

    buff[offset + 1] = 0; // padding
    buff[offset + 2] = 0; // padding
    buff[offset + 3] = 0; // padding

    var length;
    if (extended) {
      length = (0, _int.toUnsigned32bit)(-data.length);
    } else {
      length = data.length;
    }
    buff[offset + 4] = length >> 24;
    buff[offset + 5] = length >> 16;
    buff[offset + 6] = length >> 8;
    buff[offset + 7] = length;
    sock._sQlen += 8;

    // We have to keep track of from where in the data we begin creating the
    // buffer for the flush in the next iteration.
    var dataOffset = 0;
    var remaining = data.length;
    while (remaining > 0) {
      var flushSize = Math.min(remaining, sock._sQbufferSize - sock._sQlen);
      for (var i = 0; i < flushSize; i++) {
        buff[sock._sQlen + i] = data[dataOffset + i];
      }
      sock._sQlen += flushSize;
      sock.flush();
      remaining -= flushSize;
      dataOffset += flushSize;
    }
  },
  sendBinaryClipboard: function sendBinaryClipboard(sock, dataset, mimes) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 180; // msg-type
    buff[offset + 1] = dataset.length; // how many mime types
    sock._sQlen += 2;
    offset += 2;
    for (var i = 0; i < dataset.length; i++) {
      var mime = mimes[i];
      var data = dataset[i];
      buff[offset++] = mime.length;
      for (var _i7 = 0; _i7 < mime.length; _i7++) {
        buff[offset++] = mime.charCodeAt(_i7); // change to [] if not a string
      }

      var length = data.length;
      Log.Info('Clipboard data sent mime type ' + mime + ' len ' + length);
      buff[offset++] = length >> 24;
      buff[offset++] = length >> 16;
      buff[offset++] = length >> 8;
      buff[offset++] = length;
      sock._sQlen += 1 + mime.length + 4;

      // We have to keep track of from where in the data we begin creating the
      // buffer for the flush in the next iteration.
      var dataOffset = 0;
      var remaining = data.length;
      while (remaining > 0) {
        var flushSize = Math.min(remaining, sock._sQbufferSize - sock._sQlen);
        for (var _i8 = 0; _i8 < flushSize; _i8++) {
          buff[sock._sQlen + _i8] = data[dataOffset + _i8];
        }
        sock._sQlen += flushSize;
        sock.flush();
        remaining -= flushSize;
        dataOffset += flushSize;
      }
      offset = sock._sQlen;
    }
  },
  setDesktopSize: function setDesktopSize(sock, width, height, id, flags) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 251; // msg-type
    buff[offset + 1] = 0; // padding
    buff[offset + 2] = width >> 8; // width
    buff[offset + 3] = width;
    buff[offset + 4] = height >> 8; // height
    buff[offset + 5] = height;
    buff[offset + 6] = 1; // number-of-screens
    buff[offset + 7] = 0; // padding

    // screen array
    buff[offset + 8] = id >> 24; // id
    buff[offset + 9] = id >> 16;
    buff[offset + 10] = id >> 8;
    buff[offset + 11] = id;
    buff[offset + 12] = 0; // x-position
    buff[offset + 13] = 0;
    buff[offset + 14] = 0; // y-position
    buff[offset + 15] = 0;
    buff[offset + 16] = width >> 8; // width
    buff[offset + 17] = width;
    buff[offset + 18] = height >> 8; // height
    buff[offset + 19] = height;
    buff[offset + 20] = flags >> 24; // flags
    buff[offset + 21] = flags >> 16;
    buff[offset + 22] = flags >> 8;
    buff[offset + 23] = flags;
    sock._sQlen += 24;
    sock.flush();
  },
  setMaxVideoResolution: function setMaxVideoResolution(sock, width, height) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 252; // msg-type
    buff[offset + 1] = width >> 8; // width
    buff[offset + 2] = width;
    buff[offset + 3] = height >> 8; // height
    buff[offset + 4] = height;
    sock._sQlen += 5;
    sock.flush();
  },
  clientFence: function clientFence(sock, flags, payload) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 248; // msg-type

    buff[offset + 1] = 0; // padding
    buff[offset + 2] = 0; // padding
    buff[offset + 3] = 0; // padding

    buff[offset + 4] = flags >> 24; // flags
    buff[offset + 5] = flags >> 16;
    buff[offset + 6] = flags >> 8;
    buff[offset + 7] = flags;
    var n = payload.length;
    buff[offset + 8] = n; // length

    for (var i = 0; i < n; i++) {
      buff[offset + 9 + i] = payload.charCodeAt(i);
    }
    sock._sQlen += 9 + n;
    sock.flush();
  },
  requestStats: function requestStats(sock) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    if (buff == null) {
      return;
    }
    buff[offset] = 178; // msg-type

    buff[offset + 1] = 0; // padding
    buff[offset + 2] = 0; // padding
    buff[offset + 3] = 0; // padding

    sock._sQlen += 4;
    sock.flush();
  },
  sendFrameStats: function sendFrameStats(sock, allMs, renderMs) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    if (buff == null) {
      return;
    }
    buff[offset] = 179; // msg-type

    buff[offset + 1] = 0; // padding
    buff[offset + 2] = 0; // padding
    buff[offset + 3] = 0; // padding

    buff[offset + 4] = allMs >> 24;
    buff[offset + 5] = allMs >> 16;
    buff[offset + 6] = allMs >> 8;
    buff[offset + 7] = allMs;
    buff[offset + 8] = renderMs >> 24;
    buff[offset + 9] = renderMs >> 16;
    buff[offset + 10] = renderMs >> 8;
    buff[offset + 11] = renderMs;
    sock._sQlen += 12;
    sock.flush();
  },
  enableContinuousUpdates: function enableContinuousUpdates(sock, enable, x, y, width, height) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 150; // msg-type
    buff[offset + 1] = enable; // enable-flag

    buff[offset + 2] = x >> 8; // x
    buff[offset + 3] = x;
    buff[offset + 4] = y >> 8; // y
    buff[offset + 5] = y;
    buff[offset + 6] = width >> 8; // width
    buff[offset + 7] = width;
    buff[offset + 8] = height >> 8; // height
    buff[offset + 9] = height;
    sock._sQlen += 10;
    sock.flush();
  },
  pixelFormat: function pixelFormat(sock, depth, trueColor) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    var bpp;
    if (depth > 16) {
      bpp = 32;
    } else if (depth > 8) {
      bpp = 16;
    } else {
      bpp = 8;
    }
    var bits = Math.floor(depth / 3);
    buff[offset] = 0; // msg-type

    buff[offset + 1] = 0; // padding
    buff[offset + 2] = 0; // padding
    buff[offset + 3] = 0; // padding

    buff[offset + 4] = bpp; // bits-per-pixel
    buff[offset + 5] = depth; // depth
    buff[offset + 6] = 0; // little-endian
    buff[offset + 7] = trueColor ? 1 : 0; // true-color

    buff[offset + 8] = 0; // red-max
    buff[offset + 9] = (1 << bits) - 1; // red-max

    buff[offset + 10] = 0; // green-max
    buff[offset + 11] = (1 << bits) - 1; // green-max

    buff[offset + 12] = 0; // blue-max
    buff[offset + 13] = (1 << bits) - 1; // blue-max

    buff[offset + 14] = bits * 0; // red-shift
    buff[offset + 15] = bits * 1; // green-shift
    buff[offset + 16] = bits * 2; // blue-shift

    buff[offset + 17] = 0; // padding
    buff[offset + 18] = 0; // padding
    buff[offset + 19] = 0; // padding

    sock._sQlen += 20;
    sock.flush();
  },
  clientEncodings: function clientEncodings(sock, encodings) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 2; // msg-type
    buff[offset + 1] = 0; // padding

    buff[offset + 2] = encodings.length >> 8;
    buff[offset + 3] = encodings.length;
    var j = offset + 4;
    for (var i = 0; i < encodings.length; i++) {
      var enc = encodings[i];
      buff[j] = enc >> 24;
      buff[j + 1] = enc >> 16;
      buff[j + 2] = enc >> 8;
      buff[j + 3] = enc;
      j += 4;
    }
    sock._sQlen += j - offset;
    sock.flush();
  },
  fbUpdateRequest: function fbUpdateRequest(sock, incremental, x, y, w, h) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    if (typeof x === "undefined") {
      x = 0;
    }
    if (typeof y === "undefined") {
      y = 0;
    }
    buff[offset] = 3; // msg-type
    buff[offset + 1] = incremental ? 1 : 0;
    buff[offset + 2] = x >> 8 & 0xFF;
    buff[offset + 3] = x & 0xFF;
    buff[offset + 4] = y >> 8 & 0xFF;
    buff[offset + 5] = y & 0xFF;
    buff[offset + 6] = w >> 8 & 0xFF;
    buff[offset + 7] = w & 0xFF;
    buff[offset + 8] = h >> 8 & 0xFF;
    buff[offset + 9] = h & 0xFF;
    sock._sQlen += 10;
    sock.flush();
  },
  xvpOp: function xvpOp(sock, ver, op) {
    var buff = sock._sQ;
    var offset = sock._sQlen;
    buff[offset] = 250; // msg-type
    buff[offset + 1] = 0; // padding

    buff[offset + 2] = ver;
    buff[offset + 3] = op;
    sock._sQlen += 4;
    sock.flush();
  }
};
RFB.cursors = {
  none: {
    rgbaPixels: new Uint8Array(),
    w: 0,
    h: 0,
    hotx: 0,
    hoty: 0
  },
  dot: {
    /* eslint-disable indent */
    rgbaPixels: new Uint8Array([255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255]),
    /* eslint-enable indent */
    w: 3,
    h: 3,
    hotx: 1,
    hoty: 1
  }
};