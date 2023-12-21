export declare namespace structures {
    type LinkedListNode = {
        value: any;
        next: LinkedListNode | null | undefined;
    };
    class LinkedList {
        protected _size: number;
        get length(): number;
        set length(value: number);
        protected _head: LinkedListNode | null | undefined;
        get head(): LinkedListNode | null | undefined;
        get last(): LinkedListNode | null | undefined;
        constructor(...args: any[]);
        at(index: number): LinkedListNode | null | undefined;
        filter(predicate: (element: LinkedListNode | null | undefined, index: number, list: LinkedList) => boolean): LinkedList;
        indexOf(element: any, startIndex?: number | undefined): number;
        lastIndexOf(element: any): number;
        removeAt(index: number): LinkedListNode | null | undefined;
        remove(element: any, startIndex?: number | undefined): LinkedListNode | null | undefined;
        forEach(callback: (element: any, index: number, list: LinkedList) => void): void;
        [Symbol.iterator](): any;
        [Symbol.asyncIterator](): any;
        toArray(): any[];
    }
    type AsyncTask = (...args: any[]) => Promise<any>;
    type QueueEntry = {
        value: AsyncTask;
        next: QueueEntry;
    };
    class Queue extends LinkedList {
        protected _head: QueueEntry | null | undefined;
        constructor(...tasks: AsyncTask[]);
        start(...initialArguments: any[]): Promise<any>;
    }
}
