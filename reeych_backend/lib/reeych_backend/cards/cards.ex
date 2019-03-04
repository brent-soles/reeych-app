defmodule ReeychBackend.Cards do
  @moduledoc """
  The Cards context.
  """

  import Ecto.Query, warn: false
  alias ReeychBackend.Repo

  alias ReeychBackend.Cards.Card

  @doc """
  Returns the list of cards.

  ## Examples

      iex> list_cards()
      [%Card{}, ...]

  """
  def list_cards do
    Repo.all(Card)
  end

  @doc """
  Gets a single card.

  Raises `Ecto.NoResultsError` if the Card does not exist.

  ## Examples

      iex> get_card!(123)
      %Card{}

      iex> get_card!(456)
      ** (Ecto.NoResultsError)

  """
  def get_card!(id), do: Repo.get!(Card, id)

  @doc """
  Creates a card.

  ## Examples

      iex> create_card(%{field: value})
      {:ok, %Card{}}

      iex> create_card(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card(attrs \\ %{}) do
    %Card{}
    |> Card.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a card.

  ## Examples

      iex> update_card(card, %{field: new_value})
      {:ok, %Card{}}

      iex> update_card(card, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card(%Card{} = card, attrs) do
    card
    |> Card.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Card.

  ## Examples

      iex> delete_card(card)
      {:ok, %Card{}}

      iex> delete_card(card)
      {:error, %Ecto.Changeset{}}

  """
  def delete_card(%Card{} = card) do
    Repo.delete(card)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking card changes.

  ## Examples

      iex> change_card(card)
      %Ecto.Changeset{source: %Card{}}

  """
  def change_card(%Card{} = card) do
    Card.changeset(card, %{})
  end

  alias ReeychBackend.Cards.CardMetaData

  @doc """
  Returns the list of card_meta_data.

  ## Examples

      iex> list_card_meta_data()
      [%CardMetaData{}, ...]

  """
  def list_card_meta_data do
    Repo.all(CardMetaData)
  end

  @doc """
  Gets a single card_meta_data.

  Raises `Ecto.NoResultsError` if the Card meta data does not exist.

  ## Examples

      iex> get_card_meta_data!(123)
      %CardMetaData{}

      iex> get_card_meta_data!(456)
      ** (Ecto.NoResultsError)

  """
  def get_card_meta_data!(id), do: Repo.get!(CardMetaData, id)

  @doc """
  Creates a card_meta_data.

  ## Examples

      iex> create_card_meta_data(%{field: value})
      {:ok, %CardMetaData{}}

      iex> create_card_meta_data(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card_meta_data(attrs \\ %{}) do
    %CardMetaData{}
    |> CardMetaData.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a card_meta_data.

  ## Examples

      iex> update_card_meta_data(card_meta_data, %{field: new_value})
      {:ok, %CardMetaData{}}

      iex> update_card_meta_data(card_meta_data, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card_meta_data(%CardMetaData{} = card_meta_data, attrs) do
    card_meta_data
    |> CardMetaData.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a CardMetaData.

  ## Examples

      iex> delete_card_meta_data(card_meta_data)
      {:ok, %CardMetaData{}}

      iex> delete_card_meta_data(card_meta_data)
      {:error, %Ecto.Changeset{}}

  """
  def delete_card_meta_data(%CardMetaData{} = card_meta_data) do
    Repo.delete(card_meta_data)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking card_meta_data changes.

  ## Examples

      iex> change_card_meta_data(card_meta_data)
      %Ecto.Changeset{source: %CardMetaData{}}

  """
  def change_card_meta_data(%CardMetaData{} = card_meta_data) do
    CardMetaData.changeset(card_meta_data, %{})
  end
end
