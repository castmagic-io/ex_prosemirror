var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
  icons: () => icons,
  insertPlaceholder: () => insertPlaceholder,
  keymap: () => keymap,
  marks: () => marks,
  menu: () => menu_exports,
  placeholderPlugin: () => placeholderPlugin,
  replacePlaceholder: () => replacePlaceholder
});

// js/inject.js
function inject_default(name, init) {
  const inject = window.__EX_PROSEMIRROR_INJECT__ || {};
  if (init) {
    inject[name] = init;
  }
  const module2 = inject[name];
  if (!module2) {
    throw new Error(`Unable to find ${name} in browser environment`);
  } else {
    return module2;
  }
}

// js/prosemirror/plugins/placeholder.js
var { Plugin } = inject_default("prosemirror-state");
var { Decoration, DecorationSet } = inject_default("prosemirror-view");
var placeholderPlugin = new Plugin({
  state: {
    init() {
      return DecorationSet.empty;
    },
    apply(tr, set) {
      set = set.map(tr.mapping, tr.doc);
      let action = tr.getMeta(this);
      if (action && action.add) {
        let widget = document.createElement("placeholder");
        let deco = Decoration.widget(action.add.pos, widget, { id: action.add.id });
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

// js/prosemirror/icons.js
var { icons: prosemirrorIcons } = inject_default("prosemirror-menu");
var icons = __spreadProps(__spreadValues({}, prosemirrorIcons), {
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
          let from = $from.pos, to = $to.pos, start = $from.nodeAfter, end = $to.nodeBefore;
          let spaceStart = start && start.isText ? /^\s*/.exec(start.text)[0].length : 0;
          let spaceEnd = end && end.isText ? /\s*$/.exec(end.text)[0].length : 0;
          if (from + spaceStart < to) {
            from += spaceStart;
            to -= spaceEnd;
          }
          if (attrs) {
            tr.addMark(from, to, markType.create(attrs));
          } else {
            tr.removeMark(from, to, markType);
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
var { MenuItem, blockTypeItem, Dropdown } = inject_default("prosemirror-menu");
var { toggleMark } = inject_default("prosemirror-commands");
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
    const icon = markElement.spec.icon || icons[type];
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
  let { from, $from, to, empty } = state.selection;
  if (empty)
    return type.isInSet(state.storedMarks || $from.marks());
  else
    return state.doc.rangeHasMark(from, to, type);
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
var { marks: prosemirrorMarks } = inject_default("prosemirror-schema-basic");
var marks = {
  strong: __spreadProps(__spreadValues({}, prosemirrorMarks.strong), { generateMenuItem: generateMarkItem("strong") }),
  em: __spreadProps(__spreadValues({}, prosemirrorMarks.em), { generateMenuItem: generateMarkItem("em") }),
  link: __spreadValues({}, prosemirrorMarks.link),
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

// js/prosemirror/blocks/helpers.js
function inlineDoc(blocks2, inline) {
  return inline ? { content: "block?" } : blocks2.doc;
}
var generateExProsemirorBlocks = (blocksSelection, blocks2, inline) => {
  const map = {
    text: blocks2.text,
    doc: inlineDoc(blocks2, inline)
  };
  blocksSelection.map((element) => {
    if (blocks2[element.type]) {
      map[element.type] = __spreadProps(__spreadValues({}, blocks2[element.type]), { config: element });
    }
  });
  return map;
};

// js/prosemirror/blocks/index.js
var { nodes } = inject_default("prosemirror-schema-basic");
var paragraph = __spreadProps(__spreadValues({}, nodes.paragraph), {
  generateMenuItem: menuHelper.generateParagraphItem
});
var heading = __spreadProps(__spreadValues({}, nodes.heading), {
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
var image = __spreadProps(__spreadValues({}, nodes.image), {
  inline: false,
  group: "block",
  generateMenuItem: menuHelper.generateMediaMenu
});
var blocks = {
  doc: nodes.doc,
  text: nodes.text,
  hard_break: nodes.hard_break,
  paragraph,
  heading,
  image,
  html
};
var generateSchemablocks = ({ blocksSelection, blocks: blocks2, inline }) => generateExProsemirorBlocks(blocksSelection, blocks2, inline);

// js/prosemirror/schema.js
var { Schema } = inject_default("prosemirror-model");
var schema_default = (options) => new Schema({
  nodes: generateSchemablocks(options),
  marks: generateSchemaMarks(options)
});

// js/ExEditorView.js
var { DOMParser } = inject_default("prosemirror-model");
var { EditorState } = inject_default("prosemirror-state");
var { EditorView } = inject_default("prosemirror-view");
var ExEditorView = class {
  constructor(editorNode, opts) {
    this.editorNode = editorNode;
    this.target = editorNode.dataset.target + "_plain";
    this.editorView = new EditorView(editorNode, {
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
    return EditorState.create({
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
        return DOMParser.fromSchema(schema).parse("");
      }
    } else {
      return DOMParser.fromSchema(schema).parse("");
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
var { exampleSetup: pluginFunc } = inject_default("prosemirror-example-setup");
var ExProsemirrorHooks = {};
ExProsemirrorHooks.MountProseMirror = {
  mounted() {
    js_default.init(this.el, { schemaFunc: schema_default, pluginFunc });
  },
  updated() {
    js_default.init(this.el, { schemaFunc: schema_default, pluginFunc });
  }
};

// js/prosemirror/keymaps.js
var { keymap } = inject_default("prosemirror-keymap");
var { baseKeymap, chainCommands, exitCode } = inject_default("prosemirror-commands");
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
