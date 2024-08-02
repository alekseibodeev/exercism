import gleam/dict.{type Dict}
import gleam/int
import gleam/list
import gleam/order.{Eq}
import gleam/result
import gleam/string

type Stats {
  Stats(wins: Int, draws: Int, losses: Int)
}

const win_multiplier = 3

const draw_multiplier = 1

const loss_multiplier = 0

const first_line = "Team                           | MP |  W |  D |  L |  P\n"

const team_col_length = 30

pub fn tally(input: String) -> String {
  case input {
    "" -> string.trim(first_line)
    _ ->
      input
      |> string.split("\n")
      |> list.map(fn(row) { string.split(row, ";") })
      |> fill_stats_dict(dict.new(), _)
      |> dict.to_list
      |> list.map(fn(data) {
        let #(team, stats) = data
        let points =
          stats.wins
          * win_multiplier
          + stats.draws
          * draw_multiplier
          + stats.losses
          * loss_multiplier
        #(team, points, stats)
      })
      |> list.sort(fn(team1, team2) {
        let #(team1, points1, _) = team1
        let #(team2, points2, _) = team2
        case int.compare(points2, points1) {
          Eq -> string.compare(team1, team2)
          any -> any
        }
      })
      |> list.map(build_line)
      |> string.join("\n")
      |> string.append(first_line, _)
  }
}

fn fill_stats_dict(
  stats_dict: Dict(String, Stats),
  matches: List(List(String)),
) -> Dict(String, Stats) {
  case matches {
    [] -> stats_dict
    [match, ..rest] ->
      case match {
        [team1, team2, result] ->
          stats_dict
          |> update_stats(team1, result)
          |> update_stats(team2, inverse_result(result))
          |> fill_stats_dict(rest)
        _ -> panic as "Input in wrong format"
      }
  }
}

fn update_stats(
  stats_dict: Dict(String, Stats),
  team: String,
  result: String,
) -> Dict(String, Stats) {
  let stats =
    stats_dict
    |> dict.get(team)
    |> result.unwrap(Stats(0, 0, 0))
  let updated_stats = case result {
    "win" -> Stats(stats.wins + 1, stats.draws, stats.losses)
    "draw" -> Stats(stats.wins, stats.draws + 1, stats.losses)
    "loss" -> Stats(stats.wins, stats.draws, stats.losses + 1)
    _ -> panic as "Input in wrong format"
  }
  dict.insert(stats_dict, team, updated_stats)
}

fn inverse_result(result: String) -> String {
  case result {
    "win" -> "loss"
    "draw" -> "draw"
    "loss" -> "win"
    _ -> panic as "Input in wrong format"
  }
}

fn format_number(points: Int) -> String {
  case points < 10 {
    True -> " " <> int.to_string(points)
    False -> int.to_string(points)
  }
}

fn build_line(data: #(String, Int, Stats)) -> String {
  let #(team, points, stats) = data
  let matches_played = stats.wins + stats.draws + stats.losses
  let padding = team_col_length - string.length(team)
  let team_col = team <> string.repeat(" ", padding)
  let mp_col = format_number(matches_played)
  let wins_col = format_number(stats.wins)
  let draws_col = format_number(stats.draws)
  let losses_col = format_number(stats.losses)
  let points_col = format_number(points)
  string.join(
    [team_col, mp_col, wins_col, draws_col, losses_col, points_col],
    " | ",
  )
}
