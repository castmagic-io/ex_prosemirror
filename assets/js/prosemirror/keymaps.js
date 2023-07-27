// import { keymap } from 'prosemirror-keymap';
// import { baseKeymap, chainCommands, exitCode } from 'prosemirror-commands';
import inject from "../inject";

const { keymap } = inject('prosemirror-keymap');
const { baseKeymap, chainCommands, exitCode } = inject('prosemirror-commands');

function insertHardBreak(state, dispatch) {
  const br = state.schema.nodes.hard_break;

  dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
}

const hardBreakKeymap = {
  'Shift-Enter': chainCommands(exitCode, insertHardBreak),
};

export { keymap, baseKeymap, hardBreakKeymap };
