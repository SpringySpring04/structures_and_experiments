"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structures = void 0;
var structures;
(function (structures) {
    class LinkedList {
        _size = 0;
        get length() { return this._size; }
        set length(value) {
            if (value < 0)
                throw new RangeError("Cannot set a LinkedList's size to less than 0");
            this._size = value;
            if (value == 0 || this._head == undefined)
                return;
            var current = this._head, i = 0;
            for (; i < this._size; i++) {
                if (current.next != undefined) {
                    current = current.next;
                }
                else {
                    current.next = { value: undefined, next: undefined };
                    current = current.next;
                }
            }
            if (i >= this._size)
                current.next = undefined;
        }
        _head;
        get head() {
            return this._head;
        }
        get last() {
            if (this._head == undefined)
                return undefined;
            if (this._head.next == undefined)
                return this._head;
            var current = this._head;
            while (current.next != undefined) {
                current = current.next;
            }
            return current;
        }
        constructor(...args) {
            if (typeof args[0] == 'number' && typeof args[1] == 'undefined') {
                this._size = args[0];
                this._head = { value: undefined, next: undefined };
                var current = this._head;
                for (let i = 0; i < args[0]; i++) {
                    current.next = { value: undefined, next: undefined };
                    current = current.next;
                }
            }
            else if (typeof args[0] == 'undefined') {
                this._head = { value: undefined, next: undefined };
            }
            else {
                this._size = args.length;
                this._head = { value: args[0], next: undefined };
                var current = this._head;
                for (let i = 1; i < args.length; i++) {
                    current.next = { value: args[i], next: undefined };
                    current = current.next;
                }
            }
        }
        at(index) {
            if (this.length < 1)
                return undefined;
            if (index < 0 || index >= this.length)
                return undefined;
            if (this._head == undefined)
                return undefined;
            var i = 0, current = this._head;
            while (current.next != undefined && i < index) {
                current = current.next;
                i++;
            }
            return current;
        }
        filter(predicate) {
            var copy = new LinkedList(...this.toArray());
            if (copy.length < 1 || copy._head == undefined)
                return new LinkedList();
            if (copy.length < 2 || copy._head.next == undefined)
                return new LinkedList(this._head);
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
        indexOf(element, startIndex = 0) {
            if (this.length < 1)
                return -1;
            if (this._head == undefined)
                return -1;
            if (startIndex < 0 || startIndex >= this.length)
                return -1;
            var i = 0, current = this._head;
            while (current.next != undefined) {
                if (i < startIndex)
                    continue;
                if (current.value == element)
                    return i;
                current = current.next;
            }
            return -1;
        }
        lastIndexOf(element) {
            if (this._head == undefined)
                return -1;
            return this.toArray().lastIndexOf(element);
        }
        removeAt(index) {
            if (this._head == undefined)
                return undefined;
            if (this._head.next == undefined)
                return undefined;
            if (index < 1 || index >= this.length)
                return undefined;
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
        remove(element, startIndex = 0) {
            return this.removeAt(this.indexOf(element, startIndex));
        }
        forEach(callback) {
            if (this._head == undefined)
                return;
            var current = this._head, i = 0;
            while (current.next != undefined) {
                callback(current.value, i, this);
                current = current.next;
                i++;
            }
        }
        *[Symbol.iterator]() {
            const ary = this.toArray();
            for (let i = 0; i < ary.length; i++) {
                yield ary[i];
            }
        }
        async *[Symbol.asyncIterator]() {
            const ary = this.toArray();
            for await (let elt of ary) {
                yield elt;
            }
        }
        toArray() {
            if (this._head == undefined)
                return [];
            if (this.length < 1)
                return [];
            var result = [this._head.value];
            var current = this._head;
            while (current.next != undefined) {
                current = current.next;
                result.push(current.value);
            }
            return result;
        }
    }
    structures.LinkedList = LinkedList;
    class Queue extends LinkedList {
        constructor(...tasks) {
            super(...tasks);
        }
        async start(...initialArguments) {
            if (this._head == undefined)
                return await Promise.resolve();
            else if (this._head.next == undefined)
                return await this._head.value();
            var current = this._head, result = initialArguments;
            while (current != undefined) {
                result = await current.value(...result);
                current = current.next;
            }
            return result;
        }
    }
    structures.Queue = Queue;
})(structures || (exports.structures = structures = {}));
