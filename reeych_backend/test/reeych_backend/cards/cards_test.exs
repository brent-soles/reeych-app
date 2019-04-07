defmodule ReeychBackend.CardsTest do
  use ReeychBackend.DataCase

  alias ReeychBackend.Cards

  describe "cards" do
    alias ReeychBackend.Cards.Card

    @valid_attrs %{author: "some author", date_time_to_send: "2010-04-17T14:00:00Z", description: "some description", owner: "some owner", sent: true, title: "some title"}
    @update_attrs %{author: "some updated author", date_time_to_send: "2011-05-18T15:01:01Z", description: "some updated description", owner: "some updated owner", sent: false, title: "some updated title"}
    @invalid_attrs %{author: nil, date_time_to_send: nil, description: nil, owner: nil, sent: nil, title: nil}

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Cards.create_card()

      card
    end

    test "list_cards/0 returns all cards" do
      card = card_fixture()
      assert Cards.list_cards() == [card]
    end

    test "get_card!/1 returns the card with given id" do
      card = card_fixture()
      assert Cards.get_card!(card.id) == card
    end

    test "create_card/1 with valid data creates a card" do
      assert {:ok, %Card{} = card} = Cards.create_card(@valid_attrs)
      assert card.author == "some author"
      assert card.date_time_to_send == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert card.description == "some description"
      assert card.owner == "some owner"
      assert card.sent == true
      assert card.title == "some title"
    end

    test "create_card/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Cards.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, %Card{} = card} = Cards.update_card(card, @update_attrs)
      assert card.author == "some updated author"
      assert card.date_time_to_send == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert card.description == "some updated description"
      assert card.owner == "some updated owner"
      assert card.sent == false
      assert card.title == "some updated title"
    end

    test "update_card/2 with invalid data returns error changeset" do
      card = card_fixture()
      assert {:error, %Ecto.Changeset{}} = Cards.update_card(card, @invalid_attrs)
      assert card == Cards.get_card!(card.id)
    end

    test "delete_card/1 deletes the card" do
      card = card_fixture()
      assert {:ok, %Card{}} = Cards.delete_card(card)
      assert_raise Ecto.NoResultsError, fn -> Cards.get_card!(card.id) end
    end

    test "change_card/1 returns a card changeset" do
      card = card_fixture()
      assert %Ecto.Changeset{} = Cards.change_card(card)
    end
  end
end
