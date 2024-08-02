import gleam/list
import gleam/string

pub type Student {
  Alice
  Bob
  Charlie
  David
  Eve
  Fred
  Ginny
  Harriet
  Ileana
  Joseph
  Kincaid
  Larry
}

pub type Plant {
  Radishes
  Clover
  Violets
  Grass
}

const student_plants_per_row = 2

pub fn plants(diagram: String, student: Student) -> List(Plant) {
  diagram
  |> string.split("\n")
  |> list.map(fn(row) {
    string.slice(
      row,
      student_index(student) * student_plants_per_row,
      student_plants_per_row,
    )
  })
  |> list.flat_map(string.to_graphemes)
  |> list.map(code_to_plant)
}

fn student_index(student: Student) -> Int {
  case student {
    Alice -> 0
    Bob -> 1
    Charlie -> 2
    David -> 3
    Eve -> 4
    Fred -> 5
    Ginny -> 6
    Harriet -> 7
    Ileana -> 8
    Joseph -> 9
    Kincaid -> 10
    Larry -> 11
  }
}

fn code_to_plant(code: String) -> Plant {
  case code {
    "R" -> Radishes
    "C" -> Clover
    "V" -> Violets
    "G" -> Grass
    _ -> panic
  }
}
