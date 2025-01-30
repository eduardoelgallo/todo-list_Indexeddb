import Task from "../../Domain/Task";
import ITask from "../../Interfaces/ITask";

class TaskFactory {

	static createTasks(remoteTask: ITask[]): Task[] {
		return remoteTask.map((task: ITask) => {
			return new Task(task.title, task.hour, task.minutes, task.day, task.month, task.year, task.notified)
		});
	}

	static createTask(task: ITask): Task {
		return new Task(task.title, task.hour, task.minutes, task.day, task.month, task.year, task.notified)
	}
}


export default TaskFactory;