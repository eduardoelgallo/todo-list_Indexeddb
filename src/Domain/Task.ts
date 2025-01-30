import { DateTime } from "luxon";

class Task {

    constructor(
        public title: string, public hour: number|string, public minutes: number|string,
        public day: number|string, public month: number|string, public year: number | string,
        public notified: string) {
        
    }

    public isInDeadline() : boolean {
        const now = (DateTime.now()).set({second: 0, millisecond: 0});
        
        let taskTime = DateTime.fromFormat(`${this.year}-${this.month}-${this.day} ${this.hour}:${this.minutes}:00`, "y-m-d hh:mm:ss")
                                    
        return (now.equals(taskTime) && !this.isNotified());
    }

    public isNotified(): boolean {
        return this.notified == "yes";
    }

    public makeNotifed() {
        this.notified = "yes";
    }

}

export default Task;