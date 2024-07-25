import gleam/regex.{Options}
import gleam/string

pub fn hey(remark: String) -> String {
  let trimmed_remark = string.trim(remark)
  let upper_remark = string.uppercase(trimmed_remark)
  let options = Options(case_insensitive: False, multi_line: False)
  let assert Ok(re) = regex.compile("[A-Z]", options)
  let is_question = string.ends_with(trimmed_remark, "?")
  let is_yelling =
    upper_remark == trimmed_remark && regex.check(re, upper_remark)
  let is_sillence = trimmed_remark == ""

  case is_question, is_yelling, is_sillence {
    True, False, False -> "Sure."
    False, True, False -> "Whoa, chill out!"
    True, True, False -> "Calm down, I know what I'm doing!"
    _, _, True -> "Fine. Be that way!"
    _, _, _ -> "Whatever."
  }
}
