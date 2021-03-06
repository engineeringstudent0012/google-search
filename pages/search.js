import Head from "next/head"
import Header from "../Components/Header"
import Response from "../Response"
import {useRouter} from "next/router"
import SearchResults from "../Components/SearchResults"

const API_KEY = 'AIzaSyB7lXjr3pZTM4ANliDIzuZG-NhvzwloZW8'
const CONTEXT_KEY = 'adbb0512a62c0a3f1'

function Search({results}) {
    console.log(results) 
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
                <link rel="stylesheet" href="/favicon.ico"/>
            </Head>

            {/*    Header*/}
            <Header/>
            {/*    Search Results*/}
            <SearchResults results={results}/>

        </div>
    )
}

export default Search

export async function getServerSideProps(context) {
    const useDummyData = false
    const startIndex = context.query.start || '0'


    const data = useDummyData ? Response : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
    ).then((response) => response.json())

    //After The Server Side Has Render ... Pass The Results to the client
    return {
        props: {
            results: data,
        },
    }
}
