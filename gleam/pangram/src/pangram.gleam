import gleam/list
import gleam/regex
import gleam/set
import gleam/string

pub fn is_pangram(sentence: String) -> Bool {
  let assert Ok(re) = regex.from_string("[A-Za-z]")
  re
  |> regex.scan(sentence)
  |> list.map(fn(match) { string.lowercase(match.content) })
  |> set.from_list
  |> set.size
  == 26
}
