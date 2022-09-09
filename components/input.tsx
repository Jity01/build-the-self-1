export default function Input({ placeholder, onChange, value }: { placeholder: string, onChange: any, value: string }) { // TODO type args
  return (
    <div>
      <input placeholder={placeholder} onChange={onChange} value={value} />
    </div> 
  );
}
