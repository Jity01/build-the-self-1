export default function Button({ text }: { text: string }) {
  return (
    <button type="button" aria-label={text}>{text}</button>
  );
}
