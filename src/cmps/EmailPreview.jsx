

export function EmailPreview({ email }) {
    return (
        <div className="email-preview">
            <span>{email._id}</span>
            <span>{email.title}</span>
        </div>
    )
}