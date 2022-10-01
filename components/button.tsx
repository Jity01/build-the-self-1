export default function Button ({ text, onClick }: { text: string, onClick: any }): React.ReactElement { // TODO type args
  return (
    <button type="button" aria-label={text} onClick={onClick}>{text}</button>
  )
}
