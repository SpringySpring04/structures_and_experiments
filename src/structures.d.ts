export declare namespace structures {

    export type LinkedListNode = { value: any, next: LinkedListNode | null | undefined };

    export class LinkedList {
        private _size: number;
        /**
         * The length of the LinkedList.
         */
        public get length(): number;
        /**
         * Sets the size of the LinkedList. If less than the current size, elements who are outside the length of the list will be removed and disposed,
         * and if greater than the current size, new elements will be initialized to null.
         */
        public set length(value: number);

        /**
         * @overload
         * @param length Length of the linked list to create
         */
        public constructor(length: number);
        /**
         * @overload
         * @param values Array of values to be structured into the list.
         */
        public constructor(...values: any[]);

        private _head: LinkedListNode | null | undefined;
        
        /**
         * Reference to the first element in the LinkedList
         */
        public get head(): LinkedListNode;

        /**
         * Returns the element at the given index if you treated this list like an array. Returns undefined if index out of range.
         * @param index
         */
        public at(index: number): LinkedListNode | undefined;
        
        /**
         * Returns a copy of this list with only the elements that meet the given condition(s).
         * @param predicate A function ran for every element in the list that determines if said element passes the condition.
         */
        public filter(predicate: (element: LinkedListNode, index: number, list: LinkedList) => boolean): LinkedList;

        /**
         * Returns the index of the first appearance of the given element. If the element doesn't exist or can't be tested for equality, returns -1.
         * @param element A value to test for
         */
        public indexOf(element: any): number;

        /**
         * Returns the index of the last appearance of the given element. If the element doesn't exist or can't be tested for equality, returns -1.
         * @param element A value to test for
         */
        public lastIndexOf(element: any): number;

        /**
         * Splices the element at the given index from the list, re-aligning the elements as necessary, and returns the removed element. If index out of range, does nothing and returns undefined.
         * @param index The index of the element to remove
         */
        public removeAt(index: number): LinkedListNode | undefined;

        /**
         * Removes the first appearance of the given element in the list, re-aligning the elements as necessary, and returns the removed element. If the element doesn't exist in the list, does nothing and returns undefined;
         * @param element 
         */
        public remove(element: any): LinkedListNode | undefined;

        /**
         * Calls the given function for each element in the list.
         * @param callback Function to call for each element in the list.
         */
        public forEach(callback: (element: any, index: number, list: LinkedList)=>void): void;

        /**
         * Called by the semantics of the for-of statement; yields `value: any` from the list for each iteration.
         */
        public [Symbol.iterator](): void;

        /**
         * Called by the semantics of the for-await-of statement; yields `value: any` from the list for each iteration.
         */
        public [Symbol.asyncIterator](): Promise<void>;

        public toArray(): any;
    }
}