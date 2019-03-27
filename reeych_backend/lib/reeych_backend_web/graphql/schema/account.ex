defmodule ReeychBackendWeb.Graphql.AccountSchema do
  use Absinthe.Schema

  # alias CommunityWeb.NewsResolver

  object :account do
    field :id, non_null(:string)
    field :authed, non_null(:boolean)
  end

  object :message do
    field :success, non_null(:boolean)
    field :message, :string
  end

  query do
    field :get_account, non_null(:message)
  end
end