
export namespace structures {

    export type LinkedListNode = {value: any, next: LinkedListNode | null | undefined};

    export class LinkedList {
        protected _size: number = 0;
        public get length(): number { return this._size; }
        public set length(value: number) { 
            if (value < 0) throw new RangeError("Cannot set a LinkedList's size to less than 0");
            this._size = value;
            if (value == 0 || this._head == undefined) return;
            var current = this._head, i = 0;
            for ( ; i < this._size; i++) { 
                if (current.next != undefined) {
                    current = current.next;
                } else {
                    current.next = { value: undefined, next: undefined };
                    current = current.next;
                }
            }
            if (i >= this._size) current.next = undefined;
         }

        protected _head: LinkedListNode | null | undefined;
        public get head(): LinkedListNode | null | undefined {
            return this._head;
        }
        public get last(): LinkedListNode | null | undefined {
            if (this._head == undefined) return undefined;
            if (this._head.next == undefined) return this._head;
            var current = this._head;
            while (current.next != undefined) {
                current = current.next;
            }
            return current;
        }
        
        public constructor(...args: any[]) {
            if (typeof args[0] == 'number' && typeof args[1] == 'undefined') {
                this._size = args[0];
                this._head = { value: undefined, next: undefined };
                var current = this._head;
                for (let i = 0; i < args[0]; i++) {
                    current.next = { value: undefined, next: undefined };
                    current = current.next;
                }
            } else if (typeof args[0] == 'undefined') {
                this._head = { value: undefined, next: undefined };
            } else {
                this._size = args.length;
                this._head = { value: args[0], next: undefined };
                var current = this._head;
                for (let i = 1; i < args.length; i++) {
                    current.next = { value: args[i], next: undefined };
                    current = current.next;
                }
            }
        }

        public at(index: number): LinkedListNode | null | undefined {
            if (this.length < 1) return undefined;
            if (index < 0 || index >= this.length) return undefined;
            if (this._head == undefined) return undefined;
            var i = 0, current = this._head;
            while (current.next != undefined && i < index) {
                current = current.next;
                i++;
            }
            return current;
        }
        public filter(predicate: (element: LinkedListNode | null | undefined, index: number, list: LinkedList)=>boolean): LinkedList {
            var copy = new LinkedList(...this.toArray());
            if (copy.length < 1 || copy._head == undefined) return new LinkedList();
            if (copy.length < 2 || copy._head.next == undefined) return new LinkedList(this._head);
            var previous = copy._head, current = copy._head.next, i = 0;
            while (current != undefined && current.next != undefined) {
                if (!predicate(current, i, copy)) {
                    previous.next = current.next;
                    this._size--;
                }
                previous = current;
                current = current.next;
                i++;
            }
            return copy;
        }
        public indexOf(element: any, startIndex: number | undefined = 0): number {
            if (this.length < 1) return -1;
            if (this._head == undefined) return -1;
            if (startIndex < 0 || startIndex >= this.length) return -1;
            var i = 0, current = this._head;
            while (current.next != undefined) {
                if (i < startIndex) continue;
                if (current.value == element)
                    return i;
                current = current.next;
            }
            return -1;
        }
        public lastIndexOf(element: any): number {
            if (this._head == undefined) return -1;
            return this.toArray().lastIndexOf(element)
        }
        public removeAt(index: number): LinkedListNode | null | undefined {
            if (this._head == undefined) return undefined;
            if (this._head.next == undefined) return undefined;
            if (index < 1 || index >= this.length) return undefined;
            var i = 1, previous = this._head, current = this._head.next;
            while (current.next != undefined && i < index) {
                previous = current;
                current = current.next;
                i++;
            }
            previous.next = current.next; // Splice 'current' out of the list
            this._size--;
            return current;
        }
        public remove(element: any, startIndex: number | undefined = 0): LinkedListNode | null | undefined {
            return this.removeAt(this.indexOf(element, startIndex));
        }
        public forEach(callback: (element: any, index: number, list: LinkedList)=>void): void {
            if (this._head == undefined) return;
            var current = this._head, i = 0;
            while (current.next != undefined) {
                callback(current.value, i, this);
                current = current.next;
                i++;
            }
        }
        
        public *[Symbol.iterator](): any {
            const ary = this.toArray();
            for (let i = 0; i < ary.length; i++) {
                yield ary[i];
            }
        }
        public async *[Symbol.asyncIterator](): any {
            const ary = this.toArray();
            for await (let elt of ary) {
                yield elt;
            }
        }

        public toArray(): any[] {
            if (this._head == undefined) return [];
            if (this.length < 1) return [];
            var result = [this._head.value];
            var current = this._head;
            while (current.next != undefined) {
                current = current.next;
                result.push(current.value);
            }
            return result;
        }
    }

    export type AsyncTask = (...args: any[]) => Promise<any>;
    export type QueueEntry = { value: AsyncTask, next: QueueEntry };
    export class TaskQueue extends LinkedList {
        declare protected _head: QueueEntry | null | undefined;

        public constructor(...tasks: AsyncTask[]) {
            super(...tasks);
        }

        public async start(...initialArguments: any[]): Promise<any> {
            if (this._head == undefined) return await Promise.resolve();
            else if (this._head.next == undefined) return await this._head.value();
            var current = this._head, result = initialArguments;
            while(current != undefined) {
                result = await current.value(...result);
                current = current.next;
            } 
            return result;
        }

    }

}
