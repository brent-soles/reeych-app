defmodule ReeychBackend.Relations.CardsSpaces do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  @primary_key false
  schema "cards_spaces_rel" do
    belongs_to :space, ReeychBackend.Spaces.Space, primary_key: true
    belongs_to :card, ReeychBackend.Cards.Card, primary_key: true
    timestamps()
  end

  @doc false
  def changeset(cards_spaces, attrs) do
    cards_spaces
    |> cast(attrs, [:space_id, :card_id])
    |> validate_required([:space_id, :card_id])
  end
end
