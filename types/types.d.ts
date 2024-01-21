type SequenceStep = {
  action: () => void,
  iterations?: number,
  wait?: number,
};

type ElementState =
  'HIDDEN'
  | 'ENTER'
  | 'SHOWN'
  | 'EXIT';
