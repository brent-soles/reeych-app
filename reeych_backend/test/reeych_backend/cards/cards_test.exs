defmodule ReeychBackend.CardsTest do
  use ReeychBackend.DataCase

  alias ReeychBackend.Cards

  describe "cards" do
    alias ReeychBackend.Cards.Card

    @valid_attrs %{description: "some description", editors: %{}, owner: "some owner", sent: true, sent_date: "2010-04-17T14:00:00Z", title: "some title"}
    @update_attrs %{description: "some updated description", editors: %{}, owner: "some updated owner", sent: false, sent_date: "2011-05-18T15:01:01Z", title: "some updated title"}
    @invalid_attrs %{description: nil, editors: nil, owner: nil, sent: nil, sent_date: nil, title: nil}

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
      assert card.description == "some description"
      assert card.editors == %{}
      assert card.owner == "some owner"
      assert card.sent == true
      assert card.sent_date == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert card.title == "some title"
    end

    test "create_card/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Cards.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, %Card{} = card} = Cards.update_card(card, @update_attrs)
      assert card.description == "some updated description"
      assert card.editors == %{}
      assert card.owner == "some updated owner"
      assert card.sent == false
      assert card.sent_date == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
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

  describe "card_meta_data" do
    alias ReeychBackend.Cards.CardMetaData

    @valid_attrs %{directions: "some directions", notes: "some notes", questions: "some questions"}
    @update_attrs %{directions: "some updated directions", notes: "some updated notes", questions: "some updated questions"}
    @invalid_attrs %{directions: nil, notes: nil, questions: nil}

    def card_meta_data_fixture(attrs \\ %{}) do
      {:ok, card_meta_data} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Cards.create_card_meta_data()

      card_meta_data
    end

    test "list_card_meta_data/0 returns all card_meta_data" do
      card_meta_data = card_meta_data_fixture()
      assert Cards.list_card_meta_data() == [card_meta_data]
    end

    test "get_card_meta_data!/1 returns the card_meta_data with given id" do
      card_meta_data = card_meta_data_fixture()
      assert Cards.get_card_meta_data!(card_meta_data.id) == card_meta_data
    end

    test "create_card_meta_data/1 with valid data creates a card_meta_data" do
      assert {:ok, %CardMetaData{} = card_meta_data} = Cards.create_card_meta_data(@valid_attrs)
      assert card_meta_data.directions == "some directions"
      assert card_meta_data.notes == "some notes"
      assert card_meta_data.questions == "some questions"
    end

    test "create_card_meta_data/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Cards.create_card_meta_data(@invalid_attrs)
    end

    test "update_card_meta_data/2 with valid data updates the card_meta_data" do
      card_meta_data = card_meta_data_fixture()
      assert {:ok, %CardMetaData{} = card_meta_data} = Cards.update_card_meta_data(card_meta_data, @update_attrs)
      assert card_meta_data.directions == "some updated directions"
      assert card_meta_data.notes == "some updated notes"
      assert card_meta_data.questions == "some updated questions"
    end

    test "update_card_meta_data/2 with invalid data returns error changeset" do
      card_meta_data = card_meta_data_fixture()
      assert {:error, %Ecto.Changeset{}} = Cards.update_card_meta_data(card_meta_data, @invalid_attrs)
      assert card_meta_data == Cards.get_card_meta_data!(card_meta_data.id)
    end

    test "delete_card_meta_data/1 deletes the card_meta_data" do
      card_meta_data = card_meta_data_fixture()
      assert {:ok, %CardMetaData{}} = Cards.delete_card_meta_data(card_meta_data)
      assert_raise Ecto.NoResultsError, fn -> Cards.get_card_meta_data!(card_meta_data.id) end
    end

    test "change_card_meta_data/1 returns a card_meta_data changeset" do
      card_meta_data = card_meta_data_fixture()
      assert %Ecto.Changeset{} = Cards.change_card_meta_data(card_meta_data)
    end
  end
end
