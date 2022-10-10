import React from 'react'
import Link from 'next/link'


const Home = (
// PageListRecordComp 
	// { data: articles }
) => {
	return (
		<>
			<Link href="/admin/login">
				<a>Interface Admin</a>
			</Link>
			{/* <ul>
				{articles?.map((article: Articles) => (
					<li key={article.id}>{article.title}</li>
				))}
			</ul> */}
		</>
	)
}


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	return await ssrListRecord.getServerPage(ctx, 'articles', 'id title content')
// }


export default Home

