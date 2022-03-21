import axios from 'axios'

const RAPIDAPI_HOST = 'contextualwebsearch-websearch-v1.p.rapidapi.com'
const RAPIDAPI_KEY = '7GVKY7lFGHmshKoKVpst94Tksh9Ip1TLRVTjsnvhjPbrh806Ip'

const search = async (q) => {
    const response = await axios.request({
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {
            q: `starwars ${q}`,
            pageNumber: '1',
            pageSize: '10',
        },
        headers: {
            'x-rapidapi-host': RAPIDAPI_HOST,
            'x-rapidapi-key': RAPIDAPI_KEY
        }
    })

    return response.data
}

export default search
