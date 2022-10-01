export default function Metadata ({ source, extraSources, pastEssays, tags }: any): React.ReactElement { // TODO: type props
  return (
    <div>
      <p><em>{source}</em></p>
      <p><em>{extraSources}</em></p>
      <p><em>{pastEssays}</em></p>
      <p><em>{tags}</em></p>
    </div>
  )
}
