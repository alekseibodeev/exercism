// Please define the expected_minutes_in_oven function
pub fn expected_minutes_in_oven() {
  40
}

// Please define the remaining_minutes_in_oven function
pub fn remaining_minutes_in_oven(minutes_in_oven: Int) -> Int {
  expected_minutes_in_oven() - minutes_in_oven
}

// Please define the preparation_time_in_minutes function
const minutes_per_layer = 2

pub fn preparation_time_in_minutes(layers: Int) -> Int {
  minutes_per_layer * layers
}


// Please define the total_time_in_minutes function
pub fn total_time_in_minutes(layers: Int, current_time_in_oven: Int) -> Int {
  preparation_time_in_minutes(layers) + current_time_in_oven
}

// Please define the alarm function
pub fn alarm() {
  "Ding!"
}