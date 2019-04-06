defmodule ReeychBackendWeb.Graphql.Schema do
  use Absinthe.Schema
  import_types ReeychBackendWeb.Graphql.SpacesSchema
  import_types ReeychBackendWeb.Graphql.AccountSchema
  import_types ReeychBackendWeb.Graphql.CredentialSchema
  # Resolver imports
  alias ReeychBackendWeb.Graphql.AccountsResolver

  # Oject/Type definitions
  # ~~~~~~ defs start ~~~~~~
  
    # Schema types
  
  
  

  # object :spaces do
  #   field :id, non_null(:string)
  #   field :name, non_null(:string)
  #   field :org, non_null(:string)
  # end

    # General types
  # Used for a return type
  object :response do
    field :success, non_null(:boolean)
    field :status_code, non_null(:integer)
    field :message, :string
  end

  # ~~~~~~~ defs end ~~~~~~~

  # ~~~~~~~~~~~~~~~~~~~~~~~ #

  # Resolver definitions
  # ~~~~~~ resolvers start ~~~~~~

    # Query types
  query do
    field :authenticate_credentials, :credential do
      arg :input, type: non_null(:provided_user_credentials)
      resolve &AccountsResolver.get_account/3
    end

    field :get_space, :space do
      arg :input, type: non_null(:get_space_input)
      resolve &AccountsResolver.get_account/3
    end
  end

  # mutation do
  # end
  # ~~~~~~~ resolvers end ~~~~~~~

end