export default function (name, init) {
  const inject = window.__EX_PROSEMIRROR_INJECT__ || {};

  if (init) {
    inject[name] = init;
  }

  const module = inject[name];

  if (!module) {
    throw new Error(`Unable to find ${name} in browser environment`);
  } else {
    return module;
  }
}
