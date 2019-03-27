defmodule ReeychBackendWeb.Graphql.Schema do
  use Absinthe.Schema

  # Resolver imports
  alias ReeychBackendWeb.Graphql.AccountsResolver

  # Oject/Type definitions
  # ~~~~~~ defs start ~~~~~~
  
    # Schema types
  object :user do
    field :id, non_null(:string)
    field :first_name, non_null(:string)
    field :last_name, non_null(:string)
    field :job_title, :string
    field :verified, :boolean
  end
  
  object :credential do
    field :email, non_null(:string)
    field :password, non_null(:string)
    field :user, :user
  end

  object :spaces do
    field :id, non_null(:string)
    field :name, non_null(:string)
    field :org, non_null(:string)
  end

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
    field :get_account, :credential do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &AccountsResolver.get_account/3
    end
  end

  # mutation do
  # end
  # ~~~~~~~ resolvers end ~~~~~~~

end