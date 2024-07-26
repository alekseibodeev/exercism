import gleam/string

const tuples = [
  #(1000, "M"), #(900, "CM"), #(500, "D"), #(400, "CD"), #(100, "C"),
  #(90, "XC"), #(50, "L"), #(40, "XL"), #(10, "X"), #(9, "IX"), #(5, "V"),
  #(4, "IV"), #(1, "I"),
]

pub fn convert(number: Int) -> String {
  convert_loop(tuples, number, "")
}

fn convert_loop(
  tuples: List(#(Int, String)),
  arab: Int,
  roman: String,
) -> String {
  case tuples {
    [#(a, r), ..rest] ->
      convert_loop(rest, arab % a, roman <> string.repeat(r, arab / a))
    _ -> roman
  }
}
