import React from 'react'

function DarkModeLike(props) {
    return (
        <div style={{ marginRight: "0.31rem",marginTop:"0.2rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.isNonMobileScreens ? "17" : "12"} height={props.isNonMobileScreens ? "17" : "12"} viewBox="0 0 14 14" fill="none">
                <path d="M4.36328 10.7042L6.17161 12.1042C6.40495 12.3375 6.92995 12.4542 7.27995 12.4542H9.49662C10.1966 12.4542 10.9549 11.9292 11.1299 11.2292L12.5299 6.97083C12.8216 6.15416 12.2966 5.45416 11.4216 5.45416H9.08828C8.73828 5.45416 8.44661 5.16249 8.50495 4.75416L8.79661 2.88749C8.91328 2.36249 8.56328 1.77916 8.03828 1.60416C7.57161 1.42916 6.98828 1.66249 6.75495 2.01249L4.36328 5.57083" stroke="#E5E5E5" strokeMiterlimit="10" />
                <path d="M1.38818 10.7042V4.98748C1.38818 4.17082 1.73818 3.87915 2.55485 3.87915H3.13818C3.95485 3.87915 4.30485 4.17082 4.30485 4.98748V10.7042C4.30485 11.5208 3.95485 11.8125 3.13818 11.8125H2.55485C1.73818 11.8125 1.38818 11.5208 1.38818 10.7042Z" stroke="#E5E5E5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export default DarkModeLike