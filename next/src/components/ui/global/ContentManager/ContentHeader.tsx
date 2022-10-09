import Button from 'components/ui/buttons/Button'
import React from 'react'
import { FiPackage } from 'react-icons/fi/index'
import { GrFormAdd } from 'react-icons/gr/index'
import { MdClose, MdDeleteOutline, MdDownload, MdMenu, MdOutlineArchive, MdOutlineRestore } from 'react-icons/md/index'
import ResearchAndFilterBar from '../ResearchAndFilterBar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdCheck } from 'react-icons/md/index'
import humanize from 'lib/utils/humanize'
import { useResponsive } from 'components/hooks/useResponsive'
import { useCurrentUser } from 'components/providers/UserProvider'
import moment from 'moment'
import JSZip from "jszip";
import axios from 'axios'
import { saveAs } from 'file-saver';

const zip = new JSZip();

interface Props {
    currentUser: any,
    title?: string,
    Icon?: any,
    collection: string,
    mode: string,
    options: any,
    setOptions: any,
    records: any,
    filters: any[],
    fields: any[],
    currentPreset: any,
    numberOfRecords: number
    handleSave?: any,
    selected: Array<string>,
    handleDeleteSelected?: any,
    system?: boolean,
    createAction?: any,
    deleteAction?: any,
    refreshAllData: any,
    refetchPresets: any,
    handleArchieveSelected: any,
    defaultUrl?: string,
    closeModal?: any,
    downloadable?: boolean,
}


const download = (item: any) => {
    //download single file as blob and add it to zip archive
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${item.id}?cachebust=${moment.now()}`, { responseType: "blob" }).then((resp) => {
        zip.file(item.filename_download, resp.data);
    });
};


const ContentHeader = ({ currentUser, records, mode, collection, options, setOptions, filters, fields, currentPreset, numberOfRecords, handleSave, selected, handleDeleteSelected, system, title, Icon, createAction, deleteAction, refreshAllData, refetchPresets, handleArchieveSelected, defaultUrl, closeModal, downloadable }: Props) => {
    const { asPath } = useRouter();
    const { setSidebarOpen } = useCurrentUser();
    const screen = useResponsive();

    const handleDownload = (e: any) => {
        if (selected.length > 1) {
            e.preventDefault();

            //download all files as blob and add them to zip archive
            let filesToDownload = records.files.filter((record: any) => selected.includes(record.id))

            let names: string[] = []
            const arrOfFiles = filesToDownload.map(
                (item: any) => {
                    names.push(item.filename_download)

                    let correctedItem = { ...item }

                    let countDuplicates = names.filter((name: any) => name === item.filename_download).length

                    if (countDuplicates > 1) {
                        correctedItem.filename_download = item.filename_download.replace(/.([^.]*)$/, ` (${countDuplicates}).$1`)
                    }

                    return download(correctedItem)
                }
            );

            Promise.all(arrOfFiles)
                .then(() => {
                    //when all promises resolved - save zip file
                    zip.generateAsync({ type: "blob" }).then(function (blob) {
                        saveAs(blob, "fichiers.zip");
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="w-full flex flex-col lg:flex-row flex-wrap justify-between items-start my-3 px-3 sm:my-8 sm:px-8 sticky left-0 z-50">
            <div className="flex flex-row justify-start items-center h-14 mb-2">
                {
                    (screen === 'sm' || screen === 'md') && !closeModal ?
                        (
                            <MdMenu
                                className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                onClick={() => setSidebarOpen(true)}
                            />
                        ) : (
                            closeModal ? (
                                <MdClose className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 cursor-pointer transition-all hover:bg-l-dark dark:hover:bg-d-light" onClick={() => closeModal()} />
                            ) : (
                                Icon ?
                                    <Icon className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200" /> :
                                    <FiPackage className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200" />
                            )
                        )
                }
                <h1 className="ml-4 text-2xl text-200 truncate">
                    {title ? title : humanize(collection)}
                </h1>
            </div>
            <div className="flex flex-col justify-start items-start sm:items-center sm:flex-row sm:justify-between w-full lg:justify-end mt-1 lg:mt-0 lg:flex-grow lg:w-auto lg:h-14">
                {
                    numberOfRecords > 0 && ["2xl"].includes(screen) && (
                        <div>
                            <p className="text-base text-500 mr-4">
                                {numberOfRecords} objet{numberOfRecords > 1 ? 's' : ''}
                            </p>
                        </div>
                    )
                }
                <ResearchAndFilterBar
                    currentUser={currentUser}
                    options={options}
                    setOptions={setOptions}
                    filters={filters}
                    fields={fields}
                    collection={collection}
                    currentPreset={currentPreset}
                    system={system}
                    refetchPresets={refetchPresets}
                />
                <div className="flex flex-row sm:ml-3 mt-4 sm:mt-0">
                    {
                        mode.includes('edit') && selected.length > 0 && (!deleteAction || deleteAction === 'delete') && (
                            <Button variant="secondary" className="w-11 h-11 mr-3 rounded-full group transition-all" onClick={handleDeleteSelected} name="Supprimer" tooltip={true}>
                                <MdDeleteOutline className="w-full h-full text-400 group-hover:text-300 transition-all" />
                            </Button>
                        )
                    }
                    {
                        mode.includes('edit') && selected.length > 0 && (deleteAction === 'archieve') && (
                            <Button variant="secondary" className="w-11 h-11 mr-3 rounded-full group transition-all" onClick={() => handleArchieveSelected(true)} name="Archiver" tooltip={true}>
                                <MdOutlineArchive className="w-full h-full text-400 group-hover:text-300 transition-all" />
                            </Button>
                        )
                    }
                    {
                        mode.includes('edit') && selected.length > 0 && (deleteAction === 'restore') && (
                            <Button variant="secondary" className="w-11 h-11 mr-3 rounded-full group transition-all" onClick={() => handleArchieveSelected(false)} name="Restorer" tooltip={true}>
                                <MdOutlineRestore className="w-full h-full text-400 group-hover:text-300 transition-all" />
                            </Button>
                        )
                    }
                    {
                        mode.includes('edit') && selected.length > 0 && (downloadable) && (
                            <a
                                href={selected.length === 1 ? process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + selected[0] + '?cachebust=' + moment.now() + '&download' : ""}
                                onClick={handleDownload}
                            >
                                <Button variant="secondary" className="w-11 h-11 mr-3 rounded-full group transition-all" name="Télécharger" tooltip={true}>
                                    <MdDownload className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                </Button>
                            </a>
                        )
                    }
                    {
                        mode.includes('edit') && createAction !== 'unavailable' && (
                            <>
                                {
                                    createAction ? (
                                        <Button variant="primary" className="w-11 h-11 mr-3 rounded-full" onClick={() => createAction({ refreshAllData })} name="Créer" tooltip={true}>
                                            <GrFormAdd className="w-full h-full" />
                                        </Button>
                                    ) : (
                                        <Link href={defaultUrl ? `${defaultUrl}/create` : `${asPath}/create`}>
                                            <a>
                                                <Button variant="primary" className="w-11 h-11 mr-3 rounded-full" name="Créer" tooltip={true}>
                                                    <GrFormAdd className="w-full h-full" />
                                                </Button>
                                            </a>
                                        </Link>
                                    )
                                }
                            </>
                        )

                    }
                    {
                        mode.includes('pick') && (
                            <div className="flex flex-row justify-start items-center h-10 w-10">
                                <Button variant="primary" className="w-full h-full rounded-full" name="Sauvegarder" tooltip={true}>
                                    <MdCheck
                                        className="w-full h-full"
                                        onClick={() => {
                                            if (handleSave) {
                                                handleSave(records[collection].filter((record: any) => selected.includes(record.id)))
                                            }
                                        }}
                                    />
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}


export default ContentHeader