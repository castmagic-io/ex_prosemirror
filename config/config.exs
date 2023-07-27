import Config

config :ex_prosemirror,
  debug: false,
  env: config_env()

if Mix.env() == :dev do
  esbuild = fn args ->
    [
      args: ~w(./js --bundle) ++ args,
      cd: Path.expand("../assets", __DIR__),
      env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
    ]
  end

  config :esbuild,
    version: "0.12.15",
    module: esbuild.(~w(--format=esm --sourcemap --outfile=../priv/static/ex_prosemirror.esm.js)),
    main: esbuild.(~w(--format=cjs --sourcemap --outfile=../priv/static/ex_prosemirror.cjs.js)),
    cdn:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=LiveView --outfile=../priv/static/ex_prosemirror.js)
      ),
    cdn_min:
      esbuild.(
        ~w(--format=iife --target=es2016 --global-name=LiveView --minify --outfile=../priv/static/ex_prosemirror.min.js)
      )
end

if config_env() == :test do
  config :ex_prosemirror,
    marks_modules: [
      em: ExProsemirror.Mark.Em,
      strong: ExProsemirror.Mark.Strong,
      underline: ExProsemirror.Mark.Underline
    ],
    blocks_modules: [
      paragraph: ExProsemirror.Block.Paragraph,
      heading: ExProsemirror.Block.Heading,
      image: ExProsemirror.Block.Image,
      text: ExProsemirror.Block.Text
    ],
    types: [
      marks_only: [
        blocks: [],
        marks: [:em]
      ],
      blocks_only: [
        blocks: [:paragraph],
        marks: []
      ],
      title: [
        inline: true,
        marks: [:strong],
        blocks: [{:heading, [1, 2]}, :paragraph]
      ],
      sublead: [
        marks: [:em],
        blocks: [{:heading, [2, 3]}]
      ],
      empty: [
        marks: [],
        blocks: []
      ]
    ]
end
