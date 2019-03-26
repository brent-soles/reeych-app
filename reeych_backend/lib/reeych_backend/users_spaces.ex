defmodule ReeychBackend.UserSpace do
  import Ecto.Query, warn: false
  alias ReeychBackend.Repo

  alias ReeychBackend.Accounts
  alias ReeychBackend.Spaces
  alias ReeychBackend.Relations.UsersSpaces

  def get_user_space_relation(
    %{user_id: _, space_id: _} = ids
  ) do 
    
    case Repo.get_by(UsersSpaces, user_id: ids.user_id, space_id: ids.space_id) do
      nil ->
        {:error, "No entry found for user space relation"}
      user_space_rel ->
        {:ok, user_space_rel}
    end
  end

  def add_user_space_relation(
    %{user_id: _, space_id: _} = ids,
    requested_access_level \\ nil
  ) do
    
    # Adding a user twice to a space is
    # a pkey constraint forced on DB
    %UsersSpaces{user_id: ids.user_id, space_id: ids.space_id, access_level: requested_access_level}
    |> UsersSpaces.changeset
    |> Repo.insert
  end

  def update_user_space_relation(
    %{user_id: _, space_id: _} = ids,
    data
  ) do
    Repo.get_by(UsersSpaces, user_id: ids.user_id, space_id: ids.space_id)
    |> UsersSpaces.changeset(data)
    |> Repo.update()
  end

  def delete_user_space_relation(
    %{user_id: _, space_id: _} = ids
  ) do
    Repo.get_by(UsersSpaces, user_id: ids.user_id, space_id: ids.space_id)
    |> Repo.delete()
  end

end