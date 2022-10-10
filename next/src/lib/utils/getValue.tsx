import moment from 'moment'
import { FaCheck } from 'react-icons/fa/index'
import humanize from './humanize'

const getValue = (key: string, value: any, fields: any[]) => {
    let field = fields.find((field: any) => field.field === key)

    let content = value

    if (typeof value === 'object') {
        if (value?.__typename === 'directus_files') {
            content = value.title
        } else if (value?.__typename === 'directus_users') {
            content = value.email
        } else if (value?.__typename === 'directus_roles') {
            content = value.id
        } else if (value?.id) {
            content = value.id
        } else if (field?.type === "json") {
            content = JSON.stringify(value)
        } else if (Array.isArray(value)) {
            content = value?.length ? "(" + value.length + ") [" + value.map((item: any) => item.id).join(', ') + "]" : "--"
        } else {
            content = '--'
        }
    }
    if (key === 'timestamp') {
        content = moment(value).format('LLL')
    }
    if (key === 'collection') {
        content = humanize(value.replace('directus_', ''))
    }
    if (key === 'revisions') {
        content = value.length
    }
    if (field?.type === 'boolean') {
        content = value ? "✔️ Vrai" : "❌ Faux"
    }
    if (value === undefined || value === null) {
        content = '--'
    }

    return content
}

export default getValue