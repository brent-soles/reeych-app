defmodule ReeychBackendWeb.Router do
  use ReeychBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api
    # get "/", GraphqlEntryController, [:index]
    # post "/", GraphqlEntryController, [:create, :update, :delete]

    forward "/graphql", Absinthe.Plug.GraphiQL,
      schema: ReeychBackendWeb.Graphql.Schema,
      interface: :simple,
      context: %{pubsub: ReeychBackendWeb.Endpoint}
  end
end