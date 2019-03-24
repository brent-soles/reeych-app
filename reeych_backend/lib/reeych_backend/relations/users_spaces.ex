defmodule ReeychBackend.Relations.UsersSpaces do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  @primary_key false
  schema "users_spaces_rel" do
    belongs_to :user, ReeychBackend.Accounts.User, primary_key: true
    belongs_to :space, ReeychBackend.Spaces.Space, primary_key: true
    field :access_level, :string, default: "user"
  end

  @doc false
  def changeset(user_space, attrs \\ %{}) do
    user_space
    |> cast(attrs, [:user_id, :space_id, :access_level])
    |> validate_required([:user_id, :space_id, :access_level])
  end

  def update_user_spaces(user_space, attrs \\ %{}) do
    user_space
    |> changeset(attrs)
    |> ReeychBackend.Repo.update!
  end
end