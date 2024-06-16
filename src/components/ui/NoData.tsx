import { FaDatabase } from 'react-icons/fa'

export function NoData({
  inline = false,
  text = 'No Data',
}: {
  inline?: boolean
  text?: string
}) {
  if (inline)
    return (
      <div className="flex items-center gap-3 m-auto">
        <FaDatabase size={20} />
        <p>{text}</p>
      </div>
    )

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-5 m-auto">
      <FaDatabase size={50} className="min-w-max" />
      <h3 className="text-center md:text-right">{text}</h3>
    </div>
  )
}
