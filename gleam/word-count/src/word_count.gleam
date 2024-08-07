import gleam/dict.{type Dict}
import gleam/list
import gleam/option.{type Option}
import gleam/regex
import gleam/string

pub fn count_words(input: String) -> Dict(String, Int) {
  let increment = fn(res: Option(Int)) -> Int { option.unwrap(res, 0) + 1 }
  let assert Ok(re) = regex.from_string("\\w+('\\w+)?")
  input
  |> regex.scan(re, _)
  |> list.fold(dict.new(), fn(acc, item) {
    item.content
    |> string.lowercase
    |> dict.upsert(acc, _, increment)
  })
}
