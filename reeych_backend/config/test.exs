use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :reeych_backend, ReeychBackendWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :reeych_backend, ReeychBackend.Repo,
  username: "postgres",
  password: "postgres",
  database: "reeych_backend_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
