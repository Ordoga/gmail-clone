

export function EmailDetails( {email} ){
    return (
        <>
            <section className="email-details">
                <h1>{email.subject}</h1>
                <h4>From: {email.from}</h4>
                <h4>To: {email.to}</h4>
                <p>{email.body}</p>
            </section>
        </>
    )
}