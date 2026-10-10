/* Run with:  node --test   (from inside the starter folder)
   These FAIL until you finish linked-list.js. Watch them turn green step by step. */
const test = require('node:test');
const assert = require('node:assert/strict');
const { Node, DoublyLinkedList } = require('./linked-list.js');

function makeList(values) {
  const list = new DoublyLinkedList();
  values.forEach((v) => list.append(v));
  return list;
}

test('Node starts with value and null neighbours', () => {
  const node = new Node('A');
  assert.equal(node.value, 'A');
  assert.equal(node.prev, null);
  assert.equal(node.next, null);
});

test('empty list has no current song', () => {
  const list = new DoublyLinkedList();
  assert.equal(list.getCurrent(), null);
  assert.equal(list.moveNext(), null);
  assert.equal(list.movePrev(), null);
  assert.equal(list.size, 0);
});

test('append wires prev and next in both directions', () => {
  const list = makeList(['A', 'B', 'C']);
  assert.equal(list.size, 3);
  assert.equal(list.head.value, 'A');
  assert.equal(list.tail.value, 'C');
  assert.equal(list.head.next.value, 'B');
  assert.equal(list.tail.prev.value, 'B');
  assert.equal(list.head.next.prev, list.head);
  assert.equal(list.tail.prev.next, list.tail);
});

test('on load current is the first song', () => {
  const list = makeList(['A', 'B', 'C']);
  assert.equal(list.getCurrent(), 'A');
});

test('moveNext walks forward and wraps to head', () => {
  const list = makeList(['A', 'B', 'C']);
  assert.equal(list.moveNext(), 'B');
  assert.equal(list.moveNext(), 'C');
  assert.equal(list.moveNext(), 'A'); // wrap
});

test('movePrev walks back and wraps to tail', () => {
  const list = makeList(['A', 'B', 'C']);
  assert.equal(list.movePrev(), 'C'); // wrap from head
  assert.equal(list.movePrev(), 'B');
  assert.equal(list.movePrev(), 'A');
});

test('single-song list wraps to itself', () => {
  const list = makeList(['Only']);
  assert.equal(list.moveNext(), 'Only');
  assert.equal(list.movePrev(), 'Only');
});

test('toArray lists values and current status head to tail', () => {
  const list = makeList(['A', 'B', 'C']);
  assert.deepEqual(list.toArray(), [
    { value: 'A', isCurrent: true },
    { value: 'B', isCurrent: false },
    { value: 'C', isCurrent: false },
  ]);
});
