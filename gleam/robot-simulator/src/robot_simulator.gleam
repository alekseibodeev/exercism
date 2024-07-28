import gleam/list
import gleam/string

pub type Robot {
  Robot(direction: Direction, position: Position)
}

pub type Direction {
  North
  East
  South
  West
}

pub type Position {
  Position(x: Int, y: Int)
}

pub fn create(direction: Direction, position: Position) -> Robot {
  Robot(direction, position)
}

pub fn move(
  direction: Direction,
  position: Position,
  instructions: String,
) -> Robot {
  string.to_graphemes(instructions)
  |> list.fold(create(direction, position), fn(robot, instruction) {
    case instruction {
      "L" -> turn_left(robot)
      "R" -> turn_right(robot)
      _ -> advance(robot)
    }
  })
}

fn turn_left(robot: Robot) -> Robot {
  let Robot(direction, position) = robot
  case direction {
    North -> Robot(West, position)
    East -> Robot(North, position)
    South -> Robot(East, position)
    West -> Robot(South, position)
  }
}

fn turn_right(robot: Robot) -> Robot {
  let Robot(direction, position) = robot
  case direction {
    North -> Robot(East, position)
    East -> Robot(South, position)
    South -> Robot(West, position)
    West -> Robot(North, position)
  }
}

fn advance(robot: Robot) -> Robot {
  let Robot(direction, position) = robot
  let Position(x, y) = position
  case direction {
    North -> Robot(direction, Position(x, y + 1))
    East -> Robot(direction, Position(x + 1, y))
    South -> Robot(direction, Position(x, y - 1))
    West -> Robot(direction, Position(x - 1, y))
  }
}
