defmodule ReeychBackendWeb.Graphql.AccountsResolver do
  alias ReeychBackend.Accounts
  alias ReeychBackend.Accounts.{Credential, User}

  def get_account(_root, %{email: email, password: password} = _args, _info) do
    case Accounts.get_account(%Credential{email: email, password: password}) do 
      {:error, _} -> 
        {:error, %{message: "Query failed for creds: #{email}"}}
      {:ok, data} ->
        {:ok, data}
    end
  end

  def update_account(_root, %{id: id} = args, _info) do
    # Merge args into new structs to submit
    # to update function. If no changes, ignore
    # DB update
    user_and_creds = Account.get_user!(id) |> Repo.preload(:credential)
    
    updates_user = struct(%User{}, args)
    
    updates_credential = struct(%Credential{}, args)
  

  end
end