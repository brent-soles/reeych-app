defmodule ReeychBackend.Cards.Card do
  use Ecto.Schema
  import Ecto.Changeset


  schema "cards" do
    field :description, :string
    field :editors, :map
    field :owner, :string
    field :sent, :boolean, default: false
    field :sent_date, :utc_datetime
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :owner, :editors, :description, :sent, :sent_date])
    |> validate_required([:title, :owner, :editors, :description, :sent, :sent_date])
  end
end
