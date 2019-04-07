defmodule ReeychBackend.Cards.Card do
  use ReeychBackend.Common.Schema
  import Ecto.Changeset


  schema "cards" do
    field :author, :string
    field :date_time_to_send, :utc_datetime, default: nil
    field :description, :string
    field :owner, :string
    field :sent, :boolean, default: true
    field :title, :string

    many_to_many :users, ReeychBackend.Accounts.User, join_through: ReeychBackend.Relations.CardsUsers

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :author, :owner, :date_time_to_send, :sent, :description])
    |> validate_required([:title, :author, :owner, :sent, :description])
  end
end
