defmodule ExProsemirror.TypeGenerator do
  @moduledoc ~S"""
  Generate types of ExProsemirror.
  """

  # FIXME : quick fix to return an error. We should prove a mix task to
  # generate Type instead of generated them on build
  @types Application.compile_env(:ex_prosemirror, :types, [])
  @default_blocks Application.compile_env(:ex_prosemirror, :default_blocks)
  @default_marks Application.compile_env(:ex_prosemirror, :default_marks)
  @blocks_modules Application.compile_env(:ex_prosemirror, :blocks_modules, [])
  @marks_modules Application.compile_env(:ex_prosemirror, :marks_modules, [])

  @doc ~S"""
  Generate all types defined in config `:exprosemirror`, `:types`.
  """
  defmacro generate_all do
    context = get_context()

    @types
    |> Stream.map(fn {name, opts} -> generate(name, opts, context) end)
    |> Stream.run()
  end

  defp generate(name, opts, context) do
    module_name = opts[:module] || Module.concat(ExProsemirror.Type, Macro.camelize("#{name}"))

    opts =
      opts
      |> Keyword.put_new(:blocks, @default_blocks)
      |> Keyword.put_new(:marks, @default_marks)
      |> Keyword.put_new(:name, name)

    module_content = type_module_content(opts, context)
    Module.create(module_name, module_content, Macro.Env.location(__ENV__))
  end

  defp type_module_content(opts, context) do
    context = [
      marks: define_modifiers(opts, :marks, context),
      blocks: define_modifiers(opts, :blocks, context),
      inline: opts[:inline] || false
    ]

    quote do
      use Ecto.Schema
      use ExProsemirror, safe_parser: true

      import Ecto.Changeset

      alias ExProsemirror.Encoder.HTML, as: HTMLEncoder

      unquote(type_schema(context))
      unquote(type_changeset(context))
      defdelegate changeset(struct_or_changeset, attrs, allowed_marks), to: ExProsemirror.Type

      defimpl HTMLEncoder do
        def encode(struct, _opts) do
          HTMLEncoder.encode(struct.content)
        end
      end

      defimpl Jason.Encoder do
        def encode(struct, opts) do
          Map.from_struct(struct)
          |> Jason.Encode.map(opts)
        end
      end
    end
  end

  defp type_schema(context) do
    quote do
      embedded_schema do
        field :type, :string
        embedded_prosemirror_content(unquote(context[:blocks]), array: true)
      end
    end
  end

  defp type_changeset(context) do
    with_opts =
      Keyword.new(context[:blocks], fn {name, module} ->
        {name, {module, :changeset, [[marks: context[:marks]]]}}
      end)

    changeset_opts = [with: with_opts, inline: context[:inline]]

    quote do
      def changeset(struct_or_changeset, attrs \\ %{}) do
        struct_or_changeset
        |> cast(attrs, [:type])
        |> changeset(attrs, unquote(Macro.escape(changeset_opts)))
      end
    end
  end

  defp define_modifiers(opts, type, context) when is_list(opts) do
    modifiers_names =
      (opts[type] || [])
      |> Enum.map(&modifier_name/1)

    Keyword.take(context[type], modifiers_names)
  end

  defp modifier_name({block, _}), do: block
  defp modifier_name(block), do: block

  def get_context do
    [
      marks: @marks_modules,
      blocks: @blocks_modules
    ]
  end
end
