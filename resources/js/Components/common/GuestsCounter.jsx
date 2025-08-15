import {clsx} from "clsx";
const guestsCounter = ({guests, setGuests, hiddenText}) => {

    const inc = () => {
        setGuests(guests + 1)
    }
    const dec = () => {
        guests === 1 ? setGuests(1) : setGuests(guests-1)
    }

    return (

        <form className={"max-w-xs mx-auto"}>
            <label htmlFor="bedrooms-input"  className={clsx(hiddenText && "hidden","block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>Liczba gości</label>
            <div className="relative flex items-center max-w-[11rem]">
                <button type="button"
                        id="decrement-button"
                        data-input-counter-decrement="bedrooms-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        onClick={dec}
                >
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 1h16"/>
                    </svg>
                </button>

                <div className="px-5 h-11 flex items-center border-[1px] border-gray-200">{guests}</div>

                <button type="button" id="increment-button"
                        data-input-counter-increment="bedrooms-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        onClick={inc}
                >
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <p id="helper-text-explanation" className={clsx(hiddenText && "hidden","mt-2 text-sm text-gray-500 dark:text-gray-400")}>Wybierz liczbę gości.</p>
        </form>

    )
}

export default guestsCounter
