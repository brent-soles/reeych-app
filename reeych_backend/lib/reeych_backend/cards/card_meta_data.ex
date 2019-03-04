defmodule ReeychBackend.Cards.CardMetaData do
  use Ecto.Schema
  import Ecto.Changeset


  schema "card_meta_data" do
    field :directions, :string
    field :notes, :string
    field :questions, :string

    timestamps()
  end

  @doc false
  def changeset(card_meta_data, attrs) do
    card_meta_data
    |> cast(attrs, [:notes, :questions, :directions])
    |> validate_required([:notes, :questions, :directions])
  end
end
