defmodule ReeychBackendWeb.Graphql.AccountsResolver do
  alias ReeychBackend.Accounts
  alias ReeychBackend.Accounts.{Credential}

  def get_account(_root, %{email: email, password: password} = _args, _info) do
    case Accounts.get_account(%Credential{email: email, password: password}) do 
      {:error, _} -> 
        {:error, %{message: "Query failed for creds: #{email}"}}
      {:ok, data} ->
        {:ok, data}
    end
  end

  def update_account(_root, args, _info) do

  end

end