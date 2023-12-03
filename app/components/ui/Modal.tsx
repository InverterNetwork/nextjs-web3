export default function Modal({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  content?: React.ReactNode
}) {
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {content}
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={onClose}>
              Close
            </button>
            <button className="btn ml-3" type="submit">
              Done
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
