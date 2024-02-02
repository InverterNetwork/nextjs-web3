import { FaDatabase } from 'react-icons/fa'

export default function NoData({ inline = false }: { inline?: boolean }) {
  if (inline)
    return (
      <div className="flex items-center gap-3">
        <p>No Data</p>
        <FaDatabase size={10} />
      </div>
    )
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-5">
      <FaDatabase size={50} />
      <h3>No Data</h3>
    </div>
  )
}
