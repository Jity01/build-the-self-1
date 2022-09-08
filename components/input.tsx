export default function Input({ text, func, state }: { text: string, func: any, state: string }) { // TODO type args
  return (
    <input placeholder={text} onChange={func} value={state} />
  );
}
