defmodule ReeychBackend.Accounts.User do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string
    field :user_verified, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :email, :password, :user_verified])
    |> validate_required([
        :first_name, 
        :last_name, 
        :email, 
        :password, 
        :user_verified
      ])
    |> validate_format(:email, ~r/@/) #Check if email string is a valid email
    |> validate_length(:password, min: 8, max: 64)
    |> unique_constraint(:email)
    |> hash_pass
  end

  defp hash_pass(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Argon2.add_hash(password))
  end

  defp hash_pass(changeset) do 
    changeset 
  end
end
