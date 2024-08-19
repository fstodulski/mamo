export type AwaitProps<T> = {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
};

export async function Await<T>({ promise, children }: AwaitProps<T>) {
  const data = await promise;

  return children(data);
}
