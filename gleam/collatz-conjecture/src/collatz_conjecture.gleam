import gleam/int

pub type Error {
  NonPositiveNumber
}

pub fn steps(number: Int) -> Result(Int, Error) {
  case number > 0 {
    True -> Ok(collatz(number))
    False -> Error(NonPositiveNumber)
  }
}

fn collatz(number: Int) -> Int {
  do_collatz(number, 0)
}

fn do_collatz(number: Int, count: Int) -> Int {
  case int.is_even(number) {
    _ if number == 1 -> count
    True -> do_collatz(number / 2, count + 1)
    False -> do_collatz(3 * number + 1, count + 1)
  }
}
