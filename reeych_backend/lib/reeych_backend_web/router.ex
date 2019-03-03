defmodule ReeychBackendWeb.Router do
  use ReeychBackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ReeychBackendWeb do
    pipe_through :api
  end
end
