import gleam/result

pub type Player {
  Black
  White
}

pub type Game {
  Game(
    white_captured_stones: Int,
    black_captured_stones: Int,
    player: Player,
    error: String,
  )
}

pub fn apply_rules(
  game: Game,
  rule1: fn(Game) -> Result(Game, String),
  rule2: fn(Game) -> Game,
  rule3: fn(Game) -> Result(Game, String),
  rule4: fn(Game) -> Result(Game, String),
) -> Game {
  let res =
    Ok(game)
    |> result.try(rule1)
    |> result.map(rule2)
    |> result.try(rule3)
    |> result.try(rule4)
  case res {
    Ok(game) -> change_player(game)
    Error(error) -> apply_error(game, error)
  }
}

fn change_player(game: Game) -> Game {
  let new_player = case game.player {
    Black -> White
    White -> Black
  }
  Game(
    game.white_captured_stones,
    game.black_captured_stones,
    new_player,
    game.error,
  )
}

fn apply_error(game: Game, error: String) -> Game {
  Game(
    game.white_captured_stones,
    game.black_captured_stones,
    game.player,
    error,
  )
}
