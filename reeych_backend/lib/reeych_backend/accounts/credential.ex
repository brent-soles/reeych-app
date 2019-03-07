defmodule ReeychBackend.Accounts.Credential do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  # Defined Modules
  alias ReeychBackend.Accounts.User

  schema "credentials" do
    field :email, :string
    field :password, :string
    belongs_to :user, User, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(credential, attrs) do
    credential
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end
end
