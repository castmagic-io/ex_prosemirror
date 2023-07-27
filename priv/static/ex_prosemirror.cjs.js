var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// js/index.js
__export(exports, {
  ExEditorView: () => ExEditorView,
  ExProsemirrorHooks: () => ExProsemirrorHooks,
  baseKeymap: () => baseKeymap,
  blocks: () => blocks,
  createSchema: () => schema_default,
  default: () => js_default,
  generateSchemaMarks: () => generateSchemaMarks,
  generateSchemablocks: () => generateSchemablocks,
  hardBreakKeymap: () => hardBreakKeymap,
  icons: () => icons2,
  insertPlaceholder: () => insertPlaceholder,
  keymap: () => keymap,
  marks: () => marks,
  menu: () => menu_exports,
  placeholderPlugin: () => placeholderPlugin,
  replacePlaceholder: () => replacePlaceholder
});

// js/ExEditorView.js
var import_prosemirror_model4 = __toModule(require("prosemirror-model"));
var import_prosemirror_state5 = __toModule(require("prosemirror-state"));
var import_prosemirror_view2 = __toModule(require("prosemirror-view"));

// js/prosemirror/plugins/placeholder.js
var import_prosemirror_state = __toModule(require("prosemirror-state"));
var import_prosemirror_view = __toModule(require("prosemirror-view"));
var placeholderPlugin = new import_prosemirror_state.Plugin({
  state: {
    init() {
      return import_prosemirror_view.DecorationSet.empty;
    },
    apply(tr, set) {
      set = set.map(tr.mapping, tr.doc);
      let action = tr.getMeta(this);
      if (action && action.add) {
        let widget = document.createElement("placeholder");
        let deco = import_prosemirror_view.Decoration.widget(action.add.pos, widget, { id: action.add.id });
        set = set.add(tr.doc, [deco]);
      } else if (action && action.remove) {
        set = set.remove(set.find(null, null, (spec) => spec.id == action.remove.id));
      }
      return set;
    }
  },
  props: {
    decorations(state) {
      return this.getState(state);
    }
  }
});
function insertPlaceholder(exEditorView, { nodeType }) {
  let id = {};
  let tr = exEditorView.editorView.state.tr;
  if (!tr.selection.empty) {
    tr.deleteSelection();
  }
  exEditorView.editorNode.addEventListener("replacePlaceholder", function(e) {
    replacePlaceholder(exEditorView, e);
  });
  tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
  exEditorView.editorView.dispatch(tr);
  const msg = { detail: { nodeType, id, tr } };
  exEditorView.editorNode.dispatchEvent(new CustomEvent("insertPlaceholder", msg));
}
function replacePlaceholder(exEditorView, { detail }) {
  const pos = findPlaceholder(exEditorView.editorView.state, detail.id);
  if (pos == null)
    return;
  dispatchReplace({
    node: detail.callback(exEditorView.editorView.state.schema.nodes),
    id: detail.id,
    pos,
    exEditorView
  });
}
function dispatchReplace({ exEditorView, id, pos, node }) {
  exEditorView.editorView.dispatch(exEditorView.editorView.state.tr.replaceWith(pos, pos, node).setMeta(placeholderPlugin, { remove: { id } }));
}
function findPlaceholder(state, id) {
  let decos = placeholderPlugin.getState(state);
  let found = decos.find(null, null, (spec) => spec.id == id);
  return found.length ? found[0].from : null;
}

// js/prosemirror/schema.js
var import_prosemirror_model3 = __toModule(require("prosemirror-model"));

// js/prosemirror/marks/index.js
var import_prosemirror_schema_basic = __toModule(require("prosemirror-schema-basic"));

// js/prosemirror/menu.js
var menu_exports = {};
__export(menu_exports, {
  cmdItem: () => cmdItem,
  generateColorsMenu: () => generateColorsMenu,
  generateFontFamilyMenu: () => generateFontFamilyMenu,
  generateHTMLItem: () => generateHTMLItem,
  generateHeadingItem: () => generateHeadingItem,
  generateMarkItem: () => generateMarkItem,
  generateMediaMenu: () => generateMediaMenu,
  generateMultiMarkItem: () => generateMultiMarkItem,
  generateParagraphItem: () => generateParagraphItem,
  markActive: () => markActive,
  markItem: () => markItem,
  menuHelper: () => menuHelper,
  multiMarkItem: () => multiMarkItem
});

// node_modules/crelt/index.es.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string")
    elt = document.createElement(elt);
  var i = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next)
      if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string")
          elt.setAttribute(name, value);
        else if (value != null)
          elt[name] = value;
      }
    i++;
  }
  for (; i < arguments.length; i++)
    add(elt, arguments[i]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++)
      add(elt, child[i]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// node_modules/prosemirror-transform/dist/index.es.js
var import_prosemirror_model = __toModule(require("prosemirror-model"));
var lower16 = 65535;
var factor16 = Math.pow(2, 16);
function makeRecover(index, offset2) {
  return index + offset2 * factor16;
}
function recoverIndex(value) {
  return value & lower16;
}
function recoverOffset(value) {
  return (value - (value & lower16)) / factor16;
}
var MapResult = function MapResult2(pos, deleted, recover2) {
  if (deleted === void 0)
    deleted = false;
  if (recover2 === void 0)
    recover2 = null;
  this.pos = pos;
  this.deleted = deleted;
  this.recover = recover2;
};
var StepMap = function StepMap2(ranges, inverted) {
  if (inverted === void 0)
    inverted = false;
  if (!ranges.length && StepMap2.empty) {
    return StepMap2.empty;
  }
  this.ranges = ranges;
  this.inverted = inverted;
};
StepMap.prototype.recover = function recover(value) {
  var diff = 0, index = recoverIndex(value);
  if (!this.inverted) {
    for (var i = 0; i < index; i++) {
      diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    }
  }
  return this.ranges[index * 3] + diff + recoverOffset(value);
};
StepMap.prototype.mapResult = function mapResult(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, false);
};
StepMap.prototype.map = function map(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, true);
};
StepMap.prototype._map = function _map(pos, assoc, simple) {
  var diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0; i < this.ranges.length; i += 3) {
    var start = this.ranges[i] - (this.inverted ? diff : 0);
    if (start > pos) {
      break;
    }
    var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end = start + oldSize;
    if (pos <= end) {
      var side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
      var result = start + diff + (side < 0 ? 0 : newSize);
      if (simple) {
        return result;
      }
      var recover2 = pos == (assoc < 0 ? start : end) ? null : makeRecover(i / 3, pos - start);
      return new MapResult(result, assoc < 0 ? pos != start : pos != end, recover2);
    }
    diff += newSize - oldSize;
  }
  return simple ? pos + diff : new MapResult(pos + diff);
};
StepMap.prototype.touches = function touches(pos, recover2) {
  var diff = 0, index = recoverIndex(recover2);
  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0; i < this.ranges.length; i += 3) {
    var start = this.ranges[i] - (this.inverted ? diff : 0);
    if (start > pos) {
      break;
    }
    var oldSize = this.ranges[i + oldIndex], end = start + oldSize;
    if (pos <= end && i == index * 3) {
      return true;
    }
    diff += this.ranges[i + newIndex] - oldSize;
  }
  return false;
};
StepMap.prototype.forEach = function forEach(f) {
  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0, diff = 0; i < this.ranges.length; i += 3) {
    var start = this.ranges[i], oldStart = start - (this.inverted ? diff : 0), newStart = start + (this.inverted ? 0 : diff);
    var oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
    f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
    diff += newSize - oldSize;
  }
};
StepMap.prototype.invert = function invert() {
  return new StepMap(this.ranges, !this.inverted);
};
StepMap.prototype.toString = function toString() {
  return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
};
StepMap.offset = function offset(n) {
  return n == 0 ? StepMap.empty : new StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
};
StepMap.empty = new StepMap([]);
var Mapping = function Mapping2(maps, mirror, from2, to) {
  this.maps = maps || [];
  this.from = from2 || 0;
  this.to = to == null ? this.maps.length : to;
  this.mirror = mirror;
};
Mapping.prototype.slice = function slice(from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.maps.length;
  return new Mapping(this.maps, this.mirror, from2, to);
};
Mapping.prototype.copy = function copy() {
  return new Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
};
Mapping.prototype.appendMap = function appendMap(map5, mirrors) {
  this.to = this.maps.push(map5);
  if (mirrors != null) {
    this.setMirror(this.maps.length - 1, mirrors);
  }
};
Mapping.prototype.appendMapping = function appendMapping(mapping) {
  for (var i = 0, startSize = this.maps.length; i < mapping.maps.length; i++) {
    var mirr = mapping.getMirror(i);
    this.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : null);
  }
};
Mapping.prototype.getMirror = function getMirror(n) {
  if (this.mirror) {
    for (var i = 0; i < this.mirror.length; i++) {
      if (this.mirror[i] == n) {
        return this.mirror[i + (i % 2 ? -1 : 1)];
      }
    }
  }
};
Mapping.prototype.setMirror = function setMirror(n, m) {
  if (!this.mirror) {
    this.mirror = [];
  }
  this.mirror.push(n, m);
};
Mapping.prototype.appendMappingInverted = function appendMappingInverted(mapping) {
  for (var i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--) {
    var mirr = mapping.getMirror(i);
    this.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : null);
  }
};
Mapping.prototype.invert = function invert2() {
  var inverse = new Mapping();
  inverse.appendMappingInverted(this);
  return inverse;
};
Mapping.prototype.map = function map2(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  if (this.mirror) {
    return this._map(pos, assoc, true);
  }
  for (var i = this.from; i < this.to; i++) {
    pos = this.maps[i].map(pos, assoc);
  }
  return pos;
};
Mapping.prototype.mapResult = function mapResult2(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, false);
};
Mapping.prototype._map = function _map2(pos, assoc, simple) {
  var deleted = false;
  for (var i = this.from; i < this.to; i++) {
    var map5 = this.maps[i], result = map5.mapResult(pos, assoc);
    if (result.recover != null) {
      var corr = this.getMirror(i);
      if (corr != null && corr > i && corr < this.to) {
        i = corr;
        pos = this.maps[corr].recover(result.recover);
        continue;
      }
    }
    if (result.deleted) {
      deleted = true;
    }
    pos = result.pos;
  }
  return simple ? pos : new MapResult(pos, deleted);
};
function TransformError(message) {
  var err = Error.call(this, message);
  err.__proto__ = TransformError.prototype;
  return err;
}
TransformError.prototype = Object.create(Error.prototype);
TransformError.prototype.constructor = TransformError;
TransformError.prototype.name = "TransformError";
var Transform = function Transform2(doc) {
  this.doc = doc;
  this.steps = [];
  this.docs = [];
  this.mapping = new Mapping();
};
var prototypeAccessors = { before: { configurable: true }, docChanged: { configurable: true } };
prototypeAccessors.before.get = function() {
  return this.docs.length ? this.docs[0] : this.doc;
};
Transform.prototype.step = function step(object) {
  var result = this.maybeStep(object);
  if (result.failed) {
    throw new TransformError(result.failed);
  }
  return this;
};
Transform.prototype.maybeStep = function maybeStep(step2) {
  var result = step2.apply(this.doc);
  if (!result.failed) {
    this.addStep(step2, result.doc);
  }
  return result;
};
prototypeAccessors.docChanged.get = function() {
  return this.steps.length > 0;
};
Transform.prototype.addStep = function addStep(step2, doc) {
  this.docs.push(this.doc);
  this.steps.push(step2);
  this.mapping.appendMap(step2.getMap());
  this.doc = doc;
};
Object.defineProperties(Transform.prototype, prototypeAccessors);
function mustOverride() {
  throw new Error("Override me");
}
var stepsByID = Object.create(null);
var Step = function Step2() {
};
Step.prototype.apply = function apply(_doc) {
  return mustOverride();
};
Step.prototype.getMap = function getMap() {
  return StepMap.empty;
};
Step.prototype.invert = function invert3(_doc) {
  return mustOverride();
};
Step.prototype.map = function map3(_mapping) {
  return mustOverride();
};
Step.prototype.merge = function merge(_other) {
  return null;
};
Step.prototype.toJSON = function toJSON() {
  return mustOverride();
};
Step.fromJSON = function fromJSON(schema, json) {
  if (!json || !json.stepType) {
    throw new RangeError("Invalid input for Step.fromJSON");
  }
  var type = stepsByID[json.stepType];
  if (!type) {
    throw new RangeError("No step type " + json.stepType + " defined");
  }
  return type.fromJSON(schema, json);
};
Step.jsonID = function jsonID(id, stepClass) {
  if (id in stepsByID) {
    throw new RangeError("Duplicate use of step JSON ID " + id);
  }
  stepsByID[id] = stepClass;
  stepClass.prototype.jsonID = id;
  return stepClass;
};
var StepResult = function StepResult2(doc, failed) {
  this.doc = doc;
  this.failed = failed;
};
StepResult.ok = function ok(doc) {
  return new StepResult(doc, null);
};
StepResult.fail = function fail(message) {
  return new StepResult(null, message);
};
StepResult.fromReplace = function fromReplace(doc, from2, to, slice3) {
  try {
    return StepResult.ok(doc.replace(from2, to, slice3));
  } catch (e) {
    if (e instanceof import_prosemirror_model.ReplaceError) {
      return StepResult.fail(e.message);
    }
    throw e;
  }
};
var ReplaceStep = /* @__PURE__ */ function(Step3) {
  function ReplaceStep2(from2, to, slice3, structure) {
    Step3.call(this);
    this.from = from2;
    this.to = to;
    this.slice = slice3;
    this.structure = !!structure;
  }
  if (Step3)
    ReplaceStep2.__proto__ = Step3;
  ReplaceStep2.prototype = Object.create(Step3 && Step3.prototype);
  ReplaceStep2.prototype.constructor = ReplaceStep2;
  ReplaceStep2.prototype.apply = function apply2(doc) {
    if (this.structure && contentBetween(doc, this.from, this.to)) {
      return StepResult.fail("Structure replace would overwrite content");
    }
    return StepResult.fromReplace(doc, this.from, this.to, this.slice);
  };
  ReplaceStep2.prototype.getMap = function getMap2() {
    return new StepMap([this.from, this.to - this.from, this.slice.size]);
  };
  ReplaceStep2.prototype.invert = function invert4(doc) {
    return new ReplaceStep2(this.from, this.from + this.slice.size, doc.slice(this.from, this.to));
  };
  ReplaceStep2.prototype.map = function map5(mapping) {
    var from2 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from2.deleted && to.deleted) {
      return null;
    }
    return new ReplaceStep2(from2.pos, Math.max(from2.pos, to.pos), this.slice);
  };
  ReplaceStep2.prototype.merge = function merge3(other) {
    if (!(other instanceof ReplaceStep2) || other.structure || this.structure) {
      return null;
    }
    if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
      var slice3 = this.slice.size + other.slice.size == 0 ? import_prosemirror_model.Slice.empty : new import_prosemirror_model.Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
      return new ReplaceStep2(this.from, this.to + (other.to - other.from), slice3, this.structure);
    } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
      var slice$1 = this.slice.size + other.slice.size == 0 ? import_prosemirror_model.Slice.empty : new import_prosemirror_model.Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
      return new ReplaceStep2(other.from, this.to, slice$1, this.structure);
    } else {
      return null;
    }
  };
  ReplaceStep2.prototype.toJSON = function toJSON2() {
    var json = { stepType: "replace", from: this.from, to: this.to };
    if (this.slice.size) {
      json.slice = this.slice.toJSON();
    }
    if (this.structure) {
      json.structure = true;
    }
    return json;
  };
  ReplaceStep2.fromJSON = function fromJSON2(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    }
    return new ReplaceStep2(json.from, json.to, import_prosemirror_model.Slice.fromJSON(schema, json.slice), !!json.structure);
  };
  return ReplaceStep2;
}(Step);
Step.jsonID("replace", ReplaceStep);
var ReplaceAroundStep = /* @__PURE__ */ function(Step3) {
  function ReplaceAroundStep2(from2, to, gapFrom, gapTo, slice3, insert, structure) {
    Step3.call(this);
    this.from = from2;
    this.to = to;
    this.gapFrom = gapFrom;
    this.gapTo = gapTo;
    this.slice = slice3;
    this.insert = insert;
    this.structure = !!structure;
  }
  if (Step3)
    ReplaceAroundStep2.__proto__ = Step3;
  ReplaceAroundStep2.prototype = Object.create(Step3 && Step3.prototype);
  ReplaceAroundStep2.prototype.constructor = ReplaceAroundStep2;
  ReplaceAroundStep2.prototype.apply = function apply2(doc) {
    if (this.structure && (contentBetween(doc, this.from, this.gapFrom) || contentBetween(doc, this.gapTo, this.to))) {
      return StepResult.fail("Structure gap-replace would overwrite content");
    }
    var gap = doc.slice(this.gapFrom, this.gapTo);
    if (gap.openStart || gap.openEnd) {
      return StepResult.fail("Gap is not a flat range");
    }
    var inserted = this.slice.insertAt(this.insert, gap.content);
    if (!inserted) {
      return StepResult.fail("Content does not fit in gap");
    }
    return StepResult.fromReplace(doc, this.from, this.to, inserted);
  };
  ReplaceAroundStep2.prototype.getMap = function getMap2() {
    return new StepMap([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  };
  ReplaceAroundStep2.prototype.invert = function invert4(doc) {
    var gap = this.gapTo - this.gapFrom;
    return new ReplaceAroundStep2(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  };
  ReplaceAroundStep2.prototype.map = function map5(mapping) {
    var from2 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    var gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
    if (from2.deleted && to.deleted || gapFrom < from2.pos || gapTo > to.pos) {
      return null;
    }
    return new ReplaceAroundStep2(from2.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
  };
  ReplaceAroundStep2.prototype.toJSON = function toJSON2() {
    var json = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    if (this.slice.size) {
      json.slice = this.slice.toJSON();
    }
    if (this.structure) {
      json.structure = true;
    }
    return json;
  };
  ReplaceAroundStep2.fromJSON = function fromJSON2(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") {
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    }
    return new ReplaceAroundStep2(json.from, json.to, json.gapFrom, json.gapTo, import_prosemirror_model.Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
  };
  return ReplaceAroundStep2;
}(Step);
Step.jsonID("replaceAround", ReplaceAroundStep);
function contentBetween(doc, from2, to) {
  var $from = doc.resolve(from2), dist = to - from2, depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    var next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf) {
        return true;
      }
      next = next.firstChild;
      dist--;
    }
  }
  return false;
}
function canCut(node, start, end) {
  return (start == 0 || node.canReplace(start, node.childCount)) && (end == node.childCount || node.canReplace(0, end));
}
function liftTarget(range) {
  var parent = range.parent;
  var content = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (var depth = range.depth; ; --depth) {
    var node = range.$from.node(depth);
    var index = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node.canReplace(index, endIndex, content)) {
      return depth;
    }
    if (depth == 0 || node.type.spec.isolating || !canCut(node, index, endIndex)) {
      break;
    }
  }
}
Transform.prototype.lift = function(range, target) {
  var $from = range.$from;
  var $to = range.$to;
  var depth = range.depth;
  var gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
  var start = gapStart, end = gapEnd;
  var before = import_prosemirror_model.Fragment.empty, openStart = 0;
  for (var d = depth, splitting = false; d > target; d--) {
    if (splitting || $from.index(d) > 0) {
      splitting = true;
      before = import_prosemirror_model.Fragment.from($from.node(d).copy(before));
      openStart++;
    } else {
      start--;
    }
  }
  var after = import_prosemirror_model.Fragment.empty, openEnd = 0;
  for (var d$1 = depth, splitting$1 = false; d$1 > target; d$1--) {
    if (splitting$1 || $to.after(d$1 + 1) < $to.end(d$1)) {
      splitting$1 = true;
      after = import_prosemirror_model.Fragment.from($to.node(d$1).copy(after));
      openEnd++;
    } else {
      end++;
    }
  }
  return this.step(new ReplaceAroundStep(start, end, gapStart, gapEnd, new import_prosemirror_model.Slice(before.append(after), openStart, openEnd), before.size - openStart, true));
};
Transform.prototype.wrap = function(range, wrappers) {
  var content = import_prosemirror_model.Fragment.empty;
  for (var i = wrappers.length - 1; i >= 0; i--) {
    if (content.size) {
      var match = wrappers[i].type.contentMatch.matchFragment(content);
      if (!match || !match.validEnd) {
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
      }
    }
    content = import_prosemirror_model.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content));
  }
  var start = range.start, end = range.end;
  return this.step(new ReplaceAroundStep(start, end, start, end, new import_prosemirror_model.Slice(content, 0, 0), wrappers.length, true));
};
Transform.prototype.setBlockType = function(from2, to, type, attrs) {
  var this$1 = this;
  if (to === void 0)
    to = from2;
  if (!type.isTextblock) {
    throw new RangeError("Type given to setBlockType should be a textblock");
  }
  var mapFrom = this.steps.length;
  this.doc.nodesBetween(from2, to, function(node, pos) {
    if (node.isTextblock && !node.hasMarkup(type, attrs) && canChangeType(this$1.doc, this$1.mapping.slice(mapFrom).map(pos), type)) {
      this$1.clearIncompatible(this$1.mapping.slice(mapFrom).map(pos, 1), type);
      var mapping = this$1.mapping.slice(mapFrom);
      var startM = mapping.map(pos, 1), endM = mapping.map(pos + node.nodeSize, 1);
      this$1.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(type.create(attrs, null, node.marks)), 0, 0), 1, true));
      return false;
    }
  });
  return this;
};
function canChangeType(doc, pos, type) {
  var $pos = doc.resolve(pos), index = $pos.index();
  return $pos.parent.canReplaceWith(index, index + 1, type);
}
Transform.prototype.setNodeMarkup = function(pos, type, attrs, marks2) {
  var node = this.doc.nodeAt(pos);
  if (!node) {
    throw new RangeError("No node at given position");
  }
  if (!type) {
    type = node.type;
  }
  var newNode = type.create(attrs, null, marks2 || node.marks);
  if (node.isLeaf) {
    return this.replaceWith(pos, pos + node.nodeSize, newNode);
  }
  if (!type.validContent(node.content)) {
    throw new RangeError("Invalid content for node type " + type.name);
  }
  return this.step(new ReplaceAroundStep(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1, new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(newNode), 0, 0), 1, true));
};
function canSplit(doc, pos, depth, typesAfter) {
  if (depth === void 0)
    depth = 1;
  var $pos = doc.resolve(pos), base2 = $pos.depth - depth;
  var innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
  if (base2 < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) {
    return false;
  }
  for (var d = $pos.depth - 1, i = depth - 2; d > base2; d--, i--) {
    var node = $pos.node(d), index$1 = $pos.index(d);
    if (node.type.spec.isolating) {
      return false;
    }
    var rest = node.content.cutByIndex(index$1, node.childCount);
    var after = typesAfter && typesAfter[i] || node;
    if (after != node) {
      rest = rest.replaceChild(0, after.type.create(after.attrs));
    }
    if (!node.canReplace(index$1 + 1, node.childCount) || !after.type.validContent(rest)) {
      return false;
    }
  }
  var index = $pos.indexAfter(base2);
  var baseType = typesAfter && typesAfter[0];
  return $pos.node(base2).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base2 + 1).type);
}
Transform.prototype.split = function(pos, depth, typesAfter) {
  if (depth === void 0)
    depth = 1;
  var $pos = this.doc.resolve(pos), before = import_prosemirror_model.Fragment.empty, after = import_prosemirror_model.Fragment.empty;
  for (var d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
    before = import_prosemirror_model.Fragment.from($pos.node(d).copy(before));
    var typeAfter = typesAfter && typesAfter[i];
    after = import_prosemirror_model.Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
  }
  return this.step(new ReplaceStep(pos, pos, new import_prosemirror_model.Slice(before.append(after), depth, depth), true));
};
function canJoin(doc, pos) {
  var $pos = doc.resolve(pos), index = $pos.index();
  return joinable($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index, index + 1);
}
function joinable(a, b) {
  return a && b && !a.isLeaf && a.canAppend(b);
}
function joinPoint(doc, pos, dir) {
  if (dir === void 0)
    dir = -1;
  var $pos = doc.resolve(pos);
  for (var d = $pos.depth; ; d--) {
    var before = void 0, after = void 0, index = $pos.index(d);
    if (d == $pos.depth) {
      before = $pos.nodeBefore;
      after = $pos.nodeAfter;
    } else if (dir > 0) {
      before = $pos.node(d + 1);
      index++;
      after = $pos.node(d).maybeChild(index);
    } else {
      before = $pos.node(d).maybeChild(index - 1);
      after = $pos.node(d + 1);
    }
    if (before && !before.isTextblock && joinable(before, after) && $pos.node(d).canReplace(index, index + 1)) {
      return pos;
    }
    if (d == 0) {
      break;
    }
    pos = dir < 0 ? $pos.before(d) : $pos.after(d);
  }
}
Transform.prototype.join = function(pos, depth) {
  if (depth === void 0)
    depth = 1;
  var step2 = new ReplaceStep(pos - depth, pos + depth, import_prosemirror_model.Slice.empty, true);
  return this.step(step2);
};
function insertPoint(doc, pos, nodeType) {
  var $pos = doc.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) {
    return pos;
  }
  if ($pos.parentOffset == 0) {
    for (var d = $pos.depth - 1; d >= 0; d--) {
      var index = $pos.index(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType)) {
        return $pos.before(d + 1);
      }
      if (index > 0) {
        return null;
      }
    }
  }
  if ($pos.parentOffset == $pos.parent.content.size) {
    for (var d$1 = $pos.depth - 1; d$1 >= 0; d$1--) {
      var index$1 = $pos.indexAfter(d$1);
      if ($pos.node(d$1).canReplaceWith(index$1, index$1, nodeType)) {
        return $pos.after(d$1 + 1);
      }
      if (index$1 < $pos.node(d$1).childCount) {
        return null;
      }
    }
  }
}
function mapFragment(fragment, f, parent) {
  var mapped = [];
  for (var i = 0; i < fragment.childCount; i++) {
    var child = fragment.child(i);
    if (child.content.size) {
      child = child.copy(mapFragment(child.content, f, child));
    }
    if (child.isInline) {
      child = f(child, parent, i);
    }
    mapped.push(child);
  }
  return import_prosemirror_model.Fragment.fromArray(mapped);
}
var AddMarkStep = /* @__PURE__ */ function(Step3) {
  function AddMarkStep2(from2, to, mark) {
    Step3.call(this);
    this.from = from2;
    this.to = to;
    this.mark = mark;
  }
  if (Step3)
    AddMarkStep2.__proto__ = Step3;
  AddMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
  AddMarkStep2.prototype.constructor = AddMarkStep2;
  AddMarkStep2.prototype.apply = function apply2(doc) {
    var this$1 = this;
    var oldSlice = doc.slice(this.from, this.to), $from = doc.resolve(this.from);
    var parent = $from.node($from.sharedDepth(this.to));
    var slice3 = new import_prosemirror_model.Slice(mapFragment(oldSlice.content, function(node, parent2) {
      if (!node.isAtom || !parent2.type.allowsMarkType(this$1.mark.type)) {
        return node;
      }
      return node.mark(this$1.mark.addToSet(node.marks));
    }, parent), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice3);
  };
  AddMarkStep2.prototype.invert = function invert4() {
    return new RemoveMarkStep(this.from, this.to, this.mark);
  };
  AddMarkStep2.prototype.map = function map5(mapping) {
    var from2 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from2.deleted && to.deleted || from2.pos >= to.pos) {
      return null;
    }
    return new AddMarkStep2(from2.pos, to.pos, this.mark);
  };
  AddMarkStep2.prototype.merge = function merge3(other) {
    if (other instanceof AddMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
      return new AddMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  };
  AddMarkStep2.prototype.toJSON = function toJSON2() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  };
  AddMarkStep2.fromJSON = function fromJSON2(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    }
    return new AddMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
  };
  return AddMarkStep2;
}(Step);
Step.jsonID("addMark", AddMarkStep);
var RemoveMarkStep = /* @__PURE__ */ function(Step3) {
  function RemoveMarkStep2(from2, to, mark) {
    Step3.call(this);
    this.from = from2;
    this.to = to;
    this.mark = mark;
  }
  if (Step3)
    RemoveMarkStep2.__proto__ = Step3;
  RemoveMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
  RemoveMarkStep2.prototype.constructor = RemoveMarkStep2;
  RemoveMarkStep2.prototype.apply = function apply2(doc) {
    var this$1 = this;
    var oldSlice = doc.slice(this.from, this.to);
    var slice3 = new import_prosemirror_model.Slice(mapFragment(oldSlice.content, function(node) {
      return node.mark(this$1.mark.removeFromSet(node.marks));
    }), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice3);
  };
  RemoveMarkStep2.prototype.invert = function invert4() {
    return new AddMarkStep(this.from, this.to, this.mark);
  };
  RemoveMarkStep2.prototype.map = function map5(mapping) {
    var from2 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from2.deleted && to.deleted || from2.pos >= to.pos) {
      return null;
    }
    return new RemoveMarkStep2(from2.pos, to.pos, this.mark);
  };
  RemoveMarkStep2.prototype.merge = function merge3(other) {
    if (other instanceof RemoveMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
      return new RemoveMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  };
  RemoveMarkStep2.prototype.toJSON = function toJSON2() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  };
  RemoveMarkStep2.fromJSON = function fromJSON2(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    }
    return new RemoveMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
  };
  return RemoveMarkStep2;
}(Step);
Step.jsonID("removeMark", RemoveMarkStep);
Transform.prototype.addMark = function(from2, to, mark) {
  var this$1 = this;
  var removed = [], added = [], removing = null, adding = null;
  this.doc.nodesBetween(from2, to, function(node, pos, parent) {
    if (!node.isInline) {
      return;
    }
    var marks2 = node.marks;
    if (!mark.isInSet(marks2) && parent.type.allowsMarkType(mark.type)) {
      var start = Math.max(pos, from2), end = Math.min(pos + node.nodeSize, to);
      var newSet = mark.addToSet(marks2);
      for (var i = 0; i < marks2.length; i++) {
        if (!marks2[i].isInSet(newSet)) {
          if (removing && removing.to == start && removing.mark.eq(marks2[i])) {
            removing.to = end;
          } else {
            removed.push(removing = new RemoveMarkStep(start, end, marks2[i]));
          }
        }
      }
      if (adding && adding.to == start) {
        adding.to = end;
      } else {
        added.push(adding = new AddMarkStep(start, end, mark));
      }
    }
  });
  removed.forEach(function(s) {
    return this$1.step(s);
  });
  added.forEach(function(s) {
    return this$1.step(s);
  });
  return this;
};
Transform.prototype.removeMark = function(from2, to, mark) {
  var this$1 = this;
  if (mark === void 0)
    mark = null;
  var matched = [], step2 = 0;
  this.doc.nodesBetween(from2, to, function(node, pos) {
    if (!node.isInline) {
      return;
    }
    step2++;
    var toRemove = null;
    if (mark instanceof import_prosemirror_model.MarkType) {
      var set = node.marks, found;
      while (found = mark.isInSet(set)) {
        (toRemove || (toRemove = [])).push(found);
        set = found.removeFromSet(set);
      }
    } else if (mark) {
      if (mark.isInSet(node.marks)) {
        toRemove = [mark];
      }
    } else {
      toRemove = node.marks;
    }
    if (toRemove && toRemove.length) {
      var end = Math.min(pos + node.nodeSize, to);
      for (var i = 0; i < toRemove.length; i++) {
        var style = toRemove[i], found$1 = void 0;
        for (var j = 0; j < matched.length; j++) {
          var m = matched[j];
          if (m.step == step2 - 1 && style.eq(matched[j].style)) {
            found$1 = m;
          }
        }
        if (found$1) {
          found$1.to = end;
          found$1.step = step2;
        } else {
          matched.push({ style, from: Math.max(pos, from2), to: end, step: step2 });
        }
      }
    }
  });
  matched.forEach(function(m) {
    return this$1.step(new RemoveMarkStep(m.from, m.to, m.style));
  });
  return this;
};
Transform.prototype.clearIncompatible = function(pos, parentType, match) {
  if (match === void 0)
    match = parentType.contentMatch;
  var node = this.doc.nodeAt(pos);
  var delSteps = [], cur = pos + 1;
  for (var i = 0; i < node.childCount; i++) {
    var child = node.child(i), end = cur + child.nodeSize;
    var allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end, import_prosemirror_model.Slice.empty));
    } else {
      match = allowed;
      for (var j = 0; j < child.marks.length; j++) {
        if (!parentType.allowsMarkType(child.marks[j].type)) {
          this.step(new RemoveMarkStep(cur, end, child.marks[j]));
        }
      }
    }
    cur = end;
  }
  if (!match.validEnd) {
    var fill = match.fillBefore(import_prosemirror_model.Fragment.empty, true);
    this.replace(cur, cur, new import_prosemirror_model.Slice(fill, 0, 0));
  }
  for (var i$1 = delSteps.length - 1; i$1 >= 0; i$1--) {
    this.step(delSteps[i$1]);
  }
  return this;
};
function replaceStep(doc, from2, to, slice3) {
  if (to === void 0)
    to = from2;
  if (slice3 === void 0)
    slice3 = import_prosemirror_model.Slice.empty;
  if (from2 == to && !slice3.size) {
    return null;
  }
  var $from = doc.resolve(from2), $to = doc.resolve(to);
  if (fitsTrivially($from, $to, slice3)) {
    return new ReplaceStep(from2, to, slice3);
  }
  return new Fitter($from, $to, slice3).fit();
}
Transform.prototype.replace = function(from2, to, slice3) {
  if (to === void 0)
    to = from2;
  if (slice3 === void 0)
    slice3 = import_prosemirror_model.Slice.empty;
  var step2 = replaceStep(this.doc, from2, to, slice3);
  if (step2) {
    this.step(step2);
  }
  return this;
};
Transform.prototype.replaceWith = function(from2, to, content) {
  return this.replace(from2, to, new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(content), 0, 0));
};
Transform.prototype.delete = function(from2, to) {
  return this.replace(from2, to, import_prosemirror_model.Slice.empty);
};
Transform.prototype.insert = function(pos, content) {
  return this.replaceWith(pos, pos, content);
};
function fitsTrivially($from, $to, slice3) {
  return !slice3.openStart && !slice3.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice3.content);
}
var Fitter = function Fitter2($from, $to, slice3) {
  this.$to = $to;
  this.$from = $from;
  this.unplaced = slice3;
  this.frontier = [];
  for (var i = 0; i <= $from.depth; i++) {
    var node = $from.node(i);
    this.frontier.push({
      type: node.type,
      match: node.contentMatchAt($from.indexAfter(i))
    });
  }
  this.placed = import_prosemirror_model.Fragment.empty;
  for (var i$1 = $from.depth; i$1 > 0; i$1--) {
    this.placed = import_prosemirror_model.Fragment.from($from.node(i$1).copy(this.placed));
  }
};
var prototypeAccessors$1 = { depth: { configurable: true } };
prototypeAccessors$1.depth.get = function() {
  return this.frontier.length - 1;
};
Fitter.prototype.fit = function fit() {
  while (this.unplaced.size) {
    var fit2 = this.findFittable();
    if (fit2) {
      this.placeNodes(fit2);
    } else {
      this.openMore() || this.dropNode();
    }
  }
  var moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
  var $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
  if (!$to) {
    return null;
  }
  var content = this.placed, openStart = $from.depth, openEnd = $to.depth;
  while (openStart && openEnd && content.childCount == 1) {
    content = content.firstChild.content;
    openStart--;
    openEnd--;
  }
  var slice3 = new import_prosemirror_model.Slice(content, openStart, openEnd);
  if (moveInline > -1) {
    return new ReplaceAroundStep($from.pos, moveInline, this.$to.pos, this.$to.end(), slice3, placedSize);
  }
  if (slice3.size || $from.pos != this.$to.pos) {
    return new ReplaceStep($from.pos, $to.pos, slice3);
  }
};
Fitter.prototype.findFittable = function findFittable() {
  for (var pass = 1; pass <= 2; pass++) {
    for (var sliceDepth = this.unplaced.openStart; sliceDepth >= 0; sliceDepth--) {
      var fragment = void 0, parent = void 0;
      if (sliceDepth) {
        parent = contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
        fragment = parent.content;
      } else {
        fragment = this.unplaced.content;
      }
      var first = fragment.firstChild;
      for (var frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--) {
        var ref = this.frontier[frontierDepth];
        var type = ref.type;
        var match = ref.match;
        var wrap = void 0, inject = void 0;
        if (pass == 1 && (first ? match.matchType(first.type) || (inject = match.fillBefore(import_prosemirror_model.Fragment.from(first), false)) : type.compatibleContent(parent.type))) {
          return { sliceDepth, frontierDepth, parent, inject };
        } else if (pass == 2 && first && (wrap = match.findWrapping(first.type))) {
          return { sliceDepth, frontierDepth, parent, wrap };
        }
        if (parent && match.matchType(parent.type)) {
          break;
        }
      }
    }
  }
};
Fitter.prototype.openMore = function openMore() {
  var ref = this.unplaced;
  var content = ref.content;
  var openStart = ref.openStart;
  var openEnd = ref.openEnd;
  var inner = contentAt(content, openStart);
  if (!inner.childCount || inner.firstChild.isLeaf) {
    return false;
  }
  this.unplaced = new import_prosemirror_model.Slice(content, openStart + 1, Math.max(openEnd, inner.size + openStart >= content.size - openEnd ? openStart + 1 : 0));
  return true;
};
Fitter.prototype.dropNode = function dropNode() {
  var ref = this.unplaced;
  var content = ref.content;
  var openStart = ref.openStart;
  var openEnd = ref.openEnd;
  var inner = contentAt(content, openStart);
  if (inner.childCount <= 1 && openStart > 0) {
    var openAtEnd = content.size - openStart <= openStart + inner.size;
    this.unplaced = new import_prosemirror_model.Slice(dropFromFragment(content, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
  } else {
    this.unplaced = new import_prosemirror_model.Slice(dropFromFragment(content, openStart, 1), openStart, openEnd);
  }
};
Fitter.prototype.placeNodes = function placeNodes(ref) {
  var sliceDepth = ref.sliceDepth;
  var frontierDepth = ref.frontierDepth;
  var parent = ref.parent;
  var inject = ref.inject;
  var wrap = ref.wrap;
  while (this.depth > frontierDepth) {
    this.closeFrontierNode();
  }
  if (wrap) {
    for (var i = 0; i < wrap.length; i++) {
      this.openFrontierNode(wrap[i]);
    }
  }
  var slice3 = this.unplaced, fragment = parent ? parent.content : slice3.content;
  var openStart = slice3.openStart - sliceDepth;
  var taken = 0, add2 = [];
  var ref$1 = this.frontier[frontierDepth];
  var match = ref$1.match;
  var type = ref$1.type;
  if (inject) {
    for (var i$1 = 0; i$1 < inject.childCount; i$1++) {
      add2.push(inject.child(i$1));
    }
    match = match.matchFragment(inject);
  }
  var openEndCount = fragment.size + sliceDepth - (slice3.content.size - slice3.openEnd);
  while (taken < fragment.childCount) {
    var next = fragment.child(taken), matches = match.matchType(next.type);
    if (!matches) {
      break;
    }
    taken++;
    if (taken > 1 || openStart == 0 || next.content.size) {
      match = matches;
      add2.push(closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
    }
  }
  var toEnd = taken == fragment.childCount;
  if (!toEnd) {
    openEndCount = -1;
  }
  this.placed = addToFragment(this.placed, frontierDepth, import_prosemirror_model.Fragment.from(add2));
  this.frontier[frontierDepth].match = match;
  if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1) {
    this.closeFrontierNode();
  }
  for (var i$2 = 0, cur = fragment; i$2 < openEndCount; i$2++) {
    var node = cur.lastChild;
    this.frontier.push({ type: node.type, match: node.contentMatchAt(node.childCount) });
    cur = node.content;
  }
  this.unplaced = !toEnd ? new import_prosemirror_model.Slice(dropFromFragment(slice3.content, sliceDepth, taken), slice3.openStart, slice3.openEnd) : sliceDepth == 0 ? import_prosemirror_model.Slice.empty : new import_prosemirror_model.Slice(dropFromFragment(slice3.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice3.openEnd : sliceDepth - 1);
};
Fitter.prototype.mustMoveInline = function mustMoveInline() {
  if (!this.$to.parent.isTextblock) {
    return -1;
  }
  var top = this.frontier[this.depth], level;
  if (!top.type.isTextblock || !contentAfterFits(this.$to, this.$to.depth, top.type, top.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth) {
    return -1;
  }
  var ref = this.$to;
  var depth = ref.depth;
  var after = this.$to.after(depth);
  while (depth > 1 && after == this.$to.end(--depth)) {
    ++after;
  }
  return after;
};
Fitter.prototype.findCloseLevel = function findCloseLevel($to) {
  scan:
    for (var i = Math.min(this.depth, $to.depth); i >= 0; i--) {
      var ref = this.frontier[i];
      var match = ref.match;
      var type = ref.type;
      var dropInner = i < $to.depth && $to.end(i + 1) == $to.pos + ($to.depth - (i + 1));
      var fit2 = contentAfterFits($to, i, type, match, dropInner);
      if (!fit2) {
        continue;
      }
      for (var d = i - 1; d >= 0; d--) {
        var ref$1 = this.frontier[d];
        var match$1 = ref$1.match;
        var type$1 = ref$1.type;
        var matches = contentAfterFits($to, d, type$1, match$1, true);
        if (!matches || matches.childCount) {
          continue scan;
        }
      }
      return { depth: i, fit: fit2, move: dropInner ? $to.doc.resolve($to.after(i + 1)) : $to };
    }
};
Fitter.prototype.close = function close($to) {
  var close2 = this.findCloseLevel($to);
  if (!close2) {
    return null;
  }
  while (this.depth > close2.depth) {
    this.closeFrontierNode();
  }
  if (close2.fit.childCount) {
    this.placed = addToFragment(this.placed, close2.depth, close2.fit);
  }
  $to = close2.move;
  for (var d = close2.depth + 1; d <= $to.depth; d++) {
    var node = $to.node(d), add2 = node.type.contentMatch.fillBefore(node.content, true, $to.index(d));
    this.openFrontierNode(node.type, node.attrs, add2);
  }
  return $to;
};
Fitter.prototype.openFrontierNode = function openFrontierNode(type, attrs, content) {
  var top = this.frontier[this.depth];
  top.match = top.match.matchType(type);
  this.placed = addToFragment(this.placed, this.depth, import_prosemirror_model.Fragment.from(type.create(attrs, content)));
  this.frontier.push({ type, match: type.contentMatch });
};
Fitter.prototype.closeFrontierNode = function closeFrontierNode() {
  var open = this.frontier.pop();
  var add2 = open.match.fillBefore(import_prosemirror_model.Fragment.empty, true);
  if (add2.childCount) {
    this.placed = addToFragment(this.placed, this.frontier.length, add2);
  }
};
Object.defineProperties(Fitter.prototype, prototypeAccessors$1);
function dropFromFragment(fragment, depth, count) {
  if (depth == 0) {
    return fragment.cutByIndex(count);
  }
  return fragment.replaceChild(0, fragment.firstChild.copy(dropFromFragment(fragment.firstChild.content, depth - 1, count)));
}
function addToFragment(fragment, depth, content) {
  if (depth == 0) {
    return fragment.append(content);
  }
  return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy(addToFragment(fragment.lastChild.content, depth - 1, content)));
}
function contentAt(fragment, depth) {
  for (var i = 0; i < depth; i++) {
    fragment = fragment.firstChild.content;
  }
  return fragment;
}
function closeNodeStart(node, openStart, openEnd) {
  if (openStart <= 0) {
    return node;
  }
  var frag = node.content;
  if (openStart > 1) {
    frag = frag.replaceChild(0, closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
  }
  if (openStart > 0) {
    frag = node.type.contentMatch.fillBefore(frag).append(frag);
    if (openEnd <= 0) {
      frag = frag.append(node.type.contentMatch.matchFragment(frag).fillBefore(import_prosemirror_model.Fragment.empty, true));
    }
  }
  return node.copy(frag);
}
function contentAfterFits($to, depth, type, match, open) {
  var node = $to.node(depth), index = open ? $to.indexAfter(depth) : $to.index(depth);
  if (index == node.childCount && !type.compatibleContent(node.type)) {
    return null;
  }
  var fit2 = match.fillBefore(node.content, true, index);
  return fit2 && !invalidMarks(type, node.content, index) ? fit2 : null;
}
function invalidMarks(type, fragment, start) {
  for (var i = start; i < fragment.childCount; i++) {
    if (!type.allowsMarks(fragment.child(i).marks)) {
      return true;
    }
  }
  return false;
}
function definesContent(type) {
  return type.spec.defining || type.spec.definingForContent;
}
Transform.prototype.replaceRange = function(from2, to, slice3) {
  if (!slice3.size) {
    return this.deleteRange(from2, to);
  }
  var $from = this.doc.resolve(from2), $to = this.doc.resolve(to);
  if (fitsTrivially($from, $to, slice3)) {
    return this.step(new ReplaceStep(from2, to, slice3));
  }
  var targetDepths = coveredDepths($from, this.doc.resolve(to));
  if (targetDepths[targetDepths.length - 1] == 0) {
    targetDepths.pop();
  }
  var preferredTarget = -($from.depth + 1);
  targetDepths.unshift(preferredTarget);
  for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
    var spec = $from.node(d).type.spec;
    if (spec.defining || spec.definingAsContext || spec.isolating) {
      break;
    }
    if (targetDepths.indexOf(d) > -1) {
      preferredTarget = d;
    } else if ($from.before(d) == pos) {
      targetDepths.splice(1, 0, -d);
    }
  }
  var preferredTargetIndex = targetDepths.indexOf(preferredTarget);
  var leftNodes = [], preferredDepth = slice3.openStart;
  for (var content = slice3.content, i = 0; ; i++) {
    var node = content.firstChild;
    leftNodes.push(node);
    if (i == slice3.openStart) {
      break;
    }
    content = node.content;
  }
  for (var d$1 = preferredDepth - 1; d$1 >= 0; d$1--) {
    var type = leftNodes[d$1].type, def = definesContent(type);
    if (def && $from.node(preferredTargetIndex).type != type) {
      preferredDepth = d$1;
    } else if (def || !type.isTextblock) {
      break;
    }
  }
  for (var j = slice3.openStart; j >= 0; j--) {
    var openDepth = (j + preferredDepth + 1) % (slice3.openStart + 1);
    var insert = leftNodes[openDepth];
    if (!insert) {
      continue;
    }
    for (var i$1 = 0; i$1 < targetDepths.length; i$1++) {
      var targetDepth = targetDepths[(i$1 + preferredTargetIndex) % targetDepths.length], expand2 = true;
      if (targetDepth < 0) {
        expand2 = false;
        targetDepth = -targetDepth;
      }
      var parent = $from.node(targetDepth - 1), index = $from.index(targetDepth - 1);
      if (parent.canReplaceWith(index, index, insert.type, insert.marks)) {
        return this.replace($from.before(targetDepth), expand2 ? $to.after(targetDepth) : to, new import_prosemirror_model.Slice(closeFragment(slice3.content, 0, slice3.openStart, openDepth), openDepth, slice3.openEnd));
      }
    }
  }
  var startSteps = this.steps.length;
  for (var i$2 = targetDepths.length - 1; i$2 >= 0; i$2--) {
    this.replace(from2, to, slice3);
    if (this.steps.length > startSteps) {
      break;
    }
    var depth = targetDepths[i$2];
    if (depth < 0) {
      continue;
    }
    from2 = $from.before(depth);
    to = $to.after(depth);
  }
  return this;
};
function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
  if (depth < oldOpen) {
    var first = fragment.firstChild;
    fragment = fragment.replaceChild(0, first.copy(closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
  }
  if (depth > newOpen) {
    var match = parent.contentMatchAt(0);
    var start = match.fillBefore(fragment).append(fragment);
    fragment = start.append(match.matchFragment(start).fillBefore(import_prosemirror_model.Fragment.empty, true));
  }
  return fragment;
}
Transform.prototype.replaceRangeWith = function(from2, to, node) {
  if (!node.isInline && from2 == to && this.doc.resolve(from2).parent.content.size) {
    var point = insertPoint(this.doc, from2, node.type);
    if (point != null) {
      from2 = to = point;
    }
  }
  return this.replaceRange(from2, to, new import_prosemirror_model.Slice(import_prosemirror_model.Fragment.from(node), 0, 0));
};
Transform.prototype.deleteRange = function(from2, to) {
  var $from = this.doc.resolve(from2), $to = this.doc.resolve(to);
  var covered = coveredDepths($from, $to);
  for (var i = 0; i < covered.length; i++) {
    var depth = covered[i], last = i == covered.length - 1;
    if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) {
      return this.delete($from.start(depth), $to.end(depth));
    }
    if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) {
      return this.delete($from.before(depth), $to.after(depth));
    }
  }
  for (var d = 1; d <= $from.depth && d <= $to.depth; d++) {
    if (from2 - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d) {
      return this.delete($from.before(d), to);
    }
  }
  return this.delete(from2, to);
};
function coveredDepths($from, $to) {
  var result = [], minDepth = Math.min($from.depth, $to.depth);
  for (var d = minDepth; d >= 0; d--) {
    var start = $from.start(d);
    if (start < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) {
      break;
    }
    if (start == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start - 1) {
      result.push(d);
    }
  }
  return result;
}

// node_modules/prosemirror-commands/dist/index.es.js
var import_prosemirror_model2 = __toModule(require("prosemirror-model"));
var import_prosemirror_state2 = __toModule(require("prosemirror-state"));
function deleteSelection(state, dispatch) {
  if (state.selection.empty) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.deleteSelection().scrollIntoView());
  }
  return true;
}
function joinBackward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) {
    return false;
  }
  var $cut = findCutBefore($cursor);
  if (!$cut) {
    var range = $cursor.blockRange(), target = range && liftTarget(range);
    if (target == null) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  var before = $cut.nodeBefore;
  if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch)) {
    return true;
  }
  if ($cursor.parent.content.size == 0 && (textblockAt(before, "end") || import_prosemirror_state2.NodeSelection.isSelectable(before))) {
    var delStep = replaceStep(state.doc, $cursor.before(), $cursor.after(), import_prosemirror_model2.Slice.empty);
    if (delStep.slice.size < delStep.to - delStep.from) {
      if (dispatch) {
        var tr = state.tr.step(delStep);
        tr.setSelection(textblockAt(before, "end") ? import_prosemirror_state2.Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : import_prosemirror_state2.NodeSelection.create(tr.doc, $cut.pos - before.nodeSize));
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
  }
  if (before.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) {
      dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView());
    }
    return true;
  }
  return false;
}
function textblockAt(node, side, only) {
  for (; node; node = side == "start" ? node.firstChild : node.lastChild) {
    if (node.isTextblock) {
      return true;
    }
    if (only && node.childCount != 1) {
      return false;
    }
  }
  return false;
}
function selectNodeBackward(state, dispatch, view) {
  var ref = state.selection;
  var $head = ref.$head;
  var empty = ref.empty;
  var $cut = $head;
  if (!empty) {
    return false;
  }
  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) {
      return false;
    }
    $cut = findCutBefore($head);
  }
  var node = $cut && $cut.nodeBefore;
  if (!node || !import_prosemirror_state2.NodeSelection.isSelectable(node)) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.setSelection(import_prosemirror_state2.NodeSelection.create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView());
  }
  return true;
}
function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (var i = $pos.depth - 1; i >= 0; i--) {
      if ($pos.index(i) > 0) {
        return $pos.doc.resolve($pos.before(i + 1));
      }
      if ($pos.node(i).type.spec.isolating) {
        break;
      }
    }
  }
  return null;
}
function joinForward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("forward", state) : $cursor.parentOffset < $cursor.parent.content.size)) {
    return false;
  }
  var $cut = findCutAfter($cursor);
  if (!$cut) {
    return false;
  }
  var after = $cut.nodeAfter;
  if (deleteBarrier(state, $cut, dispatch)) {
    return true;
  }
  if ($cursor.parent.content.size == 0 && (textblockAt(after, "start") || import_prosemirror_state2.NodeSelection.isSelectable(after))) {
    var delStep = replaceStep(state.doc, $cursor.before(), $cursor.after(), import_prosemirror_model2.Slice.empty);
    if (delStep.slice.size < delStep.to - delStep.from) {
      if (dispatch) {
        var tr = state.tr.step(delStep);
        tr.setSelection(textblockAt(after, "start") ? import_prosemirror_state2.Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : import_prosemirror_state2.NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
  }
  if (after.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) {
      dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView());
    }
    return true;
  }
  return false;
}
function selectNodeForward(state, dispatch, view) {
  var ref = state.selection;
  var $head = ref.$head;
  var empty = ref.empty;
  var $cut = $head;
  if (!empty) {
    return false;
  }
  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size) {
      return false;
    }
    $cut = findCutAfter($head);
  }
  var node = $cut && $cut.nodeAfter;
  if (!node || !import_prosemirror_state2.NodeSelection.isSelectable(node)) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.setSelection(import_prosemirror_state2.NodeSelection.create(state.doc, $cut.pos)).scrollIntoView());
  }
  return true;
}
function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (var i = $pos.depth - 1; i >= 0; i--) {
      var parent = $pos.node(i);
      if ($pos.index(i) + 1 < parent.childCount) {
        return $pos.doc.resolve($pos.after(i + 1));
      }
      if (parent.type.spec.isolating) {
        break;
      }
    }
  }
  return null;
}
function joinUp(state, dispatch) {
  var sel = state.selection, nodeSel = sel instanceof import_prosemirror_state2.NodeSelection, point;
  if (nodeSel) {
    if (sel.node.isTextblock || !canJoin(state.doc, sel.from)) {
      return false;
    }
    point = sel.from;
  } else {
    point = joinPoint(state.doc, sel.from, -1);
    if (point == null) {
      return false;
    }
  }
  if (dispatch) {
    var tr = state.tr.join(point);
    if (nodeSel) {
      tr.setSelection(import_prosemirror_state2.NodeSelection.create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize));
    }
    dispatch(tr.scrollIntoView());
  }
  return true;
}
function lift(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  var range = $from.blockRange($to), target = range && liftTarget(range);
  if (target == null) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.lift(range, target).scrollIntoView());
  }
  return true;
}
function newlineInCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.insertText("\n").scrollIntoView());
  }
  return true;
}
function defaultBlockAt(match) {
  for (var i = 0; i < match.edgeCount; i++) {
    var ref = match.edge(i);
    var type = ref.type;
    if (type.isTextblock && !type.hasRequiredAttrs()) {
      return type;
    }
  }
  return null;
}
function exitCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
    return false;
  }
  var above = $head.node(-1), after = $head.indexAfter(-1), type = defaultBlockAt(above.contentMatchAt(after));
  if (!above.canReplaceWith(after, after, type)) {
    return false;
  }
  if (dispatch) {
    var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(import_prosemirror_state2.Selection.near(tr.doc.resolve(pos), 1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}
function createParagraphNear(state, dispatch) {
  var sel = state.selection;
  var $from = sel.$from;
  var $to = sel.$to;
  if (sel instanceof import_prosemirror_state2.AllSelection || $from.parent.inlineContent || $to.parent.inlineContent) {
    return false;
  }
  var type = defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
  if (!type || !type.isTextblock) {
    return false;
  }
  if (dispatch) {
    var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
    var tr = state.tr.insert(side, type.createAndFill());
    tr.setSelection(import_prosemirror_state2.TextSelection.create(tr.doc, side + 1));
    dispatch(tr.scrollIntoView());
  }
  return true;
}
function liftEmptyBlock(state, dispatch) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || $cursor.parent.content.size) {
    return false;
  }
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    var before = $cursor.before();
    if (canSplit(state.doc, before)) {
      if (dispatch) {
        dispatch(state.tr.split(before).scrollIntoView());
      }
      return true;
    }
  }
  var range = $cursor.blockRange(), target = range && liftTarget(range);
  if (target == null) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.lift(range, target).scrollIntoView());
  }
  return true;
}
function splitBlock(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  if (state.selection instanceof import_prosemirror_state2.NodeSelection && state.selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.split($from.pos).scrollIntoView());
    }
    return true;
  }
  if (!$from.parent.isBlock) {
    return false;
  }
  if (dispatch) {
    var atEnd = $to.parentOffset == $to.parent.content.size;
    var tr = state.tr;
    if (state.selection instanceof import_prosemirror_state2.TextSelection || state.selection instanceof import_prosemirror_state2.AllSelection) {
      tr.deleteSelection();
    }
    var deflt = $from.depth == 0 ? null : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
    var types = atEnd && deflt ? [{ type: deflt }] : null;
    var can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
    if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{ type: deflt }])) {
      types = [{ type: deflt }];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd && !$from.parentOffset && $from.parent.type != deflt) {
        var first = tr.mapping.map($from.before()), $first = tr.doc.resolve(first);
        if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
          tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
        }
      }
    }
    dispatch(tr.scrollIntoView());
  }
  return true;
}
function selectParentNode(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var to = ref.to;
  var pos;
  var same = $from.sharedDepth(to);
  if (same == 0) {
    return false;
  }
  pos = $from.before(same);
  if (dispatch) {
    dispatch(state.tr.setSelection(import_prosemirror_state2.NodeSelection.create(state.doc, pos)));
  }
  return true;
}
function selectAll(state, dispatch) {
  if (dispatch) {
    dispatch(state.tr.setSelection(new import_prosemirror_state2.AllSelection(state.doc)));
  }
  return true;
}
function joinMaybeClear(state, $pos, dispatch) {
  var before = $pos.nodeBefore, after = $pos.nodeAfter, index = $pos.index();
  if (!before || !after || !before.type.compatibleContent(after.type)) {
    return false;
  }
  if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
    if (dispatch) {
      dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView());
    }
    return true;
  }
  if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || canJoin(state.doc, $pos.pos))) {
    return false;
  }
  if (dispatch) {
    dispatch(state.tr.clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount)).join($pos.pos).scrollIntoView());
  }
  return true;
}
function deleteBarrier(state, $cut, dispatch) {
  var before = $cut.nodeBefore, after = $cut.nodeAfter, conn, match;
  if (before.type.spec.isolating || after.type.spec.isolating) {
    return false;
  }
  if (joinMaybeClear(state, $cut, dispatch)) {
    return true;
  }
  var canDelAfter = $cut.parent.canReplace($cut.index(), $cut.index() + 1);
  if (canDelAfter && (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) && match.matchType(conn[0] || after.type).validEnd) {
    if (dispatch) {
      var end = $cut.pos + after.nodeSize, wrap = import_prosemirror_model2.Fragment.empty;
      for (var i = conn.length - 1; i >= 0; i--) {
        wrap = import_prosemirror_model2.Fragment.from(conn[i].create(null, wrap));
      }
      wrap = import_prosemirror_model2.Fragment.from(before.copy(wrap));
      var tr = state.tr.step(new ReplaceAroundStep($cut.pos - 1, end, $cut.pos, end, new import_prosemirror_model2.Slice(wrap, 1, 0), conn.length, true));
      var joinAt = end + 2 * conn.length;
      if (canJoin(tr.doc, joinAt)) {
        tr.join(joinAt);
      }
      dispatch(tr.scrollIntoView());
    }
    return true;
  }
  var selAfter = import_prosemirror_state2.Selection.findFrom($cut, 1);
  var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && liftTarget(range);
  if (target != null && target >= $cut.depth) {
    if (dispatch) {
      dispatch(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  if (canDelAfter && textblockAt(after, "start", true) && textblockAt(before, "end")) {
    var at = before, wrap$1 = [];
    for (; ; ) {
      wrap$1.push(at);
      if (at.isTextblock) {
        break;
      }
      at = at.lastChild;
    }
    var afterText = after, afterDepth = 1;
    for (; !afterText.isTextblock; afterText = afterText.firstChild) {
      afterDepth++;
    }
    if (at.canReplace(at.childCount, at.childCount, afterText.content)) {
      if (dispatch) {
        var end$1 = import_prosemirror_model2.Fragment.empty;
        for (var i$1 = wrap$1.length - 1; i$1 >= 0; i$1--) {
          end$1 = import_prosemirror_model2.Fragment.from(wrap$1[i$1].copy(end$1));
        }
        var tr$1 = state.tr.step(new ReplaceAroundStep($cut.pos - wrap$1.length, $cut.pos + after.nodeSize, $cut.pos + afterDepth, $cut.pos + after.nodeSize - afterDepth, new import_prosemirror_model2.Slice(end$1, wrap$1.length, 0), 0, true));
        dispatch(tr$1.scrollIntoView());
      }
      return true;
    }
  }
  return false;
}
function selectTextblockSide(side) {
  return function(state, dispatch) {
    var sel = state.selection, $pos = side < 0 ? sel.$from : sel.$to;
    var depth = $pos.depth;
    while ($pos.node(depth).isInline) {
      if (!depth) {
        return false;
      }
      depth--;
    }
    if (!$pos.node(depth).isTextblock) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.setSelection(import_prosemirror_state2.TextSelection.create(state.doc, side < 0 ? $pos.start(depth) : $pos.end(depth))));
    }
    return true;
  };
}
var selectTextblockStart = selectTextblockSide(-1);
var selectTextblockEnd = selectTextblockSide(1);
function setBlockType(nodeType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var from2 = ref.from;
    var to = ref.to;
    var applicable = false;
    state.doc.nodesBetween(from2, to, function(node, pos) {
      if (applicable) {
        return false;
      }
      if (!node.isTextblock || node.hasMarkup(nodeType, attrs)) {
        return;
      }
      if (node.type == nodeType) {
        applicable = true;
      } else {
        var $pos = state.doc.resolve(pos), index = $pos.index();
        applicable = $pos.parent.canReplaceWith(index, index + 1, nodeType);
      }
    });
    if (!applicable) {
      return false;
    }
    if (dispatch) {
      dispatch(state.tr.setBlockType(from2, to, nodeType, attrs).scrollIntoView());
    }
    return true;
  };
}
function markApplies(doc, ranges, type) {
  var loop = function(i2) {
    var ref = ranges[i2];
    var $from = ref.$from;
    var $to = ref.$to;
    var can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, function(node) {
      if (can) {
        return false;
      }
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) {
      return { v: true };
    }
  };
  for (var i = 0; i < ranges.length; i++) {
    var returned = loop(i);
    if (returned)
      return returned.v;
  }
  return false;
}
function toggleMark(markType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var empty = ref.empty;
    var $cursor = ref.$cursor;
    var ranges = ref.ranges;
    if (empty && !$cursor || !markApplies(state.doc, ranges, markType)) {
      return false;
    }
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks())) {
          dispatch(state.tr.removeStoredMark(markType));
        } else {
          dispatch(state.tr.addStoredMark(markType.create(attrs)));
        }
      } else {
        var has = false, tr = state.tr;
        for (var i = 0; !has && i < ranges.length; i++) {
          var ref$1 = ranges[i];
          var $from = ref$1.$from;
          var $to = ref$1.$to;
          has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
        }
        for (var i$1 = 0; i$1 < ranges.length; i$1++) {
          var ref$2 = ranges[i$1];
          var $from$1 = ref$2.$from;
          var $to$1 = ref$2.$to;
          if (has) {
            tr.removeMark($from$1.pos, $to$1.pos, markType);
          } else {
            var from2 = $from$1.pos, to = $to$1.pos, start = $from$1.nodeAfter, end = $to$1.nodeBefore;
            var spaceStart = start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
            var spaceEnd = end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
            if (from2 + spaceStart < to) {
              from2 += spaceStart;
              to -= spaceEnd;
            }
            tr.addMark(from2, to, markType.create(attrs));
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
}
function chainCommands() {
  var commands = [], len = arguments.length;
  while (len--)
    commands[len] = arguments[len];
  return function(state, dispatch, view) {
    for (var i = 0; i < commands.length; i++) {
      if (commands[i](state, dispatch, view)) {
        return true;
      }
    }
    return false;
  };
}
var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
var del = chainCommands(deleteSelection, joinForward, selectNodeForward);
var pcBaseKeymap = {
  "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
  "Mod-Enter": exitCode,
  "Backspace": backspace,
  "Mod-Backspace": backspace,
  "Shift-Backspace": backspace,
  "Delete": del,
  "Mod-Delete": del,
  "Mod-a": selectAll
};
var macBaseKeymap = {
  "Ctrl-h": pcBaseKeymap["Backspace"],
  "Alt-Backspace": pcBaseKeymap["Mod-Backspace"],
  "Ctrl-d": pcBaseKeymap["Delete"],
  "Ctrl-Alt-Backspace": pcBaseKeymap["Mod-Delete"],
  "Alt-Delete": pcBaseKeymap["Mod-Delete"],
  "Alt-d": pcBaseKeymap["Mod-Delete"],
  "Ctrl-a": selectTextblockStart,
  "Ctrl-e": selectTextblockEnd
};
for (var key in pcBaseKeymap) {
  macBaseKeymap[key] = pcBaseKeymap[key];
}
var mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" ? os.platform() == "darwin" : false;
var baseKeymap = mac ? macBaseKeymap : pcBaseKeymap;

// node_modules/rope-sequence/dist/index.es.js
var GOOD_LEAF_SIZE = 200;
var RopeSequence = function RopeSequence2() {
};
RopeSequence.prototype.append = function append(other) {
  if (!other.length) {
    return this;
  }
  other = RopeSequence.from(other);
  return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
};
RopeSequence.prototype.prepend = function prepend(other) {
  if (!other.length) {
    return this;
  }
  return RopeSequence.from(other).append(this);
};
RopeSequence.prototype.appendInner = function appendInner(other) {
  return new Append(this, other);
};
RopeSequence.prototype.slice = function slice2(from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  if (from2 >= to) {
    return RopeSequence.empty;
  }
  return this.sliceInner(Math.max(0, from2), Math.min(this.length, to));
};
RopeSequence.prototype.get = function get(i) {
  if (i < 0 || i >= this.length) {
    return void 0;
  }
  return this.getInner(i);
};
RopeSequence.prototype.forEach = function forEach2(f, from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  if (from2 <= to) {
    this.forEachInner(f, from2, to, 0);
  } else {
    this.forEachInvertedInner(f, from2, to, 0);
  }
};
RopeSequence.prototype.map = function map4(f, from2, to) {
  if (from2 === void 0)
    from2 = 0;
  if (to === void 0)
    to = this.length;
  var result = [];
  this.forEach(function(elt, i) {
    return result.push(f(elt, i));
  }, from2, to);
  return result;
};
RopeSequence.from = function from(values) {
  if (values instanceof RopeSequence) {
    return values;
  }
  return values && values.length ? new Leaf(values) : RopeSequence.empty;
};
var Leaf = /* @__PURE__ */ function(RopeSequence3) {
  function Leaf2(values) {
    RopeSequence3.call(this);
    this.values = values;
  }
  if (RopeSequence3)
    Leaf2.__proto__ = RopeSequence3;
  Leaf2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Leaf2.prototype.constructor = Leaf2;
  var prototypeAccessors2 = { length: { configurable: true }, depth: { configurable: true } };
  Leaf2.prototype.flatten = function flatten() {
    return this.values;
  };
  Leaf2.prototype.sliceInner = function sliceInner(from2, to) {
    if (from2 == 0 && to == this.length) {
      return this;
    }
    return new Leaf2(this.values.slice(from2, to));
  };
  Leaf2.prototype.getInner = function getInner(i) {
    return this.values[i];
  };
  Leaf2.prototype.forEachInner = function forEachInner(f, from2, to, start) {
    for (var i = from2; i < to; i++) {
      if (f(this.values[i], start + i) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from2, to, start) {
    for (var i = from2 - 1; i >= to; i--) {
      if (f(this.values[i], start + i) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.leafAppend = function leafAppend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(this.values.concat(other.flatten()));
    }
  };
  Leaf2.prototype.leafPrepend = function leafPrepend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(other.flatten().concat(this.values));
    }
  };
  prototypeAccessors2.length.get = function() {
    return this.values.length;
  };
  prototypeAccessors2.depth.get = function() {
    return 0;
  };
  Object.defineProperties(Leaf2.prototype, prototypeAccessors2);
  return Leaf2;
}(RopeSequence);
RopeSequence.empty = new Leaf([]);
var Append = /* @__PURE__ */ function(RopeSequence3) {
  function Append2(left, right) {
    RopeSequence3.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }
  if (RopeSequence3)
    Append2.__proto__ = RopeSequence3;
  Append2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Append2.prototype.constructor = Append2;
  Append2.prototype.flatten = function flatten() {
    return this.left.flatten().concat(this.right.flatten());
  };
  Append2.prototype.getInner = function getInner(i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length);
  };
  Append2.prototype.forEachInner = function forEachInner(f, from2, to, start) {
    var leftLen = this.left.length;
    if (from2 < leftLen && this.left.forEachInner(f, from2, Math.min(to, leftLen), start) === false) {
      return false;
    }
    if (to > leftLen && this.right.forEachInner(f, Math.max(from2 - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false) {
      return false;
    }
  };
  Append2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from2, to, start) {
    var leftLen = this.left.length;
    if (from2 > leftLen && this.right.forEachInvertedInner(f, from2 - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false) {
      return false;
    }
    if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from2, leftLen), to, start) === false) {
      return false;
    }
  };
  Append2.prototype.sliceInner = function sliceInner(from2, to) {
    if (from2 == 0 && to == this.length) {
      return this;
    }
    var leftLen = this.left.length;
    if (to <= leftLen) {
      return this.left.slice(from2, to);
    }
    if (from2 >= leftLen) {
      return this.right.slice(from2 - leftLen, to - leftLen);
    }
    return this.left.slice(from2, leftLen).append(this.right.slice(0, to - leftLen));
  };
  Append2.prototype.leafAppend = function leafAppend(other) {
    var inner = this.right.leafAppend(other);
    if (inner) {
      return new Append2(this.left, inner);
    }
  };
  Append2.prototype.leafPrepend = function leafPrepend(other) {
    var inner = this.left.leafPrepend(other);
    if (inner) {
      return new Append2(inner, this.right);
    }
  };
  Append2.prototype.appendInner = function appendInner2(other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) {
      return new Append2(this.left, new Append2(this.right, other));
    }
    return new Append2(this, other);
  };
  return Append2;
}(RopeSequence);
var ropeSequence = RopeSequence;
var index_es_default = ropeSequence;

// node_modules/prosemirror-history/dist/index.es.js
var import_prosemirror_state3 = __toModule(require("prosemirror-state"));
var max_empty_items = 500;
var Branch = function Branch2(items, eventCount) {
  this.items = items;
  this.eventCount = eventCount;
};
Branch.prototype.popEvent = function popEvent(state, preserveItems) {
  var this$1 = this;
  if (this.eventCount == 0) {
    return null;
  }
  var end = this.items.length;
  for (; ; end--) {
    var next = this.items.get(end - 1);
    if (next.selection) {
      --end;
      break;
    }
  }
  var remap, mapFrom;
  if (preserveItems) {
    remap = this.remapping(end, this.items.length);
    mapFrom = remap.maps.length;
  }
  var transform = state.tr;
  var selection, remaining;
  var addAfter = [], addBefore = [];
  this.items.forEach(function(item, i) {
    if (!item.step) {
      if (!remap) {
        remap = this$1.remapping(end, i + 1);
        mapFrom = remap.maps.length;
      }
      mapFrom--;
      addBefore.push(item);
      return;
    }
    if (remap) {
      addBefore.push(new Item(item.map));
      var step2 = item.step.map(remap.slice(mapFrom)), map5;
      if (step2 && transform.maybeStep(step2).doc) {
        map5 = transform.mapping.maps[transform.mapping.maps.length - 1];
        addAfter.push(new Item(map5, null, null, addAfter.length + addBefore.length));
      }
      mapFrom--;
      if (map5) {
        remap.appendMap(map5, mapFrom);
      }
    } else {
      transform.maybeStep(item.step);
    }
    if (item.selection) {
      selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
      remaining = new Branch(this$1.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this$1.eventCount - 1);
      return false;
    }
  }, this.items.length, 0);
  return { remaining, transform, selection };
};
Branch.prototype.addTransform = function addTransform(transform, selection, histOptions, preserveItems) {
  var newItems = [], eventCount = this.eventCount;
  var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
  for (var i = 0; i < transform.steps.length; i++) {
    var step2 = transform.steps[i].invert(transform.docs[i]);
    var item = new Item(transform.mapping.maps[i], step2, selection), merged = void 0;
    if (merged = lastItem && lastItem.merge(item)) {
      item = merged;
      if (i) {
        newItems.pop();
      } else {
        oldItems = oldItems.slice(0, oldItems.length - 1);
      }
    }
    newItems.push(item);
    if (selection) {
      eventCount++;
      selection = null;
    }
    if (!preserveItems) {
      lastItem = item;
    }
  }
  var overflow = eventCount - histOptions.depth;
  if (overflow > DEPTH_OVERFLOW) {
    oldItems = cutOffEvents(oldItems, overflow);
    eventCount -= overflow;
  }
  return new Branch(oldItems.append(newItems), eventCount);
};
Branch.prototype.remapping = function remapping(from2, to) {
  var maps = new Mapping();
  this.items.forEach(function(item, i) {
    var mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from2 ? maps.maps.length - item.mirrorOffset : null;
    maps.appendMap(item.map, mirrorPos);
  }, from2, to);
  return maps;
};
Branch.prototype.addMaps = function addMaps(array) {
  if (this.eventCount == 0) {
    return this;
  }
  return new Branch(this.items.append(array.map(function(map5) {
    return new Item(map5);
  })), this.eventCount);
};
Branch.prototype.rebased = function rebased(rebasedTransform, rebasedCount) {
  if (!this.eventCount) {
    return this;
  }
  var rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
  var mapping = rebasedTransform.mapping;
  var newUntil = rebasedTransform.steps.length;
  var eventCount = this.eventCount;
  this.items.forEach(function(item) {
    if (item.selection) {
      eventCount--;
    }
  }, start);
  var iRebased = rebasedCount;
  this.items.forEach(function(item) {
    var pos = mapping.getMirror(--iRebased);
    if (pos == null) {
      return;
    }
    newUntil = Math.min(newUntil, pos);
    var map5 = mapping.maps[pos];
    if (item.step) {
      var step2 = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
      var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
      if (selection) {
        eventCount++;
      }
      rebasedItems.push(new Item(map5, step2, selection));
    } else {
      rebasedItems.push(new Item(map5));
    }
  }, start);
  var newMaps = [];
  for (var i = rebasedCount; i < newUntil; i++) {
    newMaps.push(new Item(mapping.maps[i]));
  }
  var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
  var branch = new Branch(items, eventCount);
  if (branch.emptyItemCount() > max_empty_items) {
    branch = branch.compress(this.items.length - rebasedItems.length);
  }
  return branch;
};
Branch.prototype.emptyItemCount = function emptyItemCount() {
  var count = 0;
  this.items.forEach(function(item) {
    if (!item.step) {
      count++;
    }
  });
  return count;
};
Branch.prototype.compress = function compress(upto) {
  if (upto === void 0)
    upto = this.items.length;
  var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
  var items = [], events = 0;
  this.items.forEach(function(item, i) {
    if (i >= upto) {
      items.push(item);
      if (item.selection) {
        events++;
      }
    } else if (item.step) {
      var step2 = item.step.map(remap.slice(mapFrom)), map5 = step2 && step2.getMap();
      mapFrom--;
      if (map5) {
        remap.appendMap(map5, mapFrom);
      }
      if (step2) {
        var selection = item.selection && item.selection.map(remap.slice(mapFrom));
        if (selection) {
          events++;
        }
        var newItem = new Item(map5.invert(), step2, selection), merged, last = items.length - 1;
        if (merged = items.length && items[last].merge(newItem)) {
          items[last] = merged;
        } else {
          items.push(newItem);
        }
      }
    } else if (item.map) {
      mapFrom--;
    }
  }, this.items.length, 0);
  return new Branch(index_es_default.from(items.reverse()), events);
};
Branch.empty = new Branch(index_es_default.empty, 0);
function cutOffEvents(items, n) {
  var cutPoint;
  items.forEach(function(item, i) {
    if (item.selection && n-- == 0) {
      cutPoint = i;
      return false;
    }
  });
  return items.slice(cutPoint);
}
var Item = function Item2(map5, step2, selection, mirrorOffset) {
  this.map = map5;
  this.step = step2;
  this.selection = selection;
  this.mirrorOffset = mirrorOffset;
};
Item.prototype.merge = function merge2(other) {
  if (this.step && other.step && !other.selection) {
    var step2 = other.step.merge(this.step);
    if (step2) {
      return new Item(step2.getMap().invert(), step2, this.selection);
    }
  }
};
var HistoryState = function HistoryState2(done, undone, prevRanges, prevTime) {
  this.done = done;
  this.undone = undone;
  this.prevRanges = prevRanges;
  this.prevTime = prevTime;
};
var DEPTH_OVERFLOW = 20;
function histTransaction(history, state, dispatch, redo2) {
  var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
  var pop = (redo2 ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) {
    return;
  }
  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo2 ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
  var newHist = new HistoryState(redo2 ? added : pop.remaining, redo2 ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, { redo: redo2, historyState: newHist }).scrollIntoView());
}
var cachedPreserveItems = false;
var cachedPreserveItemsPlugins = null;
function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i = 0; i < plugins.length; i++) {
      if (plugins[i].spec.historyPreserveItems) {
        cachedPreserveItems = true;
        break;
      }
    }
  }
  return cachedPreserveItems;
}
var historyKey = new import_prosemirror_state3.PluginKey("history");
var closeHistoryKey = new import_prosemirror_state3.PluginKey("closeHistory");
function undo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount == 0) {
    return false;
  }
  if (dispatch) {
    histTransaction(hist, state, dispatch, false);
  }
  return true;
}
function redo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount == 0) {
    return false;
  }
  if (dispatch) {
    histTransaction(hist, state, dispatch, true);
  }
  return true;
}

// node_modules/prosemirror-menu/dist/index.es.js
var import_prosemirror_state4 = __toModule(require("prosemirror-state"));
var SVG = "http://www.w3.org/2000/svg";
var XLINK = "http://www.w3.org/1999/xlink";
var prefix = "ProseMirror-icon";
function hashPath(path) {
  var hash = 0;
  for (var i = 0; i < path.length; i++) {
    hash = (hash << 5) - hash + path.charCodeAt(i) | 0;
  }
  return hash;
}
function getIcon(icon) {
  var node = document.createElement("div");
  node.className = prefix;
  if (icon.path) {
    var name = "pm-icon-" + hashPath(icon.path).toString(16);
    if (!document.getElementById(name)) {
      buildSVG(name, icon);
    }
    var svg = node.appendChild(document.createElementNS(SVG, "svg"));
    svg.style.width = icon.width / icon.height + "em";
    var use = svg.appendChild(document.createElementNS(SVG, "use"));
    use.setAttributeNS(XLINK, "href", /([^#]*)/.exec(document.location)[1] + "#" + name);
  } else if (icon.dom) {
    node.appendChild(icon.dom.cloneNode(true));
  } else {
    node.appendChild(document.createElement("span")).textContent = icon.text || "";
    if (icon.css) {
      node.firstChild.style.cssText = icon.css;
    }
  }
  return node;
}
function buildSVG(name, data) {
  var collection = document.getElementById(prefix + "-collection");
  if (!collection) {
    collection = document.createElementNS(SVG, "svg");
    collection.id = prefix + "-collection";
    collection.style.display = "none";
    document.body.insertBefore(collection, document.body.firstChild);
  }
  var sym = document.createElementNS(SVG, "symbol");
  sym.id = name;
  sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height);
  var path = sym.appendChild(document.createElementNS(SVG, "path"));
  path.setAttribute("d", data.path);
  collection.appendChild(sym);
}
var prefix$1 = "ProseMirror-menu";
var MenuItem = function MenuItem2(spec) {
  this.spec = spec;
};
MenuItem.prototype.render = function render(view) {
  var spec = this.spec;
  var dom = spec.render ? spec.render(view) : spec.icon ? getIcon(spec.icon) : spec.label ? crelt("div", null, translate(view, spec.label)) : null;
  if (!dom) {
    throw new RangeError("MenuItem without icon or label property");
  }
  if (spec.title) {
    var title = typeof spec.title === "function" ? spec.title(view.state) : spec.title;
    dom.setAttribute("title", translate(view, title));
  }
  if (spec.class) {
    dom.classList.add(spec.class);
  }
  if (spec.css) {
    dom.style.cssText += spec.css;
  }
  dom.addEventListener("mousedown", function(e) {
    e.preventDefault();
    if (!dom.classList.contains(prefix$1 + "-disabled")) {
      spec.run(view.state, view.dispatch, view, e);
    }
  });
  function update2(state) {
    if (spec.select) {
      var selected = spec.select(state);
      dom.style.display = selected ? "" : "none";
      if (!selected) {
        return false;
      }
    }
    var enabled = true;
    if (spec.enable) {
      enabled = spec.enable(state) || false;
      setClass(dom, prefix$1 + "-disabled", !enabled);
    }
    if (spec.active) {
      var active = enabled && spec.active(state) || false;
      setClass(dom, prefix$1 + "-active", active);
    }
    return true;
  }
  return { dom, update: update2 };
};
function translate(view, text) {
  return view._props.translate ? view._props.translate(text) : text;
}
var lastMenuEvent = { time: 0, node: null };
function markMenuEvent(e) {
  lastMenuEvent.time = Date.now();
  lastMenuEvent.node = e.target;
}
function isMenuEvent(wrapper) {
  return Date.now() - 100 < lastMenuEvent.time && lastMenuEvent.node && wrapper.contains(lastMenuEvent.node);
}
var Dropdown = function Dropdown2(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};
Dropdown.prototype.render = function render2(view) {
  var this$1 = this;
  var content = renderDropdownItems(this.content, view);
  var label = crelt("div", {
    class: prefix$1 + "-dropdown " + (this.options.class || ""),
    style: this.options.css
  }, translate(view, this.options.label));
  if (this.options.title) {
    label.setAttribute("title", translate(view, this.options.title));
  }
  var wrap = crelt("div", { class: prefix$1 + "-dropdown-wrap" }, label);
  var open = null, listeningOnClose = null;
  var close2 = function() {
    if (open && open.close()) {
      open = null;
      window.removeEventListener("mousedown", listeningOnClose);
    }
  };
  label.addEventListener("mousedown", function(e) {
    e.preventDefault();
    markMenuEvent(e);
    if (open) {
      close2();
    } else {
      open = this$1.expand(wrap, content.dom);
      window.addEventListener("mousedown", listeningOnClose = function() {
        if (!isMenuEvent(wrap)) {
          close2();
        }
      });
    }
  });
  function update2(state) {
    var inner = content.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner;
  }
  return { dom: wrap, update: update2 };
};
Dropdown.prototype.expand = function expand(dom, items) {
  var menuDOM = crelt("div", { class: prefix$1 + "-dropdown-menu " + (this.options.class || "") }, items);
  var done = false;
  function close2() {
    if (done) {
      return;
    }
    done = true;
    dom.removeChild(menuDOM);
    return true;
  }
  dom.appendChild(menuDOM);
  return { close: close2, node: menuDOM };
};
function renderDropdownItems(items, view) {
  var rendered = [], updates = [];
  for (var i = 0; i < items.length; i++) {
    var ref = items[i].render(view);
    var dom = ref.dom;
    var update2 = ref.update;
    rendered.push(crelt("div", { class: prefix$1 + "-dropdown-item" }, dom));
    updates.push(update2);
  }
  return { dom: rendered, update: combineUpdates(updates, rendered) };
}
function combineUpdates(updates, nodes2) {
  return function(state) {
    var something = false;
    for (var i = 0; i < updates.length; i++) {
      var up = updates[i](state);
      nodes2[i].style.display = up ? "" : "none";
      if (up) {
        something = true;
      }
    }
    return something;
  };
}
var DropdownSubmenu = function DropdownSubmenu2(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};
DropdownSubmenu.prototype.render = function render3(view) {
  var items = renderDropdownItems(this.content, view);
  var label = crelt("div", { class: prefix$1 + "-submenu-label" }, translate(view, this.options.label));
  var wrap = crelt("div", { class: prefix$1 + "-submenu-wrap" }, label, crelt("div", { class: prefix$1 + "-submenu" }, items.dom));
  var listeningOnClose = null;
  label.addEventListener("mousedown", function(e) {
    e.preventDefault();
    markMenuEvent(e);
    setClass(wrap, prefix$1 + "-submenu-wrap-active");
    if (!listeningOnClose) {
      window.addEventListener("mousedown", listeningOnClose = function() {
        if (!isMenuEvent(wrap)) {
          wrap.classList.remove(prefix$1 + "-submenu-wrap-active");
          window.removeEventListener("mousedown", listeningOnClose);
          listeningOnClose = null;
        }
      });
    }
  });
  function update2(state) {
    var inner = items.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner;
  }
  return { dom: wrap, update: update2 };
};
function renderGrouped(view, content) {
  var result = document.createDocumentFragment();
  var updates = [], separators = [];
  for (var i = 0; i < content.length; i++) {
    var items = content[i], localUpdates = [], localNodes = [];
    for (var j = 0; j < items.length; j++) {
      var ref = items[j].render(view);
      var dom = ref.dom;
      var update$1 = ref.update;
      var span = crelt("span", { class: prefix$1 + "item" }, dom);
      result.appendChild(span);
      localNodes.push(span);
      localUpdates.push(update$1);
    }
    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
      if (i < content.length - 1) {
        separators.push(result.appendChild(separator()));
      }
    }
  }
  function update2(state) {
    var something = false, needSep = false;
    for (var i2 = 0; i2 < updates.length; i2++) {
      var hasContent = updates[i2](state);
      if (i2) {
        separators[i2 - 1].style.display = needSep && hasContent ? "" : "none";
      }
      needSep = hasContent;
      if (hasContent) {
        something = true;
      }
    }
    return something;
  }
  return { dom: result, update: update2 };
}
function separator() {
  return crelt("span", { class: prefix$1 + "separator" });
}
var icons = {
  join: {
    width: 800,
    height: 900,
    path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
  },
  lift: {
    width: 1024,
    height: 1024,
    path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"
  },
  selectParentNode: { text: "\u2B1A", css: "font-weight: bold" },
  undo: {
    width: 1024,
    height: 1024,
    path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"
  },
  redo: {
    width: 1024,
    height: 1024,
    path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"
  },
  strong: {
    width: 805,
    height: 1024,
    path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"
  },
  em: {
    width: 585,
    height: 1024,
    path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
  },
  code: {
    width: 896,
    height: 1024,
    path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
  },
  link: {
    width: 951,
    height: 1024,
    path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"
  },
  bulletList: {
    width: 768,
    height: 896,
    path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
  },
  orderedList: {
    width: 768,
    height: 896,
    path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"
  },
  blockquote: {
    width: 640,
    height: 896,
    path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
  }
};
var joinUpItem = new MenuItem({
  title: "Join with above block",
  run: joinUp,
  select: function(state) {
    return joinUp(state);
  },
  icon: icons.join
});
var liftItem = new MenuItem({
  title: "Lift out of enclosing block",
  run: lift,
  select: function(state) {
    return lift(state);
  },
  icon: icons.lift
});
var selectParentNodeItem = new MenuItem({
  title: "Select parent node",
  run: selectParentNode,
  select: function(state) {
    return selectParentNode(state);
  },
  icon: icons.selectParentNode
});
var undoItem = new MenuItem({
  title: "Undo last change",
  run: undo,
  enable: function(state) {
    return undo(state);
  },
  icon: icons.undo
});
var redoItem = new MenuItem({
  title: "Redo last undone change",
  run: redo,
  enable: function(state) {
    return redo(state);
  },
  icon: icons.redo
});
function blockTypeItem(nodeType, options) {
  var command = setBlockType(nodeType, options.attrs);
  var passedOptions = {
    run: command,
    enable: function enable(state) {
      return command(state);
    },
    active: function active(state) {
      var ref = state.selection;
      var $from = ref.$from;
      var to = ref.to;
      var node = ref.node;
      if (node) {
        return node.hasMarkup(nodeType, options.attrs);
      }
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs);
    }
  };
  for (var prop in options) {
    passedOptions[prop] = options[prop];
  }
  return new MenuItem(passedOptions);
}
function setClass(dom, cls, on) {
  if (on) {
    dom.classList.add(cls);
  } else {
    dom.classList.remove(cls);
  }
}
var prefix$2 = "ProseMirror-menubar";
function isIOS() {
  if (typeof navigator == "undefined") {
    return false;
  }
  var agent = navigator.userAgent;
  return !/Edge\/\d/.test(agent) && /AppleWebKit/.test(agent) && /Mobile\/\w+/.test(agent);
}
var MenuBarView = function MenuBarView2(editorView, options) {
  var this$1 = this;
  this.editorView = editorView;
  this.options = options;
  this.wrapper = crelt("div", { class: prefix$2 + "-wrapper" });
  this.menu = this.wrapper.appendChild(crelt("div", { class: prefix$2 }));
  this.menu.className = prefix$2;
  this.spacer = null;
  editorView.dom.parentNode.replaceChild(this.wrapper, editorView.dom);
  this.wrapper.appendChild(editorView.dom);
  this.maxHeight = 0;
  this.widthForMaxHeight = 0;
  this.floating = false;
  var ref = renderGrouped(this.editorView, this.options.content);
  var dom = ref.dom;
  var update2 = ref.update;
  this.contentUpdate = update2;
  this.menu.appendChild(dom);
  this.update();
  if (options.floating && !isIOS()) {
    this.updateFloat();
    var potentialScrollers = getAllWrapping(this.wrapper);
    this.scrollFunc = function(e) {
      var root = this$1.editorView.root;
      if (!(root.body || root).contains(this$1.wrapper)) {
        potentialScrollers.forEach(function(el) {
          return el.removeEventListener("scroll", this$1.scrollFunc);
        });
      } else {
        this$1.updateFloat(e.target.getBoundingClientRect && e.target);
      }
    };
    potentialScrollers.forEach(function(el) {
      return el.addEventListener("scroll", this$1.scrollFunc);
    });
  }
};
MenuBarView.prototype.update = function update() {
  this.contentUpdate(this.editorView.state);
  if (this.floating) {
    this.updateScrollCursor();
  } else {
    if (this.menu.offsetWidth != this.widthForMaxHeight) {
      this.widthForMaxHeight = this.menu.offsetWidth;
      this.maxHeight = 0;
    }
    if (this.menu.offsetHeight > this.maxHeight) {
      this.maxHeight = this.menu.offsetHeight;
      this.menu.style.minHeight = this.maxHeight + "px";
    }
  }
};
MenuBarView.prototype.updateScrollCursor = function updateScrollCursor() {
  var selection = this.editorView.root.getSelection();
  if (!selection.focusNode) {
    return;
  }
  var rects = selection.getRangeAt(0).getClientRects();
  var selRect = rects[selectionIsInverted(selection) ? 0 : rects.length - 1];
  if (!selRect) {
    return;
  }
  var menuRect = this.menu.getBoundingClientRect();
  if (selRect.top < menuRect.bottom && selRect.bottom > menuRect.top) {
    var scrollable = findWrappingScrollable(this.wrapper);
    if (scrollable) {
      scrollable.scrollTop -= menuRect.bottom - selRect.top;
    }
  }
};
MenuBarView.prototype.updateFloat = function updateFloat(scrollAncestor) {
  var parent = this.wrapper, editorRect = parent.getBoundingClientRect(), top = scrollAncestor ? Math.max(0, scrollAncestor.getBoundingClientRect().top) : 0;
  if (this.floating) {
    if (editorRect.top >= top || editorRect.bottom < this.menu.offsetHeight + 10) {
      this.floating = false;
      this.menu.style.position = this.menu.style.left = this.menu.style.top = this.menu.style.width = "";
      this.menu.style.display = "";
      this.spacer.parentNode.removeChild(this.spacer);
      this.spacer = null;
    } else {
      var border = (parent.offsetWidth - parent.clientWidth) / 2;
      this.menu.style.left = editorRect.left + border + "px";
      this.menu.style.display = editorRect.top > window.innerHeight ? "none" : "";
      if (scrollAncestor) {
        this.menu.style.top = top + "px";
      }
    }
  } else {
    if (editorRect.top < top && editorRect.bottom >= this.menu.offsetHeight + 10) {
      this.floating = true;
      var menuRect = this.menu.getBoundingClientRect();
      this.menu.style.left = menuRect.left + "px";
      this.menu.style.width = menuRect.width + "px";
      if (scrollAncestor) {
        this.menu.style.top = top + "px";
      }
      this.menu.style.position = "fixed";
      this.spacer = crelt("div", { class: prefix$2 + "-spacer", style: "height: " + menuRect.height + "px" });
      parent.insertBefore(this.spacer, this.menu);
    }
  }
};
MenuBarView.prototype.destroy = function destroy() {
  if (this.wrapper.parentNode) {
    this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper);
  }
};
function selectionIsInverted(selection) {
  if (selection.anchorNode == selection.focusNode) {
    return selection.anchorOffset > selection.focusOffset;
  }
  return selection.anchorNode.compareDocumentPosition(selection.focusNode) == Node.DOCUMENT_POSITION_FOLLOWING;
}
function findWrappingScrollable(node) {
  for (var cur = node.parentNode; cur; cur = cur.parentNode) {
    if (cur.scrollHeight > cur.clientHeight) {
      return cur;
    }
  }
}
function getAllWrapping(node) {
  var res = [window];
  for (var cur = node.parentNode; cur; cur = cur.parentNode) {
    res.push(cur);
  }
  return res;
}

// js/prosemirror/icons.js
var icons2 = __spreadProps(__spreadValues({}, icons), {
  strikethrough: {
    "width": 22,
    "height": 22,
    "path": "M15.6 8.5c-.5-.7-1-1.1-1.3-1.3c-.6-.4-1.3-.6-2-.6c-2.7 0-2.8 1.7-2.8 2.1c0 1.6 1.8 2 3.2 2.3c4.4.9 4.6 2.8 4.6 3.9c0 1.4-.7 4.1-5 4.1A6.2 6.2 0 017 16.4l1.5-1.1c.4.6 1.6 2 3.7 2c1.6 0 2.5-.4 3-1.2c.4-.8.3-2-.8-2.6c-.7-.4-1.6-.7-2.9-1c-1-.2-3.9-.8-3.9-3.6C7.6 6 10.3 5 12.4 5c2.9 0 4.2 1.6 4.7 2.4l-1.5 1.1zM5 11h14a1 1 0 010 2H5a1 1 0 010-2z"
  },
  underline: {
    "width": 22,
    "height": 20,
    "path": "M16 5c.6 0 1 .4 1 1v5.5a4 4 0 01-.4 1.8l-1 1.4a5.3 5.3 0 01-5.5 1a5 5 0 01-1.6-1c-.5-.4-.8-.9-1.1-1.4a4 4 0 01-.4-1.8V6c0-.6.4-1 1-1s1 .4 1 1v5.5c0 .3 0 .6.2 1l.6.7a3.3 3.3 0 002.2.8a3.4 3.4 0 002.2-.8c.3-.2.4-.5.6-.8l.2-.9V6c0-.6.4-1 1-1zM8 17h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 010-2z"
  }
});

// js/prosemirror/marks/helper.js
function toggleMultiMarks(markType, attrs) {
  return function(state, dispatch) {
    let { empty, $cursor, ranges } = state.selection;
    if (empty && !$cursor)
      return false;
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks())) {
          dispatch(state.tr.removeStoredMark(markType));
        }
        if (attrs) {
          dispatch(state.tr.addStoredMark(markType.create(attrs)));
        }
      } else {
        let has = false, tr = state.tr;
        for (let i = 0; !has && i < ranges.length; i++) {
          let { $from, $to } = ranges[i];
          has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
        }
        for (let i = 0; i < ranges.length; i++) {
          let { $from, $to } = ranges[i];
          let from2 = $from.pos, to = $to.pos, start = $from.nodeAfter, end = $to.nodeBefore;
          let spaceStart = start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
          let spaceEnd = end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
          if (from2 + spaceStart < to) {
            from2 += spaceStart;
            to -= spaceEnd;
          }
          if (attrs) {
            tr.addMark(from2, to, markType.create(attrs));
          } else {
            tr.removeMark(from2, to, markType);
          }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true;
  };
}
var generateExProsemirrorMarks = (marksSelection, marks2) => {
  const result = {};
  marksSelection.map((element) => {
    if (marks2[element.type]) {
      result[element.type] = __spreadProps(__spreadValues({}, marks2[element.type]), { config: element });
    }
  });
  return result;
};

// js/prosemirror/menu.js
function getTitle({ name, spec: { title } }) {
  return title || name;
}
var generateHeadingItem = (schema) => {
  if (schema.nodes.heading) {
    return schema.nodes.heading.spec.config.values.map((heading2) => {
      return blockTypeItem(schema.nodes.heading, {
        title: "Header " + heading2,
        label: "Header " + heading2,
        attrs: { level: heading2 }
      });
    });
  } else {
    return [];
  }
};
var generateParagraphItem = (schema) => {
  if (schema.nodes.paragraph) {
    return [blockTypeItem(schema.nodes.paragraph, {
      title: "paragraph",
      label: "paragraph"
    })];
  }
  return [];
};
var generateHTMLItem = (schema) => {
  if (schema.nodes.html) {
    return [
      new MenuItem({
        title: "Insert HTML code",
        label: "HTML",
        enable() {
          return true;
        },
        run(_state, _transaction, view) {
          const exEditorNode = view.dom.parentNode.parentNode;
          exEditorNode.dispatchEvent(new CustomEvent("exProsemirrorInsertPlaceholder", { detail: { nodeType: "html" } }));
        }
      })
    ];
  }
  return [];
};
var generateMediaMenu = (schema) => {
  if (!schema.nodes.image) {
    return [];
  }
  return [
    new MenuItem({
      title: "Insert image",
      label: "Image",
      enable() {
        return true;
      },
      run(_state, _transaction, view) {
        const exEditorNode = view.dom.parentNode.parentNode;
        exEditorNode.dispatchEvent(new CustomEvent("exProsemirrorInsertPlaceholder", { detail: { nodeType: "image" } }));
      }
    })
  ];
};
var generateMarkItem = (type) => {
  return (schema) => {
    if (!schema.marks[type]) {
      return [];
    }
    const markElement = schema.marks[type];
    const icon = markElement.spec.icon || icons2[type];
    return [markItem(schema.marks[type], { title: getTitle(markElement), icon })];
  };
};
function markItem(markType, options) {
  let passedOptions = {
    active(state) {
      return markActive(state, markType);
    },
    enable: true
  };
  for (let prop in options)
    passedOptions[prop] = options[prop];
  return cmdItem(toggleMark(markType), passedOptions);
}
function cmdItem(cmd, options) {
  let passedOptions = {
    label: options.title,
    run: cmd
  };
  for (let prop in options)
    passedOptions[prop] = options[prop];
  if ((!options.enable || options.enable === true) && !options.select)
    passedOptions[options.enable ? "enable" : "select"] = (state) => cmd(state);
  return new MenuItem(passedOptions);
}
function markActive(state, type) {
  let { from: from2, $from, to, empty } = state.selection;
  if (empty)
    return type.isInSet(state.storedMarks || $from.marks());
  else
    return state.doc.rangeHasMark(from2, to, type);
}
var generateColorsMenu = (schema) => {
  const items = generateMultiMarkItem(schema, "color");
  return [new Dropdown(items, { label: "Color" })];
};
var generateFontFamilyMenu = (schema) => {
  const items = generateMultiMarkItem(schema, "font_family");
  return [new Dropdown(items, { label: "Font" })];
};
var generateMultiMarkItem = (schema, markType) => {
  if (!schema.marks[markType]) {
    return [];
  }
  const results = [multiMarkItem(schema.marks[markType], { title: "default" })];
  const values = schema.marks[markType].spec.config.values;
  if (Array.isArray(values)) {
    for (const value of values) {
      const attrs = [];
      attrs[markType] = value;
      results.push(multiMarkItem(schema.marks[markType], { title: value }, attrs));
    }
  } else {
    for (const [name, value] of Object.entries(values)) {
      const attrs = [];
      attrs[markType] = value;
      results.push(multiMarkItem(schema.marks[markType], { title: name }, attrs));
    }
  }
  return results;
};
function multiMarkItem(markType, options, attrs) {
  return cmdItem(toggleMultiMarks(markType, attrs), __spreadValues({ enable: true }, options));
}
var menuHelper = { generateParagraphItem, generateHeadingItem, generateHTMLItem, generateMediaMenu };

// js/prosemirror/marks/index.js
var marks = {
  strong: __spreadProps(__spreadValues({}, import_prosemirror_schema_basic.marks.strong), { generateMenuItem: generateMarkItem("strong") }),
  em: __spreadProps(__spreadValues({}, import_prosemirror_schema_basic.marks.em), { generateMenuItem: generateMarkItem("em") }),
  link: __spreadValues({}, import_prosemirror_schema_basic.marks.link),
  strikethrough: {
    toDOM() {
      return ["del", 0];
    },
    parseDOM: [{ tag: "del" }],
    generateMenuItem: generateMarkItem("strikethrough")
  },
  underline: {
    toDOM() {
      return ["span", { style: "text-decoration: underline" }, 0];
    },
    parseDOM: [{ tag: "span" }],
    generateMenuItem: generateMarkItem("underline")
  },
  color: {
    title: "Color",
    label: "Color",
    attrs: { color: {} },
    toDOM(node) {
      return ["span", { style: "color: " + node.attrs.color }, 0];
    },
    parseDOM: [{ tag: "span", getAttrs(dom) {
      return {
        color: dom.style.color
      };
    } }],
    generateMenuItem: generateColorsMenu
  },
  font_family: {
    title: "Font",
    label: "Font",
    attrs: { font_family: {} },
    toDOM(node) {
      return ["span", { style: "font-family: " + node.attrs.font_family }, 0];
    },
    parseDOM: [{ tag: "span", getAttrs(dom) {
      return {
        font_family: dom.style["font-family"]
      };
    } }],
    generateMenuItem: generateFontFamilyMenu
  }
};
var generateSchemaMarks = ({ marksSelection, marks: marks2 }) => generateExProsemirrorMarks(marksSelection, marks2);

// js/prosemirror/blocks/index.js
var import_prosemirror_schema_basic2 = __toModule(require("prosemirror-schema-basic"));

// js/prosemirror/blocks/helpers.js
function inlineDoc(blocks2, inline) {
  return inline ? { content: "block?" } : blocks2.doc;
}
var generateExProsemirorBlocks = (blocksSelection, blocks2, inline) => {
  const map5 = {
    text: blocks2.text,
    doc: inlineDoc(blocks2, inline)
  };
  blocksSelection.map((element) => {
    if (blocks2[element.type]) {
      map5[element.type] = __spreadProps(__spreadValues({}, blocks2[element.type]), { config: element });
    }
  });
  return map5;
};

// js/prosemirror/blocks/index.js
var paragraph = __spreadProps(__spreadValues({}, import_prosemirror_schema_basic2.nodes.paragraph), {
  generateMenuItem: menuHelper.generateParagraphItem
});
var heading = __spreadProps(__spreadValues({}, import_prosemirror_schema_basic2.nodes.heading), {
  generateMenuItem: menuHelper.generateHeadingItem
});
var html = {
  inline: true,
  attrs: {
    html: { default: null }
  },
  group: "inline",
  draggable: false,
  parseDOM: [{ tag: "div[html]", getAttrs(dom) {
    return {
      html: dom.getAttribute("html")
    };
  } }],
  toDOM(node) {
    let { html: html2 } = node.attrs;
    let myDom = document.createElement("div");
    myDom.innerHTML = html2;
    return myDom;
  },
  generateMenuItem: menuHelper.generateHTMLItem
};
var image = __spreadProps(__spreadValues({}, import_prosemirror_schema_basic2.nodes.image), {
  inline: false,
  group: "block",
  generateMenuItem: menuHelper.generateMediaMenu
});
var blocks = {
  doc: import_prosemirror_schema_basic2.nodes.doc,
  text: import_prosemirror_schema_basic2.nodes.text,
  hard_break: import_prosemirror_schema_basic2.nodes.hard_break,
  paragraph,
  heading,
  image,
  html
};
var generateSchemablocks = ({ blocksSelection, blocks: blocks2, inline }) => generateExProsemirorBlocks(blocksSelection, blocks2, inline);

// js/prosemirror/schema.js
var schema_default = (options) => new import_prosemirror_model3.Schema({
  nodes: generateSchemablocks(options),
  marks: generateSchemaMarks(options)
});

// js/ExEditorView.js
var ExEditorView = class {
  constructor(editorNode, opts) {
    this.editorNode = editorNode;
    this.target = editorNode.dataset.target + "_plain";
    this.editorView = new import_prosemirror_view2.EditorView(editorNode, {
      state: this.initializeEditorState(opts),
      dispatchTransaction: (transaction) => {
        this.dispatchTransaction(transaction);
      }
    });
    this.addListeners();
  }
  initializeEditorState({ blocks: blocks2, marks: marks2, plugins }) {
    const opts = {
      marksSelection: JSON.parse(this.editorNode.dataset.marks),
      blocksSelection: JSON.parse(this.editorNode.dataset.blocks),
      inline: JSON.parse(this.editorNode.dataset.inline),
      blocks: blocks2,
      marks: marks2
    };
    const schema = schema_default(opts);
    plugins = plugins(schema).map((plugin, index) => {
      if (plugin.key.startsWith("plugin$")) {
        plugin.key = "plugin$" + index;
      }
      return plugin;
    });
    return import_prosemirror_state5.EditorState.create({
      doc: this.getDoc(schema),
      plugins
    });
  }
  getDoc(schema) {
    const initialValue = document.querySelector(this.target).value;
    if (initialValue.length > 0) {
      try {
        return schema.nodeFromJSON(JSON.parse(initialValue));
      } catch (e) {
        return import_prosemirror_model4.DOMParser.fromSchema(schema).parse("");
      }
    } else {
      return import_prosemirror_model4.DOMParser.fromSchema(schema).parse("");
    }
  }
  addListeners() {
    const exEditorView = this;
    this.editorNode.addEventListener("exProsemirrorInsertPlaceholder", ({ detail }) => {
      insertPlaceholder(exEditorView, { nodeType: detail.nodeType });
    });
  }
  dispatchTransaction(transaction) {
    const newState = this.editorView.state.apply(transaction);
    const parsedState = newState.doc.toJSON();
    const input = document.querySelector(this.target);
    input.value = JSON.stringify(parsedState);
    input.dispatchEvent(new CustomEvent("change", { detail: JSON.parse(input.value) }));
    this.editorView.updateState(newState);
  }
};

// js/hooks/index.js
var import_prosemirror_example_setup = __toModule(require("prosemirror-example-setup"));
var ExProsemirrorHooks = {};
ExProsemirrorHooks.MountProseMirror = {
  mounted() {
    js_default.init(this.el, { schemaFunc: schema_default, pluginFunc: import_prosemirror_example_setup.exampleSetup });
  },
  updated() {
    js_default.init(this.el, { schemaFunc: schema_default, pluginFunc: import_prosemirror_example_setup.exampleSetup });
  }
};

// node_modules/w3c-keyname/index.es.js
var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  229: "q"
};
var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"',
  229: "Q"
};
var chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
var safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
var gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
var mac2 = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
var brokenModifierNames = chrome && (mac2 || +chrome[1] < 57) || gecko && mac2;
for (var i = 0; i < 10; i++)
  base[48 + i] = base[96 + i] = String(i);
for (var i = 1; i <= 24; i++)
  base[i + 111] = "F" + i;
for (var i = 65; i <= 90; i++) {
  base[i] = String.fromCharCode(i + 32);
  shift[i] = String.fromCharCode(i);
}
for (var code in base)
  if (!shift.hasOwnProperty(code))
    shift[code] = base[code];
function keyName(event) {
  var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari || ie) && event.shiftKey && event.key && event.key.length == 1;
  var name = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
  if (name == "Esc")
    name = "Escape";
  if (name == "Del")
    name = "Delete";
  if (name == "Left")
    name = "ArrowLeft";
  if (name == "Up")
    name = "ArrowUp";
  if (name == "Right")
    name = "ArrowRight";
  if (name == "Down")
    name = "ArrowDown";
  return name;
}

// node_modules/prosemirror-keymap/dist/index.es.js
var import_prosemirror_state6 = __toModule(require("prosemirror-state"));
var mac3 = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
function normalizeKeyName(name) {
  var parts = name.split(/-(?!$)/), result = parts[parts.length - 1];
  if (result == "Space") {
    result = " ";
  }
  var alt, ctrl, shift2, meta;
  for (var i = 0; i < parts.length - 1; i++) {
    var mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;
    } else if (/^a(lt)?$/i.test(mod)) {
      alt = true;
    } else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;
    } else if (/^s(hift)?$/i.test(mod)) {
      shift2 = true;
    } else if (/^mod$/i.test(mod)) {
      if (mac3) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else {
      throw new Error("Unrecognized modifier name: " + mod);
    }
  }
  if (alt) {
    result = "Alt-" + result;
  }
  if (ctrl) {
    result = "Ctrl-" + result;
  }
  if (meta) {
    result = "Meta-" + result;
  }
  if (shift2) {
    result = "Shift-" + result;
  }
  return result;
}
function normalize(map5) {
  var copy2 = Object.create(null);
  for (var prop in map5) {
    copy2[normalizeKeyName(prop)] = map5[prop];
  }
  return copy2;
}
function modifiers(name, event, shift2) {
  if (event.altKey) {
    name = "Alt-" + name;
  }
  if (event.ctrlKey) {
    name = "Ctrl-" + name;
  }
  if (event.metaKey) {
    name = "Meta-" + name;
  }
  if (shift2 !== false && event.shiftKey) {
    name = "Shift-" + name;
  }
  return name;
}
function keymap(bindings) {
  return new import_prosemirror_state6.Plugin({ props: { handleKeyDown: keydownHandler(bindings) } });
}
function keydownHandler(bindings) {
  var map5 = normalize(bindings);
  return function(view, event) {
    var name = keyName(event), isChar = name.length == 1 && name != " ", baseName;
    var direct = map5[modifiers(name, event, !isChar)];
    if (direct && direct(view.state, view.dispatch, view)) {
      return true;
    }
    if (isChar && (event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) && (baseName = base[event.keyCode]) && baseName != name) {
      var fromCode = map5[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) {
        return true;
      }
    } else if (isChar && event.shiftKey) {
      var withShift = map5[modifiers(name, event, true)];
      if (withShift && withShift(view.state, view.dispatch, view)) {
        return true;
      }
    }
    return false;
  };
}

// js/prosemirror/keymaps.js
function insertHardBreak(state, dispatch) {
  const br = state.schema.nodes.hard_break;
  dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
}
var hardBreakKeymap = {
  "Shift-Enter": chainCommands(exitCode, insertHardBreak)
};

// js/index.js
var proseInstances = document.querySelectorAll(".ex-prosemirror");
var ExProsemirror = class {
  setBlocks(blocks2) {
    this.blocks = blocks2;
    return this;
  }
  setMarks(marks2) {
    this.marks = marks2;
    return this;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
    return this;
  }
  initAll() {
    Array.from(proseInstances).forEach((el) => {
      this.init(el);
    });
  }
  init(target) {
    if (target instanceof HTMLElement) {
      target.innerHTML = "";
      const plugins = this.plugins || [];
      return new ExEditorView(target, { blocks: this.blocks, marks: this.marks, plugins });
    }
    return null;
  }
};
var js_default = new ExProsemirror();
//# sourceMappingURL=ex_prosemirror.cjs.js.map
