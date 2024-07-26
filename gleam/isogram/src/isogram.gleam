import gleam/set.{type Set}
import gleam/string

const alphabet = "abcdefghijklmnopqrstuvwxyz"

pub fn is_isogram(phrase phrase: String) -> Bool {
  phrase
  |> string.lowercase
  |> is_isogram_loop(set.new())
}

fn is_isogram_loop(phrase: String, seen: Set(String)) -> Bool {
  case string.pop_grapheme(phrase) {
    Ok(#(c, r)) ->
      case string.contains(alphabet, c), set.contains(seen, c) {
        _, True -> False
        True, _ -> is_isogram_loop(r, set.insert(seen, c))
        _, _ -> is_isogram_loop(r, seen)
      }
    _ -> True
  }
}
