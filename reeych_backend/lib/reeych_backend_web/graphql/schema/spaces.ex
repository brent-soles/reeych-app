defmodule ReeychBackendWeb.Graphql.SpacesSchema do
  use Absinthe.Schema.Notation

  object :space do
    field :name, :string
    field :org, :string
    field :private, :boolean
  end

  input_object :get_space_input do
    field :requester, :string
    field :spaceId, :string
  end
end