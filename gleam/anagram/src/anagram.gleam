import gleam/list
import gleam/string

pub fn find_anagrams(word: String, candidates: List(String)) -> List(String) {
  let word = string.lowercase(word)
  let sorted_word = to_sorted_list(word)
  candidates
  |> list.filter(fn(candidate) {
    let candidate = string.lowercase(candidate)
    candidate != word && to_sorted_list(candidate) == sorted_word
  })
}

fn to_sorted_list(word: String) -> List(String) {
  word
  |> string.to_graphemes
  |> list.sort(fn(a, b) { string.compare(a, b) })
}
