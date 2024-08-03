import gleam/int
import gleam/list
import gleam/result

pub fn is_armstrong_number(number: Int) -> Bool {
  let digits = number |> int.digits(10) |> result.unwrap([])
  let power = digits |> list.length
  let sum =
    digits
    |> list.map(fn(item) { raise_to_power(item, power) })
    |> int.sum
  number == sum
}

fn raise_to_power(base: Int, power: Int) -> Int {
  raise_to_power_loop(base, power, 1)
}

fn raise_to_power_loop(base: Int, power: Int, acc: Int) -> Int {
  case power {
    0 -> acc
    _ -> raise_to_power_loop(base, power - 1, acc * base)
  }
}
