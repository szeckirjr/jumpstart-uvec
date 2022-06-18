export type Project = {
  title: String;
  description: String;
  steps: Step[];
};

export type Step = {
  id: string
  title: String;
  tasks: Task[];
  isCompleted: Boolean;
};

export type Task = {
  id: string
  title: String;
  description: String;
  isCompleted: Boolean;
  blockedBy: String[]; // "1.1" -> step=1 and task=1
};
