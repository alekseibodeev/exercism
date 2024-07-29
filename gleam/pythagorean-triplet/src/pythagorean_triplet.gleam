import gleam/float
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result

pub type Triplet {
  Triplet(Int, Int, Int)
}

pub fn triplets_with_sum(sum: Int) -> List(Triplet) {
  let target = int.to_float(sum)
  let leg_max_value = target /. 2.0
  main_loop(1.0, leg_max_value, target, [])
  |> list.reverse
}

fn main_loop(
  a: Float,
  leg_max_value: Float,
  target: Float,
  triplets: List(Triplet),
) -> List(Triplet) {
  case a >. leg_max_value {
    True -> triplets
    False ->
      case binary_search(a +. 1.0, leg_max_value, target, a) {
        Some(triplet) ->
          main_loop(a +. 1.0, leg_max_value, target, [triplet, ..triplets])
        None -> main_loop(a +. 1.0, leg_max_value, target, triplets)
      }
  }
}

pub fn binary_search(
  b_start: Float,
  b_end: Float,
  target: Float,
  a: Float,
) -> Option(Triplet) {
  case b_start >. b_end {
    True -> None
    False -> {
      let b = float.floor({ b_start +. b_end } /. 2.0)
      let c =
        { a *. a +. b *. b }
        |> float.square_root
        |> result.unwrap(0.0)
      let sum = a +. b +. c
      case sum {
        _ if sum == target ->
          Some(Triplet(float.round(a), float.round(b), float.round(c)))
        _ if sum <. target -> binary_search(b +. 1.0, b_end, target, a)
        _ -> binary_search(b_start, b -. 1.0, target, a)
      }
    }
  }
}
