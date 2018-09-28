import graphVariables from '../viz/graphVariables';
import mockSets from './mockSets'

test('expect graphVariables[\'length of set name\'].domain to return numbers >=0', () => {
  expect(graphVariables['length of set name'].domain(mockSets[0])).toBeGreaterThanOrEqual(0);
})

test('expect graphVariables[\'length of creature name\'].domain to return numbers >=0', () => {
  expect(graphVariables['length of creature name'].domain(mockSets[0])).toBeGreaterThanOrEqual(0);
})

test('expect graphVariables[\'length of longest creature name\'].domain to return numbers >=0', () => {
  expect(graphVariables['length of longest creature name'].domain(mockSets[0])).toBeGreaterThanOrEqual(0);
})

test('expect graphVariables[\'total CMC of creatures\'].domain to return numbers >=0', () => {
  expect(graphVariables['total CMC of creatures'].domain(mockSets[0])).toBeGreaterThanOrEqual(0);
})