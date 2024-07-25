import gleam/int
import gleam/float
import gleam/string

const pence_per_pound = 100.00
const pound_sign = "£"

pub fn pence_to_pounds(pence: Int) -> Float {
  int.to_float(pence) /. pence_per_pound
}


pub fn pounds_to_string(pounds: Float) -> String {
  string.append(to: pound_sign, suffix: float.to_string(pounds))
}
