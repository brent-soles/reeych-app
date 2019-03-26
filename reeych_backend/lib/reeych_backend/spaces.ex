defmodule ReeychBackend.Spaces do
  @moduledoc """
  The Spaces context.
  """

  import Ecto.Query, warn: false
  alias ReeychBackend.Repo

  alias ReeychBackend.Spaces.Space
  alias ReeychBackend.Accounts

  # Relation functions
  alias ReeychBackend.UserSpace

  @doc """
  Returns the list of spaces.

  ## Examples

      iex> list_spaces()
      [%Space{}, ...]

  """
  def list_spaces do
    Repo.all(Space)
  end

  @doc """
  Gets a single space.

  Raises `Ecto.NoResultsError` if the Space does not exist.

  ## Examples

      iex> get_space!(123)
      %Space{}

      iex> get_space!(456)
      ** (Ecto.NoResultsError)

  """
  def get_space!(id), do: Repo.get!(Space, id)

  @doc """
  Creates a space.

  ## Examples

      iex> create_space(%{field: value})
      {:ok, %Space{}}

      iex> create_space(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_space(attrs \\ %{}) do
    %Space{}
    |> Space.changeset(attrs)
    |> Repo.insert()
  end


  @doc """
    Creates a space, given the user's ID from a request

    ## Examples

      iex> create_space_from_user_req(%{user_id: "Ecto.ShortUUID"}, %{# New space attributes #})
      {:ok, %Space{}}
  """
  def create_space_from_user_req(
    %{user_id: user_id} = user_req, 
    %{org: org, name: name} = space_params
  ) do
    # Get User from DB
    # Then if they exists, create the space
    user = Accounts.get_user!(user_id)
    case create_space(%{org: org, name: name}) do
      {:ok, space} -> 
        UserSpace.add_user_space_relation(%{
          user_id: user.id,
          space_id: space.id
        }, "owner")
      {:error, _} ->
        IO.puts "Counldn't create space"
    end

  end

  @doc """
  Updates a space.

  ## Examples

      iex> update_space(space, %{field: new_value})
      {:ok, %Space{}}

      iex> update_space(space, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_space(%Space{} = space, attrs) do
    space
    |> Space.changeset(attrs)
    |> Repo.update()
  end


  @doc """
  Deletes a Space.

  ## Examples

      iex> delete_space(space)
      {:ok, %Space{}}

      iex> delete_space(space)
      {:error, %Ecto.Changeset{}}

  """
  def delete_space(%Space{} = space) do
    Repo.delete(space)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking space changes.

  ## Examples

      iex> change_space(space)
      %Ecto.Changeset{source: %Space{}}

  """
  def change_space(%Space{} = space) do
    Space.changeset(space, %{})
  end
end
