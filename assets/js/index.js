import ExEditorView from './ExEditorView';

export { ExProsemirrorHooks } from './hooks';
export { blocks, generateSchemablocks } from './prosemirror/blocks';
export { marks, generateSchemaMarks } from './prosemirror/marks';
export { placeholderPlugin, insertPlaceholder, replacePlaceholder } from './prosemirror/plugins/placeholder';
export { icons } from './prosemirror/icons';
export { keymap, baseKeymap, hardBreakKeymap } from './prosemirror/keymaps';
export * as menu from './prosemirror/menu';
export { default as createSchema } from './prosemirror/schema';
export { default as ExEditorView } from './ExEditorView';
export { default as inject } from './inject';

/**
 * @type {NodeListOf<HTMLElement>} proseInstances
 */
const proseInstances = document.querySelectorAll('.ex-prosemirror');

/**
 * ExProsemirror manage prosemirror in elixir project.
 */
class ExProsemirror {
  /**
   * @param {[Object]} blocks
   */
  setBlocks(blocks) {
    this.blocks = blocks;
    return this;
  }

  /**
   * @param {[Object]} marks
   */
  setMarks(marks) {
    this.marks = marks;
    return this;
  }

  setPlugins(plugins) {
    this.plugins = plugins;
    return this;
  }

  /**
   * Initializes all prosemirror instances.
   */
  initAll() {
    Array.from(proseInstances).forEach(el => {
      this.init(el);
    });
  }

  /**
   * Initializes the specified target (should be an ex_prosemirror instance).
   *
   * @param {Element} target - target to initialize.
   */
  init(target) {
    if (target instanceof HTMLElement) {
      target.innerHTML = '';
      const plugins = this.plugins || [];
      return new ExEditorView(target, { blocks: this.blocks, marks: this.marks, plugins });
    }

    return null;
  }
}

export default new ExProsemirror();
