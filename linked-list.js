/* ============================================================================
   linked-list.js  (STARTER)
   The data structure. No DOM code lives here.
   Follow the numbered steps. After each one: save, refresh, test in the console.
   ============================================================================ */

/* ---- Step 2: Node ----------------------------------------------------------
   A Node holds one title and knows its two neighbours.
   Both pointers start as null: a brand new node has no neighbours yet.
---------------------------------------------------------------------------- */
class Node {
  constructor(title, src) {
    this.src = src;
    this.title = title;
    this.prev = null;
    this.next = null;
  }
}

/* ---- Step 3: DoublyLinkedList --------------------------------------------- */
class DoublyLinkedList {
  /* 3a. The list remembers three places plus a count. */
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.size = 0;
  }

  /* 3b. Add a title to the END of the list. O(1) because we keep `tail`.
     Empty list:  the new node is the head, the tail AND the cursor.
     Otherwise:   1. new node looks back at the old tail
                  2. old tail looks forward at the new node
                  3. the new node becomes the tail
     Order matters! Do step 2 before step 3. */
  append(name, src) {
    const node = new Node(name, src);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this.current = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
    return node;
  }

  /* 3c. Return the title under the cursor, or null if the list is empty. */
  getCurrent() {
    return this.current === null ? null : this.current.title;
  }

  /* 3d. Move the cursor one step forward.
     If current.next is null we are on the tail: wrap to the head.
     Return the new current title. */
  moveNext() {
    if (this.current === null) return null;

    if (this.current.next === null) {
      this.current = this.head;
    } else {
      this.current = this.current.next;
    }

    return this.current.title;
  }

  /* 3d. Move the cursor one step back.
     If current.prev is null we are on the head: wrap to the tail.
     Return the new current title. */
  movePrev() {
    if (this.current === null) return null;

    if (this.current.prev === null) {
      this.current = this.tail;
    } else {
      this.current = this.current.prev;
    }

    return this.current.title;
  }

  /* Bonus. Visit every title from head to tail and return them as an array.
     Start at head, follow .next until you hit null. */
  toArray() {
    const values = [];
    let node = this.head;
    while (node !== null) {
      values.push({ title: node.title, isCurrent: this.current == node, node });
      node = node.next;
    }
    return values;
  }

  moveDown(song) {
    if (!song || !song.next) return null;

    const a = song.next.next;
    const b = song.next;
    const d = song.prev;

    if (a) a.prev = song;
    else this.tail = song;

    b.next = song;
    b.prev = d;
    song.next = a;
    song.prev = b;

    if (d) d.next = b;
    else this.head = b;

    return song;
  }

  moveUp(song) {
    if (!song || !song.prev) return null;

    const a = song.prev.prev;
    const b = song.prev;
    const d = song.next;

    if (a) a.next = song;
    else this.head = song;

    b.prev = song;
    b.next = d;
    song.prev = a;
    song.next = b;

    if (d) d.prev = b;
    else this.tail = b;

    return song;
    //my code before ai
    /* if (song === this.tail && b === this.head) {
      this.head = song;
      this.tail = b;
    } else if (song === this.tail) {
      a.next = song;
      this.tail = b;
    } else if (a === null) {
      this.head = song;
      d.prev = b;
    } else {
      a.next = song;
      d.prev = b;
    } */
  }
  delete(song) {
    if (!song) {
      this.current = null;
      this.size = 0;
      this.head = null;
      this.tail = null;
      return;
    }

    const p = song.prev;
    const n = song.next;

    if (p) {
      p.next = n;
    } else {
      this.head = n;
    }
    if (n) {
      n.prev = p;
    } else {
      this.tail = p;
    }
    if (song === this.current) {
      this.current = n || p;
    }
    this.size--;
  }
}

/* Leave this alone. It lets `node --test` import the classes.
   In the browser `module` does not exist, so the line is skipped. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Node, DoublyLinkedList };
}
