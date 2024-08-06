import gleam/dict.{type Dict}
import gleam/list
import gleam/option.{type Option, None, Some}

pub type Category {
  Ones
  Twos
  Threes
  Fours
  Fives
  Sixes
  FullHouse
  FourOfAKind
  LittleStraight
  BigStraight
  Choice
  Yacht
}

pub fn score(category: Category, dice: List(Int)) -> Int {
  let dice_dict =
    list.fold(dice, dict.new(), fn(acc, item) { dict.upsert(acc, item, count) })
  case category {
    Ones -> read_count(dice_dict, 1)
    Twos -> read_count(dice_dict, 2) * 2
    Threes -> read_count(dice_dict, 3) * 3
    Fours -> read_count(dice_dict, 4) * 4
    Fives -> read_count(dice_dict, 5) * 5
    Sixes -> read_count(dice_dict, 6) * 6
    FullHouse ->
      case dict.size(dice_dict) == 2 {
        True ->
          dict.fold(dice_dict, 0, fn(acc, key, val) {
            case val {
              2 | 3 -> acc + key * val
              _ -> 0
            }
          })
        False -> 0
      }
    FourOfAKind ->
      case dict.size(dice_dict) <= 2 {
        True ->
          dict.fold(dice_dict, 0, fn(acc, key, val) {
            case val >= 4 {
              True -> key * 4
              False -> acc
            }
          })
        False -> 0
      }
    LittleStraight ->
      case dict.size(dice_dict) == 5, dict.has_key(dice_dict, 6) {
        True, False -> 30
        _, _ -> 0
      }
    BigStraight ->
      case dict.size(dice_dict) == 5, dict.has_key(dice_dict, 1) {
        True, False -> 30
        _, _ -> 0
      }
    Choice -> list.fold(dice, 0, fn(acc, item) { acc + item })
    Yacht ->
      case dict.size(dice_dict) == 1 {
        True -> 50
        False -> 0
      }
  }
}

fn count(res: Option(Int)) -> Int {
  case res {
    Some(current_count) -> current_count + 1
    None -> 1
  }
}

fn read_count(from: Dict(Int, Int), key: Int) -> Int {
  case dict.get(from, key) {
    Ok(val) -> val
    Error(_) -> 0
  }
}
