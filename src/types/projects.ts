export type Project = {
  title: String;
  description: String;
  steps: Step[];
};

export type Step = {
  title: String;
  tasks: Task[];
};

export type Task = {
  title: String;
  description: String;
  isCompleted: Boolean;
  blockedBy: Task[];
};
