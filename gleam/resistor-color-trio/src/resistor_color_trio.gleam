import gleam/list.{Continue, Stop}

pub type Resistance {
  Resistance(unit: String, value: Int)
}

pub fn label(colors: List(String)) -> Result(Resistance, Nil) {
  colors
  |> list.fold_until([], fn(acc, item) {
    case list.length(acc) {
      3 -> Stop(acc)
      _ -> Continue([item, ..acc])
    }
  })
  |> list.reverse
  |> list.map(color_to_number)
  |> append_numbers
  |> parse_label
}

const giga = 1_000_000_000

const mega = 1_000_000

const kilo = 1000

fn parse_label(total: Int) -> Result(Resistance, Nil) {
  case total {
    _ if total >= giga -> Ok(Resistance("gigaohms", total / giga))
    _ if total >= mega -> Ok(Resistance("megaohms", total / mega))
    _ if total >= kilo -> Ok(Resistance("kiloohms", total / kilo))
    _ -> Ok(Resistance("ohms", total))
  }
}

fn append_numbers(nums: List(Int)) -> Int {
  append_numbers_loop(nums, 0)
}

fn append_numbers_loop(nums: List(Int), acc: Int) -> Int {
  case nums {
    [] -> acc
    [a] -> acc * power_of_ten(a)
    [a, b] -> append_numbers_loop([b], acc + a)
    [a, ..rest] -> append_numbers_loop(rest, acc + a * 10)
  }
}

fn power_of_ten(power: Int) -> Int {
  power_of_ten_loop(power, 1)
}

fn power_of_ten_loop(power: Int, acc: Int) -> Int {
  case power {
    0 -> acc
    _ -> power_of_ten_loop(power - 1, acc * 10)
  }
}

fn color_to_number(color: String) -> Int {
  case color {
    "black" -> 0
    "brown" -> 1
    "red" -> 2
    "orange" -> 3
    "yellow" -> 4
    "green" -> 5
    "blue" -> 6
    "violet" -> 7
    "grey" -> 8
    "white" -> 9
    _ -> -1
  }
}
