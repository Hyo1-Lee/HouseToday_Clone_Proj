import { useLoaderData, Await } from 'react-router-dom'
import './css/HousewarmingParty.scss'

import HousewarmingPartyArticle from '../../components/home/HousewarmingPartyArticle'

const HousewarmingParty = () => {
    const { data } = useLoaderData()

    return (
        <>
            <div className="housewarming-party">
                <select name="sort" id="sort">
                    <option value="">정렬</option>
                    <option value="like">좋아요순</option>
                </select>

                <Await resolve={data}>{(loadedData) => <HousewarmingPartyArticle data={loadedData} />}</Await>
            </div>
        </>
    )
}

export default HousewarmingParty
