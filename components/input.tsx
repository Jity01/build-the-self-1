export default function Input ({ id, placeholder, onChange, value }: { id: string, placeholder: string, onChange: any, value: string }): React.ReactElement { // TODO type args
  return (
    <div>
      <input id={id} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}
