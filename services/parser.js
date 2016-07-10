class BinaryTree {
    constructor(value, left=null, right=null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    /** Prefix iteration */
    * [Symbol.iterator]() {
        yield this.value;
        if (this.left) {
            yield* this.left;
            // Short for: yield* this.left[Symbol.iterator]()
        }
        if (this.right) {
            yield* this.right;
        }
    }
}

module.exports = {
    BinaryTree
}