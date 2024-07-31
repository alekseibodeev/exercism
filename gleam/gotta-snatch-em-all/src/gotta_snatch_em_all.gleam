import gleam/list
import gleam/set.{type Set}
import gleam/string

pub fn new_collection(card: String) -> Set(String) {
  set.from_list([card])
}

pub fn add_card(collection: Set(String), card: String) -> #(Bool, Set(String)) {
  #(set.contains(collection, card), set.insert(collection, card))
}

pub fn trade_card(
  my_card: String,
  their_card: String,
  collection: Set(String),
) -> #(Bool, Set(String)) {
  let is_trade_possible =
    set.contains(collection, my_card) && !set.contains(collection, their_card)
  let collection_after_trade =
    collection
    |> set.delete(my_card)
    |> set.insert(their_card)
  #(is_trade_possible, collection_after_trade)
}

pub fn boring_cards(collections: List(Set(String))) -> List(String) {
  case list.reduce(collections, fn(acc, coll) { set.intersection(acc, coll) }) {
    Ok(coll) -> set.to_list(coll)
    Error(_) -> []
  }
}

pub fn total_cards(collections: List(Set(String))) -> Int {
  case list.reduce(collections, fn(acc, coll) { set.union(acc, coll) }) {
    Ok(coll) -> set.size(coll)
    Error(_) -> 0
  }
}

pub fn shiny_cards(collection: Set(String)) -> Set(String) {
  set.filter(collection, fn(card) { string.starts_with(card, "Shiny ") })
}
