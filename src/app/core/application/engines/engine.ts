export interface Engine<Input, Output> {
  execute(input: Input): Output;
}