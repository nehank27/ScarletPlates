'use client';
import {useSearchParams} from 'next/navigation'
import FoodInformation from '../Components /FoodInformation/FoodInformation';
export default function Campus() {
    const searchParams = useSearchParams()
    const campus = searchParams.get('campus')

    console.log(campus)
    // return <MapProducts category={category}/>
    return (
        <div>
                <FoodInformation campus={campus}/>
        </div>
    )
}