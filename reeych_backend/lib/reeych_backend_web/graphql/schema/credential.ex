defmodule ReeychBackendWeb.Graphql.CredentialSchema do
  use Absinthe.Schema

  # alias CommunityWeb.NewsResolver

  object :link do
    field :email, non_null(:string)
    field :password, non_null(:string)
  end

  object :message do
    field :success, non_null(:boolean)
    field :message, :string
  end

  query do
    field :login, non_null(:message)
  end
end