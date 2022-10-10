import React from 'react'
import { Articles } from 'graphql/generated/hooks';


interface Props {
    articles: any;
}


const DemoModal = ({ articles }: Props) => {
    return (
        <ul>
            {articles?.map((article: Articles) => (
                <li key={article.id}>{article.title}</li>
            ))}
        </ul>
    )
}


export default DemoModal