import React from 'react'

function LightModeLike(props) {
    return (
        <div style={{ marginRight: "0.31rem", marginTop: "0.2rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.isNonMobileScreens ? "17" : "12"} height={props.isNonMobileScreens ? "17" : "12"} viewBox="0 0 14 14" fill="none">
                <path d="M4.36328 10.7042L6.17161 12.1042C6.40495 12.3375 6.92995 12.4542 7.27995 12.4542H9.49662C10.1966 12.4542 10.9549 11.9292 11.1299 11.2292L12.5299 6.97083C12.8216 6.15416 12.2966 5.45416 11.4216 5.45416H9.08828C8.73828 5.45416 8.44661 5.16249 8.50495 4.75416L8.79661 2.88749C8.91328 2.36249 8.56328 1.77916 8.03828 1.60416C7.57161 1.42916 6.98828 1.66249 6.75495 2.01249L4.36328 5.57083" stroke="#4F4F4F" strokeMiterlimit="10" />
                <path d="M1.38843 10.7042V4.98748C1.38843 4.17082 1.73843 3.87915 2.55509 3.87915H3.13843C3.95509 3.87915 4.30509 4.17082 4.30509 4.98748V10.7042C4.30509 11.5208 3.95509 11.8125 3.13843 11.8125H2.55509C1.73843 11.8125 1.38843 11.5208 1.38843 10.7042Z" stroke="#4F4F4F" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default LightModeLike