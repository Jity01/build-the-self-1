export default function Input({ text, func, state }: { text: string, func: any, state: string }) { // TODO type args
  return (
    <input placeholder={text} onClick={func} value={state} />
  );
}
