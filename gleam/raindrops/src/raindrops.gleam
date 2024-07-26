import gleam/int

pub fn convert(number: Int) -> String {
  ""
  |> evolve(number, 3, _, "Pling")
  |> evolve(number, 5, _, "Plang")
  |> evolve(number, 7, _, "Plong")
  |> summarize(number)
}

fn evolve(number: Int, divisor: Int, result: String, suffix: String) -> String {
  case number {
    _ if number % divisor == 0 -> result <> suffix
    _ -> result <> ""
  }
}

fn summarize(result: String, number: Int) -> String {
  case result == "" {
    True -> int.to_string(number)
    _ -> result
  }
}
