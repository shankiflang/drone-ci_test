import React, { useMemo } from 'react'
import clsx from 'clsx'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'



interface Props {
    page: number,
    setPage: (page: number) => void,
    numberOfPages: number
}


const Pagination = ({ page, setPage, numberOfPages }: Props) => {
    const scrollToTop = () => {
        window.scroll({ top: 0, behavior: "smooth" })
    };

    const calculatePages = (numberOfPages: number) => {
        let ps = Array.from(Array(numberOfPages), (_, index) => index + 1)
        let filteredPs = ps.filter((pageNumber) => {
            if ((pageNumber > (page - 4) && pageNumber < (page + 4)) || (pageNumber === 1) || (pageNumber === numberOfPages)) {
                return pageNumber
            } else {
                return undefined
            }
        })
        let finalPs: (string | number)[] = []
        filteredPs.forEach((v, i) => {
            if (filteredPs.length >= (i + 1)) {
                if (typeof v === 'number' && (v + 1) !== filteredPs[i + 1]) {
                    finalPs.push(v)
                    if (filteredPs.length > (i + 1)) {
                        finalPs.push('...')
                    }
                } else {
                    finalPs.push(v)
                }
            }
        })
        return finalPs
    }

    const incrementPage = () => {
        if (page < numberOfPages) {
            setPage(page + 1)
            scrollToTop()
        }
    }

    const decrementPage = () => {
        if (page > 1) {
            setPage(page - 1)
            scrollToTop()
        }
    }

    const pages = useMemo(() => calculatePages(numberOfPages), [numberOfPages, page]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="h-16 flex flex-row justify-start items-center mx-3 sm:mx-8 mb-12">
            <div
                onClick={() => decrementPage()}
                //enlever 1 a la page => icone arrow left
                className={
                    clsx(
                        "w-9 h-9 px-3 mr-1 rounded flex justify-center items-center bg-main cursor-pointer transition-all hover:bg-dark text-l-600", 
                        { ["cursor-not-allowed text-600"]: page === 1 }
                        )
                    } 
            >
                <MdArrowBackIosNew className={clsx("text-base", { ["text-gray-400"]: page === 1 })} />
            </div>
            {
                pages.map((pageNumber: number | string) => {
                    if (typeof pageNumber === 'number') {
                        return (
                            <div
                                key={pageNumber}
                                onClick={() => {
                                    setPage(pageNumber)
                                    scrollToTop()
                                }}
                                // si = highlight la page en cours (active)
                                className={
                                    clsx(
                                        "w-9 h-9 mx-1 px-3 rounded flex justify-center items-center bg-l-disabled dark:bg-d-main cursor-pointer transition-all hover:bg-l-main dark:hover:bg-d-dark text-l-600",
                                        { ["bg-dark font-bold"]: page === pageNumber }
                                        )
                                    }
                            >
                                <p>
                                    {pageNumber}
                                </p>
                            </div>
                        )
                    } else {
                        return ( // sur plus de page
                            <p key={pageNumber} className="text-400">
                                ...
                            </p>
                        )
                    }
                })
            }
            <div
                onClick={() => incrementPage()}
                // +1 icon arrow right
                className={
                    clsx(
                        "w-9 h-9 px-3 ml-1 rounded flex justify-center items-center bg-main cursor-pointer transition-all hover:bg-dark text-l-600", 
                        { ["cursor-not-allowed text-600"]: page === numberOfPages }
                        )
                    } 
            >
                <MdArrowForwardIos className={clsx("text-base", { ["text-gray-400"]: page === numberOfPages })} />
            </div>
        </div>
    )
}


export default Pagination
