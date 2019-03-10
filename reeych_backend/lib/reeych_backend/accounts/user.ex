defmodule ReeychBackend.Accounts.User do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  alias ReeychBackend.Accounts.Credential

  schema "users" do
    field :first_name, :string
    field :job_title, :string
    field :last_name, :string
    field :verified, :boolean

    has_one :credential, Credential

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :job_title])
    |> validate_required([:first_name, :last_name, :job_title])
  end
end
