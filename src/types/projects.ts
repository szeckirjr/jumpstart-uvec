export type Project = {
  title: String;
  description: String;
  steps: Step[];
};

export type Step = {
  title: String;
  tasks: Task[];
  isCompleted: Boolean;
};

export type Task = {
  title: String;
  description: String;
  isCompleted: Boolean;
  blockedBy: Task[];
};
