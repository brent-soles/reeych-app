defmodule ReeychBackend.Spaces.Space do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset


  schema "spaces" do
    field :name, :string
    field :org, :string
    field :private, :boolean, default: false
    many_to_many :users, ReeychBackend.Accounts.User, join_through: ReeychBackend.Relations.UsersSpaces

    timestamps()
  end

  @doc false
  def changeset(space, attrs) do
    space
    |> cast(attrs, [:org, :name, :private])
    |> validate_required([:org, :name, :private])
  end
end
