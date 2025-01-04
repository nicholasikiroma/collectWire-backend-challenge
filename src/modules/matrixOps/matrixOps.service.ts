export async function flattenMatrix(input: string[][]): Promise<string> {
  return input.map((row) => row.join(',')).join(',');
}

export async function printMatrix(input: string[][]): Promise<string> {
  return input.map((row) => row.join(',')).join('\n');
}

export async function sumMatrix(input: string[][]): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export async function multiplyMatrix(input: string[][]): Promise<number> {
  const newArr = input.flat().map(Number);
  return newArr.reduce((accumulator, currentValue) => accumulator * currentValue);
}
