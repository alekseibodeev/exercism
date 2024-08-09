import gleam/int
import gleam/order.{Eq, Gt, Lt}

pub type Classification {
  Perfect
  Abundant
  Deficient
}

pub type Error {
  NonPositiveInt
}

pub fn classify(number: Int) -> Result(Classification, Error) {
  case number > 0 {
    True -> {
      let aliquote_sum = aliquot(number)
      case int.compare(aliquote_sum, number) {
        Eq -> Ok(Perfect)
        Gt -> Ok(Abundant)
        Lt -> Ok(Deficient)
      }
    }
    False -> Error(NonPositiveInt)
  }
}

fn aliquot(number: Int) -> Int {
  do_aliquot(1, number, 0)
}

fn do_aliquot(factor: Int, number: Int, acc: Int) -> Int {
  case factor > number / 2 {
    True -> acc
    False ->
      case number % factor == 0 {
        True -> do_aliquot(factor + 1, number, acc + factor)
        False -> do_aliquot(factor + 1, number, acc)
      }
  }
}
