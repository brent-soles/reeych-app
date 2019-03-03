defmodule ReeychBackend.Repo do
  use Ecto.Repo,
    otp_app: :reeych_backend,
    adapter: Ecto.Adapters.Postgres
end
