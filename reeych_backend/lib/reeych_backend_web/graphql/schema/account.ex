defmodule ReeychBackendWeb.Graphql.AccountSchema do
  use Absinthe.Schema.Notation

  # alias CommunityWeb.NewsResolver

  object :account do
    field :id, :string
    field :email, :string
    field :user, :user
  end

  object :message do
    field :success, non_null(:boolean)
    field :message, :string
  end

end