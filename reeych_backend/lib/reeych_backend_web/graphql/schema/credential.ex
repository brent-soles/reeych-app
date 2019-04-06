defmodule ReeychBackendWeb.Graphql.CredentialSchema do
  use Absinthe.Schema.Notation

  object :user do
    field :id, non_null(:string)
    field :first_name, non_null(:string)
    field :last_name, non_null(:string)
    field :job_title, :string
    field :verified, :boolean
  end

  # I know this doesn't make much sense,
  # to call this an 'account', but it will
  # do for now.
  object :credential do
    field :email, non_null(:string)
    field :password, non_null(:string)
    field :user, non_null(:user)
  end

  input_object :provided_user_credentials do
    field :email, :string
    field :password, :string
  end
end