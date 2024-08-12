import gleam/dict
import gleam/int
import gleam/list
import gleam/result
import gleam/string

const letter_score = [
  #("a", 1), #("b", 3), #("c", 3), #("d", 2), #("e", 1), #("f", 4), #("g", 2),
  #("h", 4), #("i", 1), #("j", 8), #("k", 5), #("l", 1), #("m", 3), #("n", 1),
  #("o", 1), #("p", 3), #("q", 10), #("r", 1), #("s", 1), #("t", 1), #("u", 1),
  #("v", 4), #("w", 4), #("x", 8), #("y", 4), #("z", 10),
]

pub fn score(word: String) -> Int {
  let score_map = dict.from_list(letter_score)
  word
  |> string.to_graphemes
  |> list.fold(0, fn(sum, letter) {
    letter
    |> string.lowercase
    |> dict.get(score_map, _)
    |> result.unwrap(0)
    |> int.add(sum)
  })
}
