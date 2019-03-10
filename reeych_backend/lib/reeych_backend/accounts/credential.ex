defmodule ReeychBackend.Accounts.Credential do
  use Ecto.Schema
  import Ecto.Changeset

  # Defined Modules
  alias ReeychBackend.Accounts.User

  # Disable auto-generated ID, no need in
  # this schema
  @primary_key false
  schema "credentials" do
    field :email, :string, primary_key: true
    field :password, :string
    belongs_to :user, User, type: Ecto.ShortUUID

    timestamps()
  end

  @doc false
  def changeset(credential, attrs) do
    credential
    |> cast(attrs, [:email, :password, :user_id])
    |> validate_required([:email, :password, :user_id])
    |> validate_format(:email, ~r/[A-Za-z0-9]+\@[A-Za-z]+\.(com|net|gov|org)/s)
    |> unique_constraint(:email)
  end

  @doc true
  # used in the changeset to hash the password before inserting into the DB
  def hash_password(changeset) do
    password = get_field(changeset, :password)

    unless is_nil(password) do
      # Argon2 returns a tuple, with hashed password in password_hash
      put_change(changeset, :password, Argon2.add_hash(password).password_hash)
    end
  end
end
