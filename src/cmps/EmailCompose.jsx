import { useEffect } from "react"


export function EmailCompose({searchParams, exitCompose}){

    
    function onExitCompose(){
        exitCompose()
    }

    return (
        <>
            <div className="email-compose-window">
                <form>

                    <label htmlFor="to">To: </label>
                    <input name="from" id="from" className="from" />

                    <label htmlFor="subject">Subject: </label>
                    <input name="subject" id="subject" className="subject" />

                    <label htmlFor="email-body">Body: </label>
                    <input name="email-body" id="email-body" className="email-body" />
                </form>

                <button onClick={onExitCompose}>X</button>
            </div>
        </>
    )
}  