defmodule ReeychBackend.Relations.CardsUsers do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset

  @primary_key false
  schema "cards_users_rel" do
    belongs_to :user, ReeychBackend.Accounts.User, primary_key: true
    belongs_to :card, ReeychBackend.Cards.Card, primary_key: true
    timestamps()
  end

  @doc false
  def changeset(cards_users, attrs) do
    cards_users
    |> cast(attrs, [:card_id, :user_id])
    |> validate_required([:card_id, :user_id])
  end
end
