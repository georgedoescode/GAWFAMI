class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        if (this.observers.indexOf(observer) === -1) {
            this.observers.push(observer);
        }
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => {
                observer.update(data);
            });
        }
    }
}

export default Subject;
