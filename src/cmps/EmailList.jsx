import { EmailPreview } from "./EmailPreview"

export function EmailList({emails}) {





    if(!emails){
        return null
    }

    return (
        <>
            <ul className="email-list">
                    {
                        emails.map(email =>
                            <li key={email._id}>
                                <EmailPreview email={email}/>
                            </li>
                        )
                    }
            </ul>
        </>
    )
}