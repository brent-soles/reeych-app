defmodule ReeychBackend.Spaces.Space do
  use Ecto.Schema
  import Ecto.Changeset


  schema "spaces" do
    field :card_count, :integer
    field :name, :string
    field :users, :map

    timestamps()
  end

  @doc false
  def changeset(space, attrs) do
    space
    |> cast(attrs, [:name, :card_count, :users])
    |> validate_required([:name, :card_count, :users])
  end
end
