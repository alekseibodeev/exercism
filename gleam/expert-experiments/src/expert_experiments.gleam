import gleam/result

pub fn with_retry(experiment: fn() -> Result(t, e)) -> Result(t, e) {
  case experiment() {
    Error(_) -> experiment()
    res -> res
  }
}

pub fn record_timing(
  time_logger: fn() -> Nil,
  experiment: fn() -> Result(t, e),
) -> Result(t, e) {
  time_logger()
  let res = experiment()
  time_logger()
  res
}

pub fn run_experiment(
  name: String,
  setup: fn() -> Result(t, e),
  action: fn(t) -> Result(u, e),
  record: fn(t, u) -> Result(v, e),
) -> Result(#(String, v), e) {
  use setup_data <- result.try(setup())
  use action_data <- result.try(action(setup_data))
  use record_data <- result.try(record(setup_data, action_data))
  Ok(#(name, record_data))
}
